"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Database, GitBranch, TrendingUp } from "lucide-react";

const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";
const GRADIENT_TEXT: React.CSSProperties = {
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const columns = [
  {
    icon: Database,
    title: "Your operational history",
    body: "Every transaction, exception, and resolution accumulates in a system you own. Twelve months in, your operational core knows how your business actually runs at a depth no new platform, consultant, or hire can replicate.",
  },
  {
    icon: GitBranch,
    title: "Your decision logic",
    body: "Every escalation you approve teaches the system where your boundaries sit. Governance rules sharpen with each cycle. The judgment that once lived only in your head becomes documented, executable, and transferable.",
  },
  {
    icon: TrendingUp,
    title: "Your asset value",
    body: "An acquirer buying your business inherits documented workflows, governed operations, and a leadership dashboard instead of tribal knowledge and key-person risk. Owned infrastructure appears on the right side of a valuation. Subscriptions appear on the wrong one.",
  },
];

export default function WhatCompoundsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} style={{ backgroundColor: "#FFFFFF", padding: "64px 24px" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
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
            What Compounds
          </div>
          <h2
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 42px)",
              color: "#1F2937",
              lineHeight: 1.25,
              maxWidth: "640px",
              margin: "0 auto 16px",
            }}
          >
            Software subscriptions expire. Infrastructure accumulates.
          </h2>
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "16px",
              color: "#6B7280",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            Every dollar spent on rented tools buys the same thing next month. Every dollar spent on owned
            infrastructure buys something that was not there before. The difference decides what your business is
            worth in five years.
          </p>
        </motion.div>

        <div
          className="compounds-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap: "20px",
            marginBottom: "48px",
          }}
        >
          {columns.map((col, i) => {
            const Icon = col.icon;
            return (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.12 + i * 0.12, ease: "easeOut" }}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "16px",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: GRADIENT,
                  }}
                />
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: GRADIENT,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 16px rgba(43,96,235,0.20)",
                  }}
                >
                  <Icon size={20} color="white" />
                </div>
                <div
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 700,
                    fontSize: "19px",
                    color: "#1F2937",
                    lineHeight: 1.3,
                  }}
                >
                  {col.title}
                </div>
                <p
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "14px",
                    color: "#374151",
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {col.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.5, ease: "easeOut" }}
          style={{ textAlign: "center" }}
        >
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              color: "#1F2937",
              lineHeight: 1.7,
              maxWidth: "640px",
              margin: "0 auto 32px",
            }}
          >
            The operational core is yours from Phase 2 completion. Everything it learns after that compounds on
            your balance sheet, not a vendor's.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="/assessment"
              style={{
                background: GRADIENT,
                color: "white",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                padding: "14px 28px",
                borderRadius: "8px",
                border: "none",
                display: "inline-block",
                textDecoration: "none",
              }}
            >
              Assess Your Business
            </a>
            <a
              href="https://calendly.com/quantonlabs/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "transparent",
                color: "#1F2937",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                padding: "14px 28px",
                borderRadius: "8px",
                border: "1.5px solid #1F2937",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
              }}
            >
              Book a Discovery Call <span>&#8594;</span>
            </a>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .compounds-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}