"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { TABS } from "@/lib/adminTabs";
import AdminSection from "@/components/admin/AdminSection";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("experience");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setLoginError("Login failed — check your email/password (set this up in Firebase Console → Authentication).");
    }
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

  return (
    <div className="wrap" style={{ padding: "60px 24px", maxWidth: 720 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2>Admin Panel</h2>
        <button onClick={() => signOut(auth)} className="btn-ghost" style={{ cursor: "pointer" }}>Log Out</button>
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
              background: activeTab === key ? "var(--primary)" : "var(--bg-panel)",
              color: activeTab === key ? "#fff" : "var(--ink)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* key={activeTab} remounts the section on tab switch, resetting any in-progress edit */}
      <AdminSection key={activeTab} tab={TABS[activeTab]} />
    </div>
  );
}
