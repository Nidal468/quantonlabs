"use client";

import { motion } from "framer-motion";
import { Building2, Factory, Stethoscope, ShoppingCart, Landmark, GraduationCap, Globe, ArrowRightLeft, Plug, KeyRound } from "lucide-react";

const industries = [
  { icon: Factory, name: "Manufacturing & Distribution", description: "End-to-end operational intelligence for production and logistics." },
  { icon: Globe, name: "Logistics & Supply Chain", description: "Real-time coordination across routes, warehouses, and partners." },
  { icon: Stethoscope, name: "Healthcare & Wellness", description: "Compliant, coordinated patient operations and scheduling." },
  { icon: ShoppingCart, name: "Retail & E-commerce", description: "Unified commerce with inventory, CX, and finance automation." },
  { icon: Landmark, name: "Financial Services", description: "Regulatory-aware workflows with audit trails and governance." },
  { icon: GraduationCap, name: "SaaS & Technology", description: "Scale your operations without scaling headcount proportionally." },
  { icon: Building2, name: "Education & Training", description: "Administrative automation across enrollment, delivery, and support." },
];

const integrations = [
  { name: "Slack", category: "Communication" },
  { name: "Microsoft 365", category: "Productivity" },
  { name: "Google Workspace", category: "Productivity" },
  { name: "HubSpot", category: "CRM" },
  { name: "Shopify", category: "E-commerce" },
  { name: "Stripe", category: "Payments" },
  { name: "Notion", category: "Knowledge" },
  { name: "GitHub", category: "Development" },
  { name: "Discord", category: "Communication" },
];

export default function BusinessValue() {
  return (
    <section id="benefits" className="relative py-24 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-blue-100/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Industries Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built for{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Every Industry
              </span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Quanton OS adapts to your business domain. The same orchestration layer, different operational contexts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group rounded-xl border border-gray-200 bg-white p-5 hover:border-blue-300 hover:shadow-sm shadow-sm transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-100 group-hover:bg-blue-100 transition-colors shrink-0">
                    <industry.icon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-sm mb-1">{industry.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{industry.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Integrations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Integrates With{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Your Existing Tools
              </span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              No migration. No rip-and-replace. Quanton OS connects directly to the platforms you already use via API.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="group relative rounded-xl border border-gray-200 bg-white px-5 py-3 hover:border-purple-300 hover:shadow-sm shadow-sm transition-all"
              >
                <span className="text-sm text-gray-700 font-medium">{integration.name}</span>
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {integration.category}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom statement */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-sm text-gray-400 font-mono tracking-wider uppercase">
              // Connects to 200+ platforms · No migration required · API-first architecture
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}