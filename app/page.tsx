"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const artworks = [
  { id: 1, src: "/goldroots.jpg", title: "Gold Roots", year: "2025", medium: "Oil on Canvas" },
  { id: 2, src: "/harmony.jpg", title: "Harmony", year: "2024", medium: "Mixed Media" },
  { id: 3, src: "/peace-pyrite.jpg", title: "Peace & Pyrite", year: "2024", medium: "Oil on Canvas" },
];

type NewsletterStatus = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<NewsletterStatus>("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [popupEmail, setPopupEmail] = useState("");
  const [popupStatus, setPopupStatus] = useState<NewsletterStatus>("idle");
  const [popupMessage, setPopupMessage] = useState("");

  function subscribeMailchimp(
    email: string,
    setStatus: (s: NewsletterStatus) => void,
    setMessage: (m: string) => void,
    setEmail: (e: string) => void,
  ) {
    if (!email || setStatus === null) return;
    setStatus("loading");

    const callbackName = `mc_cb_${Date.now()}`;
    const params = new URLSearchParams({
      u: "e443753f70b903d7f28ff03cf",
      id: "0c6345dad5",
      f_id: "003028e2f0",
      EMAIL: email,
      "b_e443753f70b903d7f28ff03cf_0c6345dad5": "",
      c: callbackName,
    });
    const url = `https://tarikaart.us3.list-manage.com/subscribe/post-json?${params}`;

    const win = window as unknown as Record<string, unknown>;

    const timeout = setTimeout(() => {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
      cleanup();
    }, 8000);

    function cleanup() {
      clearTimeout(timeout);
      delete win[callbackName];
      const s = document.getElementById(callbackName);
      if (s) s.remove();
    }

    win[callbackName] = (data: { result: string; msg: string }) => {
      if (data.result === "success") {
        setStatus("success");
        setMessage("You're subscribed. Thank you.");
        setEmail("");
      } else {
        setStatus("error");
        const msg = data.msg?.replace(/<[^>]+>/g, "").replace(/^\d+ - /, "") || "Please try again.";
        setMessage(msg);
      }
      cleanup();
    };

    const script = document.createElement("script");
    script.id = callbackName;
    script.src = url;
    document.head.appendChild(script);
  }

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newsletterEmail || newsletterStatus === "loading") return;
    subscribeMailchimp(newsletterEmail, setNewsletterStatus, setNewsletterMessage, setNewsletterEmail);
  }

  function handlePopupSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!popupEmail || popupStatus === "loading") return;
    subscribeMailchimp(popupEmail, setPopupStatus, setPopupMessage, setPopupEmail);
  }

  function closePopup() {
    setShowPopup(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("mc_popup_seen", "1");
    }
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("mc_popup_seen");
    if (!seen) {
      const timer = setTimeout(() => setShowPopup(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Tenor+Sans&display=swap');

        :root {
          --black: #0a0a0a;
          --cream: #f0ebe3;
          --cream-muted: #d6cfc4;
          --gold: #b89a6a;
          --gold-light: #d4b98a;
          --white: #faf8f5;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Tenor Sans', sans-serif;
        }

        .font-cormorant { font-family: 'Cormorant Garamond', serif; }

        /* ── NAV ── */
        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          transition: background 0.6s ease, backdrop-filter 0.6s ease;
        }
        nav.scrolled {
          background: rgba(10,10,10,0.88);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(184,154,106,0.12);
        }
        .nav-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 28px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
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
          /* ★ TWEAK: nav text size */
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(214,207,196,0.75);
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

        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }
        .nav-hamburger span {
          display: block;
          width: 24px; height: 1px;
          background: var(--cream);
          transition: all 0.3s ease;
        }

        /* ── HERO ── */
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 32px 80px;
          overflow: hidden;
          /* Solid dark base — prevents global texture from bleeding in too strongly.
             The hero controls its own atmosphere via .hero-atmosphere and .hero-bg. */
          background: #0a0a0a;
        }

        /* Ghosted artwork atmosphere — goldroots.jpg blurred into ambient depth */
        .hero-atmosphere {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero-atmosphere-img {
          object-fit: cover;
          object-position: center 30%;
          filter: blur(48px) saturate(0.4) brightness(0.28);
          opacity: 0.07;
        }
        .hero-atmosphere-vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(10,10,10,0.85) 100%),
            linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, transparent 25%, transparent 75%, rgba(10,10,10,0.6) 100%);
        }

        /* Gold leaf texture inside the hero — same image, screen blend, very low opacity.
           Sits above atmosphere (z-index 1) but below the glow (z-index 2).
           The hero's solid #0a0a0a background blocks the global fixed texture,
           so this layer brings it back locally inside the hero only.

           ★ TWEAK hero texture opacity → 0.14  raise to 0.22 for more texture in hero
           ★ TWEAK hero texture brightness → 1.0  keep near 1 so gold stays warm
        */
        .hero-texture {
          position: absolute;
          inset: 0;
          z-index: 1;
          background-image: url("/goldleafback1.png");
          background-size: cover;
          background-position: center 38%;
          filter: saturate(1.1) brightness(1.0);
          /* ★ TWEAK: hero texture visibility */
          opacity: 0.14;
          mix-blend-mode: screen;
          pointer-events: none;
        }


        /* Hero glow — centered around the title area, not the top edge.
           Two layers:
           1. Soft ambient halo centered at 42% vertical (title/name area)
           2. Very faint upper warmth so the top isn't completely cold

           ★ TWEAK glow vertical position: change "42%" in "at 50% 42%"
             — lower number = moves glow up, higher = moves it down
           ★ TWEAK glow intensity: change the rgba alpha values (currently 0.13 / 0.05)
           ★ TWEAK glow width: change ellipse % (currently 70% wide, 55% tall)
        */
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 2;
          background:
            radial-gradient(ellipse 72% 58% at 50% 48%, rgba(184,154,106,0.14) 0%, transparent 75%),
            radial-gradient(ellipse 35% 18% at 50% 8%,  rgba(184,154,106,0.04) 0%, transparent 100%);
          /* ★ TWEAK: ambient breath — change 9s for speed, or remove animation entirely */
          animation: ambientBreathe 9s ease-in-out infinite;
        }

        /* Grain / canvas texture */
        .hero-grain {
          position: absolute;
          inset: 0;
          z-index: 4;
          /* ★ TWEAK: grain opacity (currently 0.042) */
          opacity: 0.042;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 175px 175px;
          mix-blend-mode: screen;
        }

        /* All hero text/button content above atmosphere, texture, and glow layers. */
        .hero > *:not(.hero-atmosphere):not(.hero-texture):not(.hero-bg):not(.hero-grain):not(.hero-scroll) {
          position: relative;
          z-index: 5;
        }

        /* Scroll indicator — explicit absolute so it never gets overridden */
        .hero-scroll {
          position: absolute !important;
          z-index: 5;
        }

        /* Vertical gold rule */
        .hero-rule {
          width: 1px;
          height: 88px;
          margin: 0 auto 56px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(184,154,106,0.15) 18%,
            rgba(212,185,138,0.92) 52%,
            rgba(184,154,106,0.2) 82%,
            transparent 100%
          );
          animation: fadeIn 2.2s ease forwards;
          position: relative;
          z-index: 5;
        }
        .hero-rule::after {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 5px;
          height: 100%;
          background: inherit;
          filter: blur(4px);
          opacity: 0.5;
        }

        .hero-eyebrow {
          font-size: 0.73rem;
          letter-spacing: 0.36em;
          text-transform: uppercase;
          color: rgba(184,154,106,0.75);
          margin-bottom: 44px;
          animation: fadeUp 1.1s 0.4s ease both;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          /* ★ TWEAK: hero title size */
          font-size: clamp(5rem, 13vw, 11rem);
          font-weight: 300;
          line-height: 0.9;
          letter-spacing: -0.015em;
          color: var(--cream);
          margin-bottom: 28px;
          animation: fadeUp 1.1s 0.55s ease both;
        }
        /* "Tarika" — solid, strong */
        .hero-title-name {
          display: block;
          font-weight: 300;
          font-style: normal;
          color: var(--cream);
          letter-spacing: -0.01em;
        }
        /* "Art" — warmer, more expressive, italic weight 500 */
        .hero-title-word {
          display: block;
          font-weight: 500;
          font-style: italic;
          /* ★ TWEAK: "Art" color warmth */
          color: var(--gold-light);
          letter-spacing: 0.01em;
        }

        .hero-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-weight: 300;
          font-style: italic;
          letter-spacing: 0.1em;
          color: rgba(214,207,196,0.65);
          margin-bottom: 68px;
          animation: fadeUp 1.1s 0.75s ease both;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          animation: fadeUp 1.1s 0.95s ease both;
        }

        .btn-primary {
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 16px 44px;
          background: var(--gold);
          color: var(--black);
          text-decoration: none;
          transition: background 0.35s ease, transform 0.3s ease, box-shadow 0.35s ease;
        }
        .btn-primary:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(184,154,106,0.25);
        }

        .btn-outline {
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 15px 44px;
          border: 1px solid rgba(184,154,106,0.45);
          color: var(--cream);
          text-decoration: none;
          transition: border-color 0.35s ease, color 0.35s ease, transform 0.3s ease;
        }
        .btn-outline:hover {
          border-color: var(--gold);
          color: var(--gold-light);
          transform: translateY(-2px);
        }

        .hero-scroll {
          position: absolute !important;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 5;
          animation: fadeIn 2s 1.8s ease both;
        }
        .hero-scroll span {
          font-size: 0.68rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(240,235,227,0.35);
        }
        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--gold-light), transparent);
          animation: scrollPulse 2.4s 1.8s ease-in-out infinite;
        }

        /* ── SECTION SHARED ── */
        .section-label {
          font-size: 0.73rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 20px;
        }
        .section-divider {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 56px;
        }
        .section-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(184,154,106,0.3), transparent);
        }

        /* ── FEATURED WORK ── */
        .works {
          padding: 120px 48px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .works-header {
          text-align: center;
          margin-bottom: 72px;
        }
        .works-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 300;
          letter-spacing: 0.02em;
          color: var(--cream);
        }

        .works-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .work-item {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          background: #111;
          aspect-ratio: 4/5;
        }
        .work-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          /* ★ TWEAK: artwork base saturation/brightness */
          transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.7s ease;
          filter: saturate(0.78) brightness(0.88);
        }
        .work-item:hover .work-img {
          /* ★ TWEAK: artwork hover zoom = scale value; hover dim = brightness value */
          transform: scale(1.055);
          filter: saturate(1.05) brightness(0.68);
        }
        .work-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 32px;
          background: linear-gradient(
            to top,
            rgba(10,10,10,0.88) 0%,
            rgba(10,10,10,0.18) 42%,
            transparent 68%
          );
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        .work-item:hover .work-overlay { opacity: 1; }

        /* Thin gold accent line that slides in on hover */
        .work-overlay::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: var(--gold);
          /* ★ TWEAK: hover accent line speed */
          transition: width 0.6s ease;
          opacity: 0.5;
        }
        .work-item:hover .work-overlay::before { width: 100%; }

        .work-overlay-medium {
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 10px;
        }
        .work-overlay-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 300;
          font-style: italic;
          color: var(--white);
          letter-spacing: 0.04em;
          line-height: 1.2;
        }
        .work-overlay-year {
          font-size: 0.7rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(240,235,227,0.45);
          margin-top: 8px;
        }
        .works-cta {
          text-align: center;
          margin-top: 72px;
        }

        /* ── WORK WITH ME ── */
        .services-section {
          background: #070707;
          border-top: 1px solid rgba(184,154,106,0.08);
          border-bottom: 1px solid rgba(184,154,106,0.08);
        }
        .services {
          padding: 120px 48px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .services-header {
          text-align: center;
          margin-bottom: 72px;
        }
        .services-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 300;
          letter-spacing: 0.02em;
          color: var(--cream);
          margin-top: 14px;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
        }
        .service-card {
          padding: 64px 48px;
          border: 1px solid rgba(184,154,106,0.08);
          transition: border-color 0.45s ease, background 0.45s ease;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .service-card:hover {
          border-color: rgba(184,154,106,0.24);
          background: rgba(184,154,106,0.025);
        }
        .service-label {
          font-size: 0.73rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 20px;
        }
        .service-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.45rem, 2.2vw, 1.9rem);
          font-weight: 300;
          font-style: italic;
          color: var(--cream);
          letter-spacing: 0.02em;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        .service-desc {
          font-size: 0.92rem;
          line-height: 2;
          color: rgba(214,207,196,0.65);
          letter-spacing: 0.035em;
          margin-bottom: 40px;
          flex: 1;
        }

        /* ── ABOUT ── */
        .about {
          padding: 120px 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          max-width: 1200px;
          margin: 0 auto;
          align-items: center;
        }
        .about-visual { position: relative; }
        .about-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1/1;
          overflow: hidden;
          background: #111;
        }
        .about-frame {
          position: absolute;
          top: -16px;
          left: -16px;
          right: 16px;
          bottom: 16px;
          border: 1px solid rgba(184,154,106,0.22);
          pointer-events: none;
          z-index: 1;
        }
        .about-content {}
        .about-statement {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.65rem, 2.8vw, 2.3rem);
          font-weight: 300;
          line-height: 1.5;
          color: var(--cream);
          margin-bottom: 32px;
          letter-spacing: 0.01em;
        }
        .about-statement em {
          font-style: italic;
          color: var(--gold-light);
        }
        .about-body {
          font-size: 0.95rem;
          line-height: 2;
          color: rgba(214,207,196,0.82);
          letter-spacing: 0.035em;
          margin-bottom: 40px;
        }
        .link-underline {
          font-size: 0.73rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold);
          text-decoration: none;
          border-bottom: 1px solid rgba(184,154,106,0.35);
          padding-bottom: 3px;
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .link-underline:hover {
          color: var(--gold-light);
          border-color: var(--gold-light);
        }

        /* ── NEWSLETTER ── */
        .newsletter-section {
          background: #070707;
          border-top: 1px solid rgba(184,154,106,0.08);
          border-bottom: 1px solid rgba(184,154,106,0.08);
          padding: 96px 48px;
          text-align: center;
        }
        .newsletter-label {
          font-size: 0.73rem;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: rgba(184,154,106,0.6);
          margin-bottom: 24px;
          display: block;
        }
        .newsletter-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          color: var(--cream);
          letter-spacing: 0.02em;
          margin-top: 14px;
          margin-bottom: 16px;
        }
        .newsletter-body {
          font-size: 0.92rem;
          line-height: 1.95;
          color: rgba(214,207,196,0.6);
          letter-spacing: 0.035em;
          max-width: 460px;
          margin: 0 auto 40px;
        }
        .newsletter-form {
          display: flex;
          max-width: 480px;
          margin: 0 auto;
          gap: 2px;
        }
        .newsletter-input {
          flex: 1;
          background: #111;
          border: none;
          outline: none;
          color: var(--cream);
          font-family: 'Tenor Sans', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.03em;
          padding: 16px 20px;
          min-width: 0;
          transition: background 0.3s ease;
        }
        .newsletter-input::placeholder {
          color: rgba(214,207,196,0.22);
        }
        .newsletter-input:focus {
          background: #161616;
        }
        .newsletter-submit {
          background: var(--gold);
          color: var(--black);
          border: none;
          font-family: 'Tenor Sans', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 16px 28px;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.35s ease, transform 0.3s ease;
        }
        .newsletter-submit:hover:not(:disabled) {
          background: var(--gold-light);
          transform: translateY(-1px);
        }
        .newsletter-submit:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          transform: none;
        }
        .newsletter-msg {
          margin-top: 18px;
          font-size: 0.85rem;
          letter-spacing: 0.06em;
          min-height: 1.2em;
        }
        .newsletter-msg.success { color: var(--gold-light); }
        .newsletter-msg.error   { color: rgba(230,110,110,0.85); }

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
        }
        .footer-copy {
          font-size: 0.73rem;
          letter-spacing: 0.12em;
          color: rgba(214,207,196,0.45);
        }
        .footer-socials { display: flex; gap: 28px; }
        .footer-socials a {
          font-size: 0.73rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(214,207,196,0.45);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer-socials a:hover { color: var(--gold); }

        /* ── ANIMATIONS ── */
        /* Ambient glow breath — opacity only, no position/direction change.
           ★ TWEAK: change 9s to slow down or speed up
           ★ TWEAK: change 0.82 to control how much it dims at the low point */
        @keyframes ambientBreathe {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.82; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50%       { opacity: 0.75; transform: scaleY(1.18); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .nav-inner { padding: 22px 28px; }
          .nav-links { display: none; }
          .nav-hamburger { display: flex; }

          .works { padding: 80px 24px; }
          .works-grid { grid-template-columns: 1fr; gap: 12px; }
          .work-overlay { opacity: 1; }
          .work-overlay::before { width: 100%; }

          .services { padding: 80px 24px; }
          .services-grid { grid-template-columns: 1fr; }
          .service-card { padding: 48px 32px; }

          .about {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 80px 24px;
          }
          .about-visual { max-width: 420px; margin: 0 auto; }

          .newsletter-section { padding: 72px 24px; }
          .newsletter-form { flex-direction: column; }
          .newsletter-submit { padding: 16px 20px; }

          footer { padding: 36px 24px; }
          .footer-inner { flex-direction: column; align-items: flex-start; gap: 16px; }
        }

        /* Mobile nav overlay */
        .mobile-nav {
          position: fixed;
          inset: 0;
          background: rgba(10,10,10,0.97);
          z-index: 99;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 40px;
          transform: translateY(-100%);
          transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
        }
        .mobile-nav.open { transform: translateY(0); }
        .mobile-nav a {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.8rem;
          font-weight: 300;
          letter-spacing: 0.08em;
          color: var(--cream);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .mobile-nav a:hover { color: var(--gold-light); }

        /* ── HERO DRIFT LAYER ── */
        @keyframes ambientDrift {
          0%   { transform: translate(0%,   0%)   scale(1);    opacity: 0.13; }
          33%  { transform: translate(0.8%, -0.8%) scale(1.018); opacity: 0.16; }
          66%  { transform: translate(-0.5%, 0.7%) scale(1.01);  opacity: 0.10; }
          100% { transform: translate(0%,   0%)   scale(1);    opacity: 0.13; }
        }
        .hero-glow-drift {
          position: absolute;
          inset: -8%;
          z-index: 3;
          background: radial-gradient(ellipse 60% 50% at 52% 46%, rgba(212,185,138,0.22) 0%, rgba(184,154,106,0.06) 45%, transparent 75%);
          animation: ambientDrift 14s ease-in-out infinite;
          pointer-events: none;
        }

        /* ── COMMISSION CTA (homepage, below hero) ── */
        .commission-cta-section {
          background: #070707;
          border-top: 1px solid rgba(184,154,106,0.1);
          border-bottom: 1px solid rgba(184,154,106,0.1);
          padding: 96px 48px;
          text-align: center;
        }
        .commission-cta-section .section-label { margin-bottom: 20px; display: block; }
        .commission-cta-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 300;
          color: var(--cream);
          letter-spacing: 0.02em;
          margin-bottom: 18px;
        }
        .commission-cta-body {
          font-size: 0.92rem;
          line-height: 1.95;
          color: rgba(214,207,196,0.62);
          letter-spacing: 0.04em;
          max-width: 460px;
          margin: 0 auto 40px;
        }

        /* ── SHOP SECTION ── */
        .shop-section {
          border-top: 1px solid rgba(184,154,106,0.08);
          padding: 96px 48px;
          text-align: center;
        }
        .shop-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          color: var(--cream);
          letter-spacing: 0.02em;
          margin-bottom: 18px;
          margin-top: 14px;
        }
        .shop-body {
          font-size: 0.92rem;
          line-height: 1.95;
          color: rgba(214,207,196,0.58);
          letter-spacing: 0.04em;
          max-width: 440px;
          margin: 0 auto 40px;
        }
        .shop-grid {
          display: flex;
          gap: 24px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 56px;
        }
        .shop-card {
          width: 220px;
          border: 1px solid rgba(184,154,106,0.12);
          padding: 36px 24px 28px;
          text-align: center;
          transition: border-color 0.4s ease, background 0.4s ease;
        }
        .shop-card:hover {
          border-color: rgba(184,154,106,0.3);
          background: rgba(184,154,106,0.03);
        }
        .shop-card-icon {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem;
          font-weight: 300;
          font-style: italic;
          color: rgba(184,154,106,0.35);
          margin-bottom: 16px;
          line-height: 1;
        }
        .shop-card-label {
          font-size: 0.73rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 12px;
        }
        .shop-card-desc {
          font-size: 0.88rem;
          line-height: 1.8;
          color: rgba(214,207,196,0.55);
          letter-spacing: 0.02em;
        }

        /* ── NEWSLETTER POPUP ── */
        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10,10,10,0.78);
          backdrop-filter: blur(6px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.4s ease both;
        }
        .popup-modal {
          background: #0e0e0e;
          border: 1px solid rgba(184,154,106,0.2);
          max-width: 520px;
          width: 100%;
          padding: 60px 48px 52px;
          position: relative;
          animation: fadeUp 0.5s ease both;
          text-align: center;
        }
        .popup-close {
          position: absolute;
          top: 20px;
          right: 24px;
          background: none;
          border: none;
          color: rgba(214,207,196,0.35);
          font-size: 1.2rem;
          cursor: pointer;
          padding: 4px 8px;
          line-height: 1;
          transition: color 0.3s ease;
        }
        .popup-close:hover { color: var(--gold); }
        .popup-label {
          font-size: 0.73rem;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: rgba(184,154,106,0.6);
          margin-bottom: 24px;
          display: block;
        }
        .popup-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.4rem);
          font-weight: 300;
          color: var(--cream);
          letter-spacing: 0.02em;
          margin-bottom: 16px;
          line-height: 1.2;
        }
        .popup-body {
          font-size: 0.92rem;
          line-height: 1.9;
          color: rgba(214,207,196,0.65);
          letter-spacing: 0.03em;
          max-width: 360px;
          margin: 0 auto 32px;
        }
        .popup-form {
          display: flex;
          flex-direction: column;
          gap: 2px;
          max-width: 380px;
          margin: 0 auto;
        }
        .popup-input {
          background: #161616;
          border: none;
          outline: none;
          color: var(--cream);
          font-family: 'Tenor Sans', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.03em;
          padding: 16px 20px;
          width: 100%;
          transition: background 0.3s ease;
        }
        .popup-input::placeholder { color: rgba(214,207,196,0.22); }
        .popup-input:focus { background: #1c1c1c; }
        .popup-submit {
          background: var(--gold);
          color: var(--black);
          border: none;
          font-family: 'Tenor Sans', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 17px 24px;
          cursor: pointer;
          transition: background 0.35s ease, transform 0.3s ease;
          margin-top: 2px;
        }
        .popup-submit:hover:not(:disabled) {
          background: var(--gold-light);
          transform: translateY(-1px);
        }
        .popup-submit:disabled { opacity: 0.55; cursor: not-allowed; }
        .popup-msg {
          margin-top: 16px;
          font-size: 0.85rem;
          letter-spacing: 0.06em;
        }
        .popup-msg.success { color: var(--gold-light); }
        .popup-msg.error { color: rgba(230,110,110,0.85); }
        .popup-rule {
          width: 32px;
          height: 1px;
          background: rgba(184,154,106,0.3);
          margin: 0 auto 28px;
        }
        .popup-skip {
          display: block;
          margin-top: 20px;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(214,207,196,0.3);
          cursor: pointer;
          background: none;
          border: none;
          transition: color 0.3s ease;
        }
        .popup-skip:hover { color: rgba(214,207,196,0.55); }

        @media (max-width: 900px) {
          .commission-cta-section { padding: 72px 24px; }
          .shop-section { padding: 72px 24px; }
          .popup-modal { padding: 48px 28px 40px; }
        }
      `}</style>

      {/* NAVIGATION */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">Tarika Art</Link>
          <ul className="nav-links">
            {["Home", "Portfolio", "About", "Contact"].map((item) => (
              <li key={item}>
                <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`}>{item}</Link>
              </li>
            ))}
          </ul>
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span style={{ transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* MOBILE NAV OVERLAY */}
      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        {["Home", "Portfolio", "About", "Contact"].map((item) => (
          <Link
            key={item}
            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </Link>
        ))}
      </div>

      <main>
        {/* HERO */}
        <section className="hero" ref={heroRef}>

          {/* Ghosted artwork atmosphere — uses goldroots.jpg as atmospheric background */}
          <div className="hero-atmosphere">
            <Image
              src="/goldroots.jpg"
              alt=""
              fill
              className="hero-atmosphere-img"
              sizes="100vw"
              priority
              aria-hidden="true"
            />
            <div className="hero-atmosphere-vignette" />
          </div>

          {/* Gold leaf texture inside hero — screen blend on dark base */}
          <div className="hero-texture" aria-hidden="true" />

          <div className="hero-bg" />
          <div className="hero-glow-drift" aria-hidden="true" />
          <div className="hero-grain" />

          <div className="hero-rule" />
          <p className="hero-eyebrow">Portraiture · Texture · Visual Storytelling</p>
          <h1 className="hero-title">
            <span className="hero-title-name">Tarika</span>
            <span className="hero-title-word">Art</span>
          </h1>
          <p className="hero-sub">Visual storytelling rooted in identity, emotion, and connection.</p>
          <div className="hero-actions">
            <Link href="/portfolio" className="btn-primary">View Portfolio</Link>
            <Link href="/contact" className="btn-outline">Commissions</Link>
          </div>
          <div className="hero-scroll">
            <div className="scroll-line" />
            <span>Scroll</span>
          </div>
        </section>

        {/* COMMISSION CTA */}
        <section className="commission-cta-section">
          <span className="section-label">Custom Work</span>
          <h2 className="commission-cta-heading font-cormorant">Commission a Piece</h2>
          <div className="section-divider" style={{ maxWidth: "280px", margin: "20px auto 0" }}>
            <div className="section-divider-line" />
            <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>✦</span>
            <div className="section-divider-line" />
          </div>
          <p className="commission-cta-body" style={{ marginTop: "28px" }}>
            Bring your vision to life through custom artwork designed just for you.
          </p>
          <a
            href="https://forms.gle/EVYZKSUh8MyzwT4N9"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Start Your Commission
          </a>
        </section>

        {/* FEATURED WORK */}
        <section style={{ background: "#080808", paddingTop: "2px" }}>
          <div className="works">
            <div className="works-header">
              <p className="section-label">Selected Works</p>
              <h2 className="works-title font-cormorant">Featured Pieces</h2>
              <div className="section-divider" style={{ maxWidth: "320px", margin: "24px auto 0" }}>
                <div className="section-divider-line" />
                <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>✦</span>
                <div className="section-divider-line" />
              </div>
            </div>

            <div className="works-grid">
              {artworks.map((art) => (
                <div key={art.id} className="work-item">
                  <Image
                    src={art.src}
                    alt={art.title}
                    fill
                    className="work-img"
                    sizes="(max-width: 900px) 100vw, 33vw"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                  <div className="work-overlay">
                    <p className="work-overlay-medium">{art.medium}</p>
                    <p className="work-overlay-title">{art.title}</p>
                    <p className="work-overlay-year">{art.year}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="works-cta">
              <Link href="/portfolio" className="btn-outline">View All Works</Link>
            </div>
          </div>
        </section>

        {/* ABOUT PREVIEW */}
        <section style={{ borderTop: "1px solid rgba(184,154,106,0.08)" }}>
          <div className="about">
            <div className="about-visual">
              <div className="about-img-wrap">
                <Image
                  src="/tarika-portrait1.jpg"
                  alt="Tarika Campbell — Artist Portrait"
                  fill
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="about-frame" />
            </div>

            <div className="about-content">
              <p className="section-label">The Artist</p>
              <h2 className="about-statement font-cormorant">
                Identity. Emotion.<br /><em>Connection.</em>
              </h2>
              <p className="about-body">
                Tarika Campbell is a Washington, D.C.-based visual artist whose work blends portraiture, abstract influence, and layered mixed media. Inspired by contemporary interiors and human connection, she creates pieces that are visually striking, emotionally resonant, and rich in texture.
              </p>
              <Link href="/about" className="link-underline">Read More</Link>
            </div>
          </div>
        </section>

        {/* WORK WITH ME */}
        <section className="services-section">
        <div className="services">
          <div className="services-header">
            <p className="section-label">Services</p>
            <h2 className="services-title font-cormorant">Work With Me</h2>
            <div className="section-divider" style={{ maxWidth: "320px", margin: "24px auto 0" }}>
              <div className="section-divider-line" />
              <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>✦</span>
              <div className="section-divider-line" />
            </div>
          </div>

          <div className="services-grid">
            {[
              {
                label: "Commission",
                name: "Custom Commissions",
                desc: "Personalized artwork created to capture your vision, story, or moment in a lifelike and expressive style.",
                btn: "Start Your Commission",
                href: "https://forms.gle/EVYZKSUh8MyzwT4N9",
              },
              {
                label: "Events",
                name: "Live Painting",
                desc: "Elevate your event with a live painting experience that captures the energy and atmosphere in real time.",
                btn: "Book Live Painting",
                href: "https://forms.gle/txe8pY8CpyHRfjyBA",
              },
              {
                label: "Space",
                name: "Murals",
                desc: "Transform your space with custom mural work designed to make a bold and lasting visual statement.",
                btn: "Request a Mural",
                href: "https://forms.gle/cgk9M84Bv9PXBkHs7",
              },
              {
                label: "Education",
                name: "Private Painting Classes",
                desc: "One-on-one or group painting sessions designed to help you learn, explore, and create with confidence.",
                btn: "Book a Class",
                href: "https://forms.gle/DkyBtXLq5MuAFhY57",
              },
            ].map(({ label, name, desc, btn, href }) => (
              <div className="service-card" key={name}>
                <p className="service-label">{label}</p>
                <h3 className="service-name">{name}</h3>
                <p className="service-desc">{desc}</p>
                <a href={href} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  {btn}
                </a>
              </div>
            ))}
          </div>
        </div>
        </section>
      </main>

      {/* SHOP */}
      <section className="shop-section">
        <span className="section-label">The Shop</span>
        <h2 className="shop-heading font-cormorant">Prints &amp; Originals</h2>
        <div className="section-divider" style={{ maxWidth: "280px", margin: "20px auto 0" }}>
          <div className="section-divider-line" />
          <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>✦</span>
          <div className="section-divider-line" />
        </div>
        <p className="shop-body" style={{ marginTop: "28px" }}>
          Browse fine art prints, originals, and limited editions available through the Tarika Art shop.
        </p>
        <div className="shop-grid">
          {[
            { icon: "I",  label: "Fine Art Prints",    desc: "Museum-quality prints of original works, available in multiple sizes." },
            { icon: "II", label: "Original Works",     desc: "One-of-a-kind paintings available for direct purchase and collection." },
            { icon: "III", label: "Limited Editions",  desc: "Numbered runs of signature pieces. Once gone, they're gone." },
          ].map(({ icon, label, desc }) => (
            <div className="shop-card" key={label}>
              <p className="shop-card-icon">{icon}</p>
              <p className="shop-card-label">{label}</p>
              <p className="shop-card-desc">{desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "52px" }}>
          <a
            href="https://tarikaart.printify.me"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Visit the Shop
          </a>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section" aria-label="Newsletter signup">
        <p className="newsletter-label">Newsletter</p>
        <h2 className="newsletter-heading font-cormorant">Stay Connected</h2>
        <div className="section-divider" style={{ maxWidth: "320px", margin: "24px auto 32px" }}>
          <div className="section-divider-line" />
          <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>✦</span>
          <div className="section-divider-line" />
        </div>
        <p className="newsletter-body">
          Be the first to see new work, commission openings, and creative releases.
        </p>

        {newsletterStatus === "success" ? (
          <p className="newsletter-msg success" role="status">{newsletterMessage}</p>
        ) : (
          <form
            className="newsletter-form"
            onSubmit={handleNewsletterSubmit}
            noValidate
          >
            {/* Mailchimp bot-protection honeypot — must remain hidden */}
            <input
              type="text"
              name="b_e443753f70b903d7f28ff03cf_0c6345dad5"
              tabIndex={-1}
              aria-hidden="true"
              defaultValue=""
              style={{ position: "absolute", left: "-9999px" }}
              readOnly
            />
            <label htmlFor="mce-EMAIL" style={{ position: "absolute", left: "-9999px" }}>
              Email address
            </label>
            <input
              id="mce-EMAIL"
              name="EMAIL"
              type="email"
              className="newsletter-input"
              placeholder="your@email.com"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              aria-label="Email address"
              autoComplete="email"
            />
            <button
              type="submit"
              className="newsletter-submit"
              disabled={newsletterStatus === "loading"}
            >
              {newsletterStatus === "loading" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        )}

        {newsletterStatus === "error" && (
          <p className="newsletter-msg error" role="alert">{newsletterMessage}</p>
        )}
      </section>

      {/* NEWSLETTER POPUP */}
      {showPopup && (
        <div className="popup-overlay" role="dialog" aria-modal="true" aria-label="Stay Connected">
          <div className="popup-modal">
            <button className="popup-close" onClick={closePopup} aria-label="Close">✕</button>
            <span className="popup-label">Newsletter</span>
            <div className="popup-rule" />
            <h2 className="popup-heading font-cormorant">Stay Connected</h2>
            <p className="popup-body">
              Be the first to see new work, commission openings, and creative releases.
            </p>
            {popupStatus === "success" ? (
              <p className="popup-msg success" role="status">{popupMessage}</p>
            ) : (
              <form className="popup-form" onSubmit={handlePopupSubmit} noValidate>
                <input
                  type="text"
                  name="b_e443753f70b903d7f28ff03cf_0c6345dad5"
                  tabIndex={-1}
                  aria-hidden="true"
                  defaultValue=""
                  style={{ position: "absolute", left: "-9999px" }}
                  readOnly
                />
                <input
                  type="email"
                  className="popup-input"
                  placeholder="your@email.com"
                  value={popupEmail}
                  onChange={(e) => setPopupEmail(e.target.value)}
                  required
                  aria-label="Email address"
                  autoComplete="email"
                />
                <button
                  type="submit"
                  className="popup-submit"
                  disabled={popupStatus === "loading"}
                >
                  {popupStatus === "loading" ? "Subscribing…" : "Subscribe"}
                </button>
                {popupStatus === "error" && (
                  <p className="popup-msg error" role="alert">{popupMessage}</p>
                )}
              </form>
            )}
            <button className="popup-skip" onClick={closePopup}>No thanks</button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <span className="footer-logo">Tarika Art</span>
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
