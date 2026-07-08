"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Shield, Clock, CheckCircle2 } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="contact" className="relative py-32 bg-gradient-to-b from-gray-50/50 via-white to-white overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-100/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-100/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Custom Implementation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50/50 mb-6">
            <span className="text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase">Custom Implementation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Every Implementation Is{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Custom-Built
            </span>
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-8">
            Quanton OS is not a product you install. It's an operating system we architect specifically for your business — your workflows, your data, your governance rules.
          </p>

          {/* Pricing Factors */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-3xl mx-auto mb-8">
            {[
              { label: "Business Size", icon: Shield },
              { label: "Workflows", icon: CheckCircle2 },
              { label: "Integrations", icon: ArrowUpRight },
              { label: "Complexity", icon: Clock },
              { label: "Infrastructure", icon: Shield },
            ].map((factor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-300 shadow-sm transition-all"
              >
                <factor.icon className="w-5 h-5 text-blue-500" />
                <span className="text-xs font-medium text-gray-600">{factor.label}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <button className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30">
              Contact Us For A Custom Implementation Plan
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-24" />

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Ready to Build an{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Intelligent Business?
            </span>
          </h2>

          <p className="text-gray-500 max-w-xl mx-auto text-base sm:text-lg leading-relaxed mb-8">
            Schedule a consultation. Discuss how Quanton OS would transform your operations. No commitment — just clarity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30">
              Schedule a Consultation
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-gray-600 rounded-lg border border-gray-200 hover:border-blue-300 hover:text-gray-900 hover:bg-blue-50/50 transition-all duration-300">
              View Implementation Examples
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Bottom statement */}
          <p className="text-sm text-gray-400 font-mono tracking-wider uppercase mt-16">
            // You own the system · Your data · Your agents · Your intelligence layer
          </p>
        </motion.div>
      </div>
    </section>
  );
}