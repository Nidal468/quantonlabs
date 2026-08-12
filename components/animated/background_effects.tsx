"use client";

import { motion } from "framer-motion";

type Snowflake = {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
};

export function SnowFlake() {
  const flakes: Snowflake[] = Array.from({ length: 40 }).map((_, i) => {
    const isLeft = i % 2 === 0;

    return {
      id: i,
      left: isLeft
        ? `${Math.random() * 15}%`           // left side
        : `${85 + Math.random() * 15}%`,     // right side
      size: 8 + Math.random() * 8,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 5,
    };
  });

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {flakes.map((flake) => (
        <motion.div
          key={flake.id}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: "110vh",
            opacity: [0, 1, 0.5, 1, 0],
          }}
          transition={{
            duration: flake.duration,
            repeat: Infinity,
            delay: flake.delay,
            ease: "linear",
          }}
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
          }}
          className="absolute bg-[#ddf5ff] blur-[1px]"
        />
      ))}
    </div>
  );
}