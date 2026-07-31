"use client";
import { useEffect, useState } from "react";

const GITHUB_USERNAME = "26FajarRizwan";

export default function Projects() {
  const [repos, setRepos] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
      .then(async (res) => {
        if (res.status === 403) {
          const remaining = res.headers.get("x-ratelimit-remaining");
          throw new Error(
            remaining === "0"
              ? "GitHub API rate limit reached for this network (60 requests/hour without login). Try again later, or from a different network."
              : "GitHub API blocked the request (403)."
          );
        }
        if (res.status === 404) {
          throw new Error(`GitHub user "${GITHUB_USERNAME}" not found — check the username is correct.`);
        }
        if (!res.ok) throw new Error(`GitHub API returned status ${res.status}.`);
        return res.json();
      })
      .then((data) => setRepos(Array.isArray(data) ? data.filter((r) => !r.fork).slice(0, 6) : []))
      .catch((err) => {
        console.error("GitHub fetch failed:", err.message);
        setErrorMsg(err.message);
      });
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
          {errorMsg && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", color: "var(--ink-soft)" }}>
              <p>Could not load live repos right now.</p>
              <p style={{ fontSize: ".82rem", marginTop: 6 }}>{errorMsg}</p>
              <p style={{ fontSize: ".82rem", marginTop: 6 }}>
                Check <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" style={{ color: "var(--deep)", fontWeight: 600 }}>github.com/{GITHUB_USERNAME}</a> directly.
              </p>
            </div>
          )}

          {!repos && !errorMsg && (
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
