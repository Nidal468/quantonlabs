import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Section } from "./sectionProvider";

export const Careers = () => (
    <Section id="careers" className="bg-[#041227]/50">
        <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Careers</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Join our team building the future of business operations.
            </p>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
                {
                    title: "Senior Software Engineer",
                    location: "Remote",
                    description: "Help us build the next generation of AI-powered business tools."
                },
                {
                    title: "Product Manager",
                    location: "San Francisco, CA",
                    description: "Lead product development for our enterprise solutions."
                }
            ].map((job, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300"
                >
                    <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
                    <p className="text-blue-400 text-sm mb-2">{job.location}</p>
                    <p className="text-slate-300 mb-4">{job.description}</p>
                    <Button variant="outline" size="sm">
                        Apply Now
                    </Button>
                </motion.div>
            ))}
        </div>

        <div className="max-w-md mx-auto mt-10 text-center">
            <p className="text-slate-300 mb-4">Want to hear from us about opportunities?</p>
            <Button variant="outline" className="w-full">
                Join Our Talent Network
            </Button>
        </div>
    </Section>
);