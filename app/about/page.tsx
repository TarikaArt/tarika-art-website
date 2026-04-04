"use client";

import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Tenor+Sans&display=swap');

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

        /* ── ANIMATIONS ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .anim-fade-up {
          animation: fadeUp 1.1s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .anim-fade-in {
          animation: fadeIn 1.4s ease both;
        }
        .delay-1 { animation-delay: 0.15s; }
        .delay-2 { animation-delay: 0.35s; }
        .delay-3 { animation-delay: 0.55s; }
        .delay-4 { animation-delay: 0.75s; }
        .delay-5 { animation-delay: 0.95s; }

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
          padding: 168px 48px 96px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .page-header-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(184,154,106,0.05) 0%, transparent 70%);
        }
        .page-label {
          font-size: 0.58rem;
          letter-spacing: 0.48em;
          text-transform: uppercase;
          color: rgba(184,154,106,0.6);
          margin-bottom: 28px;
        }
        /* Name block */
        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.8rem, 8.5vw, 7.5rem);
          font-weight: 300;
          line-height: 1.02;
          color: var(--cream);
          letter-spacing: 0;
        }
        /* "Tarika" — upright, widely tracked: editorial, grounded, intentional */
        .page-title-first {
          display: block;
          font-weight: 400;
          letter-spacing: 0.18em;
          color: var(--cream);
          margin-bottom: 0.1em;
        }
        /* "Campbell" — italic, moderate tracking: personal, expressive, warm */
        .page-title-last {
          display: block;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.07em;
          color: var(--gold-light);
        }
        .header-rule {
          width: 1px;
          height: 64px;
          background: linear-gradient(to bottom, transparent, rgba(184,154,106,0.5), transparent);
          margin: 48px auto 0;
        }

        /* ── ABOUT INTRO ── */
        .about-intro {
          max-width: 680px;
          margin: 0 auto;
          padding: 88px 48px 96px;
          text-align: center;
        }
        .about-intro-statement {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.35rem, 2.4vw, 1.9rem);
          font-weight: 300;
          font-style: italic;
          line-height: 1.75;
          color: rgba(240,235,227,0.88);
          letter-spacing: 0.02em;
          margin-bottom: 40px;
        }
        .about-intro-statement em {
          color: var(--gold-light);
          font-style: italic;
        }
        .divider {
          display: flex;
          align-items: center;
          gap: 20px;
          margin: 0 auto;
          max-width: 280px;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(184,154,106,0.28), transparent);
        }

        /* ── ABOUT MAIN ── */
        .about-main {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 48px 140px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: start;
        }

        /* Portrait column */
        .about-portrait-col {
          position: relative;
          /* Enough padding to let the frame extend beyond without clipping */
          padding-bottom: 20px;
          padding-right: 20px;
        }
        .about-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
          overflow: hidden;
          /* Match page background exactly — no gray gap around contained portrait */
          background: var(--black);
        }
        /* Gold frame: intentionally offset bottom-right — classic editorial framing */
        .about-frame {
          position: absolute;
          top: 20px;
          left: 20px;
          right: -20px;
          bottom: -20px;
          border: 1px solid rgba(184,154,106,0.3);
          pointer-events: none;
        }

        /* Text column */
        .about-text { padding-top: 6px; }
        .section-label {
          font-size: 0.56rem;
          letter-spacing: 0.46em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 22px;
          display: block;
        }
        .about-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.9rem, 3.2vw, 2.7rem);
          font-weight: 300;
          line-height: 1.3;
          color: var(--cream);
          margin-bottom: 40px;
          letter-spacing: 0.01em;
        }
        .about-heading em {
          font-style: italic;
          color: var(--gold-light);
        }
        .about-body {
          font-size: 0.875rem;
          line-height: 1.85;
          color: rgba(214,207,196,0.78);
          letter-spacing: 0.035em;
          margin-bottom: 26px;
          max-width: 52ch;
        }
        .about-body:last-child { margin-bottom: 0; }

        /* ── STATEMENT SECTION ── */
        .statement-section {
          background: #070707;
          border-top: 1px solid rgba(184,154,106,0.08);
          border-bottom: 1px solid rgba(184,154,106,0.08);
          padding: 136px 48px 128px;
        }
        .statement-inner {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        .statement-top-rule {
          width: 32px;
          height: 1px;
          background: rgba(184,154,106,0.35);
          margin: 0 auto 52px;
        }
        .statement-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.65rem, 3.2vw, 2.75rem);
          font-weight: 300;
          font-style: italic;
          line-height: 1.72;
          color: rgba(240,235,227,0.88);
          letter-spacing: 0.025em;
          margin-bottom: 52px;
          position: relative;
        }
        .statement-quote::before {
          content: '\\201C';
          position: absolute;
          top: -0.35em;
          left: -0.25em;
          font-size: 4.5em;
          color: rgba(184,154,106,0.1);
          font-family: 'Cormorant Garamond', serif;
          line-height: 1;
        }
        .statement-bottom-rule {
          width: 32px;
          height: 1px;
          background: rgba(184,154,106,0.35);
          margin: 0 auto 28px;
        }
        .statement-attr {
          font-size: 0.58rem;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: rgba(184,154,106,0.5);
        }

        /* ── VALUES ── */
        .values-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 120px 48px 128px;
        }
        .values-header {
          text-align: center;
          margin-bottom: 80px;
        }
        .values-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 300;
          color: var(--cream);
          letter-spacing: 0.02em;
          margin-top: 14px;
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }
        .value-item {
          padding: 60px 44px;
          border: 1px solid rgba(184,154,106,0.08);
          text-align: center;
          transition: border-color 0.45s ease, background 0.45s ease;
        }
        .value-item:hover {
          border-color: rgba(184,154,106,0.24);
          background: rgba(184,154,106,0.025);
        }
        .value-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.2rem;
          font-weight: 300;
          font-style: italic;
          color: rgba(184,154,106,0.18);
          line-height: 1;
          margin-bottom: 28px;
        }
        .value-name {
          font-size: 0.6rem;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 18px;
        }
        .value-desc {
          font-size: 0.82rem;
          line-height: 1.85;
          color: rgba(214,207,196,0.55);
          letter-spacing: 0.03em;
        }

        /* ── CTA ── */
        .about-cta {
          text-align: center;
          padding: 96px 48px 136px;
          border-top: 1px solid rgba(184,154,106,0.08);
        }
        .about-cta p {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.2rem, 2vw, 1.65rem);
          font-weight: 300;
          font-style: italic;
          color: rgba(214,207,196,0.7);
          margin-bottom: 44px;
          letter-spacing: 0.03em;
        }
        .btn-outline {
          font-size: 0.66rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          padding: 16px 48px;
          border: 1px solid rgba(184,154,106,0.4);
          color: var(--cream);
          text-decoration: none;
          transition: border-color 0.4s ease, color 0.4s ease;
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
          .page-header { padding: 136px 24px 72px; }
          .about-intro { padding: 64px 24px 72px; }
          .about-main {
            grid-template-columns: 1fr;
            gap: 56px;
            padding: 0 24px 96px;
          }
          .about-portrait-col { padding-right: 20px; padding-bottom: 20px; }
          .statement-section { padding: 96px 24px 88px; }
          .values-section { padding: 88px 24px 96px; }
          .values-grid { grid-template-columns: 1fr; }
          .about-cta { padding: 72px 24px 96px; }
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
        {/* ── HERO ── */}
        <div className="page-header">
          <div className="page-header-bg" />
          <p className="page-label anim-fade-up delay-1">The Artist</p>
          <h1 className="page-title anim-fade-up delay-2">
            <span className="page-title-first">Tarika</span>
            <span className="page-title-last">Campbell</span>
          </h1>
          <div className="header-rule anim-fade-in delay-3" />
        </div>

        {/* ── INTRO QUOTE ── */}
        <div className="about-intro">
          <p className="about-intro-statement anim-fade-up delay-2">
            "I create because I have to. Because identity deserves to be seen,<br />
            and <em>emotion</em> deserves to take up space."
          </p>
          <div className="divider anim-fade-in delay-3">
            <div className="divider-line" />
            <span style={{ color: "var(--gold)", fontSize: "0.7rem", opacity: 0.7 }}>✦</span>
            <div className="divider-line" />
          </div>
        </div>

        {/* ── PORTRAIT + BIO ── */}
        <div className="about-main">
          <div className="about-portrait-col anim-fade-in delay-2">
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

          <div className="about-text anim-fade-up delay-3">
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

        {/* ── ARTIST STATEMENT ── */}
        <div className="statement-section">
          <div className="statement-inner">
            <span className="section-label anim-fade-up delay-1" style={{ display: "block", marginBottom: "0" }}>Artist Statement</span>
            <div className="statement-top-rule anim-fade-in delay-2" style={{ marginTop: "28px" }} />
            <p className="statement-quote anim-fade-up delay-2">
              My work is not about perfection — it is about presence. I want every piece to hold weight, to carry the texture of something real. Identity. Emotion. Connection. These are not themes. They are the work.
            </p>
            <div className="statement-bottom-rule anim-fade-in delay-3" />
            <p className="statement-attr anim-fade-up delay-3">— Tarika Campbell</p>
          </div>
        </div>

        {/* ── THE PRACTICE ── */}
        <div className="values-section">
          <div className="values-header">
            <span className="section-label">What drives the work</span>
            <h2 className="values-title">The Practice</h2>
          </div>
          <div className="values-grid">
            {[
              { n: "I",   name: "Identity",   desc: "Exploring who we are beyond the surface — the layered, complex, beautiful truth of self." },
              { n: "II",  name: "Emotion",    desc: "Creating space for feeling. Every brushstroke, every layer, carries emotional weight and intention." },
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

        {/* ── CTA ── */}
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
