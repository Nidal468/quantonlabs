"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Settings,
    Play,
    BarChart3,
    Mail,
    FileText,
    Database,
    ArrowRight,
    CheckCircle,
    AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DemoModal = ({ showDemoModal, setShowDemoModal }: { showDemoModal: boolean, setShowDemoModal: Dispatch<SetStateAction<boolean>> }) => {
    const [activeDemoTab, setActiveDemoTab] = useState("editor");
    const [workflowSteps, setWorkflowSteps] = useState<{ id: string; name: string; status: string; }[]>([]);
    const [logs, setLogs] = useState<{ id: number; type: string; message: string; timestamp: Date; }[]>([]);
    const [isExecuting, setIsExecuting] = useState(false);
    const [sheetData, setSheetData] = useState<[string, string, string, string][]>([]);

    // Initialize with sample data
    useEffect(() => {
        if (showDemoModal) {
            setWorkflowSteps([
                { id: "gmail", name: "Gmail Integration", status: "completed" },
                { id: "ai-process", name: "AI Processing", status: "completed" },
                { id: "sheets", name: "Google Sheets Update", status: "pending" }
            ]);

            setLogs([
                {
                    id: 1,
                    type: "info",
                    message: "Starting workflow execution...",
                    timestamp: new Date()
                },
                {
                    id: 2,
                    type: "success",
                    message: "Connected to Gmail API",
                    timestamp: new Date()
                }
            ]);

            setSheetData([
                ["Name", "Email", "Subject", "Status"],
                ["John Doe", "john@example.com", "Meeting Request", "Processed"],
                ["Jane Smith", "jane@example.com", "Project Update", "Pending"]
            ]);
        }
    }, [showDemoModal]);

    const handleExecute = () => {
        setIsExecuting(true);
        
        // Reset to initial state
        setWorkflowSteps([
            { id: "gmail", name: "Gmail Integration", status: "pending" },
            { id: "ai-process", name: "AI Processing", status: "pending" },
            { id: "sheets", name: "Google Sheets Update", status: "pending" }
        ]);
        
        setLogs(prev => [
            {
                id: prev.length + 1,
                type: "info",
                message: "Starting workflow execution...",
                timestamp: new Date()
            }
        ]);

        // Step 1: Gmail receives message
        setTimeout(() => {
            setWorkflowSteps(prev => [
                { ...prev[0], status: "processing" },
                prev[1],
                prev[2]
            ]);
            
            setLogs(prev => [
                ...prev,
                {
                    id: prev.length + 1,
                    type: "success",
                    message: "New email received from john@example.com",
                    timestamp: new Date()
                }
            ]);
        }, 500);

        // Step 2: AI processing
        setTimeout(() => {
            setWorkflowSteps(prev => [
                { ...prev[0], status: "completed" },
                { ...prev[1], status: "processing" },
                prev[2]
            ]);
            
            setLogs(prev => [
                ...prev,
                {
                    id: prev.length + 1,
                    type: "info",
                    message: "Processing email content...",
                    timestamp: new Date()
                }
            ]);

            // Simulate AI thinking
            setTimeout(() => {
                setLogs(prev => [
                    ...prev,
                    {
                        id: prev.length + 1,
                        type: "success",
                        message: "AI analyzing content...",
                        timestamp: new Date()
                    }
                ]);
                
                setTimeout(() => {
                    setWorkflowSteps(prev => [
                        { ...prev[0], status: "completed" },
                        { ...prev[1], status: "completed" },
                        prev[2]
                    ]);
                    
                    // Add processing success
                    setLogs(prev => [
                        ...prev,
                        {
                            id: prev.length + 1,
                            type: "success",
                            message: "Data structured and validated",
                            timestamp: new Date()
                        }
                    ]);
                }, 500);
            }, 500);
        }, 1000);

        // Step 3: Sheets update
        setTimeout(() => {
            setWorkflowSteps(prev => [
                { ...prev[0], status: "completed" },
                { ...prev[1], status: "completed" },
                { ...prev[2], status: "processing" }
            ]);
            
            setLogs(prev => [
                ...prev,
                {
                    id: prev.length + 1,
                    type: "info",
                    message: "Writing to Google Sheets...",
                    timestamp: new Date()
                }
            ]);

            // Add new sheet data
            setTimeout(() => {
                setSheetData(prev => [
                    ...prev,
                    ["Alex Johnson", "alex@example.com", "Feedback Form", "Processed"]
                ]);
                
                setWorkflowSteps(prev => [
                    { ...prev[0], status: "completed" },
                    { ...prev[1], status: "completed" },
                    { ...prev[2], status: "completed" }
                ]);
                
                // Final success
                setTimeout(() => {
                    setLogs(prev => [
                        ...prev,
                        {
                            id: prev.length + 1,
                            type: "success",
                            message: "Workflow completed successfully!",
                            timestamp: new Date()
                        }
                    ]);
                    
                    setIsExecuting(false);
                }, 500);
            }, 500);
        }, 2000);
    };

    const renderCanvas = () => {
        if (activeDemoTab === 'editor') {
            return (
                <div className="w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">Workflow Components</h3>
                        <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded">Drag & Drop</span>
                    </div>

                    <div className="flex space-x-4 flex-1">
                        {/* Source Component */}
                        <motion.div 
                            className="w-32 h-32 bg-gradient-to-br from-blue-900/50 to-blue-700/50 rounded-lg border border-blue-500/30 flex flex-col items-center justify-center p-2"
                            animate={isExecuting && workflowSteps[0]?.status === "processing" ? { 
                                scale: [1, 1.05, 1],
                                boxShadow: "0 0 15px rgba(59, 134, 228, 0.6)"
                            } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <Mail className="w-8 h-8 text-blue-400 mb-2" />
                            <span className="text-xs text-center">Gmail</span>
                        </motion.div>

                        {/* AI Processing */}
                        <div className="flex-1 bg-gradient-to-br from-purple-900/50 to-purple-700/50 rounded-lg border border-purple-500/30 flex flex-col items-center justify-center p-2">
                            <div className="flex items-center mb-2">
                                <motion.div 
                                    className="w-4 h-4 bg-yellow-500 rounded-full mr-1"
                                    animate={isExecuting && workflowSteps[1]?.status === "processing" ? { 
                                        scale: [1, 1.3, 1],
                                        opacity: [0.8, 1, 0.8]
                                    } : {}}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                />
                                <motion.div 
                                    className="w-4 h-4 bg-purple-500 rounded-full mr-1"
                                    animate={isExecuting && workflowSteps[1]?.status === "processing" ? { 
                                        scale: [1, 1.3, 1],
                                        opacity: [0.8, 1, 0.8]
                                    } : {}}
                                    transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                                />
                                <motion.div 
                                    className="w-4 h-4 bg-pink-500 rounded-full"
                                    animate={isExecuting && workflowSteps[1]?.status === "processing" ? { 
                                        scale: [1, 1.3, 1],
                                        opacity: [0.8, 1, 0.8]
                                    } : {}}
                                    transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                                />
                            </div>
                            <span className="text-xs">AI Processor</span>
                        </div>

                        {/* Destination */}
                        <motion.div 
                            className="w-32 h-32 bg-gradient-to-br from-green-900/50 to-green-700/50 rounded-lg border border-green-500/30 flex flex-col items-center justify-center p-2"
                            animate={isExecuting && workflowSteps[2]?.status === "processing" ? { 
                                scale: [1, 1.05, 1],
                                boxShadow: "0 0 15px rgba(74, 198, 63, 0.6)"
                            } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <Database className="w-8 h-8 text-green-400 mb-2" />
                            <span className="text-xs text-center">Sheets</span>
                        </motion.div>
                    </div>

                    <div className="mt-4 text-center text-sm text-slate-400">
                        Drag components to create workflow connections
                    </div>
                </div>
            );
        }

        if (activeDemoTab === 'preview') {
            return (
                <div className="w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4">
                    <h3 className="font-medium mb-4">Workflow Execution</h3>

                    <div className="grid grid-cols-3 gap-4 h-64">
                        {/* Step 1 */}
                        <motion.div 
                            className="flex flex-col items-center justify-center bg-blue-900/30 rounded-lg p-4 border border-blue-500/20"
                            animate={isExecuting && workflowSteps[0]?.status === "processing" ? { 
                                scale: [1, 1.05, 1],
                                boxShadow: "0 0 15px rgba(59, 134, 228, 0.6)"
                            } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <Mail className="w-8 h-8 text-blue-400 mb-2" />
                            <span className="text-xs">Gmail</span>
                            {workflowSteps[0]?.status === "processing" && (
                                <div className="mt-2 flex space-x-1">
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div 
                                            key={i}
                                            className="w-2 h-2 rounded-full bg-green-500"
                                            animate={{ scale: [1, 1.5, 1] }}
                                            transition={{ repeat: Infinity, duration: 0.5 }}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Arrow */}
                        <div className="flex items-center justify-center">
                            <ArrowRight className="w-6 h-6 text-blue-400" />
                        </div>

                        {/* Step 2 */}
                        <motion.div 
                            className="flex flex-col items-center justify-center bg-purple-900/30 rounded-lg p-4 border border-purple-500/20"
                            animate={isExecuting && workflowSteps[1]?.status === "processing" ? { 
                                scale: [1, 1.05, 1],
                                boxShadow: "0 0 15px rgba(186, 85, 213, 0.6)"
                            } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center mb-1">
                                <motion.div 
                                    className="w-3 h-3 bg-yellow-500 rounded-full mr-1"
                                    animate={isExecuting && workflowSteps[1]?.status === "processing" ? { 
                                        scale: [1, 1.3, 1],
                                        opacity: [0.8, 1, 0.8]
                                    } : {}}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                />
                                <motion.div 
                                    className="w-3 h-3 bg-purple-500 rounded-full mr-1"
                                    animate={isExecuting && workflowSteps[1]?.status === "processing" ? { 
                                        scale: [1, 1.3, 1],
                                        opacity: [0.8, 1, 0.8]
                                    } : {}}
                                    transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                                />
                                <motion.div 
                                    className="w-3 h-3 bg-pink-500 rounded-full"
                                    animate={isExecuting && workflowSteps[1]?.status === "processing" ? { 
                                        scale: [1, 1.3, 1],
                                        opacity: [0.8, 1, 0.8]
                                    } : {}}
                                    transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                                />
                            </div>
                            <span className="text-xs">AI Processing</span>
                        </motion.div>

                        {/* Arrow */}
                        <div className="flex items-center justify-center">
                            <ArrowRight className="w-6 h-6 text-purple-400" />
                        </div>

                        {/* Step 3 */}
                        <motion.div 
                            className="col-span-2 flex flex-col items-center justify-center bg-green-900/30 rounded-lg p-4 border border-green-500/20"
                            animate={isExecuting && workflowSteps[2]?.status === "processing" ? { 
                                scale: [1, 1.05, 1],
                                boxShadow: "0 0 15px rgba(74, 198, 63, 0.6)"
                            } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <Database className="w-8 h-8 text-green-400 mb-2" />
                            <span className="text-xs">Sheets</span>
                            {workflowSteps[2]?.status === "processing" && (
                                <div className="mt-2 flex space-x-1">
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div 
                                            key={i}
                                            className="w-2 h-2 rounded-full bg-green-500"
                                            animate={{ scale: [1, 1.5, 1] }}
                                            transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.2 }}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>

                    <div className="mt-4 flex justify-center">
                        {isExecuting ? (
                            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-900/30 rounded-full border border-blue-500/20">
                                <motion.div 
                                    className="w-4 h-4 border-t-2 border-blue-400 rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                />
                                <span className="text-sm">Processing...</span>
                            </div>
                        ) : (
                            <Button onClick={handleExecute} variant="default" className="bg-linear-to-r from-blue-600 to-purple-600">
                                Start Execution
                            </Button>
                        )}
                    </div>
                </div>
            );
        }

        if (activeDemoTab === 'logs') {
            return (
                <div className="w-full h-96 bg-linear-to-br from-gray-800 to-gray-900 rounded-lg p-4">
                    <h3 className="font-medium mb-4">Execution Logs</h3>

                    <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                        {logs.map(log => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-start p-3 rounded border border-slate-700/50"
                            >
                                <div className={`mt-1 mr-2 ${log.type === 'success' ? 'text-green-400' : log.type === 'error' ? 'text-red-400' : 'text-blue-400'}`}>
                                    {log.type === 'success' && <CheckCircle className="w-4 h-4" />}
                                    {log.type === 'error' && <AlertTriangle className="w-4 h-4" />}
                                    {log.type === 'info' && <FileText className="w-4 h-4" />}
                                </div>
                                <div>
                                    <p className="text-sm">{log.message}</p>
                                    <p className="text-xs text-slate-500">
                                        {log.timestamp.toLocaleTimeString()}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            );
        }

        return null;
    };

    const renderSheetPreview = () => {
        if (activeDemoTab !== 'preview') return null;

        return (
            <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <h4 className="font-medium mb-2">Sheets Data Preview</h4>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            {sheetData[0] && (
                                <tr className="border-b border-white/10">
                                    {(sheetData[0]).map((header, i) => (
                                        <th key={i} className="px-3 py-2 text-left font-medium">{header}</th>
                                    ))}
                                </tr>
                            )}
                        </thead>
                        <tbody>
                            {sheetData.slice(1).map((row, rowIndex) => (
                                <motion.tr
                                    key={rowIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: rowIndex * 0.1 }}
                                    className={rowIndex % 2 === 0 ? 'bg-white/5' : ''}
                                >
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="px-3 py-2 border-b border-white/10">
                                            {cell}
                                        </td>
                                    ))}
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    if (!showDemoModal) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
        >
            <div
                className="bg-[#041227] rounded-xl border border-white/10 max-w-6xl w-full overflow-hidden"
            >
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-bold text-lg">AI Workflow Builder</h3>
                    <button
                        onClick={() => setShowDemoModal(false)}
                        className="text-slate-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4">
                    <div className="flex border-b border-white/10 mb-4">
                        {['editor', 'preview', 'logs'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveDemoTab(tab)}
                                className={`px-4 py-2 text-sm font-medium ${activeDemoTab === tab ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="mb-4">
                        <AnimatePresence>
                            <motion.div 
                                className="flex space-x-2 mb-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {workflowSteps.map((step) => (
                                    <motion.div
                                        key={step.id}
                                        className={`px-3 py-1 rounded text-xs flex items-center ${step.status === 'completed' ? 'bg-green-900/30 text-green-400 border border-green-500/20' :
                                            step.status === 'pending' ? 'bg-slate-700/50 text-slate-400' :
                                                'bg-yellow-900/30 text-yellow-400'
                                            }`}
                                        animate={isExecuting && workflowSteps[workflowSteps.length - 1]?.status !== "completed" ? { 
                                            scale: [1, 1.05, 1],
                                            boxShadow: step.status === "processing" ? "0 0 10px rgba(234, 179, 8, 0.6)" : ""
                                        } : {}}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {step.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                                        {step.status === 'pending' && <AlertTriangle className="w-3 h-3 mr-1" />}
                                        {step.status === 'processing' && (
                                            <motion.div 
                                                className="mr-1"
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1 }}
                                            >
                                                <div className="animate-spin w-3 h-3 border-t-2 border-yellow-400 rounded-full"></div>
                                            </motion.div>
                                        )}
                                        {step.name}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {renderCanvas()}
                    {renderSheetPreview()}
                </div>

                <div className="p-4 flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setShowDemoModal(false)}
                        disabled={isExecuting}
                    >
                        Close
                    </Button>
                    <Button
                        className="bg-linear-to-r from-blue-600 to-purple-600"
                        onClick={handleExecute}
                        disabled={isExecuting || workflowSteps[workflowSteps.length - 1]?.status === 'completed'}
                    >
                        {isExecuting ? (
                            <>
                                <motion.div 
                                    className="w-4 h-4 mr-2 border-t-2 border-white rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                />
                                Executing...
                            </>
                        ) : (
                            "Run Workflow"
                        )}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default DemoModal;
