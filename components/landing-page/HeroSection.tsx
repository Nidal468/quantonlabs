"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Activity, Shield, Zap } from "lucide-react";

const liveAgents = [
  { id: "governing", name: "Governing Agent", status: "active", tasks: 3 },
  { id: "sales", name: "Sales Agent", status: "processing", tasks: 7 },
  { id: "marketing", name: "Marketing Agent", status: "active", tasks: 5 },
  { id: "cx", name: "CX Agent", status: "monitoring", tasks: 12 },
  { id: "finance", name: "Finance Agent", status: "active", tasks: 4 },
  { id: "operations", name: "Operations Agent", status: "processing", tasks: 9 },
  { id: "inventory", name: "Inventory Agent", status: "idle", tasks: 0 },
  { id: "people", name: "People Agent", status: "active", tasks: 2 },
];

const liveFeedItems = [
  { agent: "GOV", action: "Orchestrated cross-agent workflow #4891", time: "just now" },
  { agent: "SALES", action: "Qualified $48K pipeline from inbound leads", time: "2m ago" },
  { agent: "OPS", action: "Routed 12 support tickets · SLA compliance 100%", time: "3m ago" },
  { agent: "MKT", action: "Launched campaign variant B · 4 channels live", time: "5m ago" },
  { agent: "FIN", action: "Reconciled invoices · flagged 2 payment anomalies", time: "7m ago" },
  { agent: "CX", action: "Resolved 27 customer chats · CSAT 4.9/5.0", time: "8m ago" },
];

const statusColors: Record<string, string> = {
  active: "bg-emerald-500",
  processing: "bg-blue-500",
  monitoring: "bg-purple-500",
  idle: "bg-gray-400",
};

export default function HeroSection() {
  const [feedIndex, setFeedIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  // Typing animation for the hero text
  useEffect(() => {
    const fullText = "Eight coordinated AI agents. One governing intelligence layer.";
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(interval);
  }, []);

  // Feed rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setFeedIndex((prev) => (prev + 1) % liveFeedItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-blue-100/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-purple-100/20 to-transparent blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column — Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 self-start px-4 py-2 rounded-full border border-emerald-200 bg-emerald-50"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold tracking-[0.2em] text-emerald-700 uppercase">
                System Online · 8 Agents Active
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="text-gray-900">The Architecture of</span>
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Intelligent Business
              </span>
            </h1>

            {/* Subheadline */}
            <div className="space-y-3 mt-2">
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                You built a business. Now the business runs you.
              </p>
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-lg">
                Quanton OS is the infrastructure that changes that. Built for businesses that have outgrown how they operate.
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-sm text-gray-400 font-mono"
              >
                {typedText}
                <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-blue-500`}>▊</span>
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-start gap-4 mt-4"
            >
              <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30">
                Assess Your Business
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-gray-600 rounded-lg border border-gray-200 hover:border-blue-300 hover:text-gray-900 hover:bg-blue-50/50 transition-all duration-300">
                Book a Discovery Call
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center gap-6 mt-4 pt-6 border-t border-gray-100"
            >
              {[
                { icon: Shield, label: "Enterprise Governance", value: "Built-in" },
                { icon: Zap, label: "API Integrations", value: "200+" },
                { icon: Activity, label: "Real-time Monitoring", value: "8 Agents" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-50 border border-gray-100">
                    <item.icon className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-600">{item.label}</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">{item.value}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column — Live OS Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            {/* Panel Container */}
            <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-lg shadow-gray-100/50">
              {/* Panel Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-gray-500 tracking-wider">QUANTON OS · KERNEL</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400">{new Date().toISOString().split("T")[0]}</span>
              </div>

              {/* Agent Status Grid */}
              <div className="p-4 grid grid-cols-2 gap-2">
                {liveAgents.map((agent, i) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50/50 border border-gray-100 hover:border-blue-200 transition-colors"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${statusColors[agent.status]} animate-pulse`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-mono text-gray-600 truncate">{agent.id.toUpperCase()}</div>
                      <div className="text-[9px] text-gray-400">{agent.tasks} tasks</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Live Activity Feed */}
              <div className="border-t border-gray-100 bg-gray-50/30">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-100">
                  <Activity className="w-3 h-3 text-blue-500" />
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Live Activity Feed</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={feedIndex}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="px-4 py-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[10px] font-mono font-bold text-blue-500 shrink-0 w-8">
                        {liveFeedItems[feedIndex].agent}
                      </span>
                      <p className="text-xs text-gray-600 leading-relaxed">{liveFeedItems[feedIndex].action}</p>
                    </div>
                    <span className="text-[9px] text-gray-400 mt-1 block font-mono">
                      {liveFeedItems[feedIndex].time}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Panel Footer */}
              <div className="border-t border-gray-100 px-4 py-2.5 bg-gray-50/30">
                <span className="text-[9px] font-mono text-gray-400 tracking-widest uppercase">
                  // Full Dashboard Above · System Status: Nominal
                </span>
              </div>
            </div>

            {/* Subtle glow behind panel */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100/30 via-purple-100/20 to-indigo-100/30 rounded-3xl blur-2xl -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}