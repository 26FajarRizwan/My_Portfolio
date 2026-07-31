import { Linkedin, Github, Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="contact-card" data-aos="fade-up" data-aos-duration="300">
          <div>
            <h2>Let&apos;s talk.</h2>
            <p>Open to full-stack, agentic AI, and design work. I usually reply within a day.</p>
            <div className="hero-btns">
              <a href="mailto:itsfjr20@gmail.com" className="btn-primary">Email me</a>
            </div>
          </div>
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/fajar-rizwan-0220aug" target="_blank" rel="noreferrer"><Linkedin size={16} /> linkedin.com/in/fajar-rizwan-0220aug</a>
            <a href="https://github.com/26FajarRizwan" target="_blank" rel="noreferrer"><Github size={16} /> github.com/26FajarRizwan</a>
            <a href="mailto:itsfjr20@gmail.com"><Mail size={16} /> itsfjr20@gmail.com</a>
            <a href="tel:03210808786"><Phone size={16} /> 0321-0808786</a>
          </div>
        </div>
      </div>
    </section>
  );
}
