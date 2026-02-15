import { motion } from "framer-motion";
import { FileText, BookOpen } from "lucide-react";
import { Button } from "../ui/button";
import { Section } from "./sectionProvider";

export const WhitepapersEbooks = ({ handleDownload }: { handleDownload: (url: string) => void }) => (
    <Section id="whitepapers-ebooks" className="bg-[#041227]/50">
        <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Whitepapers & Resources</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Download our comprehensive resources to deepen your understanding.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
                {
                    title: "AI Adoption Pathways",
                    description: "An in-depth analysis of why enterprise AI initiatives fail—and the strategic pathways that lead to real adoption and impact.",
                    icon: <FileText className="w-5 h-5" />,
                    link: "/pdf/whitepaper/AI Adoption Pathways_ Why Enterprise AI Initiatives Fail and What Separates Success from Stagnation.pdf"
                },
                {
                    title: "Scaling Business Systems",
                    description: "A practical guide to designing business systems and architectures that scale reliably as organizations grow.",
                    icon: <BookOpen className="w-5 h-5" />,
                    link: "/pdf/whitepaper/Scaling Business Systems.pdf"
                },
                {
                    title: "The Operating System Imperative",
                    description: "Why modern enterprises need an operating system layer—and how it reshapes coordination, automation, and execution.",
                    icon: <BookOpen className="w-5 h-5" />,
                    link: "/pdf/whitepaper/The Operating System Imperative.pdf"
                }
            ].map((resource, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-400/30 shadow-slate-800 hover:shadow-2xl transition-all duration-300 flex items-start"
                >
                    <div className="p-2 bg-blue-500/10 rounded-lg mr-3 text-blue-400">
                        {resource.icon}
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                        <p className="text-slate-300 mb-3">{resource.description}</p>
                        <Button variant="outline" size="sm" onClick={() => handleDownload(resource.link)}>
                            Download PDF
                        </Button>
                    </div>
                </motion.div>
            ))}
        </div>
    </Section>
);