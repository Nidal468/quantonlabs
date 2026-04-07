"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, TrendingUp, MessageSquare, Users, Cpu, Truck, BarChart2, Activity } from "lucide-react";

const agents = [
  { name: "Marketing and Content Agent", system: "Growth System", description: "Plans, creates, and distributes content across every active channel. Manages the editorial calendar, enforces brand voice, and delivers lead signals to the Sales Agent.", icon: Send },
  { name: "Sales Agent", system: "Growth System", description: "Manages the full lead lifecycle from first contact through close. Handles qualification, proposal generation, follow-up sequences, and pipeline reporting.", icon: TrendingUp },
  { name: "Customer Experience Agent", system: "Operations and Growth Systems", description: "Manages the post-conversion client relationship. Handles onboarding, inbound inquiries, scheduling, complaint escalation, and satisfaction tracking.", icon: MessageSquare },
  { name: "People and Team Agent", system: "Operations System", description: "Manages the full talent lifecycle. Covers recruiting, candidate screening, onboarding, performance review preparation, and compliance tracking.", icon: Users },
  { name: "Operations Agent", system: "Operations and Platform Systems", description: "Governs day-to-day execution. Assigns tasks, maintains versioned SOPs, monitors process compliance, and surfaces dependencies to the Governing Agent.", icon: Cpu },
  { name: "Inventory and Supply Chain Agent", system: "Operations System", description: "Monitors stock levels, triggers reorder events, manages supplier communications, tracks shipments, and flags supply chain risks to the Governing Agent.", icon: Truck },
  { name: "Finance Agent", system: "Operations System", description: "Manages financial operations. Generates invoices, tracks receivables, categorises expenses, produces financial reports, and flags budget variances.", icon: BarChart2 },
];

function AgentCard({ agent, index, isInView }: { agent: typeof agents[0]; index: number; isInView: boolean }) {
  const Icon = agent.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ gridColumn: index === 6 ? "2 / 3" : undefined, justifySelf: index === 6 ? "center" : undefined }}
    >
      <style>{`
        .agent-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: all 0.25s ease;
          cursor: default;
        }
        .agent-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 14px;
          padding: 1px;
          background: linear-gradient(0deg, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .agent-card:hover::before {
          opacity: 1;
          animation: rotate-gradient 3s linear infinite;
        }
        .agent-card:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(43,96,235,0.40);
          box-shadow: 0 8px 32px rgba(43,96,235,0.18);
          transform: translateY(-2px);
        }
        .agent-card:hover .agent-description {
          opacity: 1;
          max-height: 120px;
        }
        .agent-description {
          opacity: 0;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes rotate-gradient {
          to { --angle: 360deg; }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(43,96,235,0.5); }
          70% { box-shadow: 0 0 0 14px rgba(43,96,235,0); }
          100% { box-shadow: 0 0 0 0 rgba(43,96,235,0); }
        }
      `}</style>
      <div className="agent-card" style={{ width: "100%" }}>
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #2B60EB, #8B37EA)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            flexShrink: 0,
          }}
        >
          <Icon size={22} color="white" />
        </div>
        <div
          style={{
            color: "#FFFFFF",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 600,
            fontSize: "15px",
            marginBottom: "6px",
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
            fontWeight: 400,
            fontSize: "12px",
            marginBottom: "16px",
          }}
        >
          {agent.system}
        </div>
        <div
          className="agent-description"
          style={{
            color: "rgba(255,255,255,0.60)",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            lineHeight: 1.65,
          }}
        >
          {agent.description}
        </div>
      </div>
    </motion.div>
  );
}

export default function GoverningAgent() {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: "-100px" });

  return (
    <section
      id="what-gets-deployed"
      style={{ backgroundColor: "#041227", padding: "120px 0" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "40px",
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
                marginBottom: "24px",
                animation: "pulse-ring 2.5s ease-out infinite",
              }}
            >
              <Activity size={28} color="white" />
            </div>
          </div>
          <h2
            style={{
              color: "#FFFFFF",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: "48px",
              maxWidth: "800px",
              margin: "0 auto 24px",
              textAlign: "center",
            }}
          >
            The Coordination, Decision, and Intelligence Layer
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.70)",
              fontSize: "18px",
              maxWidth: "640px",
              margin: "0 auto",
              lineHeight: 1.7,
              fontFamily: "Manrope, sans-serif",
            }}
          >
            Without the Governing Agent, the other seven agents execute tasks in isolation. The Governing Agent receives structured data and exception flags from every functional agent, decides within its configured operating boundary, directs agents to act, escalates what requires human judgment, and feeds the leadership dashboard in real time.
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "16px",
              textAlign: "center",
              marginTop: "16px",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            Seven functional agents cover every operational domain of your business. Each agent operates within its configured scope, reports activity and exceptions to the Governing Agent, and integrates directly with your existing platforms via API.
          </p>
        </motion.div>

        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          {agents.map((agent, index) => (
            <AgentCard key={agent.name} agent={agent} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
          }
