"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const osSystems = [
  {
    label: "INTELLIGENCE",
    name: "Strategy",
    principle: "Intelligence",
    borderColor: "#2B60EB",
    description: "Defines business objectives, growth metrics, and strategic priorities. Establishes clarity between vision and execution through diagnostic analysis, KPI frameworks, and performance reviews.",
    agents: ["Marketing and Content Agent", "Finance Agent"],
    agentDescriptions: ["Campaign context, performance data, brand intelligence", "KPI tracking, financial performance, reporting"],
    metrics: [
      { label: "Functional agents", value: "2 of 7", pct: 29 },
      { label: "KPI frameworks", value: "Active", pct: 100 },
      { label: "Review automation", value: "87%", pct: 87 },
    ],
    chips: ["Diagnostic Analysis", "KPI Frameworks", "Performance Reviews", "Strategic Planning", "Executive Reporting"],
  },
  {
    label: "ARCHITECTURE",
    name: "Platform",
    principle: "Architecture",
    borderColor: "#4655EB",
    description: "Builds the intelligent infrastructure that powers execution. Connects digital systems, brand assets, data pipelines, and intelligence layers into a unified operational foundation.",
    agents: ["Operations Agent", "Finance Agent"],
    agentDescriptions: ["Task management, SOP governance, vendor coordination", "Financial processing, invoice generation, compliance"],
    metrics: [
      { label: "Functional agents", value: "2 of 7", pct: 29 },
      { label: "Integration categories", value: "Up to 8", pct: 100 },
      { label: "SOP coverage", value: "100%", pct: 100 },
    ],
    chips: ["SOP Automation", "Data Pipelines", "Intelligent Task Delegation", "System Integration", "Dashboard Architecture"],
  },
  {
    label: "PRECISION",
    name: "Operations",
    principle: "Precision",
    borderColor: "#7341EA",
    description: "Governs day-to-day execution through client service delivery, internal compliance, and quality assurance. Ensures consistent performance and operational integrity across every agent domain.",
    agents: ["Customer Experience Agent", "People and Team Agent", "Operations Agent", "Inventory and Supply Chain Agent", "Finance Agent"],
    agentDescriptions: ["Client onboarding, inquiry routing, satisfaction tracking", "Recruiting, onboarding, certification compliance", "Task assignment, process compliance, vendor coordination", "Stock monitoring, reorder management, supplier comms", "Receivables, expense categorisation, compliance deadlines"],
    metrics: [
      { label: "Functional agents", value: "5 of 7", pct: 71 },
      { label: "Approval gate types", value: "3 active", pct: 100 },
      { label: "Exception resolution", value: "Human-led", pct: 100 },
    ],
    chips: ["Escalation Routing", "Compliance Monitoring", "SOP Enforcement", "Vendor Coordination", "Quality Assurance"],
  },
  {
    label: "MOMENTUM",
    name: "Growth",
    principle: "Momentum",
    borderColor: "#8B37EA",
    description: "Drives revenue generation and market visibility through multichannel campaigns, conversion optimisation, and iterative testing. Translates strategy into measurable growth.",
    agents: ["Marketing and Content Agent", "Sales Agent", "Customer Experience Agent"],
    agentDescriptions: ["Content planning, distribution, brand voice enforcement", "Lead lifecycle, proposals, pipeline reporting, CRM hygiene", "Conversion support, post-service follow-up, satisfaction data"],
    metrics: [
      { label: "Functional agents", value: "3 of 7", pct: 43 },
      { label: "Pipeline tracking", value: "Real time", pct: 100 },
      { label: "Campaign automation", value: "Multi-channel", pct: 100 },
    ],
    chips: ["Lead Qualification", "Outbound Prospecting", "Campaign Automation", "Pipeline Management", "Conversion Tracking"],
  },
];

function OSCard({ os, index, isInView }: { os: typeof osSystems[0]; index: number; isInView: boolean }) {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isInView) return;
    const delay = index * 150 + 600;
    const timer = setTimeout(() => {
      barsRef.current.forEach((bar, i) => {
        if (bar) bar.style.width = `${os.metrics[i].pct}%`;
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [isInView, index, os.metrics]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderTop: `3px solid ${os.borderColor}`,
        borderRadius: "14px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "0px",
        transition: "all 0.25s ease",
      }}
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(43,96,235,0.10)" }}
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
          marginBottom: "6px",
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
          fontSize: "22px",
          marginBottom: "4px",
        }}
      >
        {os.name}
      </h3>

      <div
        style={{
          color: "#6B7280",
          fontFamily: "Manrope, sans-serif",
          fontSize: "12px",
          fontWeight: 600,
          marginBottom: "14px",
          letterSpacing: "0.04em",
        }}
      >
        Design principle: {os.principle}
      </div>

      <p
        style={{
          color: "#374151",
          fontSize: "14px",
          lineHeight: 1.7,
          marginBottom: "24px",
          fontFamily: "Manrope, sans-serif",
        }}
      >
        {os.description}
      </p>

      {/* Metrics */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "24px",
          padding: "16px",
          borderRadius: "10px",
          background: "#F9FAFB",
          border: "1px solid #E5E7EB",
        }}
      >
        {os.metrics.map((metric, i) => (
          <div key={i}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <span
                style={{
                  color: "#6B7280",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "12px",
                }}
              >
                {metric.label}
              </span>
              <span
                style={{
                  color: "#1F2937",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {metric.value}
              </span>
            </div>
            <div
              style={{
                height: "4px",
                borderRadius: "2px",
                background: "#E5E7EB",
                overflow: "hidden",
              }}
            >
              <div
                ref={el => { barsRef.current[i] = el; }}
                style={{
                  width: "0%",
                  height: "100%",
                  borderRadius: "2px",
                  background: `linear-gradient(to right, #2B60EB, ${os.borderColor})`,
                  transition: "width 1.2s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Agents */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            color: "#6B7280",
            fontFamily: "Manrope, sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            marginBottom: "10px",
          }}
        >
          Agents in this system
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {os.agents.map((agent, i) => (
            <div
              key={i}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                background: "#F9FAFB",
                border: "1px solid #E5E7EB",
              }}
            >
              <div
                style={{
                  color: "#1F2937",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "2px",
                }}
              >
                {agent}
              </div>
              <div
                style={{
                  color: "#6B7280",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "12px",
                }}
              >
                {os.agentDescriptions[i]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
        {os.chips.map((chip) => (
          <span
            key={chip}
            style={{
              background: "#F9FAFB",
              border: "1px solid #E5E7EB",
              borderRadius: "20px",
              padding: "5px 12px",
              fontSize: "12px",
              color: "#374151",
              fontFamily: "Manrope, sans-serif",
              cursor: "default",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(43,96,235,0.08)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(43,96,235,0.30)";
              (e.currentTarget as HTMLElement).style.color = "#2B60EB";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "#F9FAFB";
              (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB";
              (e.currentTarget as HTMLElement).style.color = "#374151";
            }}
          >
            {chip}
          </span>
        ))}
      </div>

      {/* Governing Agent footer */}
      <div
        style={{
          borderTop: "1px solid #E5E7EB",
          paddingTop: "14px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2B60EB, #8B37EA)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            color: "#6B7280",
            fontFamily: "Manrope, sans-serif",
            fontSize: "12px",
          }}
        >
          Coordinated by the Governing Agent
        </span>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: "0px" });

  return (
    <section style={{ backgroundColor: "#FFFFFF", padding: "120px 0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2
            style={{
              background: "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 800,
              fontSize: "44px",
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
            <OSCard key={os.name} os={os} index={index} isInView={isInView} />
          ))}
        </div>

      </div>
    </section>
  );
}
