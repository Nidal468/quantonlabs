"use client";

import { motion } from "framer-motion";

export default function GoverningAgent() {
  return (
    <section id="what-gets-deployed" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Governing Agent Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 flex flex-col items-center justify-center text-center"
        >
          <div className="inline-flex items-center justify-center px-4 py-1 text-sm font-medium rounded-full bg-black/3 backdrop-blur-sm border border-white/20 text-slate-600 mb-6">
            THE GOVERNING AGENT
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-transparent mb-6">
            The Coordination, Decision, and Intelligence Layer
          </h2>
          <p className="text-sm md:text-lg text-slate-600 leading-relaxed max-w-3xl">
            Without the Governing Agent, the other seven agents execute tasks in isolation. They cannot detect cross-functional conflicts, synthesise performance into a unified view, or enforce governance across the system. The Governing Agent receives structured data and exception flags from every functional agent, decides within its configured operating boundary, directs agents to act, escalates what requires human judgment, and feeds the leadership dashboard in real time. It is the structural element that converts coordinated automations into a governed operating system.
          </p>
        </motion.div>

        {/* Functional Agents Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16 text-center"
        >
          <p className="text-slate-600 max-w-2xl mx-auto">
            Seven functional agents cover every operational domain of your business. Each agent operates within its configured scope, reports activity and exceptions to the Governing Agent, and integrates directly with your existing platforms via API.
          </p>
        </motion.div>

        {/* Functional Agents Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Marketing and Content Agent */}
          <div className="glass rounded-2xl p-8 backdrop-blur-xl bg-white/30 border border-white/40 shadow-xl hover:bg-white/40 transition-all duration-300">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Marketing and Content Agent</h3>
            <p className="text-sm font-medium text-slate-600 mb-4">Growth System</p>
            <p className="text-slate-600 leading-relaxed">
              Plans, creates, and distributes content across every active channel. Manages the editorial calendar, enforces brand voice across all agent-generated output, tracks content performance, and delivers campaign context and lead signals to the Sales Agent.
            </p>
          </div>

          {/* Sales Agent */}
          <div className="glass rounded-2xl p-8 backdrop-blur-xl bg-white/30 border border-white/40 shadow-xl hover:bg-white/40 transition-all duration-300">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Sales Agent</h3>
            <p className="text-sm font-medium text-slate-600 mb-4">Growth System</p>
            <p className="text-slate-600 leading-relaxed">
              Manages the full lead lifecycle from first contact through close. Handles lead intake and response, qualification scoring, proposal generation, multi-step follow-up sequences, pipeline reporting, and CRM hygiene. Passes closed-client context to the Customer Experience Agent on conversion.
            </p>
          </div>

          {/* Customer Experience Agent */}
          <div className="glass rounded-2xl p-8 backdrop-blur-xl bg-white/30 border border-white/40 shadow-xl hover:bg-white/40 transition-all duration-300">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Customer Experience Agent</h3>
            <p className="text-sm font-medium text-slate-600 mb-4">Operations and Growth Systems</p>
            <p className="text-slate-600 leading-relaxed">
              Manages the post-conversion client relationship. Handles client onboarding sequences, inbound inquiry classification and routing, scheduling, complaint escalation, post-service follow-up, and client satisfaction tracking. Maintains client profiles in shared state for cross-agent visibility.
            </p>
          </div>

          {/* People and Team Agent */}
          <div className="glass rounded-2xl p-8 backdrop-blur-xl bg-white/30 border border-white/40 shadow-xl hover:bg-white/40 transition-all duration-300">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">People and Team Agent</h3>
            <p className="text-sm font-medium text-slate-600 mb-4">Operations System</p>
            <p className="text-slate-600 leading-relaxed">
              Manages the full talent and team lifecycle. Covers job posting, candidate screening and scoring, interview scheduling, new hire onboarding, performance review preparation, certification tracking, and compliance deadline monitoring.
            </p>
          </div>

          {/* Operations Agent */}
          <div className="glass rounded-2xl p-8 backdrop-blur-xl bg-white/30 border border-white/40 shadow-xl hover:bg-white/40 transition-all duration-300">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Operations Agent</h3>
            <p className="text-sm font-medium text-slate-600 mb-4">Operations and Platform Systems</p>
            <p className="text-slate-600 leading-relaxed">
              Governs day-to-day operational execution. Assigns and tracks tasks across the team and agent domains, creates and maintains versioned SOPs, monitors process compliance, coordinates vendor communications, and surfaces operational dependencies and blockers to the Governing Agent.
            </p>
          </div>

          {/* Inventory and Supply Chain Agent */}
          <div className="glass rounded-2xl p-8 backdrop-blur-xl bg-white/30 border border-white/40 shadow-xl hover:bg-white/40 transition-all duration-300">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Inventory and Supply Chain Agent</h3>
            <p className="text-sm font-medium text-slate-600 mb-4">Operations System</p>
            <p className="text-slate-600 leading-relaxed">
              Monitors stock levels against configured thresholds, triggers reorder events, generates purchase orders, manages supplier communications, tracks inbound shipments, flags delivery delays and stockout risks to the Governing Agent, and produces supply chain performance reports for the leadership dashboard.
            </p>
          </div>

          {/* Finance Agent */}
          <div className="glass rounded-2xl p-8 backdrop-blur-xl bg-white/30 border border-white/40 shadow-xl hover:bg-white/40 transition-all duration-300">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Finance Agent</h3>
            <p className="text-sm font-medium text-slate-600 mb-4">Operations System</p>
            <p className="text-slate-600 leading-relaxed">
              Manages the financial operations layer. Generates invoices on trigger from Sales and Customer Experience agents, tracks receivables, categorises expenses against the chart of accounts, produces financial reports on a configured schedule, monitors compliance deadlines, and flags budget variances to the Governing Agent.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
