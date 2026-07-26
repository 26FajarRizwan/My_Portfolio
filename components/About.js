"use client";
import { useState } from "react";

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
              <span style={{ fontSize: "6rem" }}>🎓</span>
            )}
          </div>
          <div className="about-text" data-aos="fade-left">
            <p>I don&apos;t just write code; I architect end-to-end digital solutions that bridge the gap between creative design and robust backend engineering.</p>
            <p>Currently pursuing my degree at Lahore Garrison University, my tech journey started with the fundamentals of C++, Data Structures and DBMS. However, my curiosity quickly drove me into the world of modern full-stack development and Agentic AI.</p>
            <p>Today, I build secure, high-performance web applications using Next.js and Tailwind CSS on the frontend, powered by lightning-fast Python FastAPI pipelines on the backend — complete with custom JSON file-system storage and protected client-side authentication loops.</p>
            <p>Beyond traditional development, I am heavily invested in the future of AI. I design autonomous multi-agent systems using CrewAI — intelligent workflows that automate complex processes. Whether it&apos;s coding a production-ready enterprise portal from scratch or utilizing smart automation, I focus on building things that actually deliver value.</p>
            <p>My background as a graphic designer gives me a unique edge: I don&apos;t just understand data streams and API routing — I also care deeply about typography, intuitive UI layouts, and seamless user experiences.</p>
            <p>I am always open to connecting with fellow developers, tech enthusiasts and creators. Let&apos;s connect and talk about Full-Stack, Agentic AI, or software architecture! 🚀</p>

            <h4>🛠️ Core Toolkit</h4>
            <div className="toolkit-grid">
              <div className="toolkit-item">🖥️ Next.js, React, Tailwind CSS</div>
              <div className="toolkit-item">⚙️ Python, FastAPI, REST APIs</div>
              <div className="toolkit-item">🤖 CrewAI, Agentic Automation</div>
              <div className="toolkit-item">🧱 C++, DSA, DBMS</div>
              <div className="toolkit-item">🎨 UI/UX, Graphic Design</div>
              <div className="toolkit-item">☁️ Vercel, Supabase</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
