"use client";

import { AssessmentState } from "@/app/page";
import { motion, useScroll, useTransform } from "framer-motion";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useState, useRef } from "react";

export function Assessment({ setIsAssessmentOpen }: { setIsAssessmentOpen: Dispatch<SetStateAction<boolean>> }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [assessmentData, setAssessmentData] = useState<AssessmentState>({
        name: '',
        email: '',
        companySize: '',
        bottleneck: '',
        revenueBand: '',
        teamSize: ''
    });

    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const questions = [
        { id: 'name', label: "What's your name?", type: 'text' },
        { id: 'email', label: "What's your email?", type: 'email' },
        {
            id: 'companySize',
            label: "How many employees work at your company?",
            options: ['1-10', '11-50', '51-200', '201+']
        },
        {
            id: 'bottleneck',
            label: "What's your biggest operational bottleneck?",
            options: [
                'Sales & Marketing',
                'Customer Support',
                'Finance & Accounting',
                'HR & Talent',
                'Operations & Logistics',
                'Other'
            ]
        },
        {
            id: 'revenueBand',
            label: "What's your annual revenue?",
            options: ['Under $1M', '$1M-$5M', '$5M-$20M', '$20M+']
        },
        {
            id: 'teamSize',
            label: "How many people are on your team?",
            options: ['Solo', '2-5', '6-10', '11-20', '20+']
        }
    ];

    const handleAssessmentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsAssessmentOpen(false);
        // Store data or proceed
    };

    const renderQuestion = () => {
        const question = questions[currentQuestion];

        if (question.type === 'text' || question.type === 'email') {
            return (
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-white/90">{question.label}</label>
                    <input
                        type={question.type}
                        value={assessmentData[question.id as keyof AssessmentState]}
                        onChange={(e) =>
                            setAssessmentData({ ...assessmentData, [question.id]: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500 placeholder:text-white/40"
                        placeholder={`e.g., ${question.id === 'email' ? 'you@example.com' : 'John Doe'}`}
                    />
                </div>
            );
        }

        if (!question.options) return null;

        return (
            <div className="space-y-3">
                <label className="block text-lg font-medium text-white/90">{question.label}</label>
                <div className="flex items-center justify-start flex-wrap gap-2">
                    {question.options.map((option) => (
                        <button
                            key={option}
                            onClick={() =>
                                setAssessmentData({ ...assessmentData, [question.id]: option })
                            }
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${assessmentData[question.id as keyof AssessmentState] === option
                                    ? 'bg-blue-500/30 text-white border border-blue-500'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const progressBarWidth = ((currentQuestion + 1) / questions.length) * 100;

    // Scroll-based darkening
    const { scrollYProgress } = useScroll({ target: modalRef, offset: ["start start", "end end"] });
    const bgColor = useTransform(scrollYProgress, [0, 1], ["rgba(255,255,255,0.05)", "rgba(0,0,0,0.8)"]);
    const textColor = useTransform(scrollYProgress, [0, 1], ["#FFFFFF", "#FFFFFF"]);
    const buttonGlow = useTransform(scrollYProgress, [0, 1], ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.3)"]);

    // Close modal if user clicks on overlay
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === overlayRef.current) {
            setIsAssessmentOpen(false);
        }
    };

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto"
            onClick={handleOverlayClick}
        >
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6 sm:pb-4">
                <motion.div
                    ref={modalRef}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", damping: 25 }}
                    style={{ backgroundColor: bgColor }}
                    className="relative rounded-2xl p-8 w-full max-w-xl backdrop-blur-xl border border-white/10"
                >
                    <div className="w-full flex items-center justify-end" onClick={() => setIsAssessmentOpen(false)}>
                        <X/>
                    </div>
                    <div className="mb-6">
                        <motion.h2 style={{ color: textColor }} className="text-2xl font-bold mb-2">
                            {questions[currentQuestion].label}
                        </motion.h2>
                        <motion.p style={{ color: textColor }} className="text-sm text-slate-400">
                            Question {currentQuestion + 1} of {questions.length}
                        </motion.p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/10 rounded-full h-2 mb-8">
                        <motion.div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            style={{ width: `${progressBarWidth}%` }}
                            initial={{ width: '0%' }}
                            animate={{ width: `${progressBarWidth}%` }}
                            transition={{ duration: 0.6 }}
                        />
                    </div>

                    {renderQuestion()}

                    <div className="mt-8 flex justify-between items-center">
                        {currentQuestion > 0 && (
                            <motion.button
                                style={{ borderColor: buttonGlow, color: textColor }}
                                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                                className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                            >
                                Previous
                            </motion.button>
                        )}

                        {currentQuestion < questions.length - 1 ? (
                            <motion.button
                                style={{ borderColor: buttonGlow, color: textColor }}
                                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                                disabled={!assessmentData[questions[currentQuestion].id as keyof AssessmentState]}
                                className="px-6 py-2 border rounded-lg text-sm font-medium hover:bg-white/10 disabled:opacity-50 transition-colors"
                            >
                                Next
                            </motion.button>
                        ) : (
                            <motion.button
                                style={{ color: textColor }}
                                onClick={handleAssessmentSubmit}
                                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-sm font-medium hover:opacity-90 transition-colors"
                            >
                                Submit Assessment
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}