"use client";
import { useEffect, useState } from "react";

const GITHUB_USERNAME = "26FajarRizwan";

export default function Projects() {
  const [repos, setRepos] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
      .then((res) => {
        if (!res.ok) throw new Error("GitHub API error");
        return res.json();
      })
      .then((data) => setRepos(Array.isArray(data) ? data.filter((r) => !r.fork).slice(0, 6) : []))
      .catch(() => setError(true));
  }, []);

  return (
    <section id="projects" style={{ background: "var(--bg-panel)" }}>
      <div className="wrap">
        <div className="section-head" data-aos="fade-up">
          <div className="tag">Projects</div>
          <h2>
            Live From GitHub{" "}
            <span className="badge-live"><span className="pulse-dot" style={{ background: "#15803D" }}></span> auto-synced</span>
          </h2>
          <p>These pull directly from my public GitHub repos — new pushes appear here automatically.</p>
        </div>

        <div className="proj-grid">
          {error && (
            <p style={{ color: "var(--ink-soft)", gridColumn: "1/-1", textAlign: "center" }}>
              Could not load live repos right now — check github.com/{GITHUB_USERNAME} directly.
            </p>
          )}

          {!repos && !error && (
            <>
              <div className="loading-skel"></div>
              <div className="loading-skel"></div>
              <div className="loading-skel"></div>
            </>
          )}

          {repos && repos.length === 0 && (
            <p style={{ color: "var(--ink-soft)", gridColumn: "1/-1", textAlign: "center" }}>
              No public repositories found yet — new pushes will appear here automatically.
            </p>
          )}

          {repos && repos.map((r) => (
            <div className="proj-card" data-aos="fade-up" key={r.id}>
              <h4>{r.name}</h4>
              <p>{r.description || "No description provided yet."}</p>
              <div className="proj-meta">
                <span>⭐ {r.stargazers_count}</span>
                {r.language && <span>● {r.language}</span>}
                <span>Updated {new Date(r.updated_at).toLocaleDateString()}</span>
              </div>
              <a href={r.html_url} target="_blank" rel="noreferrer" className="btn-ghost" style={{ display: "inline-block", marginTop: 16, padding: "8px 18px", fontSize: ".85rem" }}>
                View Repo →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
