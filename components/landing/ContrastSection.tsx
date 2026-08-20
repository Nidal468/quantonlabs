"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Wrench, Building2, Split, ArrowRight, X, Check } from "lucide-react";

const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";
const GRADIENT_TEXT: React.CSSProperties = {
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const alternatives = [
  {
    icon: Wrench,
    label: "Agent platforms",
    title: "Build it yourself",
    body: "You get tools and no architecture. Individual agents with no coordination layer, no governance, and nobody accountable when two of them conflict.",
    cost: "IDC found 88% of AI proofs of concept never reach production.",
    keeps: "You keep the integration problem.",
  },
  {
    icon: Building2,
    label: "Automation agencies",
    title: "Rent the outcome",
    body: "Workflows get built fast and the agency keeps the keys. Every change runs through their queue. Every optimization bills by the hour.",
    cost: "The day the relationship ends, the expertise walks out with it.",
    keeps: "You never own the system producing the result.",
  },
  {
    icon: Split,
    label: "AI-native ERP",
    title: "Own half the answer",
    body: "A funded category has validated the thesis: the system of record is where AI belongs. Then they take financials and leave operations everywhere else.",
    cost: "Your business now runs across two systems that do not talk.",
    keeps: "You own the seam between them, and the seam is where margin leaks.",
  },
];

const quantonPoints = [
  "One operational core, built as your system of record",
  "Eight coordinated agents under one Governing Agent",
  "Approval gates on anything touching customers or revenue",
  "Deployed and operated by us, owned outright by you",
];

export default function ContrastSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} style={{ backgroundColor: "#041227", padding: "68px 24px" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <div
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "16px",
              ...GRADIENT_TEXT,
            }}
          >
            The Alternatives
          </div>
          <h2
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 42px)",
              color: "#FFFFFF",
              lineHeight: 1.25,
              maxWidth: "700px",
              margin: "0 auto 16px",
            }}
          >
            Three ways to get AI into your operations. Each one leaves you holding something.
          </h2>
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "16px",
              color: "rgba(255,255,255,0.62)",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            Every established path solves part of the problem and hands you a new one. The fourth
            column is what happens when none of the trades are acceptable.
          </p>
        </motion.div>

        <div
          className="contrast-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr)) 1.25fr",
            gap: "16px",
            alignItems: "stretch",
          }}
        >
          {alternatives.map((alt, i) => {
            const Icon = alt.icon;
            return (
              <motion.div
                key={alt.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: "easeOut" }}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "14px",
                  padding: "26px 22px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "9px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={17} color="rgba(255,255,255,0.5)" aria-hidden="true" />
                  </div>
                  <span
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontWeight: 600,
                      fontSize: "11px",
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    {alt.label}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "rgba(255,255,255,0.86)",
                    lineHeight: 1.25,
                  }}
                >
                  {alt.title}
                </div>

                <p
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {alt.body}
                </p>

                <p
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.42)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {alt.cost}
                </p>

                <div style={{ marginTop: "auto", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <X size={14} color="#F87171" style={{ flexShrink: 0, marginTop: "3px" }} aria-hidden="true" />
                    <span
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#F87171",
                        lineHeight: 1.5,
                      }}
                    >
                      {alt.keeps}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Quanton column, weighted to dominate the set */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.42, ease: "easeOut" }}
            style={{
              background: "linear-gradient(160deg, rgba(43,96,235,0.16), rgba(139,55,234,0.10))",
              border: "1px solid rgba(112,130,245,0.5)",
              borderRadius: "14px",
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 18px 60px rgba(43,96,235,0.24)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: GRADIENT,
              }}
            />

            <div
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
                fontSize: "11px",
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                color: "#9DB0FF",
              }}
            >
              Quanton OS
            </div>

            <div
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 700,
                fontSize: "24px",
                color: "#FFFFFF",
                lineHeight: 1.2,
              }}
            >
              Take none of the trades
            </div>

            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "14px",
                color: "rgba(255,255,255,0.78)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              The coordination problem, the dependency problem, and the seam problem all resolve
              through the same architectural decision.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginTop: "2px" }}>
              {quantonPoints.map(point => (
                <div key={point} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                  <Check size={15} color="#7BE8A8" style={{ flexShrink: 0, marginTop: "3px" }} aria-hidden="true" />
                  <span
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.86)",
                      lineHeight: 1.55,
                    }}
                  >
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "auto", paddingTop: "18px" }}>
              <Link
                href="/architecture"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  padding: "11px 20px",
                  borderRadius: "9px",
                  background: GRADIENT,
                }}
              >
                See how it is built <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .contrast-grid { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
        }
        @media (max-width: 700px) {
          .contrast-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}