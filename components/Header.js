"use client";
import { useState } from "react";
import { User, BarChart3, Layers, Briefcase, GraduationCap, Award, Code2, Palette, Mail, Menu } from "lucide-react";

const links = [
  { id: "about", label: "About", Icon: User },
  { id: "abilities", label: "Abilities", Icon: BarChart3 },
  { id: "services", label: "What I Do", Icon: Layers },
  { id: "experience", label: "Experience", Icon: Briefcase },
  { id: "education", label: "Education", Icon: GraduationCap },
  { id: "certifications", label: "Certifications", Icon: Award },
  { id: "projects", label: "Projects", Icon: Code2 },
  { id: "designs", label: "Designs", Icon: Palette },
  { id: "contact", label: "Contact", Icon: Mail },
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
              <span className="sidebar-icon"><l.Icon size={18} strokeWidth={2} /></span> {l.label}
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
              <Menu size={22} strokeWidth={2} color="var(--ink)" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
