"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, TrendingUp, MessageSquare, Users, Cpu, Truck, BarChart2 } from "lucide-react";

const agents = [
  {
    name: "Marketing and Content Agent",
    system: "Growth System",
    description: "Your brand shows up every day whether you are in the room or not. The Marketing and Content Agent runs your editorial calendar, publishes across every channel, enforces your brand voice on every word, and feeds your sales pipeline with warm signals. Consistent. On-brand. Always on.",
    icon: Send,
  },
  {
    name: "Sales Agent",
    system: "Growth System",
    description: "Your pipeline never sleeps. The Sales Agent responds to leads instantly, qualifies them against your criteria, generates proposals, and follows up across every touchpoint until the deal moves or the prospect opts out. No lead falls through the cracks. No follow-up gets forgotten.",
    icon: TrendingUp,
  },
  {
    name: "Customer Experience Agent",
    system: "Operations and Growth Systems",
    description: "Every client feels like your only client. The Customer Experience Agent handles onboarding, responds to inquiries, manages your calendar, and tracks satisfaction across every interaction. Your clients get a seamless experience. You get time back.",
    icon: MessageSquare,
  },
  {
    name: "People and Team Agent",
    system: "Operations System",
    description: "Building a team should not consume the team you already have. The People and Team Agent runs your recruiting pipeline, screens candidates, schedules interviews, onboards new hires, and tracks certifications and compliance deadlines. Your people operations run without you micromanaging them.",
    icon: Users,
  },
  {
    name: "Operations Agent",
    system: "Operations and Platform Systems",
    description: "Execution without the chaos. The Operations Agent assigns tasks, tracks progress, maintains your SOPs, coordinates vendors, and flags blockers before they become problems. Your business runs to a documented standard every single day, not just when you are watching.",
    icon: Cpu,
  },
  {
    name: "Inventory and Supply Chain Agent",
    system: "Operations System",
    description: "Never run out. Never overorder. The Inventory and Supply Chain Agent monitors your stock levels in real time, triggers reorders automatically, manages supplier communications, and flags delivery risks before they hit your operations. Your supply chain runs itself.",
    icon: Truck,
  },
  {
    name: "Finance Agent",
    system: "Operations System",
    description: "Your finances stay current without chasing them. The Finance Agent generates invoices, tracks what you are owed, categorises every transaction, produces reports on schedule, and alerts you to variances before they become surprises. Full financial visibility without the manual work.",
    icon: BarChart2,
  },
];

function AgentCard({
  agent,
  index,
  isInView,
}: {
  agent: (typeof agents)[0];
  index: number;
  isInView: boolean;
}) {
  const Icon = agent.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        style={{
          background: "#F9FAFB",
          border: "1px solid #E5E7EB",
          borderRadius: "16px",
          padding: "40px 48px",
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "32px",
          alignItems: "start",
          transition: "all 0.25s ease",
          cursor: "default",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "#FFFFFF";
          el.style.boxShadow = "0 8px 32px rgba(43,96,235,0.10)";
          el.style.borderColor = "rgba(43,96,235,0.25)";
          el.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "#F9FAFB";
          el.style.boxShadow = "none";
          el.style.borderColor = "#E5E7EB";
          el.style.transform = "translateY(0)";
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #2B60EB, #8B37EA)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={28} color="white" />
        </div>
        <div>
          <div
            style={{
              color: "#1F2937",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: "22px",
              marginBottom: "4px",
            }}
          >
            {agent.name}
          </div>
          <div
            style={{
              background: "linear-gradient(to right, #2B60EB, #8B37EA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.06em",
              marginBottom: "16px",
              textTransform: "uppercase" as const,
            }}
          >
            {agent.system}
          </div>
          <div
            style={{
              color: "#374151",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: 1.75,
            }}
          >
            {agent.description}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Agents() {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: "0px" });

  return (
    <section
      id="what-gets-deployed"
      style={{ backgroundColor: "#FFFFFF", padding: "120px 0" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
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
        <div
          ref={gridRef}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {agents.map((agent, index) => (
            <AgentCard
              key={agent.name}
              agent={agent}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
