"use client"


import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CiWarning } from 'react-icons/ci';
import { notifications } from '@/db/landingPage';
import AgentsTabs from '@/components/landing/tab_section';
import InteractiveDashboard from '@/components/landing/miniDashboard';
import Navbar from '@/components/landing/navbar';
import { Assessment } from '@/components/landing/assessment';

export type AssessmentState = {
    name: string;
    email: string;
    companySize: string;
    bottleneck: string;
    revenueBand: string;
    teamSize: string;
};

export default function Home() {
    const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);



    return (
        <div className="min-h-screen bg-linear-to-b from-white to-[#020617] text-white">
            {/* Background Glows - Top */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            {/* Navigation Header */}
            <Navbar setIsAssessmentOpen={setIsAssessmentOpen} />

            {/* Hero Section */}
            <section className="min-h-screen flex items-center pt-16">
                <div className="container mx-auto px-4 py-20 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-6"
                    >
                        <span className="inline-block text-xs tracking-widest uppercase text-slate-500/80">
                            FOR OPERATORS WHO HAVE OUTGROWN HOW THEY OPERATE
                        </span>

                        <h1 className="text-5xl md:text-7xl font-semibold leading-tight bg-gradient-to-r from-zinc-500 to-blue-200/30 text-transparent bg-clip-text">
                            The Architecture of Intelligent Business
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600/90 max-w-2xl mx-auto mt-8 leading-relaxed">
                            You built a business. Now the business runs you. Quanton OS is the infrastructure that changes that.
                        </p>

                        <p className="text-md md:text-lg text-slate-500/90 max-w-xl mx-auto mt-4">
                            Your business should work as hard as you do.
                        </p>

                        <div className="mt-12 flex justify-center gap-6">
                            <button
                                onClick={() => {/* View briefing logic */ }}
                                className="px-8 py-3 rounded-full text-lg font-semibold bg-black text-white hover:bg-gray-800 transition-colors shadow-xl"
                            >

                                <Link
                                    href="https://calendly.com/quantonlabs/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Request a demo
                                </Link>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Chaos Sequence */}
            <section className="min-h-screen flex items-center py-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-400 to-blue-400/40 text-transparent bg-clip-text">
                                This is not scale. This is survival.
                            </h2>
                            <p className="text-xl text-slate-600/90 max-w-2xl mx-auto">
                                Quanton OS removes the noise and installs coordination.
                            </p>
                        </div>

                        {/* Notification Cards */}
                        <div className="mt-12 space-y-4">
                            {notifications.map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: i * 0.1,
                                        type: "spring",
                                        damping: 20
                                    }}
                                    className="glass-card p-4 rounded-xl bg-white/60 backdrop-blur-lg text-sm border border-white/20"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className='flex items-center justify-center gap-2'>
                                            <CiWarning className='text-red-800' />
                                            <span className="font-medium text-red-300">{_.label}</span>
                                        </div>
                                        <span className="text-xs text-slate-500">{"•".repeat(3)}</span>
                                    </div>
                                    <p className="mt-2 text-slate-700/90">
                                        {_.text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Visual Noise Effect */}
                        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
                    </motion.div>
                </div>
            </section>

            {/* AI Agents Section */}
            <AgentsTabs />

            {/* Mini Dashboard Section */}
            <InteractiveDashboard />

            {/* Assessment Entry */}
            <section className="min-h-screen flex items-center py-20">
                <div className="container mx-auto px-4 max-w-2xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-200/30 text-transparent bg-clip-text">
                            Ready to See Where You're Leaking Time?
                        </h2>

                        <p className="text-xl text-slate-300/90">
                            The assessment maps your operational gaps in under 4 minutes.
                        </p>

                        <div className="mt-12 space-y-4">
                            <button
                                onClick={() => setIsAssessmentOpen(true)}
                                className="w-full px-8 py-4 rounded-xl text-lg font-semibold bg-black text-white hover:bg-gray-800 transition-colors shadow-xl"
                            >
                                Begin Assessment
                            </button>

                            <button
                                onClick={() => {/* Book consultation logic */ }}
                                className="w-full px-8 py-4 border border-white/20 rounded-xl text-lg font-medium text-white hover:bg-white/10 transition-colors"
                            >
                                <Link
                                    href="https://calendly.com/quantonlabs/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Book Consultation
                                </Link>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 bg-[#020617] border-t border-white/10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className='flex flex-col items-start gap-2'>
                            <div className='flex items-center justify-center gap-1 bg-white py-2 px-4 rounded-full'>
                                <img src={'/images/assets/seo/ql_logo.png'} className='w-4' />
                                <img src={'/images/assets/seo/ql_text.png'} className='w-20' />
                            </div>
                            <p className="text-slate-400/90 text-sm leading-relaxed">
                                Building the future of operational intelligence.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-6 text-white">Quanton OS</h3>
                            <ul className="space-y-2">
                                {[...Array(5)].map((_, i) => (
                                    <li key={i}>
                                        <a href="#" className="text-slate-400/90 hover:text-white text-sm transition-colors">
                                            {['Solutions', 'Resources', 'Pricing', 'Documentation', 'Community'][i]}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-6 text-white">Contact</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="mailto:Growth@QuantonLabs.com" className="text-slate-400/90 hover:text-white text-sm transition-colors">
                                        support@quantonlabs.com
                                    </a>
                                </li>
                                <li>
                                    <span className="text-slate-400/90 text-sm">
                                        © {new Date().getFullYear()} Quanton Labs. All rights reserved.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-12 pt-8 border-t border-white/10">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-slate-400/90 text-sm">
                                Built with ❤️ for the future of business operations
                            </p>
                            <div className="flex space-x-6">
                                {[...Array(4)].map((_, i) => (
                                    <a key={i} href="#" className="text-slate-400/90 hover:text-white text-sm transition-colors">
                                        {['Privacy Policy', 'Terms of Service', 'Status', 'Blog'][i]}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Assessment Modal */}
            {isAssessmentOpen && (
                <Assessment setIsAssessmentOpen={setIsAssessmentOpen} />
            )}

            {/* Floating Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/3 right-20 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 left-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
            </div>
        </div>
    );
}
