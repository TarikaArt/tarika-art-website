"use client";

import Image from "next/image";
import Link from "next/link";

export default function About() {
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
          padding: 160px 48px 80px;
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

        /* ── ABOUT INTRO ── */
        .about-intro {
          max-width: 720px;
          margin: 0 auto;
          padding: 80px 48px;
          text-align: center;
        }
        .about-intro-statement {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          font-weight: 300;
          font-style: italic;
          line-height: 1.65;
          color: var(--cream);
          letter-spacing: 0.02em;
          margin-bottom: 32px;
        }
        .about-intro-statement em {
          color: var(--gold-light);
          font-style: italic;
        }
        .divider {
          display: flex;
          align-items: center;
          gap: 20px;
          margin: 0 auto 80px;
          max-width: 320px;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(184,154,106,0.3), transparent);
        }

        /* ── ABOUT MAIN ── */
        .about-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px 120px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 96px;
          align-items: start;
        }
        .about-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: #111;
        }
        .about-frame {
          position: absolute;
          top: -14px;
          left: -14px;
          right: 14px;
          bottom: 14px;
          border: 1px solid rgba(184,154,106,0.22);
          pointer-events: none;
          z-index: 1;
        }
        .about-text { padding-top: 8px; }
        .section-label {
          font-size: 0.58rem;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 20px;
          display: block;
        }
        .about-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 300;
          line-height: 1.25;
          color: var(--cream);
          margin-bottom: 36px;
          letter-spacing: 0.01em;
        }
        .about-heading em {
          font-style: italic;
          color: var(--gold-light);
        }
        .about-body {
          font-size: 0.85rem;
          line-height: 2.1;
          color: var(--cream-muted);
          letter-spacing: 0.04em;
          margin-bottom: 28px;
        }

        /* ── STATEMENT SECTION ── */
        .statement-section {
          background: #080808;
          border-top: 1px solid rgba(184,154,106,0.08);
          border-bottom: 1px solid rgba(184,154,106,0.08);
          padding: 100px 48px;
        }
        .statement-inner {
          max-width: 860px;
          margin: 0 auto;
          text-align: center;
        }
        .statement-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 3vw, 2.6rem);
          font-weight: 300;
          font-style: italic;
          line-height: 1.6;
          color: var(--cream);
          letter-spacing: 0.02em;
          margin-bottom: 40px;
          position: relative;
        }
        .statement-quote::before {
          content: '\\201C';
          position: absolute;
          top: -0.4em;
          left: -0.3em;
          font-size: 4em;
          color: rgba(184,154,106,0.12);
          font-family: 'Cormorant Garamond', serif;
          line-height: 1;
        }
        .statement-attr {
          font-size: 0.6rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(184,154,106,0.55);
        }

        /* ── VALUES ── */
        .values-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 100px 48px;
        }
        .values-header {
          text-align: center;
          margin-bottom: 72px;
        }
        .values-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 300;
          color: var(--cream);
          letter-spacing: 0.02em;
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }
        .value-item {
          padding: 56px 40px;
          border: 1px solid rgba(184,154,106,0.08);
          text-align: center;
          transition: border-color 0.4s ease, background 0.4s ease;
        }
        .value-item:hover {
          border-color: rgba(184,154,106,0.22);
          background: rgba(184,154,106,0.03);
        }
        .value-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 300;
          font-style: italic;
          color: rgba(184,154,106,0.2);
          line-height: 1;
          margin-bottom: 24px;
        }
        .value-name {
          font-size: 0.62rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 16px;
        }
        .value-desc {
          font-size: 0.82rem;
          line-height: 1.9;
          color: rgba(214,207,196,0.6);
          letter-spacing: 0.03em;
        }

        /* ── CTA ── */
        .about-cta {
          text-align: center;
          padding: 80px 48px 120px;
          border-top: 1px solid rgba(184,154,106,0.08);
        }
        .about-cta p {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.2rem, 2vw, 1.6rem);
          font-weight: 300;
          font-style: italic;
          color: var(--cream-muted);
          margin-bottom: 40px;
          letter-spacing: 0.03em;
        }
        .btn-outline {
          font-size: 0.68rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 15px 44px;
          border: 1px solid rgba(184,154,106,0.45);
          color: var(--cream);
          text-decoration: none;
          transition: border-color 0.35s ease, color 0.35s ease;
          display: inline-block;
        }
        .btn-outline:hover {
          border-color: var(--gold);
          color: var(--gold-light);
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
          .about-intro { padding: 60px 24px; }
          .about-main {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 0 24px 80px;
          }
          .statement-section { padding: 72px 24px; }
          .values-section { padding: 72px 24px; }
          .values-grid { grid-template-columns: 1fr; }
          .about-cta { padding: 60px 24px 80px; }
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
                <Link href={href} className={label === "About" ? "active" : ""}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main>
        <div className="page-header">
          <div className="page-header-bg" />
          <p className="page-label">The Artist</p>
          <h1 className="page-title">Tarika<br /><em>Campbell</em></h1>
          <div className="header-rule" />
        </div>

        <div className="about-intro">
          <p className="about-intro-statement">
            "I create because I have to. Because identity deserves to be seen,<br />
            and <em>emotion</em> deserves to take up space."
          </p>
          <div className="divider">
            <div className="divider-line" />
            <span style={{ color: "var(--gold)", fontSize: "0.75rem" }}>✦</span>
            <div className="divider-line" />
          </div>
        </div>

        <div className="about-main">
          <div style={{ position: "relative" }}>
            <div className="about-img-wrap">
              <Image
                src="/tarika-portrait1.jpg"
                alt="Tarika Campbell"
                fill
                style={{ objectFit: "contain", objectPosition: "center" }}
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="about-frame" />
          </div>

          <div className="about-text">
            <span className="section-label">Background</span>
            <h2 className="about-heading">
              A practice rooted in<br /><em>presence and identity</em>
            </h2>
            <p className="about-body">
              Tarika Campbell is a Washington, D.C.-based visual artist working across portraiture, mixed media, and abstract influence. Her work centers on the interior life — the quiet tension between who we are and how we are seen.
            </p>
            <p className="about-body">
              Drawing from contemporary interiors, personal memory, and cultural identity, Tarika builds compositions that are visually striking and emotionally resonant. Each piece is layered — in texture, in meaning, and in the stories it holds.
            </p>
            <p className="about-body">
              Her practice is an ongoing conversation about connection: between subject and viewer, between form and feeling, between the seen and the unseen.
            </p>
          </div>
        </div>

        <div className="statement-section">
          <div className="statement-inner">
            <span className="section-label" style={{ display: "block", marginBottom: "48px" }}>Artist Statement</span>
            <p className="statement-quote">
              My work is not about perfection — it is about presence. I want every piece to hold weight, to carry the texture of something real. Identity. Emotion. Connection. These are not themes. They are the work.
            </p>
            <p className="statement-attr">— Tarika Campbell</p>
          </div>
        </div>

        <div className="values-section">
          <div className="values-header">
            <span className="section-label">What drives the work</span>
            <h2 className="values-title">The Practice</h2>
          </div>
          <div className="values-grid">
            {[
              { n: "I", name: "Identity", desc: "Exploring who we are beyond the surface — the layered, complex, beautiful truth of self." },
              { n: "II", name: "Emotion", desc: "Creating space for feeling. Every brushstroke, every layer, carries emotional weight and intention." },
              { n: "III", name: "Connection", desc: "Art as a bridge — between artist and viewer, between the personal and the universal." },
            ].map(({ n, name, desc }) => (
              <div className="value-item" key={name}>
                <p className="value-number">{n}</p>
                <p className="value-name">{name}</p>
                <p className="value-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-cta">
          <p>Interested in working together?</p>
          <Link href="/contact" className="btn-outline">Get In Touch</Link>
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
