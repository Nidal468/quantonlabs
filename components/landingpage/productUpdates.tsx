import { motion } from "framer-motion";
import { Section } from "./sectionProvider";

export const ProductUpdates = () => (
    <Section id="product-updates" className="bg-[#041227]/50">
        <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Product Updates</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Stay informed about the latest features and improvements.
            </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
            {[
                {
                    title: "AI Agent Enhancements",
                    date: "June 15, 2025",
                    summary: "New capabilities for intelligent decision making and automated workflows."
                },
                {
                    title: "Enhanced Analytics Dashboard",
                    date: "May 30, 2025",
                    summary: "Real-time metrics with predictive insights for better business decisions."
                }
            ].map((update, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg mb-1">{update.title}</h3>
                        <span className="text-sm text-slate-400 whitespace-nowrap">{update.date}</span>
                    </div>
                    <p className="text-slate-300">{update.summary}</p>
                </motion.div>
            ))}
        </div>
    </Section>
);