import { Linkedin, Github, Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="contact-card" data-aos="zoom-in">
          <div>
            <h2>Let&apos;s build something great.</h2>
            <p>Open to full-stack, agentic AI, and design collaborations. Reach out anytime — I usually reply within a day.</p>
            <div className="hero-btns">
              <a href="mailto:itsfjr20@gmail.com" className="btn-primary" style={{ background: "#fff", color: "var(--primary)" }}>
                Email Me
              </a>
            </div>
          </div>
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/fajar-rizwan-0220aug" target="_blank" rel="noreferrer"><Linkedin size={18} /> linkedin.com/in/fajar-rizwan-0220aug</a>
            <a href="https://github.com/26FajarRizwan" target="_blank" rel="noreferrer"><Github size={18} /> github.com/26FajarRizwan</a>
            <a href="mailto:itsfjr20@gmail.com"><Mail size={18} /> itsfjr20@gmail.com</a>
            <a href="tel:03210808786"><Phone size={18} /> 0321-0808786</a>
          </div>
        </div>
      </div>
    </section>
  );
}
