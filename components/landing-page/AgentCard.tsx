"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AgentCardProps {
  id: string;
  name: string;
  domain: string;
  description: string;
  icon: string;
  tags: string[];
  capabilities: string[];
  color?: string;
}

const iconMap: Record<string, any> = {
  Megaphone: () => import("lucide-react").then((m) => m.Megaphone),
  TrendingUp: () => import("lucide-react").then((m) => m.TrendingUp),
  Headphones: () => import("lucide-react").then((m) => m.Headphones),
  UsersRound: () => import("lucide-react").then((m) => m.UsersRound),
  LayoutGrid: () => import("lucide-react").then((m) => m.LayoutGrid),
  Package: () => import("lucide-react").then((m) => m.Package),
  DollarSign: () => import("lucide-react").then((m) => m.DollarSign),
  Brain: () => import("lucide-react").then((m) => m.Brain),
};

const domainColors: Record<string, string> = {
  Growth: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Operations: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Operations + Growth": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  Strategy: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

export default function AgentCard({ agent }: { agent: AgentCardProps }) {
  const [expanded, setExpanded] = useState(false);
  const DomainBadge = domainColors[agent.domain] || domainColors.Operations;

  const IconComponent = iconMap[agent.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-5 transition-all hover:border-[#1a56ff]/40 hover:shadow-[0_0_30px_rgba(26,86,255,0.15)]"
    >
      {/* Glow effect on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#1a56ff]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Icon container with glow */}
            <div className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-[#1a56ff]/20 to-[#9d31f5]/20 border border-white/10 group-hover:border-[#1a56ff]/40 transition-all">
              {IconComponent && (
                <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                  <IconComponent className="h-5 w-5" />
                </div>
              )}
              {/* Pulsing dot */}
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm tracking-wide">{agent.name}</h3>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${DomainBadge}`}>
                {agent.domain.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-400 leading-relaxed mb-3">{agent.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {agent.tags.slice(0, expanded ? undefined : 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 text-gray-400 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expandable capabilities */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-white/10 mb-3">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-medium">Capabilities</p>
                <ul className="space-y-1.5">
                  {agent.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2 text-xs text-gray-400">
                      <span className="mt-1 h-1 w-1 rounded-full bg-blue-500 shrink-0" />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand/Collapse toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-blue-400 transition-colors uppercase tracking-wider"
        >
          {expanded ? "Less Info" : "More Info"}{" "}
          <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
            {expanded ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
}