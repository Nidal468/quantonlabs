import { blogPosts } from "@/db/blogs";
import { notifications } from "@/db/landingPage";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import { IntelligentGridBackground } from "../animated/bg_grid";

export function HeroSection() {

    const randomNotifications = useMemo(() => {
        const shuffled = [...notifications].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 4);
    }, []);

    const randomPosts = useMemo(() => {
        const shuffled = [...blogPosts].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    }, []);
    return (
        <div className="relative container mx-auto w-full min-h-screen pt-[120px] flex flex-col items-center justify-center gap-16 z-10">
            <IntelligentGridBackground />
            <div className="flex items-center justify-between w-full">
                {/* Left Content */}
                <div className="flex flex-col items-start justify-center text-left max-w-xl">

                    <p className="text-xs tracking-[0.25em] text-slate-400 mb-6">
                        FOR OPERATORS WHO HAVE OUTGROWN HOW THEY OPERATE
                    </p>

                    <h1 className="text-6xl leading-[1.1] font-semibold mb-6 bg-linear-to-r from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-transparent">
                        The Architecture of Intelligent Business
                    </h1>

                    <p className="text-lg text-slate-500 mb-4 leading-relaxed">
                        You built a business. Now the business runs you.
                        Quanton OS is the infrastructure that changes that.
                    </p>

                    <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                        Your business should work as hard as you do.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="https://calendly.com/quantonlabs/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 rounded-xl bg-slate-900 text-white text-sm font-medium shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            Request a Demo
                        </Link>

                        <Link
                            href="/"
                            className="px-8 py-4 rounded-xl glass backdrop-blur-md bg-slate-900/10 text-slate-800 text-sm font-medium hover:bg-slate-900/20 transition-all duration-300"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>

                {/* Right Image + Floating Glass Notifications */}
                <div className="relative flex items-center justify-center">

                    {/* Glow */}
                    <div className="absolute w-[750px] h-[450px] bg-slate-900/20 blur-3xl rounded-full"></div>

                    {/* Floating Notifications */}
                    {randomNotifications.map((item, index) => {
                        const Icon = item.icon;

                        const positions = [
                            "top-0 -left-16",
                            "top-12 -right-20",
                            "bottom-12 -left-24",
                            "-bottom-10 -right-8"
                        ];

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 80 }}
                                animate={{
                                    opacity: 1,
                                    y: [0, -12, 0],
                                }}
                                transition={{
                                    opacity: { duration: 0.6, delay: index * 0.2 },
                                    y: {
                                        duration: 2 + index,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    },
                                }}
                                className={`absolute ${positions[index]} w-[260px] px-5 py-4 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/40 shadow-xl overflow-hidden`}
                            >
                                <motion.div
                                    className="w-[400px] h-[600px] absolute bg-linear-to-bl from-slate-800 to-slate-200 top-0 left-0 blur-3xl"
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 4,       // slow spin
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                />
                                <div className="flex items-start gap-3 relative">
                                    <div className="p-2 rounded-lg bg-slate-900/10">
                                        <Icon className="w-4 h-4 text-slate-500" />
                                    </div>
                                    <p className="text-xs text-slate-300 leading-snug">
                                        {item.text}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Main Image */}
                    <img
                        src="/images/mockups/3.png"
                        className="w-[750px] h-[450px] object-cover rounded-2xl shadow-[0_30px_80px_rgba(15,23,42,0.15)] border border-white/40"
                    />
                </div>
            </div>

            {/* Bottom Content */}
            <div className="w-full grid grid-cols-3 gap-6">
                {randomPosts.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="h-[190px] flex flex-col justify-between px-6 py-5 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/40 shadow-xl hover:bg-white/30 transition-all duration-300"
                    >
                        <div>
                            <h2 className="text-slate-800 text-md font-medium line-clamp-1">
                                {item.title}
                            </h2>

                            <div className="flex items-center text-xs text-slate-500 mt-1 gap-1">
                                <span>{item.author}</span>
                                <span>•</span>
                                <span>{item.category}</span>
                            </div>

                            <p className="text-sm text-slate-500 mt-3 line-clamp-3">
                                {item.content}
                            </p>
                        </div>

                        <div className="text-xs text-slate-400 mt-4">
                            Read more →
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

