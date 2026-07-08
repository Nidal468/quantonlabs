"use client";

import { motion } from "framer-motion";
import { Brain, Layers, Network, Cpu, PlugZap, Workflow, Database, MessageSquare } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "Custom AI Agents",
    description: "Purpose-built agents designed for your specific business processes and operational requirements.",
    tags: ["Domain-Specific", "Configurable", "Scalable"],
  },
  {
    icon: Layers,
    title: "AI Operating Systems",
    description: "Full orchestration layer that coordinates multiple AI agents into a unified intelligence system.",
    tags: ["Orchestration", "Governance", "Real-time"],
  },
  {
    icon: Network,
    title: "Multi-Agent Systems",
    description: "Coordinated agent networks that communicate, collaborate, and self-organize to solve complex problems.",
    tags: ["Coordination", "Autonomous", "Resilient"],
  },
  {
    icon: Cpu,
    title: "Internal Automation",
    description: "End-to-end automation of internal business processes with intelligent decision-making at each step.",
    tags: ["Process Mining", "Workflow Design", "Execution"],
  },
  {
    icon: PlugZap,
    title: "API Integrations",
    description: "Direct connections to your existing platforms, databases, and third-party services via robust APIs.",
    tags: ["REST", "Webhooks", "Real-time Sync"],
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Intelligent workflows that adapt based on context, exceptions, and real-time business conditions.",
    tags: ["Adaptive", "Exception Handling", "SLA Aware"],
  },
  {
    icon: Database,
    title: "Knowledge Systems",
    description: "Structured knowledge bases that power agent decision-making with your institutional expertise.",
    tags: ["RAG", "Vector Search", "Versioned"],
  },
  {
    icon: MessageSquare,
    title: "AI Consulting",
    description: "Strategic guidance on implementing AI agents and orchestration for maximum business impact.",
    tags: ["Assessment", "Roadmap", "Implementation"],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-100/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50/50 mb-6">
            <span className="text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase">Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What We{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Deliver
            </span>
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Every engagement is custom-built. These are the capabilities we bring to your organization — individually or as a complete operating system.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group rounded-xl border border-gray-200 bg-white p-5 hover:border-blue-300 hover:shadow-sm shadow-sm transition-all"
            >
              <div className="flex flex-col h-full">
                {/* Icon */}
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 group-hover:bg-blue-100 transition-colors mb-4 w-fit">
                  <service.icon className="w-6 h-6 text-blue-500" />
                </div>

                {/* Title */}
                <h3 className="text-gray-900 font-bold text-base mb-2">{service.title}</h3>

                {/* Description */}
                <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-50 text-gray-500 border border-gray-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
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
            // Custom-built · Not templated · Designed for your business
          </p>
        </motion.div>
      </div>
    </section>
  );
}