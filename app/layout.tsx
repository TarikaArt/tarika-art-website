import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tarika Art — Visual Artist",
  description: "Washington, D.C.-based visual artist working in portraiture, mixed media, and layered abstraction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        {/*
          ── GLOBAL GOLD LEAF TEXTURE ──
          File:      /public/goldleafback1.png
          Applies:   app/layout.tsx  ← this file

          mix-blend-mode: screen  →  the near-black areas of goldleafback1.png
          become fully transparent on the solid-black body. Only the actual gold
          fragments add warm light on top of the dark page. No fog, no gray wash.

          ★ TWEAK opacity         → 0.28   MAIN DIAL — raise for more gold, lower for less
          ★ TWEAK saturate(X)     → 1.15   raise above 1 to push toward richer/warmer gold;
                                            lower toward 0.7 for more muted/antique tone
          ★ TWEAK brightness(X)   → 1.05   keep near 1.0; lowering kills gold visibility
          ★ TWEAK backgroundPosition → "center 38%"  shift to reframe the texture crop
        */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            backgroundImage: "url(/goldleafback1.png)",
            backgroundSize: "cover",
            backgroundPosition: "center 38%",
            // ★ TWEAK: saturate > 1 = richer gold, brightness near 1 = full fragment visibility
            filter: "saturate(1.15) brightness(1.05)",
            // ★ TWEAK: MAIN VISIBILITY DIAL
            opacity: 0.28,
            mixBlendMode: "screen" as const,
            pointerEvents: "none",
          }}
        />

        {children}
      </body>
    </html>
  );
}
