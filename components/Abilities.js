"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import fallbackAbilities from "@/data/abilities";
import { CATEGORY_OPTIONS } from "@/lib/skillCategories";

export default function Abilities() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    try {
      const colRef = collection(db, "abilities");
      const unsub = onSnapshot(
        colRef,
        (snap) => {
          const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          list.sort((a, b) => {
            const at = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
            const bt = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
            return bt - at;
          });
          setItems(list);
        },
        () => setItems([])
      );
      return () => unsub();
    } catch (e) {
      setItems([]);
    }
  }, []);

  const list = items && items.length > 0 ? items : fallbackAbilities;

  // Group flat skill list into { category: [skills] }
  const grouped = {};
  list.forEach((s) => {
    const cat = s.category || "Other";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(s);
  });

  // Keep a stable, sensible category order; anything unexpected goes last.
  const orderedCategories = [
    ...CATEGORY_OPTIONS.map((c) => c.value).filter((c) => grouped[c]),
    ...Object.keys(grouped).filter((c) => !CATEGORY_OPTIONS.some((o) => o.value === c)),
  ];

  return (
    <section id="abilities" style={{ background: "var(--bg-panel)" }}>
      <div className="wrap">
        <div className="section-head" data-aos="fade-up" data-aos-duration="300">
          <div className="tag">Skills</div>
          <h2>What I work with</h2>
          <p>Grouped by area, strongest ones marked.</p>
        </div>
        <div className="skills-groups">
          {orderedCategories.map((cat) => (
            <div className="skill-group" key={cat} data-aos="fade-up" data-aos-duration="300">
              <h3>{cat}</h3>
              <ul className="skill-list">
                {grouped[cat].map((s, i) => (
                  <li key={s.id || i} className={s.core ? "core" : ""}>
                    <span>{s.name}</span>
                    {s.core && <span className="badge">core</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
