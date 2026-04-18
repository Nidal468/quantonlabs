"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  MessageSquare,
  Cpu,
  Package,
  BarChart2,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Calendar,
  FileText,
  Bell,
  ChevronRight,
  Play,
  Search,
  Zap,
  Settings,
  Activity,
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
    title: "Production scheduling running on spreadsheets and calls",
    description:
      "Coordinating orders, materials, and production runs manually creates constant bottlenecks. When one order slips, the whole schedule shifts — and customers find out when they call to chase their delivery, not before.",
  },
  {
    icon: Package,
    title: "Supplier delays and materials shortages stopping production",
    description:
      "Without governed inventory monitoring and supplier coordination, materials shortages surface after production has already been committed. The cost is not just the delay — it is the customer relationship and the margin lost to rush orders.",
  },
  {
    icon: AlertCircle,
    title: "No unified view from floor to leadership",
    description:
      "Order status, production progress, inventory levels, and financial performance are held in separate systems or people's heads. Leadership decisions are made on information that is days old and always incomplete.",
  },
];

const agents = [
  {
    icon: Cpu,
    name: "Operations Agent",
    tagline: "Production scheduling, order tracking, and floor coordination — governed.",
    description:
      "Orders tracked from intake to fulfillment. Production run assignments coordinated and communicated. Task assignments managed across the floor without the owner as the single point of contact. SOPs documented and enforced across product types and production processes. Your operation runs to a consistent standard whether you are present or not.",
    automations: [
      "Order intake and production scheduling",
      "Production task assignment and progress tracking",
      "SOP governance across product and process types",
      "Cross-functional coordination and bottleneck flagging",
    ],
    color: "linear-gradient(135deg, #2B60EB, #4655EB)",
  },
  {
    icon: Package,
    name: "Inventory and Supply Chain Agent",
    tagline: "Materials available when production needs them.",
    description:
      "Raw material and finished goods inventory monitored in real time. Reorder triggers executed before stockouts stall production runs. Supplier communications managed and delivery timelines tracked. Cost trends surfaced by material and supplier. Your production schedule holds because the materials are there when the floor needs them.",
    automations: [
      "Raw material and finished goods monitoring",
      "Automated reorder triggers before production impact",
      "Supplier communication and delivery tracking",
      "Materials cost trend analysis and variance alerts",
    ],
    color: "linear-gradient(135deg, #4655EB, #584DEB)",
  },
  {
    icon: MessageSquare,
    name: "Customer Experience Agent",
    tagline: "Every customer kept informed without manual effort.",
    description:
      "Order confirmation and estimated delivery communications sent automatically. Production milestone updates delivered to customers at defined intervals. Delay notifications triggered before customers have to chase. Post-delivery follow-up executed on completion. Your customers know the status of their order without calling your team to find out.",
    automations: [
      "Order confirmation and delivery communications",
      "Production milestone status updates",
      "Delay notifications before customer escalation",
      "Post-delivery follow-up and satisfaction tracking",
    ],
    color: "linear-gradient(135deg, #584DEB, #7341EA)",
  },
  {
    icon: BarChart2,
    name: "Finance Agent",
    tagline: "Orders invoiced. Cash flow visible. Books current.",
    description:
      "Invoices generated on order completion and shipment triggers. Outstanding balances tracked and followed up automatically. Costs categorised by order, product line, and supplier. Margin analysis surfaced without manual spreadsheet work. Financial reports produced on schedule. You see the financial performance of your operation in real time.",
    automations: [
      "Invoice generation on order completion and shipment",
      "Outstanding balance tracking and follow-up",
      "Cost categorisation by order and product line",
      "Margin analysis and financial performance reporting",
    ],
    color: "linear-gradient(135deg, #7341EA, #8B37EA)",
  },
];

const automations = [
  { icon: Bell, text: "Materials reorder triggers before production runs are at risk" },
  { icon: Calendar, text: "Order confirmation and estimated delivery communications on intake" },
  { icon: Clock, text: "Production milestone updates delivered to customers automatically" },
  { icon: AlertCircle, text: "Delay notifications triggered before customers escalate" },
  { icon: Package, text: "Supplier communication and purchase order management" },
  { icon: DollarSign, text: "Invoice generation on order completion and shipment confirmation" },
  { icon: FileText, text: "SOP compliance monitoring across production processes" },
  { icon: BarChart2, text: "Weekly production, fulfillment, and margin performance reporting" },
];

const howItWorks = [
  {
    step: "01",
    icon: Search,
    title: "Discovery and Diagnostic",
    duration: "2 to 3 weeks",
    description:
      "We audit your operation across every domain — production scheduling, materials management, order fulfillment, supplier coordination, customer communications, and financial visibility. The output is a Diagnostic Report that maps where delays originate, where margin is lost, and what infrastructure needs to be built. You own that report regardless of what you decide next.",
    detail: "Fixed-fee engagement. No ongoing commitment at this stage.",
  },
  {
    step: "02",
    icon: Settings,
    title: "Infrastructure Deployment",
    duration: "8 to 16 weeks",
    description:
      "All eight agents are configured against your specific environment — your ERP, your inventory system, your supplier network, your customer communication platforms. The Governing Agent goes live. Your leadership dashboard is built. Production scheduling workflows, materials reorder triggers, customer update sequences, and invoice automation are tested and governed. Your team is trained on what the system handles and what requires their judgment.",
    detail: "Fixed investment. You own all deployed infrastructure on completion.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Managed Services",
    duration: "Ongoing",
    description:
      "Quanton Labs operates the system on your behalf. Agent hosting, API costs, system monitoring, workflow optimisation, and quarterly strategic reviews are all included. Your operation keeps running at full capacity. We surface the exceptions that need leadership attention and handle everything that does not.",
    detail: "Fixed monthly retainer. Six-month minimum, then month-to-month.",
  },
];

// ── MINI DASHBOARD DATA — Manufacturing and Distribution ──────────────────────

const dashMetrics = [
  { label: "Active Production Orders", value: "18", delta: "4 due this week" },
  { label: "Materials Below Threshold", value: "3 SKUs", delta: "2 reorders triggered" },
  { label: "On-Time Fulfillment", value: "91%", delta: "Up from 74% pre-deployment" },
  { label: "Invoices Outstanding", value: "$47,200", delta: "Auto follow-up active" },
];

const dashOrders = [
  { order: "PO-2841 — Hartwell Distributors", product: "Steel Bracket Assembly x 400", status: "on-track", eta: "Ships Friday" },
  { order: "PO-2837 — Consolidated Supply", product: "Powder Coat Panels x 200", status: "attention", eta: "Materials delay — 2 days" },
  { order: "PO-2829 — Meridian Industrial", product: "Custom Fabrication Run", status: "on-track", eta: "In production — Day 3 of 5" },
  { order: "PO-2815 — Apex Components", product: "Aluminium Housing x 600", status: "pending", eta: "Awaiting materials confirmation" },
];

const dashExceptions = [
  { agent: "Inventory Agent", message: "Steel rod stock at 8% — reorder triggered, supplier ETA 3 business days", severity: "high" },
  { agent: "CX Agent", message: "PO-2837 delay notification sent to Consolidated Supply — 2-day push confirmed", severity: "medium" },
  { agent: "Finance Agent", message: "Invoice overdue 18 days — Apex Components, $12,400 outstanding", severity: "high" },
];

const dashGovFeed = [
  { color: "#4ADE80", label: "resolved", message: "Supplier reorder confirmed — steel rod delivery Wednesday", meta: "Inventory Agent — PO-2837 delay contained, PO-2841 unaffected" },
  { color: "#FBBF24", label: "escalated", message: "PO-2815 materials risk — Apex order at risk of slip beyond Thursday", meta: "Operations Agent — Governing Agent — leadership review required" },
  { color: "#60A5FA", label: "insight", message: "On-time fulfillment up 17 points since production scheduling deployed", meta: "Synthesis: Operations + Finance + CX" },
  { color: "#A78BFA", label: "sync", message: "Production SOP v2.1 applied — all active orders updated", meta: "Operations Agent — cross-domain update complete" },
];

// ── MINI DASHBOARD COMPONENT ──────────────────────────────────────────────────

function MiniDashboard({ inView }: { inView: boolean }) {
  const statusColor = (s: string) =>
    s === "on-track" ? "#4ADE80" : s === "attention" ? "#FBBF24" : "#60A5FA";
  const statusLabel = (s: string) =>
    s === "on-track" ? "On Track" : s === "attention" ? "Delayed" : "Pending";
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
            <span style={{ padding: "2px 10px", borderRadius: "100px", background: "rgba(43,96,235,0.18)", border: "1px solid rgba(43,96,235,0.3)", fontFamily: "Manrope, sans-serif", fontSize: "11px", fontWeight: 600, color: "#93C5FD" }}>Manufacturing and Distribution</span>
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

            {/* Active orders */}
            <motion.div initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45, delay: 0.55, ease: "easeOut" }} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "8px" }}>
                <Cpu size={12} color="#60A5FA" />
                <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "11px", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Active Orders</span>
              </div>
              <div style={{ padding: "4px 0" }}>
                {dashOrders.map((ord, i) => (
                  <motion.div key={ord.order} initial={{ opacity: 0, x: -6 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, delay: 0.6 + i * 0.06, ease: "easeOut" }} style={{ padding: "9px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: i < dashOrders.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", gap: "10px" }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ord.order}</div>
                      <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.32)", marginTop: "2px" }}>{ord.product}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", flexShrink: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <CircleDot size={8} color={statusColor(ord.status)} />
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, color: statusColor(ord.status) }}>{statusLabel(ord.status)}</span>
                      </div>
                      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>{ord.eta}</span>
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
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.22)" }}>Quanton OS — Manufacturing and Distribution deployment</span>
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

export default function ManufacturingDistribution() {
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

  const [videoHovered, setVideoHovered] = useState(false);

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
              <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", ...GRADIENT_TEXT }}>Manufacturing and Distribution</span>
              <ChevronRight size={12} color="#4655EB" />
              <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, fontSize: "12px", color: "#6B7280" }}>Quanton OS</span>
            </div>

            <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.15, color: "#1F2937", marginBottom: "24px", letterSpacing: "-0.5px" }}>
              Your operation runs on precision.{" "}
              <span style={{ ...GRADIENT_TEXT }}>The systems behind it should too.</span>
            </h1>

            <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: "18px", color: "#374151", lineHeight: 1.75, maxWidth: "640px", margin: "0 auto 16px" }}>
              Manufacturing and distribution businesses lose margin to production delays, materials shortages, and the absence of real-time visibility from floor to leadership. Quanton OS deploys eight coordinated AI agents that govern the operational layer of your business — so your team focuses on production, not coordination.
            </p>

            <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, fontSize: "16px", color: "#1F2937", lineHeight: 1.7, marginBottom: "40px" }}>
              Light manufacturing. Contract production. Wholesale distribution. Product-based businesses where order fulfillment and supply chain coordination determine the margin.
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
                src="https://www.youtube-nocookie.com/embed/r5OfSZdXOmM?rel=0&modestbranding=1"
                title="Production Delays Are Killing Your Margin. AI Infrastructure Is the Fix | Quanton Labs"
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
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 42px)", color: "#1F2937", lineHeight: 1.25, maxWidth: "640px", margin: "0 auto" }}>The problems that compress margin and limit growth in manufacturing and distribution</h2>
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
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px", ...GRADIENT_TEXT }}>Built for your operation</div>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 42px)", color: "#1F2937", lineHeight: 1.25, maxWidth: "640px", margin: "0 auto 16px" }}>Four agents governing what manual coordination cannot keep pace with</h2>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", color: "#6B7280", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto" }}>All eight agents are deployed at every engagement. These four carry the highest operational load for manufacturing and distribution businesses.</p>
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
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 42px)", color: "#ffffff", lineHeight: 1.25, maxWidth: "600px", margin: "0 auto 16px" }}>Specific workflows that protect production and fulfillment commitments</h2>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.60)", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto" }}>These are the workflows Quanton OS configures and governs for manufacturing and distribution deployments.</p>
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
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.5vw, 38px)", color: "#1F2937", lineHeight: 1.25, marginBottom: "20px" }}>Fewer delays. Protected margin. Full visibility from floor to leadership.</h2>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", color: "#6B7280", lineHeight: 1.75 }}>The Phase 1 Discovery produces a Pre-sale ROI Estimate that quantifies value leakage across five categories specific to your operation — before any commitment is made.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { label: "Production delays", value: "Reduced through materials governance", sub: "Reorder triggers and supplier coordination before shortages impact the floor" },
              { label: "Order fulfillment", value: "More predictable and customer-communicated", sub: "Status updates delivered automatically rather than reactively" },
              { label: "Leadership visibility", value: "Real-time across every operational domain", sub: "One governed dashboard rather than multiple disconnected systems" },
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
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", color: "#6B7280", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto" }}>Every Quanton OS engagement follows the same three-phase structure. Here is what that looks like for a manufacturing or distribution business.</p>
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
                  &quot;We were managing production schedules in spreadsheets and finding out about materials shortages when the floor stopped. Quanton OS gave us visibility we never had before and our on-time fulfillment rate has improved significantly since deployment.&quot;
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: GRADIENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <TrendingUp size={16} color="white" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "14px", color: "#1F2937", marginBottom: "2px" }}>Operations Director</div>
                    <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", color: "#9CA3AF" }}>Manufacturing Business — testimonial forthcoming</div>
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
          <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.5vw, 38px)", color: "#1F2937", lineHeight: 1.25, marginBottom: "16px" }}>See where your operation stands before anything else.</h2>
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