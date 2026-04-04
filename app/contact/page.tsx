"use client";

import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Tenor+Sans&display=swap');

        :root {
          --black: #0a0a0a;
          --cream: #f0ebe3;
          --cream-muted: #d6cfc4;
          --gold: #b89a6a;
          --gold-light: #d4b98a;
          --white: #faf8f5;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        body {
          background: var(--black);
          color: var(--cream);
          font-family: 'Tenor Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        /* ── NAV ── */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          background: rgba(10,10,10,0.88);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(184,154,106,0.12);
        }
        .nav-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 24px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          color: var(--cream);
          text-transform: uppercase;
          text-decoration: none;
        }
        .nav-links {
          display: flex;
          gap: 48px;
          list-style: none;
        }
        .nav-links a {
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--cream-muted);
          text-decoration: none;
          position: relative;
          transition: color 0.3s ease;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 1px;
          background: var(--gold);
          transition: width 0.4s ease;
        }
        .nav-links a:hover { color: var(--cream); }
        .nav-links a:hover::after { width: 100%; }
        .nav-links a.active { color: var(--gold); }
        .nav-links a.active::after { width: 100%; }

        /* ── PAGE HEADER ── */
        .page-header {
          padding: 160px 48px 72px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .page-header-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(184,154,106,0.06) 0%, transparent 70%);
        }
        .page-label {
          font-size: 0.6rem;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: rgba(184,154,106,0.65);
          margin-bottom: 20px;
        }
        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.5rem, 8vw, 7rem);
          font-weight: 300;
          line-height: 0.95;
          color: var(--cream);
          letter-spacing: -0.01em;
        }
        .page-title em {
          font-style: italic;
          color: var(--gold-light);
        }
        .header-rule {
          width: 1px;
          height: 56px;
          background: linear-gradient(to bottom, transparent, var(--gold), transparent);
          margin: 40px auto 0;
          opacity: 0.45;
        }

        /* ── CONTACT LAYOUT ── */
        .contact-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 48px 120px;
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 96px;
          align-items: start;
        }

        /* Left info panel */
        .contact-info {}
        .section-label {
          font-size: 0.58rem;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 20px;
          display: block;
        }
        .contact-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 300;
          line-height: 1.3;
          color: var(--cream);
          margin-bottom: 32px;
          letter-spacing: 0.01em;
        }
        .contact-heading em {
          font-style: italic;
          color: var(--gold-light);
        }
        .contact-body {
          font-size: 0.83rem;
          line-height: 2;
          color: var(--cream-muted);
          letter-spacing: 0.04em;
          margin-bottom: 56px;
        }

        .contact-details { display: flex; flex-direction: column; gap: 32px; }
        .contact-detail-item {}
        .detail-label {
          font-size: 0.55rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(184,154,106,0.55);
          margin-bottom: 8px;
        }
        .detail-value {
          font-size: 0.85rem;
          letter-spacing: 0.04em;
          color: var(--cream-muted);
          text-decoration: none;
          transition: color 0.3s ease;
          display: block;
        }
        a.detail-value:hover { color: var(--gold-light); }

        .detail-divider {
          width: 32px;
          height: 1px;
          background: rgba(184,154,106,0.25);
          margin-top: 32px;
        }

        /* Right form */
        .contact-form { display: flex; flex-direction: column; gap: 0; }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          margin-bottom: 2px;
        }
        .form-field label {
          font-size: 0.55rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(184,154,106,0.55);
          padding: 16px 20px 0;
          background: #111;
        }
        .form-field input,
        .form-field select,
        .form-field textarea {
          background: #111;
          border: none;
          outline: none;
          color: var(--cream);
          font-family: 'Tenor Sans', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.03em;
          padding: 10px 20px 16px;
          width: 100%;
          transition: background 0.3s ease;
          -webkit-appearance: none;
          appearance: none;
        }
        .form-field select {
          cursor: pointer;
        }
        .form-field input::placeholder,
        .form-field textarea::placeholder {
          color: rgba(214,207,196,0.22);
        }
        .form-field input:focus,
        .form-field select:focus,
        .form-field textarea:focus {
          background: #161616;
          outline: none;
        }
        .form-field textarea {
          resize: none;
          height: 160px;
        }
        .form-field-full { grid-column: span 2; }

        .form-submit {
          margin-top: 2px;
          background: var(--gold);
          color: var(--black);
          border: none;
          font-family: 'Tenor Sans', sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          padding: 20px 48px;
          cursor: pointer;
          width: 100%;
          transition: background 0.35s ease, transform 0.3s ease;
        }
        .form-submit:hover {
          background: var(--gold-light);
          transform: translateY(-1px);
        }

        /* Confirmation */
        .form-confirm {
          padding: 80px 40px;
          background: #111;
          text-align: center;
        }
        .confirm-mark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-style: italic;
          color: var(--gold);
          margin-bottom: 24px;
        }
        .confirm-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 300;
          color: var(--cream);
          margin-bottom: 16px;
        }
        .confirm-body {
          font-size: 0.82rem;
          line-height: 1.9;
          color: var(--cream-muted);
          letter-spacing: 0.04em;
        }

        /* ── FOOTER ── */
        footer {
          border-top: 1px solid rgba(184,154,106,0.12);
          padding: 48px;
        }
        .footer-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
        }
        .footer-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--cream-muted);
          text-decoration: none;
        }
        .footer-copy {
          font-size: 0.62rem;
          letter-spacing: 0.15em;
          color: rgba(214,207,196,0.4);
        }
        .footer-socials {
          display: flex;
          gap: 28px;
        }
        .footer-socials a {
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(214,207,196,0.45);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer-socials a:hover { color: var(--gold); }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .nav-inner { padding: 20px 24px; }
          .nav-links { display: none; }
          .page-header { padding: 130px 24px 60px; }
          .contact-wrap {
            grid-template-columns: 1fr;
            gap: 56px;
            padding: 60px 24px 80px;
          }
          .form-row { grid-template-columns: 1fr; }
          .form-field-full { grid-column: span 1; }
          footer { padding: 36px 24px; }
          .footer-inner { flex-direction: column; align-items: flex-start; gap: 16px; }
        }
      `}</style>

      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">Tarika Art</Link>
          <ul className="nav-links">
            {[["Home", "/"], ["Portfolio", "/portfolio"], ["About", "/about"], ["Contact", "/contact"]].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className={label === "Contact" ? "active" : ""}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main>
        <div className="page-header">
          <div className="page-header-bg" />
          <p className="page-label">Let&apos;s Connect</p>
          <h1 className="page-title">Get In<br /><em>Touch</em></h1>
          <div className="header-rule" />
        </div>

        <div className="contact-wrap">
          <div className="contact-info">
            <span className="section-label">Contact</span>
            <h2 className="contact-heading">
              Commission a piece.<br />Start a <em>conversation.</em>
            </h2>
            <p className="contact-body">
              Whether you are interested in a custom commission, have a question about an existing piece, or simply want to connect — this is the place. Every message is read personally.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <p className="detail-label">Email</p>
                <a href="mailto:hello@tarikaart.com" className="detail-value">hello@tarikaart.com</a>
              </div>
              <div className="contact-detail-item">
                <p className="detail-label">Instagram</p>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="detail-value">@tarikaart</a>
              </div>
              <div className="contact-detail-item">
                <p className="detail-label">Location</p>
                <span className="detail-value">Washington, D.C.</span>
              </div>
              <div className="detail-divider" />
              <div className="contact-detail-item">
                <p className="detail-label">Response time</p>
                <span className="detail-value">Within 2–3 business days</span>
              </div>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="form-confirm">
                <p className="confirm-mark">✦</p>
                <h3 className="confirm-heading">Message received.</h3>
                <p className="confirm-body">Thank you for reaching out. I&apos;ll be in touch within 2–3 business days.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-field form-field-full">
                  <label htmlFor="subject">Inquiry Type</label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select one</option>
                    <option value="commission">Commission inquiry</option>
                    <option value="purchase">Purchase existing work</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="press">Press / feature</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-field form-field-full">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project, timeline, or any questions you have..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="form-submit">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer>
        <div className="footer-inner">
          <Link href="/" className="footer-logo">Tarika Art</Link>
          <span className="footer-copy">© {new Date().getFullYear()} Tarika Art. All rights reserved.</span>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Pinterest</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Behance</a>
          </div>
        </div>
      </footer>
    </>
  );
}
