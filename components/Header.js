"use client";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = ["About", "Abilities", "Services", "Experience", "Education", "Certifications", "Projects", "Contact"];

  return (
    <>
      <div className={`overlay ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
      <div className={`sidebar ${open ? "open" : ""}`}>
        {links.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>
            {l}
          </a>
        ))}
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
          </nav>
          <a href="#contact" className="nav-cta">Let&apos;s Connect</a>
          <div className="burger" onClick={() => setOpen(!open)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </header>
    </>
  );
}
