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
      "All eight agents are configured against your specific environment: your CRM, your accounting platform, your scheduling tools, your communication channels. The Governing Agent goes live. Your leadership dashboard is built. Every workflow is tested, governed, and documented. Your team is trained on what the system handles and what requires their judgment.",
    detail: "Fixed investment. You own all deployed infrastructure on completion.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Managed Services",
    duration: "Ongoing",
    description:
      "Quanton Labs operates the system on your behalf. Agent hosting, API costs, system monitoring, workflow optimization, and quarterly strategic reviews are all included. Your business runs at the level its current structure cannot support. We surface the exceptions that need your attention and handle everything that does not.",
    detail: "Fixed monthly retainer. Six-month minimum, then month-to-month.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} style={{ backgroundColor: "#ffffff", padding: "100px 24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: "64px" }}
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
          {howItWorks.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === howItWorks.length - 1;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.14, ease: "easeOut" }}
                style={{ display: "grid", gridTemplateColumns: "80px 1fr" }}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: GRADIENT,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: "0 4px 16px rgba(43,96,235,0.25)",
                    }}
                  >
                    <Icon size={20} color="white" />
                  </div>
                  {!isLast && (
                    <div
                      style={{
                        width: "2px",
                        flex: 1,
                        minHeight: "40px",
                        background: "linear-gradient(to bottom, rgba(43,96,235,0.25), rgba(139,55,234,0.1))",
                        margin: "8px 0",
                      }}
                    />
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
                      color: "#9CA3AF",
                      fontWeight: 500,
                    }}
                  >
                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#4655EB", flexShrink: 0 }} />
                    {step.detail}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}