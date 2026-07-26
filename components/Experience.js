"use client";
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import fallbackExperience from "@/data/experience";

export default function Experience() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    try {
      const q = query(collection(db, "experience"), orderBy("createdAt", "desc"));
      const unsub = onSnapshot(
        q,
        (snap) => setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
        () => setItems([])
      );
      return () => unsub();
    } catch (e) {
      setItems([]);
    }
  }, []);

  // Use Firestore data once it has entries; otherwise show the starter list
  // from data/experience.js so the section is never empty.
  const list = items && items.length > 0 ? items : fallbackExperience;

  return (
    <section id="experience" style={{ background: "var(--bg-panel)" }}>
      <div className="wrap">
        <div className="section-head" data-aos="fade-up">
          <div className="tag">Experience</div>
          <h2>
            How I&apos;ve Been Building{" "}
            {items && items.length > 0 && (
              <span className="badge-live"><span className="pulse-dot" style={{ background: "#15803D" }}></span> live-synced</span>
            )}
          </h2>
          <p>Managed from the admin panel at <code className="mono">/admin</code>.</p>
        </div>
        <div className="timeline" data-aos="fade-up">
          {list.map((e, i) => (
            <div className={`tl-item ${e.current ? "current" : ""}`} key={e.id || i}>
              <div className="tl-dot"></div>
              <div className="tl-card">
                <div className="role">
                  {e.role} {e.current && <span className="badge-live">● current</span>}
                </div>
                <div className="org">{e.org} · {e.type}</div>
                <div className="meta">{e.meta}</div>
                {e.desc && <p>{e.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
