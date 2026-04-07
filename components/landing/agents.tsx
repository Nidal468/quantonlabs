"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, TrendingUp, MessageSquare, Users, Cpu, Truck, BarChart2 } from "lucide-react";

const agents = [
  {
    name: "Marketing and Content Agent",
    system: "Growth System",
    description:
      "Your brand shows up every day whether you are in the room or not. The Marketing and Content Agent runs your editorial calendar, publishes across every channel, enforces your brand voice on every word, and feeds your sales pipeline with warm signals. Consistent. On-brand. Always on.",
    icon: Send,
    chips: ["Editorial calendar", "Brand voice enforcement", "Channel distribution", "Pipeline signals"],
  },
  {
    name: "Sales Agent",
    system: "Growth System",
    description:
      "Your pipeline never sleeps. The Sales Agent responds to leads instantly, qualifies them against your criteria, generates proposals, and follows up across every touchpoint until the deal moves or the prospect opts out. No lead falls through the cracks. No follow-up gets forgotten.",
    icon: TrendingUp,
    chips: ["Lead response", "Qualification", "Proposal generation", "Follow-up sequences"],
  },
  {
    name: "Customer Experience Agent",
    system: "Operations and Growth Systems",
    description:
      "Every client feels like your only client. The Customer Experience Agent handles onboarding, responds to inquiries, manages your calendar, and tracks satisfaction across every interaction. Your clients get a seamless experience. You get time back.",
    icon: MessageSquare,
    chips: ["Client onboarding", "Inquiry routing", "Scheduling", "Satisfaction tracking"],
  },
  {
    name: "People and Team Agent",
    system: "Operations System",
    description:
      "Building a team should not consume the team you already have. The People and Team Agent runs your recruiting pipeline, screens candidates, schedules interviews, onboards new hires, and tracks certifications and compliance deadlines. Your people operations run without you micromanaging them.",
    icon: Users,
    chips: ["Recruiting pipeline", "Candidate screening", "Onboarding", "Certification tracking"],
  },
  {
    name: "Operations Agent",
    system: "Operations and Platform Systems",
    description:
      "Execution without the chaos. The Operations Agent assigns tasks, tracks progress, maintains your SOPs, coordinates vendors, and flags blockers before they become problems. Your business runs to a documented standard every single day, not just when you are watching.",
    icon: Cpu,
    chips: ["Task assignment", "SOP maintenance", "Vendor coordination", "Process compliance"],
  },
  {
    name: "Inventory and Supply Chain Agent",
    system: "Operations System",
    description:
      "Never run out. Never overorder. The Inventory and Supply Chain Agent monitors your stock levels in real time, triggers reorders automatically, manages supplier communications, and flags delivery risks before they hit your operations. Your supply chain runs itself.",
    icon: Truck,
    chips: ["Stock monitoring", "Reorder triggers", "Supplier communications", "Delivery tracking"],
  },
  {
    name: "Finance Agent",
    system: "Operations System",
    description:
      "Your finances stay current without chasing them. The Finance Agent generates invoices, tracks what you are owed, categorises every transaction, produces reports on schedule, and alerts you to variances before they become surprises. Full financial visibility without the manual work.",
    icon: BarChart2,
    chips: ["Invoice generation", "Receivables tracking", "Expense categorization", "Variance alerts"],
  },
];

const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";
const GRADIENT_TEXT: React.CSSProperties = {
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

function TabButton({
  agent,
  isActive,
  onClick,
}: {
  agent: (typeof agents)[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = agent.icon;
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={() => {
        setPressed(true);
        setTimeout(() => setPressed(false), 150);
        onClick();
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "11px 14px",
        borderRadius: "10px",
        border: isActive ? "1px solid rgba(43,96,235,0.3)" : "1px solid transparent",
        background: isActive
          ? "rgba(43,96,235,0.07)"
          : "transparent",
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        transition: "all 0.18s ease",
        transform: pressed ? "scale(0.97)" : "scale(1)",
        boxShadow: isActive
          ? "0 0 0 0px rgba(43,96,235,0)"
          : "none",
        fontFamily: "Manrope, sans-serif",
      }}
      onMouseEnter={e => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.background = "rgba(43,96,235,0.04)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(43,96,235,0.10)";
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.background = "transparent";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          background: isActive ? GRADIENT : "rgba(43,96,235,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background 0.18s ease",
        }}
      >
        <Icon size={14} color={isActive ? "white" : "#4655EB"} />
      </div>
      <span
        style={{
          fontFamily: "Manrope, sans-serif",
          fontWeight: isActive ? 600 : 500,
          fontSize: "13px",
          lineHeight: 1.35,
          color: isActive ? "#1F2937" : "#6B7280",
          transition: "color 0.18s ease",
        }}
      >
        {agent.name.replace(" Agent", "")}
      </span>
    </button>
  );
}

function AgentPanel({ agent }: { agent: (typeof agents)[0] }) {
  const Icon = agent.icon;

  return (
    <motion.div
      key={agent.name}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        padding: "36px 40px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        minHeight: "340px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "12px",
            background: GRADIENT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={22} color="white" />
        </div>
        <div>
          <div
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              marginBottom: "6px",
              ...GRADIENT_TEXT,
            }}
          >
            {agent.system}
          </div>
          <div
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              color: "#1F2937",
              lineHeight: 1.2,
            }}
          >
            {agent.name}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "#E5E7EB" }} />

      {/* Description */}
      <p
        style={{
          fontFamily: "Manrope, sans-serif",
          fontWeight: 400,
          fontSize: "16px",
          color: "#374151",
          lineHeight: 1.75,
          margin: 0,
        }}
      >
        {agent.description}
      </p>

      {/* Gradient chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
        {agent.chips.map(chip => (
          <span
            key={chip}
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              padding: "5px 12px",
              borderRadius: "6px",
              border: "1px solid rgba(43,96,235,0.25)",
              background: "rgba(43,96,235,0.05)",
              ...GRADIENT_TEXT,
            }}
          >
            {chip}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Agents() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="what-gets-deployed"
      style={{ backgroundColor: "#FFFFFF", padding: "120px 0" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section intro */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <p
            style={{
              color: "#374151",
              fontSize: "18px",
              maxWidth: "640px",
              margin: "0 auto",
              lineHeight: 1.7,
              fontFamily: "Manrope, sans-serif",
            }}
          >
            Seven functional agents cover every operational domain of your business. Each agent operates within its configured scope, reports activity and exceptions to the Governing Agent, and integrates directly with your existing platforms via API.
          </p>
        </motion.div>

        {/* Tabbed layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
          style={{
            display: "grid",
            gridTemplateColumns: "220px 1fr",
            gap: "20px",
            alignItems: "start",
            maxWidth: "960px",
            margin: "0 auto",
          }}
        >
          {/* Left rail */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              position: "sticky",
              top: "100px",
            }}
          >
            {agents.map((agent, index) => (
              <TabButton
                key={agent.name}
                agent={agent}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          {/* Right panel */}
          <div style={{ position: "relative", minHeight: "340px" }}>
            <AnimatePresence mode="wait">
              <AgentPanel key={activeIndex} agent={agents[activeIndex]} />
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
