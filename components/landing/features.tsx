"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const osSystems = [
  {
    label: "INTELLIGENCE",
    name: "Strategy — Intelligence",
    borderColor: "#2B60EB",
    description: "Defines business objectives, growth metrics, and strategic priorities. Establishes clarity between vision and execution through diagnostic analysis, KPI frameworks, and performance reviews.",
    chips: ["Unified Multi-Agent Orchestration", "Cross-Department Workflow Automation", "Autonomous Revenue Pipeline Management", "Intelligent Content Engine", "Executive KPI Command Center", "Exception & Risk Detection", "Full Customer Lifecycle Management", "Automated Hiring Infrastructure"],
  },
  {
    label: "ARCHITECTURE",
    name: "Platform — Architecture",
    borderColor: "#4655EB",
    description: "Builds the intelligent infrastructure that powers execution. Connects digital systems, brand assets, data pipelines, and intelligence layers into a unified operational foundation.",
    chips: ["SOP & Knowledge Base Automation", "Intelligent Task Delegation", "Predictive Revenue Forecasting", "Financial Execution Engine", "Inventory & Demand Forecasting", "Supplier Coordination Layer", "Brand Voice Governance", "Proposal & Contract Generation"],
  },
  {
    label: "PRECISION",
    name: "Operations — Precision",
    borderColor: "#7341EA",
    description: "Governs day-to-day execution through client service delivery, internal compliance, and quality assurance. Ensures consistent performance and operational integrity across every agent domain.",
    chips: ["Retention & Segmentation Intelligence", "Escalation & Conflict Routing", "Performance Attribution Analytics", "Leadership-Level Business Synthesis", "Social Content Scheduling", "Email Campaign Automation", "Competitive Monitoring", "Editorial Calendar Management"],
  },
  {
    label: "MOMENTUM",
    name: "Growth — Momentum",
    borderColor: "#8B37EA",
    description: "Drives revenue generation and market visibility through multichannel campaigns, conversion optimisation, and iterative testing. Translates strategy into measurable growth.",
    chips: ["Outbound Prospecting Engine", "Lead Qualification Logic", "Win/Loss Analysis", "Team Scheduling", "Performance Review Preparation", "Vendor Cost Analysis", "Meeting Intelligence Capture", "Process Compliance Monitoring"],
  },
];

export default function Features() {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: "0px" });

  return (
    <section style={{ backgroundColor: "#FFFFFF", padding: "120px 0" }}>
      <style>{`
        .os-chip {
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 20px;
          padding: 6px 14px;
          font-size: 13px;
          color: #374151;
          display: inline-flex;
          font-family: Manrope, sans-serif;
          transition: all 0.15s ease;
          cursor: default;
        }
        .os-chip:hover {
          background: rgba(43,96,235,0.08);
          border-color: rgba(43,96,235,0.30);
          color: #2B60EB;
        }
        .os-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          padding: 36px;
          transition: all 0.25s ease;
          cursor: default;
        }
        .os-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(43,96,235,0.10);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
  key={os.name}
  initial={{ opacity: 0, y: 56, scale: 0.97 }}
  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
  className="os-card"
  style={{ borderTop: `3px solid ${os.borderColor}` }}
>
          <h2
            style={{
              background: "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 800,
              fontSize: "56px",
              textAlign: "center",
              marginBottom: "24px",
              lineHeight: 1.15,
            }}
          >
            One Operating System. Four Coordinated Systems. Eight AI Agents.
          </h2>
          <p
            style={{
              color: "#374151",
              fontSize: "18px",
              maxWidth: "640px",
              margin: "0 auto",
              lineHeight: 1.7,
              fontFamily: "Manrope, sans-serif",
              textAlign: "center",
            }}
          >
            Quanton OS organises every business function into four interconnected operating systems. Eight AI agents operate within this structure, covering the complete operational surface area of a growth-stage business. Everything is coordinated. Nothing works in isolation.
          </p>
        </motion.div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {osSystems.map((os, index) => (
            <motion.div
              key={os.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.12 }}
              className="os-card"
              style={{ borderTop: `3px solid ${os.borderColor}` }}
            >
              <div
                style={{
                  background: "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 600,
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  marginBottom: "8px",
                  textTransform: "uppercase" as const,
                }}
              >
                {os.label}
              </div>
              <h3
                style={{
                  color: "#1F2937",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 700,
                  fontSize: "20px",
                  marginBottom: "12px",
                }}
              >
                {os.name}
              </h3>
              <p
                style={{
                  color: "#374151",
                  fontSize: "15px",
                  lineHeight: 1.65,
                  marginBottom: "24px",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {os.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {os.chips.map((chip) => (
                  <span key={chip} className="os-chip">
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
