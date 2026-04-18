"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  MessageSquare,
  TrendingUp,
  Package,
  BarChart2,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  DollarSign,
  Calendar,
  FileText,
  Bell,
  ShoppingBag,
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
    icon: Package,
    title: "Inventory decisions made on instinct rather than data",
    description:
      "Without real-time stock visibility across channels, overstock and stockout happen simultaneously. Products sit unsold while bestsellers run dry, and purchasing decisions are made on gut feel rather than performance data.",
  },
  {
    icon: RefreshCw,
    title: "Customer retention left to chance",
    description:
      "Customers who had a great experience in-store or online simply never return because no one followed up. Lapsed customers, abandoned carts, and missed loyalty touchpoints quietly erode the repeat revenue that independent retail depends on.",
  },
  {
    icon: AlertCircle,
    title: "Marketing execution inconsistent without dedicated staff",
    description:
      "Content falls behind when operations get busy. Promotions go out late or not at all. Social presence goes quiet during peak periods when visibility matters most. Marketing is always the first thing to drop when the store gets busy.",
  },
];

const agents = [
  {
    icon: Package,
    name: "Inventory and Supply Chain Agent",
    tagline: "The right products, in stock, before you run out.",
    description:
      "Stock levels monitored in real time across your store and online channels. Reorder triggers executed automatically before stockouts occur. Supplier communications managed and delivery timelines tracked. Slow-moving inventory flagged for markdown decisions. Your purchasing reflects what is actually selling, not what you remember was selling.",
    automations: [
      "Real-time stock monitoring across channels",
      "Automated reorder triggers before stockout",
      "Supplier communication and delivery tracking",
      "Slow-moving inventory flagging and markdown alerts",
    ],
    color: "linear-gradient(135deg, #2B60EB, #4655EB)",
  },
  {
    icon: MessageSquare,
    name: "Customer Experience Agent",
    tagline: "Every customer relationship maintained beyond the transaction.",
    description:
      "Post-purchase follow-up sequences executed automatically. Abandoned cart recovery triggered at defined intervals. Loyalty touchpoints delivered at configured milestones. Complaint routing and resolution tracking handled without manual intervention. Your customers feel attended to whether your team has bandwidth or not.",
    automations: [
      "Post-purchase follow-up and review requests",
      "Abandoned cart recovery sequences",
      "Loyalty milestone communications",
      "Complaint routing and satisfaction tracking",
    ],
    color: "linear-gradient(135deg, #4655EB, #584DEB)",
  },
  {
    icon: TrendingUp,
    name: "Marketing and Content Agent",
    tagline: "Consistent brand presence whether the store is quiet or slammed.",
    description:
      "Editorial calendar planned and executed across your active channels. Product content drafted and queued for review. Promotional campaigns coordinated with inventory data so you are not marketing products that are out of stock. Performance tracked and underperforming content flagged. Your brand shows up consistently regardless of how busy the floor is.",
    automations: [
      "Editorial calendar management across channels",
      "Product content generation and scheduling",
      "Promotional campaign coordination with inventory",
      "Content performance tracking and reporting",
    ],
    color: "linear-gradient(135deg, #584DEB, #7341EA)",
  },
  {
    icon: BarChart2,
    name: "Finance Agent",
    tagline: "Sales tracked. Margins visible. Cash flow clear.",
    description:
      "Revenue categorised by product, channel, and period automatically. Margin analysis surfaced without manual spreadsheet work. Supplier invoices processed and outstanding balances tracked. Financial reports produced on schedule. You see the financial performance of your store in real time without waiting for your accountant.",
    automations: [
      "Revenue categorisation by product and channel",
      "Margin analysis and low-margin product flagging",
      "Supplier invoice processing and tracking",
      "Cash flow and sales performance reporting",
    ],
    color: "linear-gradient(135deg, #7341EA, #8B37EA)",
  },
];

const automations = [
  { icon: Bell, text: "Inventory reorder triggers before products reach critical stock levels" },
  { icon: ShoppingBag, text: "Abandoned cart recovery sequences at 1, 24, and 72-hour intervals" },
  { icon: MessageSquare, text: "Post-purchase follow-up and review requests at 48 hours" },
  { icon: RefreshCw, text: "Lapsed customer re-engagement at 30, 60, and 90-day thresholds" },
  { icon: Calendar, text: "Promotional content scheduled in advance across active channels" },
  { icon: Package, text: "Slow-moving inventory flagged for markdown or supplier return" },
  { icon: FileText, text: "Supplier communication and purchase order management" },
  { icon: BarChart2, text: "Weekly sales, margin, and inventory performance reporting" },
];

const howItWorks = [
  {
    step: "01",
    icon: Search,
    title: "Discovery and Diagnostic",
    duration: "2 to 3 weeks",
    description:
      "We audit your store across every operational domain — inventory management, purchasing decisions, customer retention, marketing execution, and financial visibility. The output is a Diagnostic Report that maps where margin is leaking, where repeat revenue is being lost, and exactly what infrastructure needs to be built. You own that report regardless of what you decide next.",
    detail: "Fixed-fee engagement. No ongoing commitment at this stage.",
  },
  {
    step: "02",
    icon: Settings,
    title: "Infrastructure Deployment",
    duration: "8 to 16 weeks",
    description:
      "All eight agents are configured against your specific environment — your POS system, your e-commerce platform, your supplier network. The Governing Agent goes live. Your leadership dashboard is built. Inventory reorder workflows, abandoned cart sequences, post-purchase follow-ups, and marketing calendars are tested and governed. Your team is trained on what the system handles and what requires their decision.",
    detail: "Fixed investment. You own all deployed infrastructure on completion.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Managed Services",
    duration: "Ongoing",
    description:
      "Quanton Labs operates the system on your behalf. Agent hosting, API costs, system monitoring, workflow optimisation, and quarterly strategic reviews are all included. Your store keeps running at full operational capacity. We surface the exceptions that need your attention and handle everything that does not.",
    detail: "Fixed monthly retainer. Six-month minimum, then month-to-month.",
  },
];

// ── MINI DASHBOARD DATA — Retail ─────────────────────────────────────────────

const dashMetrics = [
  { label: "SKUs Below Threshold", value: "7", delta: "3 reorders triggered today" },
  { label: "Abandoned Carts (7d)", value: "24", delta: "11 recovered this week" },
  { label: "Repeat Purchase Rate", value: "34%", delta: "Up from 21% pre-deployment" },
  { label: "Revenue This Week", value: "$18,640", delta: "vs. $14,200 last week" },
];

const dashInventory = [
  { product: "Merino Wool Crew — Navy S/M", category: "Apparel", status: "on-track", stock: "94 units" },
  { product: "Canvas Tote — Natural", category: "Accessories", status: "attention", stock: "4 units — reorder sent" },
  { product: "Linen Shirt — White XL", category: "Apparel", status: "pending", stock: "Awaiting supplier ETA" },
  { product: "Leather Card Holder — Black", category: "Accessories", status: "on-track", stock: "62 units" },
];

const dashExceptions = [
  { agent: "Inventory Agent", message: "Stockout risk — Canvas Tote Natural, 4 units remaining, reorder triggered", severity: "high" },
  { agent: "Marketing Agent", message: "Promotional post scheduled for Friday references out-of-stock SKU — review required", severity: "high" },
  { agent: "CX Agent", message: "Lapsed customer threshold hit — 18 customers at 60-day mark, re-engagement queued", severity: "medium" },
];

const dashGovFeed = [
  { color: "#4ADE80", label: "resolved", message: "Abandoned cart recovered — K. Osei, order confirmed $142", meta: "CX Agent — 24-hr sequence triggered automatically" },
  { color: "#F87171", label: "urgent", message: "Promo post conflicts with stockout — Friday campaign flagged", meta: "Marketing Agent — Governing Agent — awaiting review" },
  { color: "#60A5FA", label: "insight", message: "Linen Shirt White performing 3x category average — reorder recommended", meta: "Synthesis: Inventory + Finance" },
  { color: "#A78BFA", label: "sync", message: "Supplier reorder SOP v1.3 applied — 3 SKUs updated", meta: "Operations Agent — cross-domain update complete" },
];

// ── MINI DASHBOARD COMPONENT ──────────────────────────────────────────────────

function MiniDashboard({ inView }: { inView: boolean }) {
  const statusColor = (s: string) =>
    s === "on-track" ? "#4ADE80" : s === "attention" ? "#FBBF24" : "#60A5FA";
  const statusLabel = (s: string) =>
    s === "on-track" ? "Healthy" : s === "attention" ? "Low Stock" : "Pending";
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
            <span style={{ padding: "2px 10px", borderRadius: "100px", background: "rgba(43,96,235,0.18)", border: "1px solid rgba(43,96,235,0.3)", fontFamily: "Manrope, sans-serif", fontSize: "11px", fontWeight: 600, color: "#93C5FD" }}>Retail</span>
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

            {/* Inventory status */}
            <motion.div initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45, delay: 0.55, ease: "easeOut" }} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "8px" }}>
                <Package size={12} color="#60A5FA" />
                <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "11px", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Inventory Status</span>
              </div>
              <div style={{ padding: "4px 0" }}>
                {dashInventory.map((item, i) => (
                  <motion.div key={item.product} initial={{ opacity: 0, x: -6 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, delay: 0.6 + i * 0.06, ease: "easeOut" }} style={{ padding: "9px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: i < dashInventory.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", gap: "10px" }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.product}</div>
                      <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.32)", marginTop: "2px" }}>{item.category}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", flexShrink: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <CircleDot size={8} color={statusColor(item.status)} />
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, color: statusColor(item.status) }}>{statusLabel(item.status)}</span>
                      </div>
                      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>{item.stock}</span>
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
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.22)" }}>Quanton OS — Retail deployment</span>
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

export default function Retail() {
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
              <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", ...GRADIENT_TEXT }}>Retail</span>
              <ChevronRight size={12} color="#4655EB" />
              <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, fontSize: "12px", color: "#6B7280" }}>Quanton OS</span>
            </div>

            <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.15, color: "#1F2937", marginBottom: "24px", letterSpacing: "-0.5px" }}>
              Your store is the experience.{" "}
              <span style={{ ...GRADIENT_TEXT }}>The operation needs to match it.</span>
            </h1>

            <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: "18px", color: "#374151", lineHeight: 1.75, maxWidth: "640px", margin: "0 auto 16px" }}>
              Independent retailers lose margin to inventory decisions made without data, customers who never return, and marketing that goes quiet when the store gets busy. Quanton OS deploys eight coordinated AI agents that govern the operational layer of your store — so your team focuses on the customer in front of them, not the systems behind them.
            </p>

            <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, fontSize: "16px", color: "#1F2937", lineHeight: 1.7, marginBottom: "40px" }}>
              Boutiques. Specialty stores. Multi-location retail. Product-based businesses with physical and online presence. Any independent retailer where product curation and customer experience define the brand.
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
                src="https://www.youtube-nocookie.com/embed/0aCfMEyYPH8?rel=0&modestbranding=1"
                title="Why Retail Stores Lose Revenue to Their Own Operations | Quanton Labs"
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
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 42px)", color: "#1F2937", lineHeight: 1.25, maxWidth: "640px", margin: "0 auto" }}>The problems that keep independent retailers from growing profitably</h2>
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
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px", ...GRADIENT_TEXT }}>Built for your store</div>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 42px)", color: "#1F2937", lineHeight: 1.25, maxWidth: "640px", margin: "0 auto 16px" }}>Four agents running what your team cannot keep up with manually</h2>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", color: "#6B7280", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto" }}>All eight agents are deployed at every engagement. These four carry the highest operational load for independent retailers.</p>
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
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 42px)", color: "#ffffff", lineHeight: 1.25, maxWidth: "600px", margin: "0 auto 16px" }}>Specific workflows that protect margin and drive repeat revenue</h2>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.60)", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto" }}>These are the workflows Quanton OS configures and governs for retail deployments.</p>
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
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.5vw, 38px)", color: "#1F2937", lineHeight: 1.25, marginBottom: "20px" }}>Better inventory decisions. More repeat customers. Margin protected.</h2>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", color: "#6B7280", lineHeight: 1.75 }}>The Phase 1 Discovery produces a Pre-sale ROI Estimate that quantifies value leakage across five categories specific to your store — before any commitment is made.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { label: "Inventory margin", value: "Protected through data-driven purchasing", sub: "Reorder decisions based on actual sell-through rather than instinct" },
              { label: "Repeat customer revenue", value: "Recovered through retention automation", sub: "Lapsed customers and abandoned carts converted at scale" },
              { label: "Marketing consistency", value: "Maintained regardless of floor traffic", sub: "Content and promotions execute on schedule without manual effort" },
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
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", color: "#6B7280", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto" }}>Every Quanton OS engagement follows the same three-phase structure. Here is what that looks like for an independent retailer.</p>
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
                  &quot;We were constantly running out of our best sellers while sitting on inventory that would not move. Quanton OS fixed the purchasing side and brought back customers we had completely lost touch with. Our repeat purchase rate has improved significantly.&quot;
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: GRADIENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <ShoppingBag size={16} color="white" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "14px", color: "#1F2937", marginBottom: "2px" }}>Store Owner</div>
                    <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", color: "#9CA3AF" }}>Independent Retail — testimonial forthcoming</div>
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
          <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.5vw, 38px)", color: "#1F2937", lineHeight: 1.25, marginBottom: "16px" }}>See where your store stands before anything else.</h2>
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