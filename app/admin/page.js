"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

// Each tab defines its Firestore collection name, its form fields, and how
// to render a summary line for the list view.
const TABS = {
  experience: {
    label: "Experience",
    collection: "experience",
    fields: [
      { key: "role", label: "Role / Title" },
      { key: "org", label: "Organization" },
      { key: "type", label: "Type (e.g. Internship · Hybrid)" },
      { key: "meta", label: "Dates (e.g. Jul 2026 – Present · 1 mo)" },
      { key: "desc", label: "Description (optional)" },
    ],
    checkbox: { key: "current", label: "Currently ongoing?" },
    summary: (d) => `${d.role} — ${d.org}`,
  },
  education: {
    label: "Education",
    collection: "education",
    fields: [
      { key: "school", label: "School / University" },
      { key: "degree", label: "Degree / Program" },
      { key: "years", label: "Years (e.g. Oct 2024 – Jun 2028)" },
      { key: "note", label: "Note (optional)" },
    ],
    summary: (d) => `${d.school} — ${d.degree}`,
  },
  certifications: {
    label: "Certifications",
    collection: "certifications",
    fields: [
      { key: "title", label: "Certificate Title" },
      { key: "issuer", label: "Issuer (e.g. Coursera, LinkedIn Learning)" },
      { key: "date", label: "Date (e.g. Jul 2026)" },
      { key: "url", label: "Credential URL (optional)" },
    ],
    summary: (d) => `${d.title} — ${d.issuer}`,
  },
};

function emptyForm(tabKey) {
  const f = {};
  TABS[tabKey].fields.forEach((field) => (f[field.key] = ""));
  if (TABS[tabKey].checkbox) f[TABS[tabKey].checkbox.key] = false;
  return f;
}

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState("experience");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm("experience"));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;
    const tab = TABS[activeTab];
    const q = query(collection(db, tab.collection), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
    setForm(emptyForm(activeTab));
    return () => unsub();
  }, [user, activeTab]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setLoginError("Login failed — check your email/password (set this up in Firebase Console → Authentication).");
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    const tab = TABS[activeTab];
    const requiredFilled = tab.fields.slice(0, 2).every((f) => form[f.key]);
    if (!requiredFilled) return;
    setSaving(true);
    await addDoc(collection(db, tab.collection), { ...form, createdAt: serverTimestamp() });
    setForm(emptyForm(activeTab));
    setSaving(false);
  }

  async function handleDelete(id) {
    await deleteDoc(doc(db, TABS[activeTab].collection, id));
  }

  if (checking) {
    return <div className="wrap" style={{ padding: "120px 24px" }}>Checking login…</div>;
  }

  if (!user) {
    return (
      <div className="wrap" style={{ padding: "120px 24px", maxWidth: 420 }}>
        <h2 style={{ marginBottom: 20 }}>Admin Login</h2>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 12, borderRadius: 10, border: "1px solid var(--line)" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: 12, borderRadius: 10, border: "1px solid var(--line)" }}
          />
          <button type="submit" className="btn-primary" style={{ border: "none", cursor: "pointer" }}>Log In</button>
          {loginError && <p style={{ color: "#DC2626", fontSize: ".85rem" }}>{loginError}</p>}
        </form>
        <p style={{ marginTop: 20, color: "var(--ink-soft)", fontSize: ".85rem" }}>
          First time here? Create your admin account in Firebase Console → Authentication → Users → Add user.
        </p>
      </div>
    );
  }

  const tab = TABS[activeTab];

  return (
    <div className="wrap" style={{ padding: "60px 24px", maxWidth: 720 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2>Admin Panel</h2>
        <button onClick={() => signOut(auth)} className="btn-ghost" style={{ border: "none", cursor: "pointer" }}>Log Out</button>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 30, flexWrap: "wrap" }}>
        {Object.entries(TABS).map(([key, t]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid var(--line)",
              cursor: "pointer",
              fontWeight: 600,
              background: activeTab === key ? "var(--primary)" : "#fff",
              color: activeTab === key ? "#fff" : "var(--ink)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleAdd} className="chart-card" style={{ display: "grid", gap: 14, marginBottom: 40 }}>
        <h3 style={{ marginBottom: 4 }}>Add {tab.label}</h3>
        {tab.fields.map((f) => (
          <input
            key={f.key}
            placeholder={f.label}
            value={form[f.key] || ""}
            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
            style={{ padding: 12, borderRadius: 10, border: "1px solid var(--line)" }}
          />
        ))}
        {tab.checkbox && (
          <label style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600, fontSize: ".9rem" }}>
            <input
              type="checkbox"
              checked={!!form[tab.checkbox.key]}
              onChange={(e) => setForm({ ...form, [tab.checkbox.key]: e.target.checked })}
            />
            {tab.checkbox.label}
          </label>
        )}
        <button type="submit" disabled={saving} className="btn-primary" style={{ border: "none", cursor: "pointer" }}>
          {saving ? "Saving…" : `Add ${tab.label}`}
        </button>
      </form>

      <h3 style={{ marginBottom: 16 }}>Current {tab.label} ({items.length})</h3>
      <div style={{ display: "grid", gap: 12 }}>
        {items.length === 0 && (
          <p style={{ color: "var(--ink-soft)", fontSize: ".9rem" }}>
            None added yet through the admin panel — the public site is currently showing the starter data from the code.
          </p>
        )}
        {items.map((it) => (
          <div key={it.id} className="tl-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: 700 }}>{tab.summary(it)}</div>
            <button onClick={() => handleDelete(it.id)} style={{ color: "#DC2626", border: "none", background: "none", cursor: "pointer", fontWeight: 600 }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
