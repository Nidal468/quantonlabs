"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Color =
    | "blue"
    | "green"
    | "purple"
    | "orange"
    | "red";

const neonColors: Record<Color, string> = {
    blue: "#00f0ff",
    green: "#00ff88",
    purple: "#b100ff",
    orange: "#ff7a00",
    red: "#ff0033",
};

export default function EnergyCard({
    children,
    color = "blue",
    size = 160,
}: {
    children?: ReactNode;
    color?: Color;
    size?: number;
}) {

    return (
        <div
            style={{ width: size + 3, height: size + 3, boxShadow: "inset -11px -11px 8px #cdd4d9, inset 11px 11px 8px #ffffff" }}
            className="relative bg-[#f1f9ff] rounded-[26px] flex items-center justify-center"
        >
            {/* Overflow Wrapper */}
            <div className="absolute rounded-[26px] flex items-center justify-center w-full h-full overflow-hidden">
                {/* Rotating Gradient Layer */}
                <motion.div
                    className="absolute"
                    style={{
                        width: size + 60,
                        height: size + 60,
                        background: `conic-gradient(
                        from 0deg,
                        ${neonColors[color]} 0deg,
                        ${neonColors[color]}CC 40deg,
                        ${neonColors[color]}55 80deg,
                        transparent 140deg 360deg
                        )`,

                    }}
                    animate={{ rotate: 1860 }}
                    transition={{
                        repeat: Infinity,
                        duration: 10,
                        ease: "linear",
                    }}
                />

            </div>

            {/* Main Card (Creates Border Thickness) */}
            <div
                className="absolute bg-[#f1f9ff] rounded-[22px] flex items-center justify-center p-px"
                style={{
                    boxShadow: "8px 8px 16px rgba(195, 202, 207, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.6)",
                    width: size - 6,
                    height: size - 6,
                }}
            >
                {children}
            </div>

        </div>
    );
}
