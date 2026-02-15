import { motion } from "framer-motion";
import { Section } from "./sectionProvider";

export const FAQSection = () => (
    <Section id="faq" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Answers to common questions about Quanton OS implementation and benefits.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {[
          {
            question: "How long does it take to implement?",
            answer: "Most companies complete the initial implementation in 6-8 weeks, with continuous optimization phases."
          },
          {
            question: "Do you support integrations with our existing tools?",
            answer: "Yes - Quanton OS integrates natively with most popular business platforms and tools without vendor lock-in."
          },
          {
            question: "What happens during the transition period?",
            answer: "We provide full training, gradual adoption plans, and a dedicated implementation partner to ensure smooth transitions."
          },
          {
            question: "Can I scale up or down as my company grows?",
            answer: "Absolutely. Quanton OS is built with scalability in mind, allowing you to add features and users without re-architecture."
          }
        ].map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
          >
            <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
            <p className="text-slate-300">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );