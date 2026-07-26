import designProjects from "@/data/designProjects";

export default function DesignProjects() {
  return (
    <section id="designs">
      <div className="wrap">
        <div className="section-head" data-aos="fade-up">
          <div className="tag">Graphic Design</div>
          <h2>Design Work From Canva</h2>
          <p>
            Public Canva links — see <code className="mono">data/designProjects.js</code> for how to add new pieces.
          </p>
        </div>
        <div className="design-grid" data-aos="fade-up">
          {designProjects.map((d) => (
            <div className="design-card" key={d.title}>
              <div className="design-thumb">
                <img
                  src={d.thumbnail}
                  alt={d.title}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.innerHTML = "🎨";
                  }}
                />
              </div>
              <div className="design-body">
                <div className="cat">{d.category}</div>
                <h4>{d.title}</h4>
                <p>{d.description}</p>
                <a href={d.canvaLink} target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: "8px 18px", fontSize: ".85rem" }}>
                  View on Canva →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
