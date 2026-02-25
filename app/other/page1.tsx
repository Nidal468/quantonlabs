"use client";

import Navbar from "@/components/landing/navbar";
import AIOPage from "@/components/landing/aio";
import ProductCard from "@/components/landing/aio";
import QuantonSection from "@/components/landing/quantonSection";
import TabComponent from "@/components/landing/tab_section";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <div className="w-full min-h-screen flex flex-col pt-20">
            <Navbar />
            <div className="w-full h-[600px] flex flex-col items-center justify-center p-20">
                {/* 🔵 BLUE BLOB */}
                <motion.div
                    animate={{
                        x: [0, 100, -80, 0],
                        y: [0, -60, 80, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-500/40 rounded-full blur-[140px]"
                />

                {/* 🟣 PURPLE BLOB */}
                <motion.div
                    animate={{
                        x: [0, -120, 60, 0],
                        y: [0, 80, -100, 0],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/40 rounded-full blur-[160px]"
                />
                <div className="flex-1 flex flex-col items-center justify-center w-full md:max-w-7xl gap-10 text-center">
                    <div className="space-y-3 transform translate-y-60">
                        <h1 className="font-bold text-5xl/20">Scale Faster with AI-Powered <br /> Operating System</h1>
                        <p className="text-lg w-2xl">Quanton OS integrates strategy, platforms, operations, and growth into one governed architecture.
                            AI is woven through the execution layer, not bolted on as another app.</p>
                    </div>
                    <div className="">
                        <img src={'/images/mockups/0.png'} className="rounded-2xl shadow-2xl w-250 transform translate-y-60 z-30" />
                    </div>
                </div>
            </div>
            <QuantonSection />
            <AIOPage/>
        </div>
    );
}
