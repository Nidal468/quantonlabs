"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wrench, Building2, Split } from "lucide-react";

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
    title: "Build it yourself",
    body: "Agent platforms hand you the tools and leave you the architecture. You get individual agents with no coordination layer, no governance, and no one accountable when they conflict. IDC found that 88% of AI proofs of concept never reach production. The tooling was never the hard part.",
  },
  {
    icon: Building2,
    title: "Hire an agency",
    body: "Automation agencies build workflows fast and keep the keys. Every change runs through their queue, every optimization bills by the hour, and the day the relationship ends, the expertise walks out with it. You rent outcomes. You never own the system producing them.",
  },
  {
    icon: Split,
    title: "Buy an AI-native ERP",
    body: "A funded category of AI-native ERP vendors has validated the core thesis: the system of record is where AI belongs. Then they split your business in two, financials in their system, operations everywhere else, and leave you owning the seam between them. The gap between systems is where exceptions hide and margins leak.",
  },
];

export default function ContrastSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} style={{ backgroundColor: "#041227", padding: "100px 24px" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: "56px" }}
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
              maxWidth: "640px",
              margin: "0 auto 16px",
            }}
          >
            Every path to AI-run operations forces a trade. Except one.
          </h2>
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "16px",
              color: "rgba(255,255,255,0.60)",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            Operators evaluating AI infrastructure face three established paths. Each one solves part of the problem and hands you a new one.
          </p>
        </motion.div>

        <div
          className="contrast-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap: "20px",
            marginBottom: "48px",
          }}
        >
          {alternatives.map((alt, i) => {
            const Icon = alt.icon;
            return (
              <motion.div
                key={alt.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.12 + i * 0.12, ease: "easeOut" }}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} color="rgba(255,255,255,0.85)" />
                </div>
                <div
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 700,
                    fontSize: "19px",
                    color: "#FFFFFF",
                    lineHeight: 1.3,
                  }}
                >
                  {alt.title}
                </div>
                <p
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {alt.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.5, ease: "easeOut" }}
          style={{
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.03)",
            padding: "40px 36px",
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
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "17px",
              color: "rgba(255,255,255,0.80)",
              lineHeight: 1.8,
              margin: 0,
              maxWidth: "880px",
            }}
          >
            <span style={{ color: "#FFFFFF", fontWeight: 700 }}>Quanton OS takes none of these trades.</span>{" "}
            One system of record. Eight coordinated agents under one Governing Agent. Deployed and operated by
            Quanton Labs, owned outright by you. The coordination problem, the dependency problem, and the seam
            problem are all solved by the same architectural decision: everything runs on one governed core, and
            that core is yours.
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contrast-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}