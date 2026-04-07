"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, Cpu, BarChart2, Send, TrendingUp, MessageSquare, Users, Truck } from "lucide-react";

const gradientText = {
    background: "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)",
    WebkitBackgroundClip: "text" as const,
    WebkitTextFillColor: "transparent" as const,
    backgroundClip: "text" as const,
};

const agentIcons = [Send, TrendingUp, MessageSquare, Users, Cpu, Truck, BarChart2];

export default function GoverningAgent() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const coordRef = useRef(null);
    const coordInView = useInView(coordRef, { once: true, margin: "-80px" });

  const decisionRef = useRef(null);
    const decisionInView = useInView(decisionRef, { once: true, margin: "-80px" });

  const intelRef = useRef(null);
    const intelInView = useInView(intelRef, { once: true, margin: "-80px" });

  return (
        <section
                id="governing-agent"
                style={{ backgroundColor: "#041227", padding: "140px 0" }}
              >
              <style>{`
                      @keyframes pulse-ring-ga {
                                0% { box-shadow: 0 0 0 0 rgba(43,96,235,0.5); }
                                          70% { box-shadow: 0 0 0 20px rgba(43,96,235,0); }
                                                    100% { box-shadow: 0 0 0 0 rgba(43,96,235,0); }
                                                            }
                                                                    @property --angle-ga {
                                                                              syntax: '<angle>';
                                                                                        initial-value: 0deg;
                                                                                                  inherits: false;
                                                                                                          }
                                                                                                                  @keyframes rotate-ga {
                                                                                                                            to { --angle-ga: 360deg; }
                                                                                                                                    }
                                                                                                                                            .arch-card {
                                                                                                                                                      position: relative;
                                                                                                                                                              }
                                                                                                                                                                      .arch-card::before {
                                                                                                                                                                                content: '';
                                                                                                                                                                                          position: absolute;
                                                                                                                                                                                                    inset: 0;
                                                                                                                                                                                                              border-radius: 20px;
                                                                                                                                                                                                                        padding: 1px;
                                                                                                                                                                                                                                  background: linear-gradient(var(--angle-ga, 0deg), #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA, #2B60EB);
                                                                                                                                                                                                                                            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                                                                                                                                                                                                                                                      -webkit-mask-composite: xor;
                                                                                                                                                                                                                                                                mask-composite: exclude;
                                                                                                                                                                                                                                                                          opacity: 0.35;
                                                                                                                                                                                                                                                                                    animation: rotate-ga 4s linear infinite;
                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                  `}</style>style>
        
          {/* ── GOVERNING AGENT TWO-COLUMN LAYOUT ── */}
              <div
                        ref={sectionRef}
                        style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "80px",
                                    alignItems: "center",
                                    maxWidth: "1200px",
                                    margin: "0 auto",
                                    padding: "0 48px",
                        }}
                      >
                {/* LEFT COLUMN — copy */}
                      <motion.div
                                  initial={{ opacity: 0, x: -40 }}
                                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                                  transition={{ duration: 0.7, ease: "easeOut" }}
                                >
                        {/* Eyebrow */}
                                <div
                                              style={{
                                                              ...gradientText,
                                                              fontFamily: "Manrope, sans-serif",
                                                              fontWeight: 600,
                                                              fontSize: "12px",
                                                              letterSpacing: "0.1em",
                                                              textTransform: "uppercase",
                                                              marginBottom: "20px",
                                              }}
                                            >
                                            THE GOVERNING AGENT
                                </div>div>
                      
                        {/* Pain statement */}
                                <h2
                                              style={{
                                                              color: "#FFFFFF",
                                                              fontFamily: "Manrope, sans-serif",
                                                              fontWeight: 700,
                                                              fontSize: "42px",
                                                              lineHeight: 1.2,
                                                              marginBottom: "24px",
                                              }}
                                            >
                                            Without coordination, eight agents are just eight automations.
                                </h2>h2>
                      
                        {/* Transition line */}
                                <p
                                              style={{
                                                              color: "rgba(255,255,255,0.70)",
                                                              fontSize: "18px",
                                                              fontFamily: "Manrope, sans-serif",
                                                              fontWeight: 400,
                                                              lineHeight: 1.7,
                                                              marginBottom: "32px",
                                              }}
                                            >
                                            The Governing Agent is the structural layer that makes Quanton OS a system rather than a collection of tools. It receives data and exception flags from every functional agent, decides within its configured boundary, directs agents to act, and escalates what requires human judgment. Every function in your business visible, coordinated, and governed from one view.
                                </p>p>
                      
                        {/* Feature rows */}
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                  {/* Row 1 — Coordination */}
                                            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                                                          <div
                                                                            style={{
                                                                                                width: "32px",
                                                                                                height: "32px",
                                                                                                borderRadius: "8px",
                                                                                                background: "linear-gradient(135deg, #2B60EB, #4655EB)",
                                                                                                display: "flex",
                                                                                                alignItems: "center",
                                                                                                justifyContent: "center",
                                                                                                flexShrink: 0,
                                                                            }}
                                                                          >
                                                                          <Activity size={16} color="white" />
                                                          </div>div>
                                                          <div>
                                                                          <div
                                                                                              style={{
                                                                                                                    color: "#FFFFFF",
                                                                                                                    fontFamily: "Manrope, sans-serif",
                                                                                                                    fontWeight: 600,
                                                                                                                    fontSize: "15px",
                                                                                                                    marginBottom: "4px",
                                                                                                }}
                                                                                            >
                                                                                            Coordination
                                                                          </div>div>
                                                                          <div
                                                                                              style={{
                                                                                                                    color: "rgba(255,255,255,0.60)",
                                                                                                                    fontFamily: "Manrope, sans-serif",
                                                                                                                    fontSize: "14px",
                                                                                                                    lineHeight: 1.6,
                                                                                                }}
                                                                                            >
                                                                                            All seven agents operate from unified shared state. Cross-functional conflicts detected and resolved automatically.
                                                                          </div>div>
                                                          </div>div>
                                            </div>div>
                                
                                  {/* Row 2 — Decision */}
                                            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                                                          <div
                                                                            style={{
                                                                                                width: "32px",
                                                                                                height: "32px",
                                                                                                borderRadius: "8px",
                                                                                                background: "linear-gradient(135deg, #584DEB, #7341EA)",
                                                                                                display: "flex",
                                                                                                alignItems: "center",
                                                                                                justifyContent: "center",
                                                                                                flexShrink: 0,
                                                                            }}
                                                                          >
                                                                          <Cpu size={16} color="white" />
                                                          </div>div>
                                                          <div>
                                                                          <div
                                                                                              style={{
                                                                                                                    color: "#FFFFFF",
                                                                                                                    fontFamily: "Manrope, sans-serif",
                                                                                                                    fontWeight: 600,
                                                                                                                    fontSize: "15px",
                                                                                                                    marginBottom: "4px",
                                                                                                }}
                                                                                            >
                                                                                            Decision
                                                                          </div>div>
                                                                          <div
                                                                                              style={{
                                                                                                                    color: "rgba(255,255,255,0.60)",
                                                                                                                    fontFamily: "Manrope, sans-serif",
                                                                                                                    fontSize: "14px",
                                                                                                                    lineHeight: 1.6,
                                                                                                }}
                                                                                            >
                                                                                            Operates within its configured boundary without requiring human input on every action. Escalates what exceeds the boundary with full context.
                                                                          </div>div>
                                                          </div>div>
                                            </div>div>
                                
                                  {/* Row 3 — Intelligence */}
                                            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                                                          <div
                                                                            style={{
                                                                                                width: "32px",
                                                                                                height: "32px",
                                                                                                borderRadius: "8px",
                                                                                                background: "linear-gradient(135deg, #7341EA, #8B37EA)",
                                                                                                display: "flex",
                                                                                                alignItems: "center",
                                                                                                justifyContent: "center",
                                                                                                flexShrink: 0,
                                                                            }}
                                                                          >
                                                                          <BarChart2 size={16} color="white" />
                                                          </div>div>
                                                          <div>
                                                                          <div
                                                                                              style={{
                                                                                                                    color: "#FFFFFF",
                                                                                                                    fontFamily: "Manrope, sans-serif",
                                                                                                                    fontWeight: 600,
                                                                                                                    fontSize: "15px",
                                                                                                                    marginBottom: "4px",
                                                                                                }}
                                                                                            >
                                                                                            Intelligence
                                                                          </div>div>
                                                                          <div
                                                                                              style={{
                                                                                                                    color: "rgba(255,255,255,0.60)",
                                                                                                                    fontFamily: "Manrope, sans-serif",
                                                                                                                    fontSize: "14px",
                                                                                                                    lineHeight: 1.6,
                                                                                                }}
                                                                                            >
                                                                                            Every agent action, exception, and resolution synthesised into the leadership dashboard in real time.
                                                                          </div>div>
                                                          </div>div>
                                            </div>div>
                                </div>div>
                      </motion.div>motion.div>
              
                {/* RIGHT COLUMN — architecture visual */}
                      <motion.div
                                  initial={{ opacity: 0, x: 40 }}
                                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                                >
                                <div
                                              className="arch-card"
                                              style={{
                                                              background: "rgba(255,255,255,0.04)",
                                                              border: "1px solid rgba(255,255,255,0.08)",
                                                              borderRadius: "20px",
                                                              padding: "40px",
                                                              position: "relative",
                                              }}
                                            >
                                  {/* Central node */}
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "32px" }}>
                                                          <div
                                                                            style={{
                                                                                                width: "80px",
                                                                                                height: "80px",
                                                                                                borderRadius: "50%",
                                                                                                background: "linear-gradient(135deg, #2B60EB, #8B37EA)",
                                                                                                display: "flex",
                                                                                                alignItems: "center",
                                                                                                justifyContent: "center",
                                                                                                animation: "pulse-ring-ga 2.5s ease-out infinite",
                                                                                                position: "relative",
                                                                            }}
                                                                          >
                                                                          <Activity size={32} color="white" />
                                                          </div>div>
                                                          <div
                                                                            style={{
                                                                                                color: "#FFFFFF",
                                                                                                fontFamily: "Manrope, sans-serif",
                                                                                                fontWeight: 600,
                                                                                                fontSize: "13px",
                                                                                                textAlign: "center",
                                                                                                marginTop: "12px",
                                                                            }}
                                                                          >
                                                                          Governing Agent
                                                          </div>div>
                                            </div>div>
                                
                                  {/* Connection lines SVG */}
                                            <div style={{ position: "relative", width: "100%", height: "120px", marginBottom: "16px" }}>
                                                          <svg
                                                                            width="100%"
                                                                            height="100%"
                                                                            viewBox="0 0 400 120"
                                                                            preserveAspectRatio="none"
                                                                            style={{ position: "absolute", top: 0, left: 0 }}
                                                                          >
                                                            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                                                                                              const x = 28 + i * 52;
                                                                                              return (
                                                                                                                    <line
                                                                                                                                            key={i}
                                                                                                                                            x1="200"
                                                                                                                                            y1="0"
                                                                                                                                            x2={x}
                                                                                                                                            y2="110"
                                                                                                                                            stroke="rgba(43,96,235,0.30)"
                                                                                                                                            strokeWidth="1"
                                                                                                                                          />
                                                                                                                  );
                                                                          })}
                                                          </svg>svg>
                                            
                                              {/* Agent nodes */}
                                                          <div
                                                                            style={{
                                                                                                position: "absolute",
                                                                                                bottom: 0,
                                                                                                left: 0,
                                                                                                right: 0,
                                                                                                display: "flex",
                                                                                                justifyContent: "space-between",
                                                                                                padding: "0 4px",
                                                                            }}
                                                                          >
                                                            {agentIcons.map((IconComp, i) => (
                                                                                              <div
                                                                                                                    key={i}
                                                                                                                    style={{
                                                                                                                                            width: "48px",
                                                                                                                                            height: "48px",
                                                                                                                                            borderRadius: "12px",
                                                                                                                                            background: "rgba(255,255,255,0.06)",
                                                                                                                                            border: "1px solid rgba(255,255,255,0.12)",
                                                                                                                                            display: "flex",
                                                                                                                                            alignItems: "center",
                                                                                                                                            justifyContent: "center",
                                                                                                                      }}
                                                                                                                  >
                                                                                                                  <IconComp size={18} color="rgba(255,255,255,0.70)" />
                                                                                                </div>div>
                                                                                            ))}
                                                          </div>div>
                                            </div>div>
                                
                                  {/* Stat line */}
                                            <div
                                                            style={{
                                                                              textAlign: "center",
                                                                              marginTop: "24px",
                                                                              ...gradientText,
                                                                              fontFamily: "Manrope, sans-serif",
                                                                              fontWeight: 600,
                                                                              fontSize: "14px",
                                                            }}
                                                          >
                                                          8 agents. 1 governing layer. Zero fragmentation.
                                            </div>div>
                                </div>div>
                      </motion.div>motion.div>
              </div>div>
        
          {/* ── COORDINATION / DECISION / INTELLIGENCE STACKED BLOCKS ── */}
              <div
                        style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "24px",
                                    maxWidth: "1200px",
                                    margin: "80px auto 0",
                                    padding: "0 48px",
                        }}
                      >
                {/* Block 1 — Coordination */}
                      <motion.div
                                  ref={coordRef}
                                  initial={{ opacity: 0, x: -50 }}
                                  animate={coordInView ? { opacity: 1, x: 0 } : {}}
                                  transition={{ duration: 0.6, ease: "easeOut" }}
                                  style={{
                                                background: "rgba(43,96,235,0.08)",
                                                borderRadius: "20px",
                                                border: "1px solid rgba(43,96,235,0.15)",
                                                padding: "80px 48px",
                                  }}
                                >
                                <div
                                              style={{
                                                              display: "grid",
                                                              gridTemplateColumns: "1fr 1fr",
                                                              gap: "64px",
                                                              alignItems: "center",
                                              }}
                                            >
                                  {/* Left — copy */}
                                            <div>
                                                          <div
                                                                            style={{
                                                                                                width: "64px",
                                                                                                height: "64px",
                                                                                                borderRadius: "14px",
                                                                                                background: "linear-gradient(135deg, #2B60EB, #4655EB)",
                                                                                                display: "flex",
                                                                                                alignItems: "center",
                                                                                                justifyContent: "center",
                                                                                                marginBottom: "24px",
                                                                            }}
                                                                          >
                                                                          <Activity size={28} color="white" />
                                                          </div>div>
                                                          <h3
                                                                            style={{
                                                                                                color: "#FFFFFF",
                                                                                                fontFamily: "Manrope, sans-serif",
                                                                                                fontWeight: 700,
                                                                                                fontSize: "32px",
                                                                                                marginBottom: "16px",
                                                                            }}
                                                                          >
                                                                          Coordination
                                                          </h3>h3>
                                                          <p
                                                                            style={{
                                                                                                color: "rgba(255,255,255,0.70)",
                                                                                                fontFamily: "Manrope, sans-serif",
                                                                                                fontSize: "16px",
                                                                                                lineHeight: 1.7,
                                                                            }}
                                                                          >
                                                                          All seven agents operate from a unified shared state. The Governing Agent detects cross-functional conflicts, resolves coordination gaps, and ensures every domain is working from the same picture of the business.
                                                          </p>p>
                                            </div>div>
                                
                                  {/* Right — convergence visual */}
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "160px", position: "relative" }}>
                                                          <svg width="280" height="160" viewBox="0 0 280 160">
                                                                          <line x1="20" y1="20" x2="140" y2="80" stroke="#2B60EB" strokeWidth="2" strokeOpacity="0.7" />
                                                                          <line x1="140" y1="20" x2="140" y2="80" stroke="#584DEB" strokeWidth="2" strokeOpacity="0.7" />
                                                                          <line x1="260" y1="20" x2="140" y2="80" stroke="#8B37EA" strokeWidth="2" strokeOpacity="0.7" />
                                                                          <circle cx="20" cy="20" r="6" fill="#2B60EB" fillOpacity="0.8" />
                                                                          <circle cx="140" cy="20" r="6" fill="#584DEB" fillOpacity="0.8" />
                                                                          <circle cx="260" cy="20" r="6" fill="#8B37EA" fillOpacity="0.8" />
                                                                          <circle cx="140" cy="80" r="14" fill="none" stroke="rgba(43,96,235,0.50)" strokeWidth="2" />
                                                                          <circle cx="140" cy="80" r="8" fill="linear-gradient(135deg,#2B60EB,#8B37EA)" />
                                                                          <circle cx="140" cy="80" r="8" fill="#2B60EB" fillOpacity="0.9" />
                                                                          <line x1="140" y1="94" x2="140" y2="140" stroke="rgba(43,96,235,0.40)" strokeWidth="1" strokeDasharray="4 3" />
                                                                          <rect x="110" y="140" width="60" height="16" rx="4" fill="rgba(43,96,235,0.15)" stroke="rgba(43,96,235,0.30)" strokeWidth="1" />
                                                          </svg>svg>
                                            </div>div>
                                </div>div>
                      </motion.div>motion.div>
              
                {/* Block 2 — Decision */}
                      <motion.div
                                  ref={decisionRef}
                                  initial={{ opacity: 0, x: 50 }}
                                  animate={decisionInView ? { opacity: 1, x: 0 } : {}}
                                  transition={{ duration: 0.6, ease: "easeOut" }}
                                  style={{
                                                background: "rgba(88,77,235,0.08)",
                                                borderRadius: "20px",
                                                border: "1px solid rgba(88,77,235,0.15)",
                                                padding: "80px 48px",
                                  }}
                                >
                                <div
                                              style={{
                                                              display: "grid",
                                                              gridTemplateColumns: "1fr 1fr",
                                                              gap: "64px",
                                                              alignItems: "center",
                                              }}
                                            >
                                  {/* Left — boundary diagram */}
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "180px", position: "relative" }}>
                                                          <div
                                                                            style={{
                                                                                                width: "220px",
                                                                                                height: "140px",
                                                                                                borderRadius: "16px",
                                                                                                border: "1px dashed rgba(139,55,234,0.40)",
                                                                                                display: "flex",
                                                                                                alignItems: "center",
                                                                                                justifyContent: "center",
                                                                                                position: "relative",
                                                                            }}
                                                                          >
                                                                          <div
                                                                                              style={{
                                                                                                                    position: "absolute",
                                                                                                                    top: "-10px",
                                                                                                                    right: "12px",
                                                                                                                    ...gradientText,
                                                                                                                    fontFamily: "Manrope, sans-serif",
                                                                                                                    fontSize: "12px",
                                                                                                                    fontWeight: 600,
                                                                                                }}
                                                                                            >
                                                                                            Escalate
                                                                          </div>div>
                                                                          <div
                                                                                              style={{
                                                                                                                    width: "120px",
                                                                                                                    height: "72px",
                                                                                                                    borderRadius: "10px",
                                                                                                                    border: "1px solid rgba(43,96,235,0.40)",
                                                                                                                    display: "flex",
                                                                                                                    alignItems: "center",
                                                                                                                    justifyContent: "center",
                                                                                                                    position: "relative",
                                                                                                }}
                                                                                            >
                                                                                            <div
                                                                                                                  style={{
                                                                                                                                          position: "absolute",
                                                                                                                                          top: "-10px",
                                                                                                                                          left: "12px",
                                                                                                                                          ...gradientText,
                                                                                                                                          fontFamily: "Manrope, sans-serif",
                                                                                                                                          fontSize: "12px",
                                                                                                                                          fontWeight: 600,
                                                                                                                    }}
                                                                                                                >
                                                                                                                Auto
                                                                                              </div>div>
                                                                                            <Cpu size={24} color="rgba(43,96,235,0.70)" />
                                                                          </div>div>
                                                          </div>div>
                                            </div>div>
                                
                                  {/* Right — copy */}
                                            <div>
                                                          <div
                                                                            style={{
                                                                                                width: "64px",
                                                                                                height: "64px",
                                                                                                borderRadius: "14px",
                                                                                                background: "linear-gradient(135deg, #584DEB, #7341EA)",
                                                                                                display: "flex",
                                                                                                alignItems: "center",
                                                                                                justifyContent: "center",
                                                                                                marginBottom: "24px",
                                                                            }}
                                                                          >
                                                                          <Cpu size={28} color="white" />
                                                          </div>div>
                                                          <h3
                                                                            style={{
                                                                                                color: "#FFFFFF",
                                                                                                fontFamily: "Manrope, sans-serif",
                                                                                                fontWeight: 700,
                                                                                                fontSize: "32px",
                                                                                                marginBottom: "16px",
                                                                            }}
                                                                          >
                                                                          Decision
                                                          </h3>h3>
                                                          <p
                                                                            style={{
                                                                                                color: "rgba(255,255,255,0.70)",
                                                                                                fontFamily: "Manrope, sans-serif",
                                                                                                fontSize: "16px",
                                                                                                lineHeight: 1.7,
                                                                            }}
                                                                          >
                                                                          The Governing Agent decides within its configured operating boundary without requiring human input on every action. Decisions that exceed the boundary are escalated immediately, with full context, to the appropriate decision-maker.
                                                          </p>p>
                                            </div>div>
                                </div>div>
                      </motion.div>motion.div>
              
                {/* Block 3 — Intelligence */}
                      <motion.div
                                  ref={intelRef}
                                  initial={{ opacity: 0, x: -50 }}
                                  animate={intelInView ? { opacity: 1, x: 0 } : {}}
                                  transition={{ duration: 0.6, ease: "easeOut" }}
                                  style={{
                                                background: "rgba(115,65,234,0.08)",
                                                borderRadius: "20px",
                                                border: "1px solid rgba(115,65,234,0.15)",
                                                padding: "80px 48px",
                                  }}
                                >
                                <div
                                              style={{
                                                              display: "grid",
                                                              gridTemplateColumns: "1fr 1fr",
                                                              gap: "64px",
                                                              alignItems: "center",
                                              }}
                                            >
                                  {/* Left — copy */}
                                            <div>
                                                          <div
                                                                            style={{
                                                                                                width: "64px",
                                                                                                height: "64px",
                                                                                                borderRadius: "14px",
                                                                                                background: "linear-gradient(135deg, #7341EA, #8B37EA)",
                                                                                                display: "flex",
                                                                                                alignItems: "center",
                                                                                                justifyContent: "center",
                                                                                                marginBottom: "24px",
                                                                            }}
                                                                          >
                                                                          <BarChart2 size={28} color="white" />
                                                          </div>div>
                                                          <h3
                                                                            style={{
                                                                                                color: "#FFFFFF",
                                                                                                fontFamily: "Manrope, sans-serif",
                                                                                                fontWeight: 700,
                                                                                                fontSize: "32px",
                                                                                                marginBottom: "16px",
                                                                            }}
                                                                          >
                                                                          Intelligence
                                                          </h3>h3>
                                                          <p
                                                                            style={{
                                                                                                color: "rgba(255,255,255,0.70)",
                                                                                                fontFamily: "Manrope, sans-serif",
                                                                                                fontSize: "16px",
                                                                                                lineHeight: 1.7,
                                                                            }}
                                                                          >
                                                                          Every agent action, exception, and resolution is captured and synthesised into the leadership dashboard in real time. The owner sees the full operational picture without assembling it manually.
                                                          </p>p>
                                            </div>div>
                                
                                  {/* Right — dashboard mock */}
                                            <div
                                                            style={{
                                                                              background: "rgba(255,255,255,0.04)",
                                                                              borderRadius: "12px",
                                                                              border: "1px solid rgba(255,255,255,0.08)",
                                                                              padding: "24px",
                                                                              display: "flex",
                                                                              flexDirection: "column",
                                                                              gap: "16px",
                                                            }}
                                                          >
                                              {[
                                                            { label: "Pipeline activity", width: "70%" },
                                                            { label: "Escalation rate", width: "45%" },
                                                            { label: "Agent efficiency", width: "88%" },
                                                                          ].map((row, i) => (
                                                                                            <div key={i}>
                                                                                                              <div
                                                                                                                                    style={{
                                                                                                                                                            color: "rgba(255,255,255,0.50)",
                                                                                                                                                            fontFamily: "Manrope, sans-serif",
                                                                                                                                                            fontSize: "12px",
                                                                                                                                                            marginBottom: "6px",
                                                                                                                                      }}
                                                                                                                                  >
                                                                                                                {row.label}
                                                                                                                </div>div>
                                                                                                              <div
                                                                                                                                    style={{
                                                                                                                                                            height: "6px",
                                                                                                                                                            borderRadius: "3px",
                                                                                                                                                            background: "rgba(255,255,255,0.08)",
                                                                                                                                                            overflow: "hidden",
                                                                                                                                      }}
                                                                                                                                  >
                                                                                                                                  <div
                                                                                                                                                          style={{
                                                                                                                                                                                    width: row.width,
                                                                                                                                                                                    height: "100%",
                                                                                                                                                                                    borderRadius: "3px",
                                                                                                                                                                                    background: "linear-gradient(to right, #2B60EB, #8B37EA)",
                                                                                                                                                            }}
                                                                                                                                                        />
                                                                                                                </div>div>
                                                                                              </div>div>
                                                                                          ))}
                                            </div>div>
                                </div>div>
                      </motion.div>motion.div>
              </div>div>
        </section>section>
      );
}</section>
