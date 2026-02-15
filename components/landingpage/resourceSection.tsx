import { motion } from "framer-motion";
import { BookOpen, FileText, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Section } from "./sectionProvider";

export const ResourcesSection = ({ handleDownload }: { handleDownload: (url: string) => void }) => (
    <Section id="resources" className="bg-[#041227]/50">
        <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Resources</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Downloadable guides, documentation, and templates.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
                {
                    title: "Implementation Guide",
                    description: "A step-by-step guide for installing, configuring, and deploying Quanton OS in production.",
                    icon: <BookOpen className="w-5 h-5" />,
                    link: "/pdf/Quanton OS Implementation Guide.docx.pdf"
                },
                {
                    title: "Architecture",
                    description: "An overview of the Quanton OS system architecture, including core services and data flow.",
                    icon: <Settings className="w-5 h-5" />,
                    link: "/pdf/quanton_os_architecture_brief.docx.pdf"
                }
            ].map((resource, index) => (
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
                            {resource.icon}
                        </div>
                        <h3 className="text-xl font-semibold">{resource.title}</h3>
                    </div>
                    <p className="text-slate-300 mb-3">{resource.description}</p>
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleDownload(resource.link)}
                    >
                        Download
                    </Button>
                </motion.div>
            ))}
        </div>
    </Section>
);