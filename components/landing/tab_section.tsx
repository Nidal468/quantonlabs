"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const agents = [
  {
    name: "Marketing & Content",
    function: "Creates brand-aligned content at scale",
    icon: "marketing",
    video: "/videos/marketing.mp4"
  },
  {
    name: "Sales",
    function: "Manages leads and closes deals autonomously",
    icon: "sales",
    video: "/videos/sales.mp4"
  },
  {
    name: "Customer Experience",
    function: "Provides 24/7 support with human-like empathy",
    icon: "customer",
    video: "/videos/customer.mp4"
  },
  {
    name: "People & Team (HR)",
    function: "Handles recruitment and employee engagement",
    icon: "hr",
    video: "/videos/hr.mp4"
  },
  {
    name: "Operations",
    function: "Optimizes workflows and resource allocation",
    icon: "operations",
    video: "/videos/operations.mp4"
  },
  {
    name: "Inventory & Supply Chain",
    function: "Manages stock levels and supplier relationships",
    icon: "inventory",
    video: "/videos/inventory.mp4"
  },
  {
    name: "Finance",
    function: "Tracks expenses and generates financial insights",
    icon: "finance",
    video: "/videos/finance.mp4"
  },
  {
    name: "Governing Agent",
    function: "The coordination layer of the system",
    icon: "governance",
    video: "/videos/governance.mp4",
    isSpecial: true
  }
];

export default function AgentsTopTabs() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedAgent = agents[selectedIndex];

  return (
    <section className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-200/30 text-transparent bg-clip-text">
            Meet The Agents
          </h2>
          <p className="text-xl text-slate-900/90 max-w-3xl mx-auto">
            Eight coordinated intelligence layers working as one operating system.
          </p>
        </motion.div>

        {/* Top Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {agents.map((agent, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all border ${
                selectedIndex === index
                  ? "bg-white/20 border-blue-500/40 scale-[1.02]"
                  : "bg-white/10 border-white/10 hover:bg-white/15"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {agent.name}
            </motion.button>
          ))}
        </div>

        {/* Selected Agent Details */}
        <motion.div
          key={selectedAgent.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 p-8 rounded-xl border border-white/10"
        >
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            {selectedAgent.function}
          </p>
          <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10">
            <video
              src={selectedAgent.video}
              controls
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}