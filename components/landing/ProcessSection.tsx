"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Settings, Zap } from "lucide-react";

const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";
const GRADIENT_TEXT: React.CSSProperties = {
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const howItWorks = [
  {
    step: "01",
    icon: Search,
    title: "Discovery and Diagnostic",
    duration: "2 to 3 weeks",
    description:
      "We audit your business across every operational domain: how work gets done, where revenue leaks, what the owner carries that the business should handle. The output is a Diagnostic Report that maps gap severity, validated cost of inaction, and a prioritized implementation roadmap. You own that report regardless of what you decide next.",
    detail: "Fixed-fee engagement. No ongoing commitment at this stage.",
  },
  {
    step: "02",
    icon: Settings,
    title: "Infrastructure Deployment",
    duration: "8 to 16 weeks",
    description:
      "Your operational core is built as the system of record for your business, absorbing what the fragmented stack used to hold: customer records, financials, inventory, workflows. All eight agents are configured against it. The Governing Agent goes live. Your leadership dashboard is built. Every workflow is tested, governed, and documented. Your team is trained on what the system handles and what requires their judgment.",
    detail: "Fixed investment. You own all deployed infrastructure on completion.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Managed Services",
    duration: "Ongoing",
    description:
      "Quanton Labs operates the system on your behalf. Agent hosting, system monitoring, workflow optimization, and quarterly strategic reviews are included. Model consumption runs through accounts you control, so you see exactly what intelligence costs. Your business runs at the level its current structure cannot support. We surface the exceptions that need your attention and handle everything that does not.",
    detail: "Fixed monthly investment. Six-month minimum, then month-to-month or a committed term.",
  },
];

function PhaseRow({
  step,
  index,
  isLast,
}: {
  step: (typeof howItWorks)[number];
  index: number;
  isLast: boolean;
}) {
  const rowRef = useRef(null);
  // Each phase reveals on its own scroll position rather than all at once.
  const rowInView = useInView(rowRef, { once: true, margin: "-25% 0px -25% 0px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 28 }}
      animate={rowInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ display: "grid", gridTemplateColumns: "80px 1fr" }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={rowInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: GRADIENT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: rowInView
              ? "0 0 0 6px rgba(70,85,235,0.10), 0 4px 18px rgba(43,96,235,0.30)"
              : "0 4px 16px rgba(43,96,235,0.20)",
            transition: "box-shadow 0.5s ease",
          }}
        >
          <Icon size={20} color="white" aria-hidden="true" />
        </motion.div>

        {!isLast && (
          <div
            style={{
              position: "relative",
              width: "2px",
              flex: 1,
              minHeight: "56px",
              margin: "8px 0",
              background: "rgba(43,96,235,0.12)",
              overflow: "hidden",
              borderRadius: "2px",
            }}
          >
            {/* Line fills downward once the phase is read */}
            <motion.div
              initial={{ height: "0%" }}
              animate={rowInView ? { height: "100%" } : {}}
              transition={{ duration: 0.9, delay: 0.25, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                background: "linear-gradient(to bottom, #2B60EB, #7341EA)",
              }}
            />
            {/* Neon pulse travelling toward the next phase */}
            {rowInView && (
              <motion.div
                initial={{ top: "-12%", opacity: 0 }}
                animate={{ top: "104%", opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 1.6,
                  delay: 0.35,
                  repeat: Infinity,
                  repeatDelay: 1.4,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  left: "50%",
                  marginLeft: "-4px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#8B37EA",
                  boxShadow: "0 0 10px 2px rgba(139,55,234,0.75)",
                }}
              />
            )}
          </div>
        )}
      </div>

      <div style={{ paddingBottom: isLast ? "0px" : "48px", paddingLeft: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
          <div
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(20px, 2.5vw, 26px)",
              color: "#1F2937",
              lineHeight: 1.2,
            }}
          >
            {step.title}
          </div>
          <div
            style={{
              padding: "4px 12px",
              borderRadius: "100px",
              background: "rgba(43,96,235,0.07)",
              border: "1px solid rgba(43,96,235,0.15)",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              ...GRADIENT_TEXT,
            }}
          >
            {step.duration}
          </div>
        </div>
        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "15px",
            color: "#374151",
            lineHeight: 1.75,
            marginBottom: "16px",
            maxWidth: "680px",
          }}
        >
          {step.description}
        </p>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "Manrope, sans-serif",
            fontSize: "13px",
            color: "#6B7280",
            fontWeight: 500,
          }}
        >
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#4655EB", flexShrink: 0 }} />
          {step.detail}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} style={{ backgroundColor: "#F5F7FB", padding: "64px 24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: "44px" }}
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
            How it works
          </div>
          <h2
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 42px)",
              color: "#1F2937",
              lineHeight: 1.25,
              maxWidth: "600px",
              margin: "0 auto 16px",
            }}
          >
            From first conversation to fully operational system
          </h2>
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "16px",
              color: "#6B7280",
              lineHeight: 1.7,
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            Every Quanton OS engagement follows the same three-phase structure. No matter the industry, this is how your business goes from where it is to where it needs to be.
          </p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {howItWorks.map((step, i) => (
            <PhaseRow
              key={step.step}
              step={step}
              index={i}
              isLast={i === howItWorks.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}