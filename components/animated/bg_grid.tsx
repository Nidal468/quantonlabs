"use client";

import { motion } from "framer-motion";

// Circuit paths behind the hero. Nodes carry the brand gradient so the grid
// reads as a live system rather than a decorative pattern.
const PATHS = [
  { d: "M0 200 H400 V350 H800 V150 H1200", color: "#2B60EB", duration: 6 },
  { d: "M0 500 H300 V650 H700 V450 H1200", color: "#584DEB", duration: 8 },
  { d: "M200 0 V250 H600 V550 H1000 V800", color: "#7341EA", duration: 7 },
  { d: "M900 0 V300 H500 V600 H200 V800", color: "#8B37EA", duration: 9 },
];

// Intersections where the paths cross. Each gets a static neon node so the
// grid has anchor points even when the pulses are elsewhere.
const NODES = [
  { cx: 400, cy: 200, color: "#2B60EB" },
  { cx: 800, cy: 350, color: "#4655EB" },
  { cx: 300, cy: 500, color: "#584DEB" },
  { cx: 1000, cy: 550, color: "#8B37EA" },
  { cx: 600, cy: 250, color: "#4655EB" },
];

export function IntelligentGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" style={{ zIndex: 0 }}>
      <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ql-grid-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2B60EB" stopOpacity="0.34" />
            <stop offset="50%" stopColor="#584DEB" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#8B37EA" stopOpacity="0.34" />
          </linearGradient>
        </defs>

        {/* Base lines */}
        <g stroke="url(#ql-grid-line)" strokeWidth="1.4" fill="none">
          {PATHS.map(p => (
            <path key={p.d} d={p.d} />
          ))}
        </g>

        {/* Static neon nodes at intersections */}
        {NODES.map(n => (
          <motion.circle
            key={`${n.cx}-${n.cy}`}
            cx={n.cx}
            cy={n.cy}
            r="3"
            fill={n.color}
            style={{ filter: `drop-shadow(0 0 5px ${n.color})` }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 3 + (n.cx % 5),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Travelling pulses */}
        {PATHS.map(p => (
          <motion.circle
            key={`pulse-${p.d}`}
            r="4.5"
            fill={p.color}
            style={{
              offsetPath: `path('${p.d}')`,
              offsetDistance: "0%",
              filter: `drop-shadow(0 0 8px ${p.color})`,
            }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
    </div>
  );
}