"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  MessageSquare,
  TrendingUp,
  Cpu,
  BarChart2,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  FileText,
  DollarSign,
  Calendar,
  AlertCircle,
  ChevronRight,
  Play,
  Search,
  Zap,
  Settings,
  Activity,
  Bell,
  CircleDot,
  Sun,
} from "lucide-react";

const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";
const GRADIENT_TEXT: React.CSSProperties = {
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

// ── DATA ──────────────────────────────────────────────────────────────────────

const painPoints = [
  {
    icon: Clock,
    title: "Billable time disappearing into admin",
    description:
      "Your highest-value hours go to chasing invoices, scheduling follow-ups, formatting proposals, and managing inboxes. Work that should never land on a senior professional's plate.",
  },
  {
    icon: AlertCircle,
    title: "Inconsistent client delivery",
    description:
      "Without a governed operating system, service quality depends on who is having a good week. Onboarding varies. Follow-up gaps open. Client experience is unpredictable.",
  },
  {
    icon: Users,
    title: "No cross-practice visibility",
    description:
      "Revenue leakage, pipeline gaps, and staff utilisation issues surface too late. You are making decisions on instinct rather than a live operational picture.",
  },
];

const agents = [
  {
    icon: MessageSquare,
    name: "Customer Experience Agent",
    tagline: "Every client feels like your only client.",
    description:
      "Structured onboarding for every engagement. Inquiry routing that never drops the ball. Satisfaction tracking that flags issues before they become complaints. Your client relationships run to a documented standard regardless of who is managing them.",
    automations: [
      "Engagement onboarding sequences",
      "Inquiry classification and routing",
      "Satisfaction tracking and escalation",
      "Post-engagement follow-up",
    ],
    color: "linear-gradient(135deg, #2B60EB, #4655EB)",
  },
  {
    icon: TrendingUp,
    name: "Sales Agent",
    tagline: "Your pipeline works while you bill.",
    description:
      "Inbound leads get an immediate, professional response. Prospects are qualified against your criteria before they reach your desk. Proposals are drafted. Follow-up sequences execute on schedule. No engagement falls through because someone was too busy to respond.",
    automations: [
      "Lead response and qualification",
      "Proposal generation from templates",
      "Multi-touch follow-up sequences",
      "Pipeline reporting and CRM hygiene",
    ],
    color: "linear-gradient(135deg, #4655EB, #584DEB)",
  },
  {
    icon: Cpu,
    name: "Operations Agent",
    tagline: "Consistent execution at every engagement.",
    description:
      "Tasks assigned. Progress tracked. SOPs maintained and versioned. Vendor and contractor communications managed. Compliance deadlines surfaced before they become problems. Your practice operates to a documented standard every day.",
    automations: [
      "Engagement task assignment and tracking",
      "SOP governance and versioning",
      "Contractor coordination",
      "Compliance deadline monitoring",
    ],
    color: "linear-gradient(135deg, #584DEB, #7341EA)",
  },
  {
    icon: BarChart2,
    name: "Finance Agent",
    tagline: "Revenue that gets collected.",
    description:
      "Invoices generated on completion triggers. Receivables tracked and followed up automatically. Expenses categorised without manual entry. Financial reports produced on schedule. You see what you are owed and what you have earned without chasing your own books.",
    automations: [
      "Invoice generation on engagement milestones",
      "Receivables tracking and follow-up",
      "Expense categorisation",
      "P&L and cashflow reporting",
    ],
    color: "linear-gradient(135deg, #7341EA, #8B37EA)",
  },
];

const automations = [
  { icon: FileText, text: "Engagement onboarding from signed agreement to kickoff" },
  { icon: TrendingUp, text: "Proposal generation from CRM opportunity data" },
  { icon: DollarSign, text: "Invoice triggers on project milestone completion" },
  { icon: Calendar, text: "Meeting scheduling and confirmation workflows" },
  { icon: Users, text: "Staff utilisation monitoring and reallocation alerts" },
  { icon: MessageSquare, text: "Client satisfaction checks at defined touchpoints" },
  { icon: FileText, text: "Compliance deadline tracking across all active engagements" },
  { icon: BarChart2, text: "Weekly practice performance reports to leadership" },
];

const howItWorks = [
  {
    step: "01",
    icon: Search,
    title: "Discovery and Diagnostic",
    duration: "2 to 3 weeks",
    description:
      "We conduct a structured audit of your practice across all operational domains — client delivery, pipeline management, finance, team coordination, and compliance. The output is a Diagnostic Report that maps your current gaps, quantifies value leakage, and defines the exact deployment scope. You own that report regardless of what you decide next.",
    detail: "Fixed-fee engagement. No ongoing commitment at this stage.",
  },
  {
    step: "02",
    icon: Settings,
    title: "Infrastructure Deployment",
    duration: "8 to 16 weeks",
    description:
      "All eight agents are configured and deployed against your specific integration environment — your CRM, your accounting platform, your project management tools. The Governing Agent goes live. Your leadership dashboard is built. SOPs are documented and your team is trained on how the approval gates work and what requires human judgment.",
    detail: "Fixed investment. You own all deployed infrastructure on completion.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Managed Services",
    duration: "Ongoing",
    description:
      "Once deployed, Quanton Labs operates the system on your behalf. We handle agent hosting, API costs, system monitoring, workflow optimisation, and quarterly strategic reviews. Your practice keeps running at full capacity. We surface what needs your attention and handle everything that does not.",
    detail: "Fixed monthly retainer. Six-month minimum, then month-to-month.",
  },
];

// ── MINI DASHBOARD DATA — Professional Services ───────────────────────────────

const dashMetrics = [
  { label: "Active Engagements", value: "4", delta: "+1 this month" },
  { label: "Receivables Outstanding", value: "$31,200", delta: "2 invoices past due" },
  { label: "Hours Recovered (Est.)", value: "18 hrs/wk", delta: "vs. pre-deployment" },
  { label: "Pipeline Value", value: "$94,500", delta: "3 active prospects" },
];

const dashEngagements = [
  { client: "Meridian Legal Group", stage: "Milestone 3 of 4", status: "on-track", invoiced: "$18,400" },
  { client: "Apex Advisory Partners", stage: "Onboarding", status: "on-track", invoiced: "$7,500" },
  { client: "Northgate Consulting", stage: "Proposal Sent", status: "pending", invoiced: "$0" },
  { client: "Clearfield & Associates", stage: "Milestone 2 of 3", status: "attention", invoiced: "$24,000" },
];

const dashExceptions = [
  { agent: "Finance Agent", message: "Invoice #1047 overdue by 8 days — Clearfield & Associates", severity: "high" },
  { agent: "Sales Agent", message: "Follow-up sequence stalled — Northgate Consulting, no open in 6 days", severity: "medium" },
  { agent: "Customer Experience", message: "Onboarding milestone missed — Apex Advisory Partners", severity: "medium" },
];

const dashGovFeed = [
  { color: "#4ADE80", label: "resolved", message: "Invoice follow-up sent — Clearfield & Associates", meta: "Finance Agent — automated, no action required" },
  { color: "#60A5FA", label: "insight", message: "Pipeline velocity up 22% — 3 proposals active", meta: "Synthesis: Sales + Marketing + CX" },
  { color: "#FBBF24", label: "escalated", message: "Onboarding gap flagged — Apex Advisory Partners", meta: "CX Agent — Governing Agent — awaiting review" },
  { color: "#A78BFA", label: "sync", message: "SOP v2.3 applied across all active engagements", meta: "Operations Agent — cross-domain update complete" },
];

// ── MINI DASHBOARD COMPONENT ──────────────────────────────────────────────────

function MiniDashboard({ inView }: { inView: boolean }) {
  const statusColor = (s: string) =>
    s === "on-track" ? "#4ADE80" : s === "attention" ? "#FBBF24" : "#60A5FA";
  const statusLabel = (s: string) =>
    s === "on-track" ? "On Track" : s === "attention" ? "Needs Attention" : "Pending";
  const severityColor = (s: string) =>
    s === "high" ? "#F87171" : "#FBBF24";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
      style={{ marginTop: "56px" }}
    >
      <div style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>

        {/* Top bar */}
        <div style={{ background: "#020D1F", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 6px rgba(74,222,153,0.6)" }} />
            <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "13px", color: "rgba(255,255,255,0.80)" }}>Leadership Dashboard</span>
            <span style={{ padding: "2px 10px", borderRadius: "100px", background: "rgba(43,96,235,0.18)", border: "1px solid rgba(43,96,235,0.3)", fontFamily: "Manrope, sans-serif", fontSize: "11px", fontWeight: 600, color: "#93C5FD" }}>Professional Services</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Activity size={12} color="rgba(255,255,255,0.3)" />
            <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>Live</span>
          </div>
        </div>

        {/* Body */}
        <div style={{ background: "rgba(255,255,255,0.025)", padding: "20px" }}>

          {/* Metric tiles */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }}>
            {dashMetrics.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, delay: 0.4 + i * 0.07, ease: "easeOut" }} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "14px 16px" }}>
                <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.38)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "6px" }}>{m.label}</div>
                <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "19px", color: "#ffffff", lineHeight: 1.1, marginBottom: "4px" }}>{m.value}</div>
                <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.30)" }}>{m.delta}</div>
              </motion.div>
            ))}
          </div>

          {/* Three-column lower row */}
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 0.9fr", gap: "12px" }}>

            {/* Active engagements */}
            <motion.div initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45, delay: 0.55, ease: "easeOut" }} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "8px" }}>
                <FileText size={12} color="#60A5FA" />
                <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "11px", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Active Engagements</span>
              </div>
              <div style={{ padding: "4px 0" }}>
                {dashEngagements.map((eng, i) => (
                  <motion.div key={eng.client} initial={{ opacity: 0, x: -6 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, delay: 0.6 + i * 0.06, ease: "easeOut" }} style={{ padding: "9px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: i < dashEngagements.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", gap: "10px" }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{eng.client}</div>
                      <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.32)", marginTop: "2px" }}>{eng.stage}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", flexShrink: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <CircleDot size={8} color={statusColor(eng.status)} />
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, color: statusColor(eng.status) }}>{statusLabel(eng.status)}</span>
                      </div>
                      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>{eng.invoiced}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Exceptions */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: 0.6, ease: "easeOut" }} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "8px" }}>
                <Bell size={12} color="#FBBF24" />
                <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "11px", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Exceptions</span>
              </div>
              <div style={{ padding: "4px 0" }}>
                {dashExceptions.map((ex, i) => (
                  <motion.div key={ex.message} initial={{ opacity: 0, x: 6 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, delay: 0.65 + i * 0.07, ease: "easeOut" }} style={{ padding: "10px 16px", borderBottom: i < dashExceptions.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: severityColor(ex.severity), flexShrink: 0, marginTop: "4px", boxShadow: `0 0 5px ${severityColor(ex.severity)}80` }} />
                    <div>
                      <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.38)", marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{ex.agent}</div>
                      <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.62)", lineHeight: 1.5 }}>{ex.message}</div>
                    </div>
                  </motion.div>
                ))}
                <div style={{ padding: "10px 16px 6px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "16px", height: "16px", borderRadius: "4px", background: GRADIENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Sun size={9} color="white" />
                  </div>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.22)" }}>Surfaced by Governing Agent</span>
                </div>
              </div>
            </motion.div>

            {/* Governing Agent feed */}
            <motion.div initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45, delay: 0.65, ease: "easeOut" }} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "8px" }}>
                <Activity size={12} color="#A78BFA" />
                <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "11px", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Governing Agent</span>
              </div>
              <div style={{ padding: "4px 0" }}>
                {dashGovFeed.map((item, i) => (
                  <motion.div key={item.message} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.3, delay: 0.7 + i * 0.06, ease: "easeOut" }} style={{ padding: "9px 16px", borderBottom: i < dashGovFeed.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: item.color, flexShrink: 0, marginTop: "5px", boxShadow: `0 0 4px ${item.color}90` }} />
                    <div>
                      <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.75)", lineHeight: 1.4, marginBottom: "3px" }}>
                        {item.message}
                        <span style={{ display: "inline-block", fontSize: "9px", fontWeight: 700, padding: "1px 5px", borderRadius: "3px", marginLeft: "5px", verticalAlign: "middle", background: `${item.color}22`, color: item.color }}>{item.label}</span>
                      </div>
                      <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.28)", lineHeight: 1.4 }}>{item.meta}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* Footer bar */}
        <div style={{ background: "#020D1F", padding: "8px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.22)" }}>Quanton OS — Professional Services deployment</span>
          <span style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, color: "#60A5FA" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 5px rgba(74,222,153,0.5)" }} />
            All systems operational
          </span>
        </div>

      </div>
    </motion.div>
  );
}

// ── AGENT CARD ────────────────────────────────────────────────────────────────

function AgentCard({ agent, index }: { agent: typeof agents[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const Icon = agent.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        border: hovered ? "1px solid rgba(43,96,235,0.3)" : "1px solid #E5E7EB",
        padding: "32px",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        boxShadow: hovered ? "0 12px 40px rgba(43,96,235,0.12)" : "0 2px 12px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: agent.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={20} color="white" />
        </div>
        <div>
          <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "17px", color: "#1F2937", marginBottom: "4px" }}>{agent.name}</div>
          <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, fontSize: "13px", ...GRADIENT_TEXT }}>{agent.tagline}</div>
        </div>
      </div>
      <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", color: "#374151", lineHeight: 1.7 }}>{agent.description}</div>
      <div style={{ height: "1px", background: "#F3F4F6" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {agent.automations.map((item) => (
          <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "Manrope, sans-serif", fontSize: "13px", color: "#6B7280" }}>
            <CheckCircle size={13} color="#2B60EB" style={{ flexShrink: 0 }} />
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function ProfessionalServices() {
  const painRef = useRef(null);
  const agentsRef = useRef(null);
  const automationsRef = useRef(null);
  const howItWorksRef = useRef(null);
  const testimonialRef = useRef(null);
  const ctaRef = useRef(null);

  const painInView = useInView(painRef, { once: true, margin: "-80px" });
  const agentsInView = useInView(agentsRef, { once: true, margin: "-80px" });
  const automationsInView = useInView(automationsRef, { once: true, margin: "-80px" });
  const howItWorksInView = useInView(howItWorksRef, { once: true, margin: "-80px" });
  const testimonialInView = useInView(testimonialRef, { once: true, margin: "-80px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });

  return (
    <div style={{ fontFamily: "Manrope, sans-serif" }}>

      {/* ── HERO ── */}
      <section
        style={{
          backgroundColor: "#ffffff",
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(43,96,235,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 0% 50%, rgba(139,55,234,0.05) 0%, transparent 70%),
            radial-gradient(circle, rgba(43,96,235,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "auto, auto, 28px 28px",
          paddingTop: "120px",
          paddingBottom: "100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: GRADIENT }} />

        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", border: "1px solid rgba(43,96,235,0.2)", background: "rgba(43,96,235,0.05)", marginBottom: "28px" }}>
              <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", ...GRADIENT_TEXT }}>Professional Services</span>
              <ChevronRight size={12} color="#4655EB" />
              <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, fontSize: "12px", color: "#6B7280" }}>Quanton OS</span>
            </div>

            <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.15, color: "#1F2937", marginBottom: "24px", letterSpacing: "-0.5px" }}>
              Your practice should run on{" "}
              <span style={{ ...GRADIENT_TEXT }}>systems, not heroics.</span>
            </h1>

            <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: "18px", color: "#374151", lineHeight: 1.75, maxWidth: "640px", margin: "0 auto 16px" }}>
              Professional services firms lose revenue to admin, inconsistency, and the absence of governed processes. Quanton OS deploys eight coordinated AI agents that handle the operational surface of your practice — so your team focuses on delivering, not managing.
            </p>

            <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, fontSize: "16px", color: "#1F2937", lineHeight: 1.7, marginBottom: "40px" }}>
              Consulting. Legal. Accounting. Agencies. Architecture. Any practice where expertise is the product and time is the constraint.
            </p>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/assessment" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", borderRadius: "8px", background: GRADIENT, color: "white", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none", transition: "opacity 0.2s ease, transform 0.2s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                Assess Your Business <ArrowRight size={16} />
              </Link>
              <Link href="https://calendly.com/quantonlabs/30min" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", borderRadius: "8px", background: "transparent", color: "#1F2937", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none", border: "1.5px solid #1F2937", transition: "opacity 0.2s ease, transform 0.2s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                Book a Discovery Call <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

         {/* ── VIDEO EMBED ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: "easeOut" }}
            style={{ marginTop: "64px" }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #E5E7EB",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                aspectRatio: "16 / 9",
                background: "#000000",
              }}
            >
              <iframe
                src="https://www.youtube-nocookie.com/embed/jRwekDL8ggY?rel=0&modestbranding=1"
                title="Your Fragmented Tools Are the Problem. AI Infrastructure Is the Fix | Quanton Labs"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section ref={painRef} style={{ backgroundColor: "#F9FAFB", padding: "100px 24px", borderTop: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={painInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease: "easeOut" }} style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px", ...GRADIENT_TEXT }}>The operational reality</div>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 42px)", color: "#1F2937", lineHeight: 1.25, maxWidth: "640px", margin: "0 auto" }}>The problems that keep principal-led firms from scaling</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {painPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <motion.div key={point.title} initial={{ opacity: 0, y: 28 }} animate={painInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }} style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #E5E7EB", padding: "32px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(43,96,235,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                    <Icon size={20} color="#2B60EB" />
                  </div>
                  <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "17px", color: "#1F2937", marginBottom: "12px", lineHeight: 1.35 }}>{point.title}</div>
                  <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", color: "#6B7280", lineHeight: 1.7 }}>{point.description}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AGENTS ── */}
      <section ref={agentsRef} style={{ backgroundColor: "#ffffff", padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={agentsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease: "easeOut" }} style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px", ...GRADIENT_TEXT }}>Built for your practice</div>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 42px)", color: "#1F2937", lineHeight: 1.25, maxWidth: "640px", margin: "0 auto 16px" }}>Four agents doing the work that drains your team</h2>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", color: "#6B7280", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto" }}>All eight agents are deployed at every engagement. These four carry the highest operational load for professional services firms.</p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))", gap: "24px" }}>
            {agents.map((agent, i) => <AgentCard key={agent.name} agent={agent} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── WHAT GETS AUTOMATED ── */}
      <section ref={automationsRef} style={{ backgroundColor: "#041227", padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={automationsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease: "easeOut" }} style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px", ...GRADIENT_TEXT }}>What gets automated</div>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 42px)", color: "#ffffff", lineHeight: 1.25, maxWidth: "600px", margin: "0 auto 16px" }}>Specific workflows that stop consuming your team</h2>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.60)", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto" }}>These are not hypothetical capabilities. These are the workflows Quanton OS configures and governs for professional services deployments.</p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            {automations.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.text} initial={{ opacity: 0, y: 20 }} animate={automationsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "20px 24px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(43,96,235,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={14} color="#60A5FA" />
                  </div>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.55, fontWeight: 500 }}>{item.text}</span>
                </motion.div>
              );
            })}
          </div>
          <MiniDashboard inView={automationsInView} />
        </div>
      </section>

      {/* ── ROI FRAMING ── */}
      <section style={{ backgroundColor: "#F9FAFB", padding: "100px 24px", borderTop: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "32px", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px", ...GRADIENT_TEXT }}>The operational shift</div>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.5vw, 38px)", color: "#1F2937", lineHeight: 1.25, marginBottom: "20px" }}>Time recovered. Revenue collected. Practice clarity restored.</h2>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", color: "#6B7280", lineHeight: 1.75 }}>The Phase 1 Discovery produces a Pre-sale ROI Estimate that quantifies value leakage across five categories specific to your practice — before any commitment is made.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { label: "Hours per week", value: "Recovered from admin", sub: "Billable time redirected to delivery" },
              { label: "Revenue leakage", value: "Identified and closed", sub: "Invoices, follow-up, and pipeline gaps" },
              { label: "Practice visibility", value: "Real-time across all engagements", sub: "One dashboard. No manual reporting." },
            ].map((stat) => (
              <div key={stat.label} style={{ background: "#ffffff", borderRadius: "12px", border: "1px solid #E5E7EB", padding: "20px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: "4px" }}>{stat.label}</div>
                <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "17px", marginBottom: "4px", ...GRADIENT_TEXT }}>{stat.value}</div>
                <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", color: "#6B7280" }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section ref={howItWorksRef} style={{ backgroundColor: "#ffffff", padding: "100px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={howItWorksInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease: "easeOut" }} style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px", ...GRADIENT_TEXT }}>How it works</div>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 42px)", color: "#1F2937", lineHeight: 1.25, maxWidth: "600px", margin: "0 auto 16px" }}>From first conversation to fully operational system</h2>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", color: "#6B7280", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto" }}>Every Quanton OS engagement follows the same three-phase structure. Here is what that looks like for a professional services firm.</p>
          </motion.div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {howItWorks.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === howItWorks.length - 1;
              return (
                <motion.div key={step.step} initial={{ opacity: 0, x: -24 }} animate={howItWorksInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: i * 0.14, ease: "easeOut" }} style={{ display: "grid", gridTemplateColumns: "80px 1fr" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: GRADIENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 16px rgba(43,96,235,0.25)" }}>
                      <Icon size={20} color="white" />
                    </div>
                    {!isLast && <div style={{ width: "2px", flex: 1, minHeight: "40px", background: "linear-gradient(to bottom, rgba(43,96,235,0.25), rgba(139,55,234,0.1))", margin: "8px 0" }} />}
                  </div>
                  <div style={{ paddingBottom: isLast ? "0px" : "48px", paddingLeft: "28px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
                      <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 26px)", color: "#1F2937", lineHeight: 1.2 }}>{step.title}</div>
                      <div style={{ padding: "4px 12px", borderRadius: "100px", background: "rgba(43,96,235,0.07)", border: "1px solid rgba(43,96,235,0.15)", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", ...GRADIENT_TEXT }}>{step.duration}</div>
                    </div>
                    <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", color: "#374151", lineHeight: 1.75, marginBottom: "16px", maxWidth: "680px" }}>{step.description}</p>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "Manrope, sans-serif", fontSize: "13px", color: "#9CA3AF", fontWeight: 500 }}>
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

     {/* ── TESTIMONIAL (hidden until real testimonials are available) ── */}
      {false && (
        <section ref={testimonialRef} style={{ backgroundColor: "#F9FAFB", padding: "80px 24px", borderTop: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={testimonialInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease: "easeOut" }} style={{ textAlign: "center", marginBottom: "40px" }}>
              <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", ...GRADIENT_TEXT }}>Client results</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 28 }} animate={testimonialInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }} style={{ background: "#ffffff", borderRadius: "20px", border: "1px solid #E5E7EB", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "linear-gradient(135deg, #EFF2FF 0%, #F5F3FF 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", borderBottom: "1px solid #E5E7EB" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(43,96,235,0.07) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />
                <div style={{ position: "relative", width: "60px", height: "60px", borderRadius: "50%", background: GRADIENT, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 24px rgba(43,96,235,0.3)" }}>
                  <Play size={22} color="white" fill="white" style={{ marginLeft: "3px" }} />
                </div>
                <div style={{ position: "relative", fontFamily: "Manrope, sans-serif", fontSize: "13px", color: "#9CA3AF", fontWeight: 500 }}>Video testimonial coming soon</div>
              </div>
              <div style={{ padding: "36px 40px" }}>
                <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "18px", fontWeight: 500, color: "#374151", lineHeight: 1.7, fontStyle: "italic", marginBottom: "24px" }}>
                  &quot;Quanton OS gave us back the hours we were losing to coordination and admin. Our senior team is billing more and managing less. The Governing Agent catches things before they become client-facing problems.&quot;
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: GRADIENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Users size={16} color="white" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "14px", color: "#1F2937", marginBottom: "2px" }}>Managing Partner</div>
                    <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", color: "#9CA3AF" }}>Professional Services Firm — testimonial forthcoming</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section ref={ctaRef} style={{ backgroundColor: "#ffffff", padding: "80px 24px 120px" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: "easeOut" }} style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center", background: "#F9FAFB", borderRadius: "24px", border: "1px solid #E5E7EB", padding: "64px 48px", boxShadow: "0 8px 40px rgba(43,96,235,0.08)" }}>
          <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "20px", ...GRADIENT_TEXT }}>Start with a diagnostic</div>
          <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.5vw, 38px)", color: "#1F2937", lineHeight: 1.25, marginBottom: "16px" }}>See where your practice stands before anything else.</h2>
          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", color: "#6B7280", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 40px" }}>The assessment identifies your highest-value operational opportunities and quantifies potential impact. No commitment required.</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/assessment" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", borderRadius: "8px", background: GRADIENT, color: "white", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none", transition: "opacity 0.2s ease, transform 0.2s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              Assess Your Business <ArrowRight size={16} />
            </Link>
            <Link href="https://calendly.com/quantonlabs/30min" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", borderRadius: "8px", background: "transparent", color: "#1F2937", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none", border: "1.5px solid #1F2937", transition: "opacity 0.2s ease, transform 0.2s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              Book a Discovery Call <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}