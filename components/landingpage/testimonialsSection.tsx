import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Section } from "./sectionProvider";

export const TestimonialsSection = () => (
    <Section id="testimonials" className="bg-[#041227]/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Customer Testimonials</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Hear what our clients say about their experience with Quanton OS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            "quote": "Quanton OS transformed how we operate. We've seen 40% faster execution times and clearer performance metrics.",
            "author": "Sarah Johnson",
            "role": "CTO, NovaAITech Solutions"
          },
          {
            "quote": "The AI orchestration has saved us countless hours each week. It's not just automation - it's intelligent intelligence.",
            "author": "Michael Chen",
            "role": "Operations Director, AIHyperGrowth Labs"
          },
          {
            "quote": "Our team could never have achieved this level of operational clarity without Quanton OS. It's truly the difference between chaos and control.",
            "author": "Elena Rodriguez",
            "role": "CEO, ApexAIScale Dynamics"
          }
        ]
          .map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 italic mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="font-semibold">{testimonial.author}</div>
                <div className="mx-2 text-slate-500">•</div>
                <div className="text-sm text-slate-400">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
      </div>
    </Section>
  );