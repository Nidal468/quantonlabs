"use client"

import { BlogPost, blogPosts } from "@/db/blogs";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IntelligentGridBackground } from "../animated/bg_grid";


export function HeroSection() {
    const [randomPosts, setRandomPosts] = useState<BlogPost[]>([]);
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [buttonState, setButtonState] = useState<"idle" | "signing">("idle");
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const shuffledPosts = [...blogPosts].sort(() => 0.5 - Math.random());
        setRandomPosts(shuffledPosts.slice(0, 3));
    }, []);

    function handleSignIn() {
        if (isAnimating) return;
        setIsAnimating(true);
        setButtonState("signing");
        setTimeout(() => {
            setButtonState("idle");
            setIsAnimating(false);
        }, 2000);
    }

    return (
        <div className="w-full bg-linear-to-b from-white to-slate-200 pt-20 md:pt-[120px]" style={{ position: "relative" }}>
            <style>{`
                @keyframes pulse-opacity {
                    from { opacity: 1; }
                    to { opacity: 0.5; }
                }
            `}</style>

            <div className="relative container mx-auto w-full min-h-screen flex flex-col items-center justify-center gap-16 z-10">
                <IntelligentGridBackground />

                <div className="flex items-center justify-between w-full">
                    {/* Left Content */}
                    <div className="flex flex-col items-start justify-center text-center md:text-left max-w-xl p-6">
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
                            Eight coordinated AI agents. One governing intelligence layer. Built for businesses that have outgrown how they operate.
                        </p>
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
                                href="/assessment"
                                className="px-8 py-4 rounded-xl glass backdrop-blur-md bg-slate-900/10 text-slate-800 text-sm font-medium hover:bg-slate-900/20 transition-all duration-300"
                            >
                                Try our Assessment
                            </Link>
                        </div>
                    </div>

                    {/* Right: Mockup */}
                    <div className="relative hidden md:flex items-center justify-center">
                        <div className="absolute w-[750px] h-[450px] bg-slate-900/20 blur-3xl rounded-full"></div>
                        <img
                            src="/images/mockups/3.png"
                            className="w-[750px] h-[450px] object-cover rounded-2xl shadow-[0_30px_80px_rgba(15,23,42,0.15)] border border-white/40"
                        />
                    </div>
                </div>

                {/* Blog Posts */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
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
                                <h2 className="text-slate-800 text-md font-medium line-clamp-1">{item.title}</h2>
                                <div className="flex items-center text-xs text-slate-500 mt-1 gap-1">
                                    <span>{item.author}</span>
                                    <span>•</span>
                                    <span>{item.category}</span>
                                </div>
                                <p className="text-sm text-slate-500 mt-3 line-clamp-3">{item.content}</p>
                            </div>
                            <div className="text-xs text-slate-400 mt-4">Read more →</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Floating Login Card */}
            <div
                style={{
                    borderRadius: "16px",
                    border: "1px solid rgba(43,96,235,0.15)",
                    boxShadow: "0 0 80px rgba(43,96,235,0.18)",
                    background: "rgba(255,255,255,0.97)",
                    padding: "32px 28px",
                    width: "320px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    fontFamily: "Manrope, sans-serif",
                }}
            >
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#6B7280", margin: 0, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Quanton OS
                </p>
                <p style={{ fontSize: "20px", fontWeight: 700, color: "#1F2937", margin: 0 }}>
                    Sign in to your workspace
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Email</label>
                    <input
                        type="text"
                        value={emailText}
                        onChange={(e) => setEmailText(e.target.value)}
                        placeholder="you@company.com"
                        style={{
                            border: "1px solid rgba(43,96,235,0.25)",
                            borderRadius: "8px",
                            padding: "10px 12px",
                            fontSize: "14px",
                            color: "#1F2937",
                            fontFamily: "Manrope, sans-serif",
                            outline: "none",
                            background: "#F9FAFB",
                        }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Password</label>
                    <input
                        type="password"
                        value={passwordText}
                        onChange={(e) => setPasswordText(e.target.value)}
                        placeholder="••••••••"
                        style={{
                            border: "1px solid rgba(43,96,235,0.25)",
                            borderRadius: "8px",
                            padding: "10px 12px",
                            fontSize: "14px",
                            color: "#1F2937",
                            fontFamily: "Manrope, sans-serif",
                            letterSpacing: "0.15em",
                            outline: "none",
                            background: "#F9FAFB",
                        }}
                    />
                </div>
                <button
                    onClick={handleSignIn}
                    disabled={isAnimating}
                    style={{
                        background: "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)",
                        color: "white",
                        fontFamily: "Manrope, sans-serif",
                        fontWeight: 600,
                        fontSize: "15px",
                        padding: "12px 24px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: isAnimating ? "default" : "pointer",
                        opacity: isAnimating ? 0.85 : 1,
                        animation: buttonState === "signing" ? "pulse-opacity 0.5s ease-in-out infinite alternate" : "none",
                    }}
                >
                    {buttonState === "signing" ? "Signing in..." : "Sign in to Quanton OS"}
                </button>
            </div>

            {/* Bottom Fade */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "120px",
                    background: "linear-gradient(to bottom, transparent, #ffffff)",
                    pointerEvents: "none",
                    zIndex: 4,
                }}
            />
        </div>
    );
}
