"use client";

import { motion } from "framer-motion";
import { Brain, ArrowDown, Shield, AlertTriangle, BarChart3, Layers, GitBranch, CheckCircle2, Zap } from "lucide-react";

const agentDomains = [
  { id: "sales", name: "Sales Agent", icon: Zap, domain: "Growth", color: "blue" },
  { id: "marketing", name: "Marketing Agent", icon: Zap, domain: "Growth", color: "blue" },
  { id: "cx", name: "CX Agent", icon: CheckCircle2, domain: "Operations + Growth", color: "purple" },
  { id: "operations", name: "Operations Agent", icon: Layers, domain: "Operations", color: "indigo" },
  { id: "inventory", name: "Inventory Agent", icon: Layers, domain: "Operations", color: "indigo" },
  { id: "finance", name: "Finance Agent", icon: BarChart3, domain: "Operations", color: "purple" },
  { id: "people", name: "People Agent", icon: CheckCircle2, domain: "Operations", color: "blue" },
];

const capabilities = [
  "Cross-agent task orchestration",
  "Exception detection & auto-resolution",
  "Conflict detection & arbitration",
  "Real-time KPI monitoring & alerting",
  "Escalation routing & SLA enforcement",
  "Leadership dashboard synthesis",
];

const domainColors: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 border-blue-200",
  purple: "bg-purple-50 text-purple-600 border-purple-200",
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
};

export default function GoverningAgentSection() {
  return (
    <section id="governing" className="relative py-24 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-100/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-100/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50/50 mb-6">
            <Brain className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase">The Intelligence Layer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Governing Agent
            </span>
          </h2>

          {/* Description */}
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg text-gray-600 leading-relaxed">
              Without coordination, eight agents are just eight automations.
            </p>
            <p className="text-base text-gray-500 leading-relaxed">
              The Governing Agent is the structural layer that makes Quanton OS a system rather than a collection of tools. It receives data and exception flags from every functional agent, decides within its configured boundary, directs agents to act, and escalates what requires human judgment.
            </p>
            <p className="text-base text-gray-500 leading-relaxed">
              Every function in your business visible, coordinated, and governed from one view.
            </p>
          </div>
        </motion.div>

        {/* Architecture Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-12 shadow-sm">
            {/* Governing Agent — Top */}
            <div className="flex justify-center mb-8">
              <motion.div
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="relative px-10 py-6 rounded-2xl border-2 border-blue-200 bg-gradient-to-b from-blue-50 to-purple-50"
              >
                <div className="relative flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-100 border border-blue-200">
                    <Brain className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-gray-900 font-bold text-xl tracking-wide">Governing Agent</h3>
                    <p className="text-xs text-gray-500 mt-1">Strategy Layer · Orchestration · Governance</p>
                  </div>
                </div>

                {/* Connection line down */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-gradient-to-b from-blue-300 to-purple-200" />
              </motion.div>
            </div>

            {/* Arrow + Decision Layer */}
            <div className="flex justify-center mb-6">
              <div className="flex flex-col items-center gap-2">
                <ArrowDown className="w-5 h-5 text-blue-400" />
                <div className="px-4 py-1.5 rounded-full border border-purple-200 bg-purple-50/50">
                  <span className="text-[10px] font-mono text-purple-600 uppercase tracking-wider">Decides · Directs · Escalates</span>
                </div>
              </div>
            </div>

            {/* Connection lines to agents */}
            <div className="relative mb-6">
              {/* Horizontal connection line */}
              <div className="absolute top-0 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300" />

              {/* Vertical lines to each agent */}
              <div className="grid grid-cols-7 gap-0">
                {agentDomains.map((agent) => (
                  <div key={agent.id} className="flex flex-col items-center">
                    <div className={`w-[2px] h-6 bg-gradient-to-b from-purple-300 to-${agent.color}-300`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Functional Agents Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {agentDomains.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex flex-col items-center p-3 rounded-xl border ${domainColors[agent.color]} bg-opacity-[0.3] hover:bg-opacity-[0.5] transition-all`}
                >
                  <div className="p-2 rounded-lg bg-white/60 mb-2">
                    <agent.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-medium text-center leading-tight">{agent.name.split(" ")[0]}</span>
                  <span className={`text-[8px] mt-1 px-1.5 py-0.5 rounded-full border ${domainColors[agent.color]} opacity-70`}>
                    {agent.domain === "Operations + Growth" ? "Ops+G" : agent.domain}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Feedback arrows up */}
            <div className="mt-8 flex justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50/50">
                  <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-wider">Reports · Exceptions · KPIs</span>
                </div>
                <ArrowDown className="w-5 h-5 text-emerald-400 rotate-180" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: GitBranch, title: "Cross-Agent Orchestration", desc: "Coordinates tasks across all eight agents simultaneously, ensuring aligned execution." },
              { icon: AlertTriangle, title: "Exception Detection", desc: "Identifies anomalies and auto-resolves issues before they impact operations." },
              { icon: Shield, title: "Conflict Arbitration", desc: "Resolves conflicting directives between agents using configured business rules." },
              { icon: BarChart3, title: "KPI Monitoring", desc: "Real-time tracking of all key metrics with automated alerting thresholds." },
              { icon: AlertTriangle, title: "Escalation Routing", desc: "Routes exceptions requiring human judgment to the appropriate stakeholder." },
              { icon: Layers, title: "Dashboard Synthesis", desc: "Generates unified leadership views from distributed agent data streams." },
            ].map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-xl border border-gray-200 bg-white p-5 hover:border-blue-300 hover:shadow-sm shadow-sm transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-blue-50 border border-blue-100 group-hover:bg-blue-100 transition-colors shrink-0">
                    <cap.icon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold text-sm mb-1">{cap.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{cap.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-sm text-gray-400 font-mono tracking-wider uppercase">
            // Every function visible · coordinated · governed from one view
          </p>
        </motion.div>
      </div>
    </section>
  );
}