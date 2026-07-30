"use client";
import { useState } from "react";
import { GraduationCap, Wrench, Monitor, Settings, Bot, Blocks, Palette, Cloud, Layers, Code2, PenTool, Users } from "lucide-react";

const points = [
  { Icon: Layers, text: "I architect end-to-end digital solutions that bridge creative design and robust backend engineering." },
  { Icon: Code2, text: "Started with C++, Data Structures and DBMS — then moved into modern full-stack development and Agentic AI." },
  { Icon: Monitor, text: "I build secure, high-performance web apps with Next.js + Tailwind CSS on the frontend and Python FastAPI on the backend." },
  { Icon: Bot, text: "I design autonomous multi-agent systems using CrewAI — intelligent workflows that automate real-world processes." },
  { Icon: PenTool, text: "My graphic design background means I care as much about typography and UI/UX as I do about clean code." },
  { Icon: Users, text: "Always open to connecting with developers and tech enthusiasts about Full-Stack, Agentic AI, or architecture." },
];

export default function About() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section id="about">
      <div className="wrap">
        <div className="section-head" data-aos="fade-up">
          <div className="tag">Introduction</div>
          <h2>The Developer Behind The Code</h2>
          <p>Student at Lahore Garrison University, building at the intersection of full-stack engineering and agentic AI.</p>
        </div>
        <div className="about-wrap">
          <div className="about-photo" data-aos="fade-right">
            {imgOk ? (
              <img src="/profile.jpg" alt="" onError={() => setImgOk(false)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <GraduationCap size={64} strokeWidth={1.2} color="var(--ink-soft)" />
            )}
          </div>
          <div className="about-text" data-aos="fade-left">
            <ul className="about-points">
              {points.map((p, i) => (
                <li key={i}>
                  <span className="about-point-icon"><p.Icon size={18} strokeWidth={1.8} /></span>
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>

            <h4 style={{ display: "flex", alignItems: "center", gap: 8 }}><Wrench size={18} /> Core Toolkit</h4>
            <div className="toolkit-grid">
              <div className="toolkit-item"><Monitor size={16} /> Next.js, React, Tailwind CSS</div>
              <div className="toolkit-item"><Settings size={16} /> Python, FastAPI, REST APIs</div>
              <div className="toolkit-item"><Bot size={16} /> CrewAI, Agentic Automation</div>
              <div className="toolkit-item"><Blocks size={16} /> C++, DSA, DBMS</div>
              <div className="toolkit-item"><Palette size={16} /> UI/UX, Graphic Design</div>
              <div className="toolkit-item"><Cloud size={16} /> Vercel, Firebase</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}