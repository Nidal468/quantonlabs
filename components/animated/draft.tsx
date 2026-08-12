import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { JSX, useState } from "react";
import { FaCode, FaKey, FaRss } from "react-icons/fa";
import { GrConnect } from "react-icons/gr";

export default function Integration() {
    const [selectedTab, setSelectedTab] = useState<number>(0);

    const tabs = [
        {
            id: 0,
            label: "API Key",
            description: "Secure authentication for your applications",
            icon: <FaKey className="w-5 h-5" />,
            demo: {
                title: "API Connection",
                status: "Connected",
                type: "secure"
            }
        },
        {
            id: 1,
            label: "Embed Components",
            description: "Seamlessly integrate into any website or app",
            icon: <FaCode className="w-5 h-5" />,
            demo: {
                title: "Widget Integration",
                status: "Active",
                type: "embed"
            }
        },
        {
            id: 2,
            label: "Webhooks",
            description: "Real-time notifications and events",
            icon: <FaRss className="w-5 h-5" />,
            demo: {
                title: "Event Stream",
                status: "Monitoring",
                type: "webhook"
            }
        }
    ];

    const apiRoutes = [
        "/api/v1/health",
        "/api/v1/auth",
        "/api/v1/data",
        "/api/v1/webhooks"
    ];

    const embedComponents = [
        "Notification Tracker",
        "AI Chat",
        "AI Image Scanner",
        "AI Management"
    ];

    const webhookEvents = [
        "Connected to Twitter",
        "Connected to Facebook",
        "Connected to LinkedIn"
    ];
    
    // Define types for better type safety
    type Tab = {
        id: number;
        label: string;
        description: string;
        icon: JSX.Element;
        demo: {
            title: string;
            status: string;
            type: string;
        };
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative max-w-4xl mx-auto"
        >
            {/* Glow effects */}
            <div className="absolute inset-0 rounded-xl bg-linear-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl -z-10" />
            <div className="absolute inset-0 rounded-xl bg-linear-to-l from-cyan-500/10 via-indigo-500/10 to-purple-500/50 blur-2xl -z-10 top-4 bottom-4 left-4 right-4" />

            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-linear-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-lg shadow-2xl">
                {/* Top glow */}
                <div className="absolute -top-4 left-0 right-0 h-8 bg-linear-to-b from-blue-500/10 to-transparent blur-xl" />

                {/* Left side glow */}
                <div className="absolute -left-4 top-0 bottom-0 w-8 bg-gradient-to-r from-purple-500/10 to-transparent blur-xl" />

                {/* Right side glow */}
                <div className="absolute -right-4 top-0 bottom-0 w-8 bg-gradient-to-l from-pink-500/10 to-transparent blur-xl" />

                <div className="p-6 md:p-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        {/* Tabs Navigation */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                        >
                            {tabs.map((tab) => (
                                <div
                                    key={tab.id}
                                    onClick={() => setSelectedTab(tab.id)}
                                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 relative group ${selectedTab === tab.id
                                        ? 'bg-gradient-to-r from-slate-500/20 to-blue-200/20 backdrop-blur-sm border border-white/10 shadow-lg'
                                        : 'hover:bg-slate-600/50 border border-transparent'
                                        }`}
                                >
                                    <div className="flex flex-col items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${selectedTab === tab.id
                                            ? 'bg-gradient-to-r from-blue-400 to-purple-400'
                                            : 'bg-gray-600/50'
                                            }`}>
                                            {tab.icon}
                                        </div>
                                        <h3 className="font-semibold text-center">{tab.label}</h3>
                                        <p className="text-xs text-gray-400 text-center mt-1">
                                            {tab.description}
                                        </p>

                                        {/* Hover glow effect */}
                                        <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Demo Preview */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-white/10 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-300 border-blue-500/30">
                                    {tabs[selectedTab].label}
                                </Badge>
                            </div>

                            {/* Demo Content */}
                            <div className="space-y-4">
                                <div className={`p-4 rounded-lg border transition-all duration-300 ${selectedTab === 0
                                    ? 'border-green-500/50 bg-gradient-to-r from-green-500/10 to-emerald-500/10'
                                    : selectedTab === 1
                                        ? 'border-blue-500/50 bg-gradient-to-r from-blue-500/10 to-cyan-500/10'
                                        : 'border-purple-500/50 bg-gradient-to-r from-purple-500/10 to-pink-500/10'
                                    }`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-md ${selectedTab === 0
                                            ? 'bg-green-500/20 text-green-400'
                                            : selectedTab === 1
                                                ? 'bg-blue-500/20 text-blue-400'
                                                : 'bg-purple-500/20 text-purple-400'
                                            }`}>
                                            {tabs[selectedTab].icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">{tabs[selectedTab].demo.title}</h4>
                                            <p className="text-sm flex items-center gap-2 mt-1">
                                                <span className={`inline-block w-2 h-2 rounded-full ${selectedTab === 0
                                                    ? 'bg-green-500'
                                                    : selectedTab === 1
                                                        ? 'bg-blue-500'
                                                        : 'bg-purple-500'
                                                    }`} />
                                                {tabs[selectedTab].demo.status}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {selectedTab === 0 && (
                                        apiRoutes.map((route, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.2 + index * 0.1 }}
                                                className="p-3 rounded-lg bg-gradient-to-br from-gray-700/30 to-gray-800/30 border border-white/5 backdrop-blur-sm"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-400 truncate">{route}</span>
                                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                                </div>
                                            </motion.div>
                                        ))
                                    )}

                                    {selectedTab === 1 && (
                                        embedComponents.map((component, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.2 + index * 0.1 }}
                                                className="p-3 rounded-lg bg-gradient-to-br from-gray-700/30 to-gray-800/30 border border-white/5 backdrop-blur-sm"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-400 truncate">{component}</span>
                                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                                </div>
                                            </motion.div>
                                        ))
                                    )}

                                    {selectedTab === 2 && (
                                        webhookEvents.map((event, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.2 + index * 0.1 }}
                                                className="p-3 rounded-lg bg-gradient-to-br from-gray-700/30 to-gray-800/30 border border-white/5 backdrop-blur-sm"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-400 truncate">{event}</span>
                                                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </div>

                                {/* Description */}
                                <p className="text-sm text-gray-400 mt-4">
                                    {selectedTab === 0 && 
                                        "API endpoints for secure authentication and data access"}
                                    {selectedTab === 1 && 
                                        "Available embeddable components for quick integration"}
                                    {selectedTab === 2 && 
                                        "Connected services and event sources"}
                                </p>
                            </div>
                        </motion.div>

                        {/* Footer Note */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-sm text-gray-400 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl p-4 border border-white/10 backdrop-blur-sm"
                        >
                            <p>Seamlessly connect your AI automations, software, websites, social platforms, and applications with our powerful API keys, embedded components, and real-time webhooks — built for fast, flexible integration.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
