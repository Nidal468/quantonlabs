'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { industryContentMap } from '@/db/solutions';
import { ChevronLeft, ArrowRight, CheckCircle, Lightbulb, Zap, Sparkles } from 'lucide-react';

export default function IndustrySolutionPage() {
    const [loading, setLoading] = useState(true);
    const [solutionId, setSolutionId] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (window) {
            const id = window.location.pathname.split("/")[2];
            setSolutionId(id)
            setTimeout(() => {
                setLoading(false);
                setIsVisible(true);
            }, 300);
        }
    }, []);

    const content = industryContentMap[solutionId as keyof typeof industryContentMap];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#041227] to-[#1e293b] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-16 h-16 border-4 border-[#6366f1] border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-lg text-gray-300">Loading solution...</p>
                </motion.div>
            </div>
        );
    }

    if (!content) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#041227] to-[#1e293b] flex items-center justify-center">
                <div className="text-center max-w-md p-8 rounded-xl bg-[#1e293b]/50 backdrop-blur-sm border border-[#374151]">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-red-500/10 rounded-full">
                            <Sparkles className="w-8 h-8 text-red-400" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Solution Not Found</h1>
                    <p className="text-gray-400 mb-6">The requested industry solution page could not be found.</p>
                    <Button asChild variant="outline" className="border-[#6366f1] hover:bg-[#6366f1]/10 text-white">
                        <Link href="/">Return Home</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#041227] to-[#1e293b] text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Button
                        asChild
                        variant="ghost"
                        className="flex items-center gap-2 text-[#6366f1]"
                    >
                        <Link href="/">
                            <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>Back to Solutions</span>
                        </Link>
                    </Button>
                </motion.div>

                {/* Hero Section */}
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-16 md:mb-24"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-[#6366f1]/10 rounded-lg">
                                    <Zap className="w-6 h-6 text-[#6366f1]" />
                                </div>
                                <span className="text-sm font-medium text-[#6366f1]">Industry Solution</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                {content.title}
                            </h1>
                            <p className="text-xl text-[#e2e8f0] mb-8 max-w-3xl leading-relaxed">
                                {content.subtitle}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#374151]/50">
                                <Button
                                    asChild
                                    className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5b5df0] hover:to-[#7c3aed] px-8 py-6 text-md font-medium rounded-md transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <Link href="/assessment" className="flex items-center justify-center gap-2">
                                        {content.cta1Text}
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="border-[#6366f1] px-8 py-6 text-md font-medium rounded-md transition-colors duration-300"
                                >
                                    <Link href="https://calendly.com/quantonlabs/30min" className="flex items-center justify-center gap-2">
                                        {content.cta2Text}
                                        <Lightbulb className="w-5 h-5" />
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Description */}
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mb-16 md:mb-24"
                        >
                            <div className="flex items-start gap-4">
                                <div className="pt-1">
                                    <CheckCircle className="w-6 h-6 text-[#10b981]" />
                                </div>
                                <p className="text-lg text-[#e2e8f0] leading-relaxed max-w-4xl">
                                    {content.description}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Content Sections */}
                {content.sections.map((section, index) => (
                    <AnimatePresence key={index}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + (index * 0.2), duration: 0.5 }}
                            className="mb-16 md:mb-24"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-[#6366f1]/10 rounded-lg">
                                    <Sparkles className="w-5 h-5 text-[#6366f1]" />
                                </div>
                                <h2 className="text-2xl font-bold text-[#f8fafc]">{section.title}</h2>
                            </div>

                            <div
                                className="prose prose-invert max-w-none text-[#e2e8f0] leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br />') }}
                            />
                        </motion.div>
                    </AnimatePresence>
                ))}

                {/* Final CTA Section */}
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            className="mt-16 pt-8 border-t border-[#374151]/50"
                        >
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    asChild
                                    className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5b5df0] hover:to-[#7c3aed] px-8 py-6 text-lg font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <Link href="/assessment" className="flex items-center justify-center gap-2">
                                        {content.cta1Text}
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="border-[#6366f1] hover:bg-[#6366f1]/10 px-8 py-6 text-lg font-medium rounded-xl transition-colors duration-300"
                                >
                                    <Link href="https://calendly.com/quantonlabs/30min" className="flex items-center justify-center gap-2">
                                        {content.cta2Text}
                                        <Lightbulb className="w-5 h-5" />
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
