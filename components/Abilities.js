"use client";
import { useEffect, useRef } from "react";

const skills = [
  { icon: "🖥️", name: "Frontend (Next.js / React)", w: 92 },
  { icon: "⚙️", name: "Backend (Python / FastAPI)", w: 88 },
  { icon: "🤖", name: "Agentic AI (CrewAI / n8n)", w: 85 },
  { icon: "🎨", name: "Graphic Design (Figma / Canva)", w: 80 },
  { icon: "🧱", name: "Foundations (C++ / DSA / DBMS)", w: 83 },
];

export default function Abilities() {
  const canvasRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    let chartInstance;
    let cancelled = false;
    import("chart.js/auto").then(({ default: Chart }) => {
      if (cancelled || !canvasRef.current) return;
      const existing = Chart.getChart(canvasRef.current);
      if (existing) existing.destroy();
      chartInstance = new Chart(canvasRef.current, {
        type: "radar",
        data: {
          labels: ["Frontend", "Backend", "Agentic AI", "Design", "DSA/DBMS", "DevOps"],
          datasets: [
            {
              label: "Skill Level",
              data: [92, 88, 85, 80, 83, 75],
              backgroundColor: "rgba(37,99,235,0.18)",
              borderColor: "#2563EB",
              borderWidth: 2,
              pointBackgroundColor: "#1D4ED8",
              pointRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: 100,
              grid: { color: "#E4E9FB" },
              angleLines: { color: "#E4E9FB" },
              pointLabels: { font: { size: 12, weight: "600" } },
              ticks: { display: false },
            },
          },
          plugins: { legend: { display: false } },
        },
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.width = e.target.dataset.w + "%";
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    barsRef.current.forEach((b) => b && observer.observe(b));

    return () => {
      cancelled = true;
      if (chartInstance) chartInstance.destroy();
    };
  }, []);

  return (
    <section id="abilities" style={{ background: "var(--bg-panel)" }}>
      <div className="wrap">
        <div className="section-head" data-aos="fade-up">
          <div className="tag">Abilities</div>
          <h2>What This Portfolio &amp; I Can Do</h2>
          <p>A quick figure of my core technical strengths, visualized.</p>
        </div>
        <div className="abilities-grid">
          <div className="chart-card" data-aos="fade-right">
            <canvas ref={canvasRef} height={280}></canvas>
          </div>
          <div className="ability-list" data-aos="fade-left">
            {skills.map((s, i) => (
              <div className="ability-row" key={s.name}>
                <div className="ability-icon">{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <div className="ability-name">{s.name}</div>
                  <div className="ability-bar-bg">
                    <div
                      className="ability-bar-fill"
                      data-w={s.w}
                      ref={(el) => (barsRef.current[i] = el)}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
