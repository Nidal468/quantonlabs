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
      `}</style>

      {/* GOVERNING AGENT TWO-COLUMN LAYOUT */}
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
        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
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
          </div>

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
          </h2>

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
          </p>

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
              </div>
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
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.60)",
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.6,
                  }}
                >
                  All seven agents operate from unified shared state. Cross-functional conflicts detected and resolved automatically.
                </div>
              </div>
            </div>

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
              </div>
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
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.60)",
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.6,
                  }}
                >
                  Operates within its configured boundary without requiring human input on every action. Escalates what exceeds the boundary with full context.
                </div>
              </div>
            </div>

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
              </div>
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
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.60)",
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.6,
                  }}
                >
                  Every agent action, exception, and resolution synthesised into the leadership dashboard in real time.
                </div>
              </div>
            </div>

          </div>
        </motion.div>

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
              </div>
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
              </div>
            </div>

            {/* Connection lines + agent nodes — unified SVG */}
            <div style={{ width: "100%", marginBottom: "16px" }}>
              <svg
                width="100%"
                viewBox="0 0 420 130"
                preserveAspectRatio="xMidYMid meet"
              >
                {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                  const x = 24 + i * 56;
                  return (
                    <line
                      key={i}
                      x1="210"
                      y1="0"
                      x2={x + 20}
                      y2="82"
                      stroke="rgba(43,96,235,0.45)"
                      strokeWidth="1.5"
                    />
                  );
                })}
                {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                  const x = 24 + i * 56;
                  return (
                    <g key={i}>
                      <rect
                        x={x}
                        y={82}
                        width={40}
                        height={40}
                        rx={10}
                        fill="rgba(255,255,255,0.08)"
                        stroke="rgba(255,255,255,0.18)"
                        strokeWidth={1}
                      />
                    </g>
                  );
                })}
                {[{ Icon: Send }, { Icon: TrendingUp }, { Icon: MessageSquare }, { Icon: Users }, { Icon: Cpu }, { Icon: Truck }, { Icon: BarChart2 }].map(({ Icon }, i) => {
                  const x = 24 + i * 56 + 20;
                  return (
                    <foreignObject key={i} x={x - 9} y={96} width={18} height={18}>
                      <Icon size={18} color="rgba(255,255,255,0.85)" />
                    </foreignObject>
                  );
                })}
              </svg>
            </div>

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
            </div>

          </div>
        </motion.div>
      </div>

      {/* COORDINATION / DECISION / INTELLIGENCE STACKED BLOCKS */}
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
              </div>
              <h3
                style={{
                  color: "#FFFFFF",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 700,
                  fontSize: "28px",
                  marginBottom: "16px",
                }}
              >
                Coordination
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.70)",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "16px",
                  lineHeight: 1.7,
                }}
              >
                All seven agents operate from a unified shared state. The Governing Agent detects cross-functional conflicts, resolves coordination gaps, and ensures every domain is working from the same picture of the business.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "160px", position: "relative" }}>
              <svg width="280" height="160" viewBox="0 0 280 160">
                <line x1="20" y1="20" x2="140" y2="80" stroke="#2B60EB" strokeWidth="2" strokeOpacity="0.7" />
                <line x1="140" y1="20" x2="140" y2="80" stroke="#584DEB" strokeWidth="2" strokeOpacity="0.7" />
                <line x1="260" y1="20" x2="140" y2="80" stroke="#8B37EA" strokeWidth="2" strokeOpacity="0.7" />
                <circle cx="20" cy="20" r="6" fill="#2B60EB" fillOpacity="0.8" />
                <circle cx="140" cy="20" r="6" fill="#584DEB" fillOpacity="0.8" />
                <circle cx="260" cy="20" r="6" fill="#8B37EA" fillOpacity="0.8" />
                <circle cx="140" cy="80" r="14" fill="none" stroke="rgba(43,96,235,0.50)" strokeWidth="2" />
                <circle cx="140" cy="80" r="8" fill="#2B60EB" fillOpacity="0.9" />
                <line x1="140" y1="94" x2="140" y2="140" stroke="rgba(43,96,235,0.40)" strokeWidth="1" strokeDasharray="4 3" />
                <rect x="110" y="140" width="60" height="16" rx="4" fill="rgba(43,96,235,0.15)" stroke="rgba(43,96,235,0.30)" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </motion.div>

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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "180px", position: "relative" }}>
              <style>{`
                @keyframes travel {
                  0% { offset-distance: 0%; opacity: 0; }
                  10% { opacity: 1; }
                  90% { opacity: 1; }
                  100% { offset-distance: 100%; opacity: 0; }
                }
              `}</style>
              <svg width="280" height="160" viewBox="0 0 280 160" style={{ overflow: "visible" }}>
                <line x1="20" y1="20" x2="140" y2="80" stroke="#2B60EB" strokeWidth="2" strokeOpacity="0.7" />
                <line x1="140" y1="20" x2="140" y2="80" stroke="#584DEB" strokeWidth="2" strokeOpacity="0.7" />
                <line x1="260" y1="20" x2="140" y2="80" stroke="#8B37EA" strokeWidth="2" strokeOpacity="0.7" />
                <circle cx="20" cy="20" r="7" fill="#2B60EB" fillOpacity="0.8" />
                <circle cx="140" cy="20" r="7" fill="#584DEB" fillOpacity="0.8" />
                <circle cx="260" cy="20" r="7" fill="#8B37EA" fillOpacity="0.8" />
                <circle cx="140" cy="80" r="10" fill="none" stroke="rgba(43,96,235,0.50)" strokeWidth="2" />
                <circle cx="140" cy="80" r="10" fill="#2B60EB" fillOpacity="0.9" />
                <line x1="140" y1="96" x2="140" y2="148" stroke="rgba(43,96,235,0.40)" strokeWidth="1" strokeDasharray="4 3" />
                <rect x="108" y="148" width="64" height="18" rx="4" fill="rgba(43,96,235,0.15)" stroke="rgba(43,96,235,0.30)" strokeWidth="1" />
              </svg>
              <div style={{
                position: "absolute",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "linear-gradient(to right, #2B60EB, #8B37EA)",
                offsetPath: "path('M 20 20 L 140 80')",
                animation: "travel 1.8s ease-in-out infinite",
              }} />
              <div style={{
                position: "absolute",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "linear-gradient(to right, #584DEB, #2B60EB)",
                offsetPath: "path('M 140 20 L 140 80')",
                animation: "travel 1.8s ease-in-out infinite",
                animationDelay: "0.9s",
              }} />
            </div>

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
              </div>
              <h3
                style={{
                  color: "#FFFFFF",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 700,
                  fontSize: "28px",
                  marginBottom: "16px",
                }}
              >
                Decision
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.70)",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "16px",
                  lineHeight: 1.7,
                }}
              >
                The Governing Agent decides within its configured operating boundary without requiring human input on every action. Decisions that exceed the boundary are escalated immediately, with full context, to the appropriate decision-maker.
              </p>
            </div>
          </div>
        </motion.div>

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
          <button className="hidden items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors duration-200 shadow-lg hover:shadow-xl">
            Explore the Governing Agent
            <ChevronRight className="ml-2" size={20} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
