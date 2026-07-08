"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Feather,
  Zap,
  Route,
  Target,
  Road,
  MessageSquare,
  Layers,
  RefreshCw,
  ArrowUpCircle,
  Award,
  Heart,
  Star,
  TrendingUp,
  Users,
  ShieldAlert,
  Mic,
  Headphones,
  Bell,
  BookOpen,
  Crown,
  ChevronDown,
  ChevronUp,
  Activity,
  Clock,
  Zap as ZapIcon,
  ShieldCheck
} from "lucide-react";

// Import the agent skills data
import cxAgentSkills from "@/db/cx_agent_skill.json";

// Icon mapping for agent skills
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Feather,
  Zap,
  Route,
  Target,
  Road,
  MessageSquare,
  Layers,
  RefreshCw,
  ArrowUpCircle,
  Award,
  Heart,
  Star,
  TrendingUp,
  Users,
  ShieldAlert,
  Mic,
  Headphones,
  Bell,
  BookOpen,
  Crown,
};

// Domain colors
const domainColors: Record<string, string> = {
  Operations: "bg-blue-50 text-blue-600 border-blue-200",
  Growth: "bg-purple-50 text-purple-600 border-purple-200",
  "Operations + Growth": "bg-indigo-50 text-indigo-600 border-indigo-200",
  Strategy: "bg-amber-50 text-amber-600 border-amber-200",
};

// Stats colors
const statColors: Record<string, string> = {
  speed: "text-blue-500",
  accuracy: "text-emerald-500",
  tokenEfficiency: "text-purple-500",
  power: "text-rose-500",
};

interface AgentSkill {
  id: string;
  name: string;
  domain: string;
  description: string;
  icon: string;
  capabilities: string[];
  stats: {
    speed: number;
    accuracy: number;
    tokenEfficiency: number;
    power: number;
  };
  buffs: { domain: string; value: number }[];
  debuffs: { domain: string; value: number }[];
  cost: number;
  dependency: { agentSkillId: string }[];
  levels: AgentLevel[];
}

interface AgentLevel {
  name: string;
  domain: string;
  description: string;
  icon: string;
  capabilities: string[];
  stats: {
    speed: number;
    accuracy: number;
    tokenEfficiency: number;
    power: number;
  };
  buffs: { domain: string; value: number }[];
  debbuffs: { domain: string; value: number }[];
  cost: number;
}

export default function AgentsSkillsSection() {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  // Get unique agents (first level of each agent)
  const agents: AgentSkill[] = cxAgentSkills.map((agent: any) => ({
    ...agent,
    levels: agent.levels || [],
  }));

  const toggleAgent = (agentId: string) => {
    setExpandedAgent(expandedAgent === agentId ? null : agentId);
  };

  const getStatColor = (value: number, max: number = 100): string => {
    const percentage = value / max;
    if (percentage >= 0.8) return "text-emerald-500";
    if (percentage >= 0.6) return "text-blue-500";
    if (percentage >= 0.4) return "text-amber-500";
    return "text-gray-400";
  };

  const getStatBarColor = (value: number): string => {
    const percentage = value / 100;
    if (percentage >= 0.8) return "bg-emerald-500";
    if (percentage >= 0.6) return "bg-blue-500";
    if (percentage >= 0.4) return "bg-amber-500";
    return "bg-gray-300";
  };

  return (
    <section id="agents-skills" className="relative py-24 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-blue-100/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-purple-100/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200 bg-purple-50/50 mb-6">
            <span className="text-xs font-semibold tracking-[0.2em] text-purple-600 uppercase">Agent Skills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Intelligent <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Capabilities</span>
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Our CX agents come with multiple skill levels, each enhancing capabilities and performance.
            From basic automation to mastery-level intelligence.
          </p>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16"
        >
          {[
            { label: "Total Skills", value: agents.length },
            { label: "Max Speed", value: "118" },
            { label: "Max Accuracy", value: "100%" },
            { label: "Skill Levels", value: "3" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border border-gray-200 bg-white p-4 text-center hover:border-purple-300 transition-all"
            >
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {agents.map((agent, index) => {
            const IconComponent = iconMap[agent.icon] || Layers;
            const isExpanded = expandedAgent === agent.id;
            const DomainBadge = domainColors[agent.domain] || domainColors.Operations;

            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group rounded-2xl border border-gray-200 bg-white p-6 hover:border-purple-300 hover:shadow-lg shadow-sm transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-gray-200 group-hover:border-purple-300 transition-all">
                      <IconComponent className="h-6 w-6 text-purple-500 group-hover:text-purple-600 transition-colors" />
                      <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base tracking-wide">{agent.name}</h3>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${DomainBadge}`}>
                        {agent.domain.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleAgent(agent.id)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-purple-500"
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{agent.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {Object.entries(agent.stats).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                          {key === "speed" && "Speed"}
                          {key === "accuracy" && "Accuracy"}
                          {key === "tokenEfficiency" && "Token Eff."}
                          {key === "power" && "Power"}
                        </span>
                        <span className={`text-xs font-bold ${getStatColor(value)}`}>{value}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getStatBarColor(value)}`}
                          style={{ width: `${(value / 100) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Capabilities */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-3 w-3 text-purple-500" />
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Capabilities</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.capabilities.slice(0, 3).map((cap) => (
                      <span
                        key={cap}
                        className="px-2 py-1 rounded-md text-[10px] font-medium bg-purple-50 text-purple-600 border border-purple-100"
                      >
                        {cap}
                      </span>
                    ))}
                    {agent.capabilities.length > 3 && (
                      <span className="px-2 py-1 rounded-md text-[10px] font-medium bg-gray-100 text-gray-500">
                        +{agent.capabilities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Level Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>{agent.levels.length} Levels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ZapIcon className="h-3 w-3" />
                    <span>Cost: {agent.cost}</span>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-4 pt-4 border-t border-gray-100"
                  >
                    <div className="space-y-4">
                      {/* Levels */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
                          Skill Progression
                        </h4>
                        <div className="space-y-3">
                          {agent.levels.map((level, levelIndex) => (
                            <div
                              key={levelIndex}
                              className={`rounded-lg border ${
                                levelIndex === agent.levels.length - 1
                                  ? "border-purple-300 bg-purple-50/30"
                                  : "border-gray-200 bg-gray-50"
                              } p-3`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className={`text-xs font-bold ${
                                  levelIndex === agent.levels.length - 1
                                    ? "text-purple-600"
                                    : "text-gray-700"
                                }`}>
                                  {level.name}
                                </span>
                                <span className="text-[10px] text-gray-400">Level {levelIndex + 1}</span>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">{level.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {level.capabilities.slice(0, 2).map((cap) => (
                                  <span
                                    key={cap}
                                    className="px-1.5 py-0.5 rounded text-[9px] bg-white border border-gray-200 text-gray-500"
                                  >
                                    {cap}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Buffs and Debuffs */}
                      {(agent.buffs.length > 0 || agent.debuffs.length > 0) && (
                        <div>
                          <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                            Effects
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {agent.buffs.map((buff, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-50 border border-emerald-200"
                              >
                                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                                <span className="text-[10px] text-emerald-600">
                                  +{buff.value}% {buff.domain}
                                </span>
                              </div>
                            ))}
                            {agent.debuffs.map((debuff, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-rose-50 border border-rose-200"
                              >
                                <ShieldAlert className="h-3 w-3 text-rose-500" />
                                <span className="text-[10px] text-rose-600">
                                  {debuff.value}% {debuff.domain}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-sm text-gray-400 font-mono tracking-wider uppercase">
            // 18+ CX Skills · 3 Levels Each · Intelligent Automation
          </p>
        </motion.div>
      </div>
    </section>
  );
}