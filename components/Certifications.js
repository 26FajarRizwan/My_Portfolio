"use client";
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Certifications() {
  const [certs, setCerts] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const q = query(collection(db, "certifications"), orderBy("createdAt", "desc"));
      const unsub = onSnapshot(
        q,
        (snap) => setCerts(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
        () => setError(true)
      );
      return () => unsub();
    } catch (e) {
      setError(true);
    }
  }, []);

  return (
    <section id="certifications">
      <div className="wrap">
        <div className="section-head" data-aos="fade-up">
          <div className="tag">Certifications</div>
          <h2>
            Live Certifications{" "}
            <span className="badge-live"><span className="pulse-dot" style={{ background: "#15803D" }}></span> Firebase-synced</span>
          </h2>
          <p>Added from the admin panel — new certificates appear here instantly, no redeploy needed.</p>
        </div>

        <div className="edu-grid" data-aos="fade-up">
          {error && (
            <p style={{ color: "var(--ink-soft)", gridColumn: "1/-1", textAlign: "center" }}>
              Firebase isn&apos;t connected yet — add your keys to <code className="mono">.env.local</code> (see README).
            </p>
          )}
          {!certs && !error && <p style={{ color: "var(--ink-soft)", gridColumn: "1/-1", textAlign: "center" }}>Loading…</p>}
          {certs && certs.length === 0 && (
            <p style={{ color: "var(--ink-soft)", gridColumn: "1/-1", textAlign: "center" }}>
              No certifications added yet — add your first one from <code className="mono">/admin</code>.
            </p>
          )}
          {certs && certs.map((c) => (
            <div className="edu-card" key={c.id} style={{ borderTopColor: "var(--deep)" }}>
              <h4>{c.title}</h4>
              <div className="deg">{c.issuer}</div>
              <div className="yr">{c.date}</div>
              {c.url && (
                <a href={c.url} target="_blank" rel="noreferrer" style={{ color: "var(--primary)", fontWeight: 600, fontSize: ".85rem" }}>
                  View credential →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
