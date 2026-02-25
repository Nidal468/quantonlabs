"use client";

import { motion } from "framer-motion";
import TabComponent from "./tab_section";

export default function QuantonSection() {
  return (
    <div className="relative w-full h-[160vh] overflow-hidden flex flex-col items-center justify-start text-center">

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
        className="absolute top-120 -left-40 w-[500px] h-[500px] bg-blue-500/40 rounded-full blur-[140px]"
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

      {/* CONTENT WRAPPER (Scroll Animation Here) */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative transform translate-y-120 flex flex-col gap-30 z-10"
      >
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-3 text-gray-900"
        >
          <h1 className="font-bold text-5xl">
            What Is Quanton OS
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-600">
            Quanton OS is a deployable business operating system that integrates strategy,
            automation, and intelligence into a single governed infrastructure built
            on your existing platforms.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          viewport={{ once: true }}
        >
          <TabComponent />
        </motion.div>

      </motion.div>
    </div>
  );
}