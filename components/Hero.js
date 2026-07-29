"use client";
import { useState } from "react";

export default function Hero() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section className="hero">
      <div className="blob" style={{ width: 420, height: 420, background: "#7C3AED", top: -100, left: -140 }} />
      <div className="blob" style={{ width: 380, height: 380, background: "#38BDF8", top: 60, right: -120 }} />
      <div className="wrap">
        <div className="hero-grid">
          <div data-aos="fade-up">
            <div className="eyebrow"><span className="pulse-dot"></span> Open to new opportunities</div>
            <h1>
              Fajar Rizwan<br />
              <span className="accent">Full-Stack Developer</span><br />
              Designer<br />
              <span className="accent">Agentic AI Engineer</span>
            </h1>
            <p className="tagline">
              I architect end-to-end digital solutions that bridge creative design and robust
              backend engineering — from Next.js interfaces to Python FastAPI pipelines and
              autonomous CrewAI systems.
            </p>
            <div className="hero-btns">
              <a href="#projects" className="btn-primary">View My Work</a>
              <a href="#contact" className="btn-ghost">Get In Touch</a>
            </div>
          </div>

          <div className="hero-visual" data-aos="fade-left">
            <div className="hv-avatar">
              {imgOk ? (
                // Replace /public/profile.jpg with your real photo — this loads automatically.
                <img src="/profile.jpg" alt="" onError={() => setImgOk(false)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ fontSize: "5.5rem" }}>👨‍💻</span>
              )}
            </div>
            <div className="hv-card hv-1"><div className="hv-icon" style={{ background: "#1DA1F2" }}>🐦</div><div><div style={{ fontWeight: 700 }}>14k</div><div style={{ fontSize: ".75rem", color: "var(--ink-soft)" }}>Followers reach</div></div></div>
            <div className="hv-card hv-2"><div className="hv-icon" style={{ background: "#4F46E5" }}>📊</div><div><div style={{ fontWeight: 700, fontSize: ".85rem" }}>Live GitHub Sync</div><div style={{ fontSize: ".75rem", color: "var(--ink-soft)" }}>Auto-updating repos</div></div></div>
            <div className="hv-card hv-3"><div className="hv-icon" style={{ background: "#0A66C2" }}>in</div><div><div style={{ fontWeight: 700, fontSize: ".85rem" }}>LinkedIn</div><div style={{ fontSize: ".75rem", color: "var(--ink-soft)" }}>Verified profile</div></div></div>
            <div className="hv-card hv-4"><div className="hv-icon" style={{ background: "#22C55E" }}>✓</div><div><div style={{ fontWeight: 700, fontSize: ".85rem" }}>9+ Internships</div><div style={{ fontSize: ".75rem", color: "var(--ink-soft)" }}>Completed &amp; active</div></div></div>
          </div>
        </div>

        <div className="stats-strip" data-aos="fade-up">
          <div className="stat-box"><div className="num">9+</div><div className="lbl">Internships &amp; Roles</div></div>
          <div className="stat-box"><div className="num">15+</div><div className="lbl">Core Skills</div></div>
          <div className="stat-box"><div className="num">3</div><div className="lbl">Degrees In Progress / Completed</div></div>
          <div className="stat-box"><div className="num">2028</div><div className="lbl">Expected Graduation</div></div>
        </div>
      </div>
    </section>
  );
}
