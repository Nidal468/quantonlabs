"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Megaphone, TrendingUp, Headphones, UsersRound, LayoutGrid, Package, DollarSign, Brain } from "lucide-react";
import agentTemplates from "@/db/agent-templates.json";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Megaphone: Megaphone,
  TrendingUp: TrendingUp,
  Headphones: Headphones,
  UsersRound: UsersRound,
  LayoutGrid: LayoutGrid,
  Package: Package,
  DollarSign: DollarSign,
  Brain: Brain,
};

const domainColors: Record<string, string> = {
  Growth: "bg-blue-50 text-blue-600 border-blue-200",
  Operations: "bg-purple-50 text-purple-600 border-purple-200",
  "Operations + Growth": "bg-indigo-50 text-indigo-600 border-indigo-200",
  Strategy: "bg-amber-50 text-amber-600 border-amber-200",
};

export default function FunctionalAgentsGrid() {
  const functionalAgents = agentTemplates.filter((a) => a.id !== "governing");

  return (
    <section id="agents" className="relative py-24 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-purple-100/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200 bg-purple-50/50 mb-6">
            <span className="text-xs font-semibold tracking-[0.2em] text-purple-600 uppercase">Functional Agents</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Seven Domains.{" "}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              One System.
            </span>
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Seven functional agents cover every operational domain of your business. Each agent operates within its configured scope, reports activity and exceptions to the Governing Agent, and integrates directly with your existing platforms via API.
          </p>
        </motion.div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {functionalAgents.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} index={index} />
          ))}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-sm text-gray-400 font-mono tracking-wider uppercase">
            // Each agent · Each domain · Fully coordinated
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function AgentCard({ agent, index }: { agent: typeof agentTemplates[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const DomainBadge = domainColors[agent.domain] || domainColors.Operations;
  const IconComponent = iconMap[agent.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group relative rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-purple-300 hover:shadow-sm shadow-sm"
    >
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 border border-gray-200 group-hover:border-purple-300 transition-all">
              {IconComponent && (
                <div className="text-purple-500 group-hover:text-purple-600 transition-colors">
                  <IconComponent className="h-5 w-5" />
                </div>
              )}
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm tracking-wide">{agent.name}</h3>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${DomainBadge}`}>
                {agent.domain.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed mb-3">{agent.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {agent.tags.slice(0, expanded ? undefined : 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-50 text-gray-500 border border-gray-100"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expandable capabilities */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-3 border-t border-gray-100 mb-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-medium">Capabilities</p>
              <ul className="space-y-1.5">
                {agent.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2 text-xs text-gray-500">
                    <span className="mt-1 h-1 w-1 rounded-full bg-purple-400 shrink-0" />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* Expand/Collapse toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-purple-500 transition-colors uppercase tracking-wider"
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