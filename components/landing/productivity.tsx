"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { BarChart2, Send, TrendingUp, MessageSquare, Users, Cpu, Truck, Activity, GitBranch, Layers } from "lucide-react";

const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";
const gradientText = {
  background: GRADIENT,
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};

// Seven functional agents, laid out along the base of the diagram.
const AGENTS = [
  { Icon: Send, label: "Marketing" },
  { Icon: TrendingUp, label: "Sales" },
  { Icon: MessageSquare, label: "Customer Experience" },
  { Icon: Users, label: "People and Team" },
  { Icon: Cpu, label: "Operations" },
  { Icon: Truck, label: "Inventory" },
  { Icon: BarChart2, label: "Finance" },
];

type Mode = "coordination" | "decision" | "intelligence";

const MODES: {
  key: Mode;
  Icon: typeof Activity;
  title: string;
  body: string;
}[] = [
  {
    key: "coordination",
    Icon: Layers,
    title: "Coordination",
    body: "Seven agents operating from one shared state. Conflicts at departmental handoffs surface before they reach a customer.",
  },
  {
    key: "decision",
    Icon: GitBranch,
    title: "Decision",
    body: "Acts inside the boundary you configure. Anything beyond it escalates to you with the full context attached.",
  },
  {
    key: "intelligence",
    Icon: Activity,
    title: "Intelligence",
    body: "Every action, exception, and resolution synthesised into one live executive view.",
  },
];

const HUB = { x: 210, y: 8 };
const nodeX = (i: number) => 24 + i * 56 + 20;
const NODE_Y = 92;

export default function GoverningAgent() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [mode, setMode] = useState<Mode>("coordination");
  const [userPicked, setUserPicked] = useState(false);

  // Cycle the diagram until the reader chooses a behaviour to watch.
  useEffect(() => {
    if (userPicked || !isInView) return;
    const order: Mode[] = ["coordination", "decision", "intelligence"];
    const t = setInterval(() => {
      setMode(m => order[(order.indexOf(m) + 1) % order.length]);
    }, 5200);
    return () => clearInterval(t);
  }, [userPicked, isInView]);

  // Decision mode routes a single exception: agent 3 flags, agent 4 is directed.
  const flagged = 3;
  const directed = 4;

  return (
    <section ref={sectionRef} id="governing-agent" style={{ backgroundColor: "#041227", padding: "56px 0" }}>
      <div
        className="ga-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "56px",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        {/* Left: claim and selectable behaviours */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            style={{
              ...gradientText,
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            The Governing Agent
          </div>

          <h2
            style={{
              color: "#FFFFFF",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(26px, 3.4vw, 38px)",
              lineHeight: 1.2,
              marginBottom: "18px",
            }}
          >
            Without coordination, eight agents are just eight automations.
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.66)",
              fontSize: "16px",
              fontFamily: "Manrope, sans-serif",
              lineHeight: 1.7,
              marginBottom: "26px",
              maxWidth: "520px",
            }}
          >
            One layer sits above the seven functional agents and does three things
            continuously. Pick one to watch it run.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {MODES.map(m => {
              const active = mode === m.key;
              return (
                <button
                  key={m.key}
                  onClick={() => {
                    setMode(m.key);
                    setUserPicked(true);
                  }}
                  aria-pressed={active}
                  style={{
                    textAlign: "left",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: active
                      ? "1px solid rgba(112,130,245,0.55)"
                      : "1px solid rgba(255,255,255,0.07)",
                    background: active
                      ? "linear-gradient(120deg, rgba(43,96,235,0.16), rgba(139,55,234,0.10))"
                      : "transparent",
                    cursor: "pointer",
                    transition: "background 0.3s ease, border-color 0.3s ease",
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "9px",
                      background: active ? GRADIENT : "rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "background 0.3s ease",
                    }}
                  >
                    <m.Icon
                      size={16}
                      color={active ? "white" : "rgba(255,255,255,0.5)"}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        color: active ? "#FFFFFF" : "rgba(255,255,255,0.72)",
                        fontWeight: 600,
                        fontSize: "15px",
                        marginBottom: "3px",
                      }}
                    >
                      {m.title}
                    </div>
                    <div
                      style={{
                        color: active ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.42)",
                        fontSize: "13.5px",
                        lineHeight: 1.6,
                      }}
                    >
                      {m.body}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Right: live diagram */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "28px 24px 22px",
              position: "relative",
            }}
          >
            {/* Live executive view, only populated in intelligence mode */}
            <div style={{ marginBottom: "18px", minHeight: "34px" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    textAlign: "center",
                    color: "rgba(255,255,255,0.38)",
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  {mode === "decision"
                    ? "Exception routing"
                    : mode === "intelligence"
                    ? "Executive synthesis"
                    : "Shared state"}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Hub */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "10px" }}>
              <motion.div
                animate={{
                  boxShadow:
                    mode === "decision"
                      ? [
                          "0 0 0 0 rgba(139,55,234,0.0)",
                          "0 0 0 14px rgba(139,55,234,0.16)",
                          "0 0 0 0 rgba(139,55,234,0.0)",
                        ]
                      : [
                          "0 0 0 0 rgba(43,96,235,0.0)",
                          "0 0 0 16px rgba(43,96,235,0.12)",
                          "0 0 0 0 rgba(43,96,235,0.0)",
                        ],
                }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #2B60EB, #8B37EA)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Activity size={28} color="white" aria-hidden="true" />
              </motion.div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  marginTop: "10px",
                }}
              >
                Governing Agent
              </div>
            </div>

            {/* Signal paths */}
            <svg width="100%" viewBox="0 0 420 140" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              {AGENTS.map((_, i) => {
                const x = nodeX(i);
                const lit =
                  mode === "coordination" ||
                  (mode === "intelligence") ||
                  (mode === "decision" && (i === flagged || i === directed));
                return (
                  <line
                    key={`l-${i}`}
                    x1={HUB.x}
                    y1={HUB.y}
                    x2={x}
                    y2={NODE_Y}
                    stroke={
                      mode === "decision" && i === flagged
                        ? "rgba(245,158,11,0.65)"
                        : lit
                        ? "rgba(70,85,235,0.5)"
                        : "rgba(255,255,255,0.09)"
                    }
                    strokeWidth={mode === "decision" && (i === flagged || i === directed) ? 2 : 1.4}
                    style={{ transition: "stroke 0.4s ease" }}
                  />
                );
              })}

              {/* Travelling signals */}
              {mode === "coordination" &&
                AGENTS.map((_, i) => (
                  <motion.circle
                    key={`c-${i}`}
                    r="3.5"
                    fill="#7B8FF5"
                    initial={{ cx: nodeX(i), cy: NODE_Y, opacity: 0 }}
                    animate={{ cx: HUB.x, cy: HUB.y, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.5, delay: i * 0.18, repeat: Infinity, repeatDelay: 0.9, ease: "easeInOut" }}
                    style={{ filter: "drop-shadow(0 0 5px rgba(123,143,245,0.9))" }}
                  />
                ))}

              {mode === "intelligence" &&
                AGENTS.map((_, i) => (
                  <motion.circle
                    key={`i-${i}`}
                    r="3"
                    fill="#8B37EA"
                    initial={{ cx: nodeX(i), cy: NODE_Y, opacity: 0 }}
                    animate={{ cx: HUB.x, cy: HUB.y, opacity: [0, 1, 0] }}
                    transition={{ duration: 2.2, delay: i * 0.28, repeat: Infinity, ease: "linear" }}
                    style={{ filter: "drop-shadow(0 0 5px rgba(139,55,234,0.9))" }}
                  />
                ))}

              {mode === "decision" && (
                <>
                  <motion.circle
                    r="4"
                    fill="#F59E0B"
                    initial={{ cx: nodeX(flagged), cy: NODE_Y, opacity: 0 }}
                    animate={{ cx: HUB.x, cy: HUB.y, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 1.9, ease: "easeInOut" }}
                    style={{ filter: "drop-shadow(0 0 6px rgba(245,158,11,0.95))" }}
                  />
                  <motion.circle
                    r="4"
                    fill="#4ADE80"
                    initial={{ cx: HUB.x, cy: HUB.y, opacity: 0 }}
                    animate={{ cx: nodeX(directed), cy: NODE_Y, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.3, delay: 1.5, repeat: Infinity, repeatDelay: 1.9, ease: "easeInOut" }}
                    style={{ filter: "drop-shadow(0 0 6px rgba(74,222,128,0.95))" }}
                  />
                </>
              )}

              {/* Agent nodes */}
              {AGENTS.map(({ Icon }, i) => {
                const x = 24 + i * 56;
                const isFlag = mode === "decision" && i === flagged;
                const isDir = mode === "decision" && i === directed;
                return (
                  <g key={`n-${i}`}>
                    <rect
                      x={x}
                      y={NODE_Y - 10}
                      width={40}
                      height={40}
                      rx={10}
                      fill={isFlag ? "rgba(245,158,11,0.16)" : isDir ? "rgba(74,222,128,0.14)" : "rgba(255,255,255,0.07)"}
                      stroke={isFlag ? "rgba(245,158,11,0.7)" : isDir ? "rgba(74,222,128,0.6)" : "rgba(255,255,255,0.16)"}
                      strokeWidth={1}
                      style={{ transition: "fill 0.4s ease, stroke 0.4s ease" }}
                    />
                    <foreignObject x={x + 11} y={NODE_Y + 1} width={18} height={18}>
                      <Icon size={18} color={isFlag ? "#F59E0B" : isDir ? "#4ADE80" : "rgba(255,255,255,0.8)"} />
                    </foreignObject>
                  </g>
                );
              })}
            </svg>

            <div
              style={{
                textAlign: "center",
                marginTop: "14px",
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

      <style>{`
        @media (max-width: 900px) {
          .ga-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
            padding: 0 22px !important;
          }
        }
      `}</style>
    </section>
  );
}