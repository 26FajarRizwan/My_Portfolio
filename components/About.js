"use client";
import { useState } from "react";
import { GraduationCap } from "lucide-react";

const points = [
  "I got into this through C++, data structures, and databases at university — the fundamentals stuck, and I ended up going deeper into full-stack development from there.",
  "Most of my work is building web apps end to end: Next.js and Tailwind on the frontend, FastAPI on the backend, with attention to how the two actually fit together.",
  "More recently I've been building agentic AI systems with CrewAI — automating multi-step workflows instead of writing one-off scripts.",
  "I also design — logos, social content, small brand systems. It changes how I think about interfaces; I notice layout and type choices most engineers skip past.",
  "I like working close to the people using what I build, and I'm always happy to talk through a problem with other developers.",
];

export default function About() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section id="about">
      <div className="wrap">
        <div className="section-head" data-aos="fade-up" data-aos-duration="300">
          <div className="tag">About</div>
          <h2>A bit about how I work</h2>
        </div>
        <div className="about-wrap">
          <div className="about-photo" data-aos="fade-up" data-aos-duration="300">
            {imgOk ? (
              <img src="/profile.jpg" alt="" onError={() => setImgOk(false)} />
            ) : (
              <GraduationCap size={48} strokeWidth={1.2} color="var(--ink-soft)" />
            )}
          </div>
          <div className="about-text" data-aos="fade-up" data-aos-duration="300">
            <ul className="about-points">
              {points.map((text, i) => (
                <li key={i}>
                  <span className="about-point-icon">—</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
