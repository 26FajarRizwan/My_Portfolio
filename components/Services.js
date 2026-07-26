"use client";
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import fallbackServices from "@/data/services";

export default function Services() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    try {
      const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
      const unsub = onSnapshot(q, (snap) => setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() }))), () => setItems([]));
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
          <h2>Three Ways I Deliver Value</h2>
          <p>Managed from the admin panel — from pixel to pipeline to autonomous agent.</p>
        </div>
        <div className="panel3">
          {list.map((p, i) => (
            <div className="panel-card" data-aos="fade-up" data-aos-delay={i * 100} key={p.id || i}>
              <div className="panel-icon">{p.icon}</div>
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
