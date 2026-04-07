"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, TrendingUp, MessageSquare, Users, Cpu, Truck, BarChart2, Activity } from "lucide-react";

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

function AgentCard({ agent, index, isInView }: { agent: typeof agents[0]; index: number; isInView: boolean }) {
    const Icon = agent.icon;
    return (
          <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.10 }}
                >
                <style>{`
                        .agent-card-light {
                                  background: #F9FAFB;
                                            border: 1px solid #E5E7EB;
                                                      border-radius: 16px;
                                                                padding: 40px 48px;
                                                                          display: grid;
                                                                                    grid-template-columns: auto 1fr;
                                                                                              gap: 32px;
                                                                                                        align-items: start;
                                                                                                                  transition: all 0.25s ease;
                                                                                                                            cursor: default;
                                                                                                                                    }
                                                                                                                                            .agent-card-light:hover {
                                                                                                                                                      background: #FFFFFF;
                                                                                                                                                                box-shadow: 0 8px 32px rgba(43,96,235,0.10);
                                                                                                                                                                          border-color: rgba(43,96,235,0.25);
                                                                                                                                                                                    transform: translateY(-2px);
                                                                                                                                                                                            }
                                                                                                                                                                                                    @keyframes pulse-ring-agents {
                                                                                                                                                                                                              0% { box-shadow: 0 0 0 0 rgba(43,96,235,0.5); }
                                                                                                                                                                                                                        70% { box-shadow: 0 0 0 14px rgba(43,96,235,0); }
                                                                                                                                                                                                                                  100% { box-shadow: 0 0 0 0 rgba(43,96,235,0); }
                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                `}</style>style>
                <div className="agent-card-light">
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
                        </div>div>
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
                                  </div>div>
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
                                                                textTransform: "uppercase",
                                                }}
                                              >
                                    {agent.system}
                                  </div>div>
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
                                  </div>div>
                        </div>div>
                </div>div>
          </motion.div>motion.div>
        );
}

export default function AgentsSection() {
    const gridRef = useRef(null);
    const isInView = useInView(gridRef, { once: true, margin: "-80px" });
  
    return (
          <section
                  id="what-gets-deployed"
                  style={{ backgroundColor: "#FFFFFF", padding: "120px 0" }}
                >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                                    initial={{ opacity: 0, y: 20 }}
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
                                  </p>p>
                        </motion.div>motion.div>
                
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
                                                <AgentCard key={agent.name} agent={agent} index={index} isInView={isInView} />
                                              ))}
                        </div>div>
                </div>div>
          </section>section>
        );
}</motion.div>
