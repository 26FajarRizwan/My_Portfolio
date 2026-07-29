"use client";
import { useState } from "react";

const links = [
  { id: "about", label: "About", icon: "👤" },
  { id: "abilities", label: "Abilities", icon: "📊" },
  { id: "services", label: "What I Do", icon: "🧩" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "certifications", label: "Certifications", icon: "📜" },
  { id: "projects", label: "Projects", icon: "💻" },
  { id: "designs", label: "Designs", icon: "🎨" },
  { id: "contact", label: "Contact", icon: "✉️" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`overlay ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-head">
          <div className="logo-mark">FR</div>
          <div>
            <div style={{ fontWeight: 700 }}>Fajar Rizwan</div>
            <div style={{ fontSize: ".78rem", color: "var(--ink-soft)" }}>Full-Stack &amp; Agentic AI</div>
          </div>
        </div>
        <div className="sidebar-links">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}>
              <span className="sidebar-icon">{l.icon}</span> {l.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="btn-primary" style={{ textAlign: "center", marginTop: 10, flexShrink: 0 }} onClick={() => setOpen(false)}>
          Let&apos;s Connect
        </a>
      </div>

      <header>
        <div className="nav wrap">
          <div className="logo">
            <div className="logo-mark">FR</div> Fajar Rizwan
          </div>
          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#abilities">Abilities</a>
            <a href="#services">What I Do</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#designs">Designs</a>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <a href="#contact" className="nav-cta">Let&apos;s Connect</a>
            <div className="burger" onClick={() => setOpen(!open)} aria-label="Open menu">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
