"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="relative w-full pt-20 pb-24 overflow-hidden">

            <div className="container mx-auto px-6 relative z-10 flex justify-center">

   <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl w-full text-center glass rounded-3xl backdrop-blur-xl bg-white/40 border border-white/40 shadow-2xl pt-14 pb-16 px-16"
    >
        {/* Heading */}
<h2 className="text-3xl md:text-5xl font-semibold leading-[1.35] bg-linear-to-r from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-transparent">            See where your operations stand before anything else.
        </h2>

                    {/* Subtext */}
                    <p className="text-slate-600 mt-6 text-md md:text-lg max-w-2xl mx-auto">
                        Our assessment identifies key opportunities and quantifies potential impact
                        before any commitment.
                    </p>

                    {/* Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/assessment"
                            className="group flex items-center justify-center gap-3 px-6 py-4 rounded-xl
              bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium
              shadow-lg hover:shadow-2xl
              hover:-translate-y-1
              transition-all duration-300"
                        >
                            Assess Your Business

                            <ArrowRight
                                size={20}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </Link>

                        <Link
                            href="https://calendly.com/quantonlabs/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-3 px-6 py-4 rounded-xl
              bg-transparent border-2 border-slate-900 text-slate-900 font-medium
              shadow-lg hover:shadow-2xl
              hover:-translate-y-1
              transition-all duration-300"
                        >
                            Book a Discovery Call

                            <ArrowRight
                                size={20}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </Link>
                    </div>

                </motion.div>

            </div>
        </section>
    );
}
