import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import { notifications } from "@/db/landingPage";
import { IntelligentGridBackground } from "../animated/bg_grid";

export function HeroSection() {

  const randomNotifications = useMemo(() => {
        const shuffled = [...notifications].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 4);
  }, []);

  return (
        <div
                className="w-full relative overflow-hidden pt-20 md:pt-[120px]"
                style={{
                          background: `
                                    radial-gradient(ellipse 80% 60% at 50% 0%, rgba(43, 96, 235, 0.06) 0%, transparent 60%),
                                              radial-gradient(ellipse 50% 60% at 0% 50%, rgba(139, 55, 234, 0.05) 0%, transparent 70%),
                                                        white
                                                                `,
                          backgroundImage: `
                                    radial-gradient(ellipse 80% 60% at 50% 0%, rgba(43, 96, 235, 0.06) 0%, transparent 60%),
                                              radial-gradient(ellipse 50% 60% at 0% 50%, rgba(139, 55, 234, 0.05) 0%, transparent 70%),
                                                        radial-gradient(circle, rgba(43, 96, 235, 0.08) 1px, transparent 1px)
                                                                `,
                          backgroundSize: "auto, auto, 28px 28px",
                }}
              >
          {/* Top gradient bar */}
              <div
                        className="absolute top-0 left-0 w-full"
                        style={{ height: "3px", background: "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)" }}
                      />
        
              <div className="relative container mx-auto w-full min-h-screen flex flex-col items-center justify-center gap-16 z-10">
                      <IntelligentGridBackground />
                      <div className="flex items-center justify-between w-full">
                        {/* Left Content */}
                                <div className="flex flex-col items-start justify-center text-center md:text-left max-w-xl p-6">
                                
                                            <p className="text-xs tracking-[0.25em] text-slate-400 mb-6">
                                                          FOR OPERATORS WHO HAVE OUTGROWN HOW THEY OPERATE
                                            </p>p>
                                
                                            <h1 className="text-6xl leading-[1.1] font-semibold mb-6 bg-linear-to-r from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-transparent">
                                                          The Architecture of Intelligent Business
                                            </h1>h1>
                                
                                            <p className="text-lg text-slate-500 mb-4 leading-relaxed">
                                                          You built a business. Now the business runs you.
                                                          Quanton OS is the infrastructure that changes that.
                                            </p>p>
                                
                                            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                                                          Eight coordinated AI agents. One governing intelligence layer. Built for businesses that have outgrown how they operate.
                                            </p>p>
                                
                                  {/* CTA Buttons */}
                                            <div className="flex items-center gap-6">
                                                          <Link
                                                                            href="/assessment"
                                                                            className="px-8 py-4 rounded-xl text-white text-sm font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                                                            style={{ background: "linear-gradient(to right, #2B60EB, #8B37EA)", fontFamily: "Manrope, sans-serif" }}
                                                                          >
                                                                          Assess Your Business
                                                          </Link>Link>
                                            
                                                          <Link
                                                                            href="https://calendly.com/quantonlabs/30min"
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="px-8 py-4 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-all duration-300"
                                                                            style={{ border: "1px solid #2B60EB", color: "#2B60EB", background: "transparent", fontFamily: "Manrope, sans-serif" }}
                                                                          >
                                                                          Book a Discovery Call
                                                          </Link>Link>
                                            </div>div>
                                </div>div>
                      
                        {/* Right Image + Floating Glass Notifications */}
                                <div className="relative hidden md:flex items-center justify-center">
                                
                                  {/* Glow */}
                                            <div className="absolute w-[750px] h-[450px] bg-slate-900/20 blur-3xl rounded-full"></div>div>
                                
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
                                                                    className={`absolute ${positions[index]} w-[260px] px-5 py-4 rounded-2xl backdrop-blur-xl overflow-hidden`}
                                                                    style={{
                                                                                          background: "rgba(255,255,255,0.2)",
                                                                                          border: "1px solid rgba(43, 96, 235, 0.10)",
                                                                                          boxShadow: "0 4px 24px rgba(43, 96, 235, 0.10)",
                                                                    }}
                                                                  >
                                                                  <motion.div
                                                                                        className="w-[400px] h-[600px] absolute bg-linear-to-bl from-slate-800 to-slate-200 top-0 left-0 blur-3xl"
                                                                                        animate={{ rotate: 360 }}
                                                                                        transition={{
                                                                                                                duration: 4,
                                                                                                                repeat: Infinity,
                                                                                                                ease: "linear",
                                                                                          }}
                                                                                      />
                                                                  <div className="flex items-start gap-3 relative">
                                                                                      <div className="p-2 rounded-lg bg-slate-900/10">
                                                                                                            <Icon className="w-4 h-4 text-slate-500" />
                                                                                        </div>div>
                                                                                      <p className="text-xs text-slate-300 leading-snug">
                                                                                        {item.text}
                                                                                        </p>p>
                                                                  </div>div>
                                                </motion.div>motion.div>
                                              );
              })}
                                
                                  {/* Main Image */}
                                            <img
                                                            src="/images/mockups/3.png"
                                                            className="w-[750px] h-[450px] object-cover rounded-2xl shadow-[0_30px_80px_rgba(15,23,42,0.15)] border border-white/40"
                                                          />
                                </div>div>
                      </div>div>
              
                {/* Bottom Blog Cards */}
                      <div id="insights" className="w-full">
                                <div className="px-6 mb-4">
                                            <p className="text-xs font-semibold tracking-[0.08em] uppercase mb-3" style={{ color: "#4655EB", fontFamily: "Manrope, sans-serif" }}>INSIGHTS</p>p>
                                            <h2 className="text-2xl font-bold" style={{ color: "#1F2937", fontFamily: "Manrope, sans-serif" }}>Thinking on Business Systems and Operational Architecture</h2>h2>
                                </div>div>
                                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                                  {[
                {
                                  category: "TECHNOLOGY",
                                  title: "The Future of AI in Operations",
                                  description: "Why intelligent agents are becoming core infrastructure, not optional tools.",
                                  readTime: "8 min read",
                                  href: "/blog/future-of-ai-in-operations",
                },
                {
                                  category: "LEADERSHIP",
                                  title: "When Systems Replace Heroics",
                                  description: "How founder-dependent businesses scale beyond personal capacity.",
                                  readTime: "8 min read",
                                  href: "/blog/when-systems-replace-heroics",
                },
                {
                                  category: "AI STRATEGY",
                                  title: "Why AI Initiatives Fail",
                                  description: "The structural problem behind failed AI pilots, and what readiness actually requires.",
                                  readTime: "8 min read",
                                  href: "/blog/why-ai-initiatives-fail",
                },
                            ].map((card, index) => (
                                            <motion.div
                                                              key={index}
                                                              initial={{ opacity: 0, y: 40 }}
                                                              whileInView={{ opacity: 1, y: 0 }}
                                                              viewport={{ once: true }}
                                                              transition={{ duration: 0.6, delay: index * 0.1 }}
                                                              className="flex flex-col justify-between px-6 py-6 rounded-xl bg-white transition-all duration-200 group"
                                                              style={{
                                                                                  border: "1px solid #E5E7EB",
                                                                                  borderTop: "3px solid #2B60EB",
                                                                                  borderRadius: "12px",
                                                                                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                                              }}
                                                              onMouseEnter={e => {
                                                                                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(43, 96, 235, 0.10)";
                                                                                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(43, 96, 235, 0.20)";
                                                                                  (e.currentTarget as HTMLElement).style.borderTopColor = "#2B60EB";
                                                              }}
                                                              onMouseLeave={e => {
                                                                                  (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
                                                                                  (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB";
                                                                                  (e.currentTarget as HTMLElement).style.borderTopColor = "#2B60EB";
                                                              }}
                                                            >
                                                            <div>
                                                                              <p className="text-xs font-semibold tracking-[0.08em] uppercase mb-3" style={{ color: "#4655EB", fontFamily: "Manrope, sans-serif", letterSpacing: "0.08em" }}>
                                                                                {card.category}
                                                                              </p>p>
                                                                              <h2 className="font-bold text-lg mb-2 line-clamp-2" style={{ color: "#1F2937", fontFamily: "Manrope, sans-serif", fontSize: "18px" }}>
                                                                                {card.title}
                                                                              </h2>h2>
                                                                              <p className="text-sm leading-relaxed mb-3" style={{ color: "#6B7280", fontFamily: "Manrope, sans-serif", fontSize: "14px" }}>
                                                                                {card.description}
                                                                              </p>p>
                                                                              <p className="text-xs" style={{ color: "#6B7280", fontFamily: "Manrope, sans-serif", fontSize: "12px" }}>
                                                                                {card.readTime}
                                                                              </p>p>
                                                            </div>div>
                                                            <div className="mt-4">
                                                                              <Link
                                                                                                    href={card.href}
                                                                                                    className="text-sm font-semibold transition-colors duration-200"
                                                                                                    style={{ color: "#2B60EB", fontFamily: "Manrope, sans-serif", fontSize: "14px" }}
                                                                                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#8B37EA"; }}
                                                                                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#2B60EB"; }}
                                                                                                  >
                                                                                                  Read article →
                                                                              </Link>Link>
                                                            </div>div>
                                            </motion.div>motion.div>
                                          ))}
                                </div>div>
                      </div>div>
              </div>div>
        </div>div>
      )
}</div>
