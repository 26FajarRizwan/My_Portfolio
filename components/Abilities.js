"use client";
import { useEffect, useRef, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import fallbackAbilities from "@/data/abilities";

export default function Abilities() {
  const [items, setItems] = useState(null);
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setAnimate(true)),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const list = items && items.length > 0 ? items : fallbackAbilities;

  return (
    <section id="abilities" style={{ background: "var(--bg-panel)" }} ref={sectionRef}>
      <div className="wrap">
        <div className="section-head" data-aos="fade-up">
          <div className="tag">My Skills</div>
          <h2>What This Portfolio &amp; I Can Do</h2>
          <p>Managed from the admin panel — a live figure of my core technical strengths.</p>
        </div>
        <div className="ring-grid">
          {list.map((s, i) => (
            <div
              className="ring-card"
              key={s.id || i}
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0) scale(1)" : "translateY(14px) scale(.9)",
                transition: `opacity .5s ease ${i * 0.07}s, transform .5s cubic-bezier(.34,1.56,.64,1) ${i * 0.07}s`,
              }}
            >
              <div className="ring-icon-badge">
                <span className="ring-icon">{s.icon}</span>
              </div>
              <div className="ring-name">{s.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
