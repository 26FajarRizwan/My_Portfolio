"use client";
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DesignProjects() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    try {
      const q = query(collection(db, "designs"), orderBy("createdAt", "desc"));
      const unsub = onSnapshot(q, (snap) => setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() }))), () => setItems([]));
      return () => unsub();
    } catch (e) {
      setItems([]);
    }
  }, []);

  return (
    <section id="designs" style={{ background: "var(--bg-panel)" }}>
      <div className="wrap">
        <div className="section-head" data-aos="fade-up">
          <div className="tag">Graphic Design</div>
          <h2>
            Design Work From Canva{" "}
            {items && items.length > 0 && (
              <span className="badge-live"><span className="pulse-dot" style={{ background: "#15803D" }}></span> live-synced</span>
            )}
          </h2>
          <p>Added from the admin panel — upload a thumbnail and your public Canva link, it appears here instantly.</p>
        </div>

        <div className="design-grid" data-aos="fade-up">
          {!items && <p style={{ color: "var(--ink-soft)", gridColumn: "1/-1", textAlign: "center" }}>Loading…</p>}
          {items && items.length === 0 && (
            <p style={{ color: "var(--ink-soft)", gridColumn: "1/-1", textAlign: "center" }}>
              No designs added yet — add your first one from <code className="mono">/admin</code> → Designs tab.
            </p>
          )}
          {items && items.map((d) => (
            <div className="design-card" key={d.id}>
              <div className="design-thumb">
                {d.thumbnail ? <img src={d.thumbnail} alt={d.title} /> : "🎨"}
              </div>
              <div className="design-body">
                {d.category && <div className="cat">{d.category}</div>}
                <h4>{d.title}</h4>
                {d.description && <p>{d.description}</p>}
                {d.canvaLink && (
                  <a href={d.canvaLink} target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: "8px 18px", fontSize: ".85rem" }}>
                    View on Canva →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
