"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  Mail,
  DollarSign,
  FileText,
  Phone,
  Truck,
  Calendar,
} from "lucide-react";
import { SnowFlake } from "../animated/background_effects";

const notifications = [
  { text: "Hey, not coming in today. Feeling sick.", icon: Mail },
  { text: "OVERDUE: Invoice #4421 - 14 days past due", icon: AlertTriangle },
  { text: "Client cancelled - 2 hours notice", icon: Clock },
  { text: "Hey it's Mike, the van won't start so...", icon: Truck },
  { text: "Quick question before you jump on that call", icon: Phone },
  { text: "Payment of $14,200 pending review", icon: DollarSign },
  { text: "Running 20 mins late to the site", icon: Clock },
  { text: "Supplier price increase effective immediately", icon: FileText },
  { text: "Tax filing deadline in 3 days", icon: Calendar },
  { text: "Can you call me when you get a sec?", icon: Phone },
  { text: "RE: Your review response needed", icon: Mail },
  { text: "The client is asking for an update on the job", icon: FileText },
];

export default function ChaosSection() {
  const sectionHeight = notifications.length * 160;

  return (
    <div
      className="w-full bg-white"
      style={{ height: sectionHeight + 260 }}
    >
      <div className="relative mt-60">
        {/* Gradient Spine */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: sectionHeight }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.5 }}
          className="absolute left-1/2 top-0 w-[3px] bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
        />

        {/* Glow Aura */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute left-1/2 top-0 w-[12px] -translate-x-1/2 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 blur-2xl opacity-30"
        />

        {notifications.map((item, i) => {
          const side = i % 2 === 0 ? "left" : "right";
          const top = 100 + i * 150;
          const Icon = item.icon;

          return (
            <div key={i} className="absolute w-full" style={{ top }}>
              {/* Purple Node */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4 }}
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]"
              />

              {/* Purple Branch */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 150, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5 }}
                className={`absolute top-2 h-[3px] bg-purple-500 ${side === "left"
                    ? "right-1/2 mr-[8px]"
                    : "left-1/2 ml-[8px]"
                  }`}
              />

              {/* Card */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: side === "left" ? -60 : 60,
                  scale: 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6 }}
                className={`absolute flex items-start gap-3 w-[320px] bg-white border border-gray-200 rounded-2xl p-5 shadow-xl ${side === "left"
                    ? "right-[calc(50%+180px)] text-right"
                    : "left-[calc(50%+180px)]"
                  }`}
              >
                <Icon className="w-5 h-5 mt-1 flex-shrink-0 text-purple-500" />
                <p className="text-sm text-gray-700">{item.text}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}