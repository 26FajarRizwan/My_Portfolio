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
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h4>Toolkit</h4>
            <a href="#">Next.js &amp; React</a>
            <a href="#">FastAPI &amp; Python</a>
            <a href="#">CrewAI Agents</a>
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
