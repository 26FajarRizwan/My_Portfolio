"use client";
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import fallbackEducation from "@/data/education";

export default function Education() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    try {
      const q = query(collection(db, "education"), orderBy("createdAt", "desc"));
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

  const list = items && items.length > 0 ? items : fallbackEducation;

  return (
    <section id="education">
      <div className="wrap">
        <div className="section-head" data-aos="fade-up">
          <div className="tag">Education</div>
          <h2>Academic Background</h2>
          <p>Managed from the admin panel at <code className="mono">/admin</code>.</p>
        </div>
        <div className="edu-grid" data-aos="fade-up">
          {list.map((ed, i) => (
            <div className="edu-card" key={ed.id || i}>
              <h4>{ed.school}</h4>
              <div className="deg">{ed.degree}</div>
              <div className="yr">{ed.years}</div>
              {ed.note && <p style={{ color: "var(--ink-soft)", fontSize: ".85rem" }}>{ed.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
