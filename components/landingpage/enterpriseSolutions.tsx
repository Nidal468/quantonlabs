import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Section } from "./sectionProvider";

export const EnterpriseSolutions = () => (
    <Section id="enterprise-solutions" className="bg-[#041227]/50">
        <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise Solutions</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Custom enterprise-grade options for large organizations.
            </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
                {
                    title: "SLA Guarantee",
                    description: "Enterprise-level service level agreements with guaranteed uptime and response times."
                },
                {
                    title: "On-Premise Deployment",
                    description: "Fully customizable on-premise installations for compliance requirements."
                },
                {
                    title: "Custom Development",
                    description: "Tailored features built specifically to match your business workflows."
                },
                {
                    title: "Dedicated Support",
                    description: "24/7 dedicated account managers and technical support specialists."
                }
            ].map((solution, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
                >
                    <h3 className="font-semibold text-lg mb-2">{solution.title}</h3>
                    <p className="text-slate-300">{solution.description}</p>
                </motion.div>
            ))}
        </div>

        <div className="max-w-md mx-auto mt-10">
            <Button variant="outline" className="w-full">
                Contact for Enterprise Pricing
            </Button>
        </div>
    </Section>
);