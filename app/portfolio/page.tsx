"use client";

import Image from "next/image";
import Link from "next/link";

const pieces = [
  { id: 1, src: "/goldroots.jpg",    title: "Gold Roots",     medium: "Oil on Canvas",  year: "2025", size: "24 × 30 in" },
  { id: 2, src: "/harmony.jpg",      title: "Harmony",        medium: "Mixed Media",    year: "2024", size: "18 × 24 in" },
  { id: 3, src: "/peace-pyrite.jpg", title: "Peace & Pyrite", medium: "Oil on Canvas",  year: "2024", size: "20 × 28 in" },
  { id: 4, src: "/art1.jpg",         title: "Reverie I",      medium: "Mixed Media",    year: "2024", size: "16 × 20 in" },
  { id: 5, src: "/art2.jpg",         title: "Dissolution",    medium: "Portraiture",    year: "2024", size: "24 × 36 in" },
  { id: 6, src: "/art3.jpg",         title: "Golden Bloom",   medium: "Mixed Media",    year: "2023", size: "18 × 18 in" },
];

export default function Portfolio() {
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

        /* ── GALLERY ── */
        .gallery-wrap {
          max-width: 1400px;
          margin: 0 auto;
          padding: 80px 48px 120px;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }

        /* Each cell */
        .gallery-item {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          background: #0e0e0e;
          aspect-ratio: 4/5;
        }
        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.6s ease;
          filter: saturate(0.8) brightness(0.88);
        }
        .gallery-item:hover .gallery-img {
          transform: scale(1.05);
          filter: saturate(1) brightness(0.65);
        }
        .gallery-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 32px;
          background: linear-gradient(
            to top,
            rgba(10,10,10,0.88) 0%,
            rgba(10,10,10,0.12) 40%,
            transparent 65%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .gallery-item:hover .gallery-overlay { opacity: 1; }
        .overlay-medium {
          font-size: 0.55rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 8px;
        }
        .overlay-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.45rem;
          font-weight: 300;
          font-style: italic;
          color: var(--white);
          letter-spacing: 0.03em;
          line-height: 1.2;
          margin-bottom: 6px;
        }
        .overlay-meta {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .overlay-year {
          font-size: 0.55rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(240,235,227,0.38);
        }
        .overlay-size {
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          color: rgba(240,235,227,0.28);
        }

        /* Commission strip */
        .commission-strip {
          background: #080808;
          border-top: 1px solid rgba(184,154,106,0.08);
          border-bottom: 1px solid rgba(184,154,106,0.08);
          padding: 80px 48px;
          text-align: center;
        }
        .commission-strip p.pre {
          font-size: 0.6rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(184,154,106,0.55);
          margin-bottom: 24px;
        }
        .commission-strip h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 300;
          font-style: italic;
          color: var(--cream);
          margin-bottom: 40px;
          letter-spacing: 0.02em;
        }
        .btn-primary {
          font-size: 0.68rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 16px 44px;
          background: var(--gold);
          color: var(--black);
          text-decoration: none;
          display: inline-block;
          transition: background 0.35s ease, transform 0.3s ease, box-shadow 0.35s ease;
        }
        .btn-primary:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(184,154,106,0.22);
        }

        /* ── TOP CTA STRIP ── */
        .top-cta-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 48px 56px;
          gap: 24px;
        }
        .top-cta-text {
          font-size: 0.7rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(214,207,196,0.45);
        }
        .btn-outline-sm {
          font-size: 0.64rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          padding: 12px 36px;
          border: 1px solid rgba(184,154,106,0.38);
          color: var(--cream);
          text-decoration: none;
          display: inline-block;
          white-space: nowrap;
          transition: border-color 0.35s ease, color 0.35s ease;
          flex-shrink: 0;
        }
        .btn-outline-sm:hover {
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
        @media (max-width: 1024px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .nav-inner { padding: 20px 24px; }
          .nav-links { display: none; }
          .page-header { padding: 130px 24px 60px; }
          .top-cta-strip { padding: 0 24px 40px; flex-direction: column; align-items: flex-start; }
          .gallery-wrap { padding: 60px 24px 80px; }
          .gallery-grid { grid-template-columns: 1fr; }
          .gallery-item { aspect-ratio: 4/5; }
          .gallery-overlay { opacity: 1; }
          .commission-strip { padding: 60px 24px; }
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
                <Link href={href} className={label === "Portfolio" ? "active" : ""}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main>
        <div className="page-header">
          <div className="page-header-bg" />
          <p className="page-label">Selected Works</p>
          <h1 className="page-title">The<br /><em>Portfolio</em></h1>
          <div className="header-rule" />
        </div>

        <div className="top-cta-strip">
          <p className="top-cta-text">Available for commission</p>
          <a
            href="https://forms.gle/EVYZKSUh8MyzwT4N9"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-sm"
          >
            Inquire Now
          </a>
        </div>

        <div className="gallery-wrap">
          <div className="gallery-grid">
            {pieces.map((piece) => (
              <div key={piece.id} className="gallery-item">
                <Image
                  src={piece.src}
                  alt={piece.title}
                  fill
                  className="gallery-img"
                  sizes="(max-width: 900px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                <div className="gallery-overlay">
                  <p className="overlay-medium">{piece.medium}</p>
                  <p className="overlay-title">{piece.title}</p>
                  <div className="overlay-meta">
                    <span className="overlay-year">{piece.year}</span>
                    <span className="overlay-size">{piece.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="commission-strip">
          <p className="pre">Available for commission</p>
          <h2>Interested in a custom piece?</h2>
          <a href="https://forms.gle/EVYZKSUh8MyzwT4N9" target="_blank" rel="noopener noreferrer" className="btn-primary">Start Your Commission</a>
        </div>
      </main>

      <footer>
        <div className="footer-inner">
          <Link href="/" className="footer-logo">Tarika Art</Link>
          <span className="footer-copy">© {new Date().getFullYear()} Tarika Art. All rights reserved.</span>
          <div className="footer-socials">
            <a href="https://instagram.com/tarikaart" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/tarikaart/" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>
      </footer>
    </>
  );
}
