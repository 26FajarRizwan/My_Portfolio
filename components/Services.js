"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import fallbackServices from "@/data/services";
import { AppIcon } from "@/lib/icons";

export default function Services() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    try {
      const colRef = collection(db, "services");
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

  const list = items && items.length > 0 ? items : fallbackServices;

  return (
    <section id="services">
      <div className="wrap">
        <div className="section-head" data-aos="fade-up">
          <div className="tag">What I Do</div>
          <h2>The Ways I Deliver Value</h2>
        </div>
        <div className="panel3">
          {list.map((p, i) => (
            <div className="panel-card" data-aos="fade-up" data-aos-delay={i * 100} key={p.id || i}>
              <div className="panel-icon"><AppIcon name={p.icon} size={22} strokeWidth={1.6} /></div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="panel-tags">
                {(typeof p.tags === "string" ? p.tags.split(",") : p.tags || []).map((t, idx) => (
                  <span key={idx}>{t.trim()}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
