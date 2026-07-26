"use client";
import { useEffect, useRef, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import fallbackAbilities from "@/data/abilities";

function Ring({ percent, animate }) {
  const size = 128;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (animate ? percent : 0) / 100 * c;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#E4E9FB" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="url(#ringGradient)"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)", transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
      />
      <text x="50%" y="50%" textAnchor="middle" dy=".35em" fontSize="22" fontWeight="700" fill="var(--ink)" fontFamily="Space Grotesk">
        {animate ? percent : 0}%
      </text>
    </svg>
  );
}

export default function Abilities() {
  const [items, setItems] = useState(null);
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    try {
      const q = query(collection(db, "abilities"), orderBy("createdAt", "desc"));
      const unsub = onSnapshot(q, (snap) => setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() }))), () => setItems([]));
      return () => unsub();
    } catch (e) {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setAnimate(true)),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const list = items && items.length > 0 ? items : fallbackAbilities;

  return (
    <section id="abilities" style={{ background: "var(--bg-panel)" }} ref={sectionRef}>
      <div className="wrap">
        <div className="section-head" data-aos="fade-up">
          <div className="tag">Abilities</div>
          <h2>What This Portfolio &amp; I Can Do</h2>
          <p>Managed from the admin panel — a live figure of my core technical strengths.</p>
        </div>
        <div className="ring-grid" data-aos="fade-up">
          {list.map((s, i) => (
            <div className="ring-card" key={s.id || i}>
              <Ring percent={Number(s.percent) || 0} animate={animate} />
              <div className="ring-icon">{s.icon}</div>
              <div className="ring-name">{s.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
