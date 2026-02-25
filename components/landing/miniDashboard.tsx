"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, DollarSign, CheckCircle, AlertTriangle } from "lucide-react";

const agents = [
  { name: "Sales Agent", icon: <Zap className="w-5 h-5 text-blue-400" /> },
  { name: "Finance Agent", icon: <DollarSign className="w-5 h-5 text-green-400" /> },
  { name: "Operations Agent", icon: <CheckCircle className="w-5 h-5 text-purple-400" /> },
  { name: "Governing Agent", icon: <AlertTriangle className="w-5 h-5 text-red-400" /> },
];

export default function InteractiveDashboard() {
  const [activities, setActivities] = useState([
    { agent: "Sales Agent", action: "Followed up with 3 overdue leads", time: new Date() },
    { agent: "Finance Agent", action: "Reconciled 14 transactions", time: new Date() },
  ]);

  const [kpis, setKpis] = useState({
    revenue: 187500,
    openTasks: 12,
    autoActions: 43,
    exceptions: 9,
  });

  // Simulate agent performing an action
  const triggerAction = (agentName: string) => {
    const action = `${agentName} performed a new action`;
    const newActivity = { agent: agentName, action, time: new Date() };
    setActivities([newActivity, ...activities.slice(0, 5)]); // keep last 6 actions

    // Update KPIs randomly for demo
    setKpis((prev) => ({
      revenue: agentName === "Finance Agent" ? prev.revenue + Math.floor(Math.random() * 5000) : prev.revenue,
      openTasks: agentName === "Sales Agent" ? Math.max(prev.openTasks - 1, 0) : prev.openTasks,
      autoActions: prev.autoActions + 1,
      exceptions: agentName === "Governing Agent" ? prev.exceptions + 1 : prev.exceptions,
    }));
  };

  return (
    <section className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-200/30 text-transparent bg-clip-text">
            This is what coordination looks like.
          </h2>
          <p className="text-xl text-slate-300/90 max-w-3xl mx-auto">
            Your business — operating without you in every loop.
          </p>
        </motion.div>

        {/* Dashboard Container */}
        <div className="glass-container bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-xl mb-16">
          {/* Dashboard Header */}
          <div className="px-8 py-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Live Operations Dashboard</h3>
            <div className="flex gap-3">
              {agents.map((agent) => (
                <motion.button
                  key={agent.name}
                  onClick={() => triggerAction(agent.name)}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-3 py-1 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition"
                >
                  {agent.icon}
                  <span className="text-sm">{agent.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-8">
            {/* Activity Feed */}
            <div>
              <h4 className="font-bold text-lg mb-6 bg-gradient-to-r from-white to-blue-200/30 text-transparent bg-clip-text">
                Live Automation Activity
              </h4>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {activities.map((act, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 rounded-full mt-2 bg-blue-500/50" />
                    <div>
                      <p className="text-slate-400/90 text-sm">{act.action}</p>
                      <span className="text-xs text-slate-300 mt-1 inline-block">
                        {act.time.toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* KPIs */}
            <div>
              <h4 className="font-bold text-lg mb-6 bg-gradient-to-r from-white to-blue-200/30 text-transparent bg-clip-text">
                Key Performance Indicators
              </h4>
              <div className="space-y-6">
                {[
                  { label: "Revenue", value: kpis.revenue, suffix: "$", icon: <DollarSign className="w-5 h-5 text-green-400" /> },
                  { label: "Open Tasks", value: kpis.openTasks, suffix: "", icon: <CheckCircle className="w-5 h-5 text-blue-400" /> },
                  { label: "Auto Actions Today", value: kpis.autoActions, suffix: "", icon: <Zap className="w-5 h-5 text-purple-400" /> },
                  { label: "Exceptions Routed", value: kpis.exceptions, suffix: "", icon: <AlertTriangle className="w-5 h-5 text-red-400" /> },
                ].map((kpi, i) => (
                  <div key={i} className="flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2 text-slate-400/90 text-sm">
                      {kpi.icon} <span>{kpi.label}</span>
                    </div>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-2xl font-bold bg-gradient-to-r from-slate-400 to-blue-100 text-transparent bg-clip-text"
                    >
                      {kpi.suffix}{kpi.value}
                    </motion.span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}