import { motion } from "framer-motion";

export function IntelligentGridBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">

            <svg
                className="w-full h-full"
                viewBox="0 0 1200 800"
                preserveAspectRatio="none"
            >
                {/* Base Lines */}
                <g
                    stroke="rgba(100,116,139,0.25)"
                    strokeWidth="1.5"
                    fill="none"
                >
                    <path d="M0 200 H400 V350 H800 V150 H1200" />
                    <path d="M0 500 H300 V650 H700 V450 H1200" />
                    <path d="M200 0 V250 H600 V550 H1000 V800" />
                    <path d="M900 0 V300 H500 V600 H200 V800" />
                </g>

                {/* Energy Pulse 1 */}
                <motion.circle
                    r="4"
                    fill="#64748b"
                    style={{
                        offsetPath: "path('M0 200 H400 V350 H800 V150 H1200')",
                        offsetDistance: "0%",
                        filter: "drop-shadow(0 0 6px rgba(100,116,139,0.6))",
                    }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />

                {/* Energy Pulse 2 */}
                <motion.circle
                    r="4"
                    fill="#64748b"
                    style={{
                        offsetPath: "path('M0 500 H300 V650 H700 V450 H1200')",
                        offsetDistance: "0%",
                        filter: "drop-shadow(0 0 6px rgba(100,116,139,0.6))",
                    }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Energy Pulse 3 */}
                <motion.circle
                    r="4"
                    fill="#64748b"
                    style={{
                        offsetPath: "path('M200 0 V250 H600 V550 H1000 V800')",
                        offsetDistance: "0%",
                        filter: "drop-shadow(0 0 6px rgba(100,116,139,0.6))",
                    }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                />

            </svg>
        </div>
    );
}