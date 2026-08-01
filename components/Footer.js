import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <div className="logo-mark">FR</div> <span style={{ color: "#fff", fontWeight: 700 }}>Fajar Rizwan</span>
            </div>
            <p style={{ fontSize: ".88rem" }}>Full-Stack Developer | Agentic AI Engineer | Graphic Designer. Student at Lahore Garrison University.</p>
          </div>
          <div>
            <h4>Navigate</h4>
            <Link href="/about">About</Link>
            <Link href="/experience">Experience</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <h4>Toolkit</h4>
            <span style={{ display: "block", marginBottom: 9, fontSize: ".88rem" }}>Next.js &amp; React</span>
            <span style={{ display: "block", marginBottom: 9, fontSize: ".88rem" }}>FastAPI &amp; Python</span>
            <span style={{ display: "block", marginBottom: 9, fontSize: ".88rem" }}>CrewAI Agents</span>
          </div>
          <div>
            <h4>Connect</h4>
            <a href="https://www.linkedin.com/in/fajar-rizwan-0220aug" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/26FajarRizwan" target="_blank" rel="noreferrer">GitHub</a>
            <a href="mailto:itsfjr20@gmail.com">Email</a>
          </div>
        </div>
        <div className="wrap copyright">
          <span>© {new Date().getFullYear()} Fajar Rizwan. All rights reserved.</span>
          <span className="lic">Code licensed under MIT · Content &amp; design © Fajar Rizwan</span>
        </div>
      </div>
    </footer>
  );
}
