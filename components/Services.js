const panels = [
  { icon: "🖥️", title: "Full-Stack Web Apps", desc: "High-performance apps with Next.js + Tailwind on the frontend and Python FastAPI pipelines on the backend, with secure auth and clean data flows.", tags: ["Next.js", "FastAPI", "Tailwind"] },
  { icon: "🤖", title: "Agentic AI Systems", desc: "Autonomous multi-agent workflows built with CrewAI and no-code orchestration (n8n) that bridge LLMs with real-world execution.", tags: ["CrewAI", "RAG", "n8n"] },
  { icon: "🎨", title: "UI/UX & Graphic Design", desc: "Typography-driven, intuitive interfaces and brand visuals — because good engineering and good design should never be separated.", tags: ["Figma", "Canva", "UI/UX"] },
];

export default function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <div className="section-head" data-aos="fade-up">
          <div className="tag">What I Do</div>
          <h2>Three Ways I Deliver Value</h2>
          <p>From pixel to pipeline to autonomous agent — a complete build, end to end.</p>
        </div>
        <div className="panel3">
          {panels.map((p, i) => (
            <div className="panel-card" data-aos="fade-up" data-aos-delay={i * 100} key={p.title}>
              <div className="panel-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="panel-tags">
                {p.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
