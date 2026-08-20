"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IntelligentGridBackground } from "../animated/bg_grid";

const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";

export function HeroSection() {
  return (
    <section
      id="hero-section"
      className="w-full relative overflow-hidden pt-24 md:pt-28 pb-12"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 80% 60% at 50% 0%, rgba(43, 96, 235, 0.07) 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 0% 50%, rgba(139, 55, 234, 0.06) 0%, transparent 70%)
        `,
        backgroundSize: "auto, auto",
        backgroundColor: "white",
      }}
    >
      <div
        className="absolute top-0 left-0 w-full"
        style={{ height: "3px", background: GRADIENT }}
      />

      <IntelligentGridBackground />

      <style>{`
        @keyframes qlSignalDrop {
          0%   { transform: translate(-50%, -150px) scale(0.6); opacity: 0; }
          12%  { opacity: 1; }
          26%  { transform: translate(-50%, 22px) scale(1); opacity: 1; }
          34%  { transform: translate(-50%, 22px) scale(0.2); opacity: 0; }
          100% { transform: translate(-50%, 22px) scale(0.2); opacity: 0; }
        }
        @keyframes qlCtaShimmer {
          0%, 24%   { transform: translateX(-130%); opacity: 0; }
          28%       { opacity: 1; }
          46%       { transform: translateX(130%); opacity: 0; }
          100%      { transform: translateX(130%); opacity: 0; }
        }
        .ql-hero-signal {
          position: absolute;
          top: 0;
          left: 50%;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #8B37EA;
          box-shadow: 0 0 12px 3px rgba(139,55,234,0.75);
          pointer-events: none;
          z-index: 3;
          animation: qlSignalDrop 5s ease-in infinite;
        }
        .ql-hero-cta {
          position: relative;
          overflow: hidden;
        }
        .ql-hero-cta::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 55%;
          height: 100%;
          background: linear-gradient(
            100deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.45) 50%,
            rgba(255,255,255,0) 100%
          );
          pointer-events: none;
          animation: qlCtaShimmer 5s ease-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ql-hero-signal, .ql-hero-cta::after { animation: none; opacity: 0; }
        }
      `}</style>

      <div className="relative container mx-auto px-6 flex flex-col items-center text-center" style={{ zIndex: 2 }}>
        <p
          className="text-xs tracking-[0.25em] mb-5"
          style={{
            background: "linear-gradient(to right, #2B60EB, #8B37EA)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 600,
          }}
        >
          THE ARCHITECTURE OF INTELLIGENT BUSINESS
        </p>

        <h1
          className="text-4xl md:text-6xl font-extrabold mb-5 leading-[1.1] max-w-4xl"
          style={{ color: "#1F2937", fontFamily: "Manrope, sans-serif" }}
        >
          The AI-native business system for established operators
        </h1>

        <p
          className="text-lg md:text-xl mb-8 max-w-2xl"
          style={{
            color: "#374151",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 400,
            lineHeight: 1.65,
          }}
        >
          You built a business. Now the business runs you. Quanton OS deploys eight
          coordinated AI agents on an operational core you own outright.
        </p>

        <div className="flex flex-col items-center gap-4">
          <div style={{ position: "relative" }}>
            {/* Signal travels down the grid and passes through the CTA,
                which shimmers on arrival. Both loops share one 5s cycle. */}
            <span className="ql-hero-signal" aria-hidden="true" />
          <Link
            href="/assessment"
            className="ql-hero-cta"
            style={{
              background: GRADIENT,
              color: "white",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "17px",
              padding: "16px 40px",
              borderRadius: "10px",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              boxShadow: "0 8px 32px rgba(43,96,235,0.28)",
            }}
          >
            Assess Your Business <ArrowRight size={18} aria-hidden="true" />
          </Link>
          </div>

          <Link
            href="https://calendly.com/quantonlabs/30min"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#4655EB",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
            }}
          >
            Or book a discovery call
          </Link>
        </div>
      </div>
    </section>
  );
}