"use client";
import { useState } from "react";
import { User } from "lucide-react";

export default function Hero() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div data-aos="fade-up" data-aos-duration="300">
            <div className="eyebrow"><span className="pulse-dot"></span> Open to work</div>
            <h1>
              Full-stack developer building fast, reliable products with{" "}
              <span className="accent">Next.js</span>,{" "}
              <span className="accent">FastAPI</span>, and agentic AI systems.
            </h1>
            <p className="tagline">
              I&apos;m Fajar Rizwan, a computer science student who enjoys taking a product from a rough
              idea to something people can actually use — the frontend, the backend, and increasingly,
              the AI systems that automate the parts in between.
            </p>
            <div className="hero-btns">
              <a href="#projects" className="btn-primary">View my work</a>
              <a href="#contact" className="btn-ghost">Get in touch</a>
            </div>
          </div>

          <div className="hero-visual" data-aos="fade-up" data-aos-duration="300">
            <div className="hv-avatar">
              {imgOk ? (
                // Replace /public/profile.jpg with your real photo — this loads automatically.
                <img src="/profile.jpg" alt="" onError={() => setImgOk(false)} />
              ) : (
                <User size={64} strokeWidth={1.2} color="var(--ink-soft)" />
              )}
            </div>
          </div>
        </div>

        <div className="stats-strip" data-aos="fade-up" data-aos-duration="300">
          <div className="stat-box"><div className="num">9+</div><div className="lbl">Internships &amp; roles</div></div>
          <div className="stat-box"><div className="num">15+</div><div className="lbl">Core skills</div></div>
          <div className="stat-box"><div className="num">2028</div><div className="lbl">Expected graduation</div></div>
        </div>
      </div>
    </section>
  );
}
