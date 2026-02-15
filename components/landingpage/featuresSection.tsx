import { Globe, Users, Zap } from "lucide-react";
import { Section } from "./sectionProvider";
import { motion } from "framer-motion";

export const FeaturesSection = () => (
    <Section id="features" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Quanton OS provides enterprise-grade capabilities for growth-stage companies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: "AI-Powered Automation",
            description: "Intelligent agents that work across your entire stack without vendor lock-in.",
            icon: <Zap className="w-5 h-5" />
          },
          {
            title: "Scalable Architecture",
            description: "Built to grow with your business, not constrain it through rigid processes.",
            icon: <Globe className="w-5 h-5" />
          },
          {
            title: "Unified Platform",
            description: "Single control layer for strategy, operations, and growth - no more scattered tools.",
            icon: <Users className="w-5 h-5" />
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg mr-3 text-blue-400">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );