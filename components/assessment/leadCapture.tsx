import { Lead } from "@/db/assessments";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { motion } from "framer-motion";

export default function RenderLeadCapture({
    setCurrentStep,
    leadInfo,
    setLeadInfo
}: {
    setCurrentStep: Dispatch<SetStateAction<"profile" | "assessment" | "lead" | "results">>,
    setLeadInfo: Dispatch<SetStateAction<Partial<Lead>>>,
    leadInfo: Partial<Lead>
}) {
    const [errors, setErrors] = useState<{ full_name?: string; email?: string }>({});

    const validate = () => {
        const newErrors: { full_name?: string; email?: string } = {};
        if (!leadInfo.full_name?.trim()) {
            newErrors.full_name = 'Your name is required.';
        }
        if (!leadInfo.email?.trim()) {
            newErrors.email = 'Your email address is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadInfo.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) setCurrentStep('results');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 w-full">
            <div className="w-full max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Header framing */}
                    <div className="mb-6 text-center">
                        <h2 className="text-xl font-semibold text-slate-800 mb-2">
                            Your Operational Readiness Report is ready.
                        </h2>
                        <p className="text-sm text-slate-500 max-w-lg mx-auto">
                            Enter your details below and we will send your full report. One of our team will follow up within one business day to walk through your findings.
                        </p>
                    </div>

                    <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
                        {/* Gradient accent bar at top */}
                        <div
                            className="h-1 w-full"
                            style={{ background: 'linear-gradient(to right, #2B60EB, #8B37EA)' }}
                        />

                        <CardHeader className="pb-3 pt-5">
                            <CardTitle className="text-slate-800 text-base">
                                Your Contact Details
                            </CardTitle>
                            <CardDescription className="text-slate-500 text-sm">
                                Required fields are marked. Your data is processed securely and never shared.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-5 pb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="fullName" className="text-slate-700 text-sm">
                                        Full Name <span className="text-red-400">*</span>
                                    </Label>
                                    <Input
                                        id="fullName"
                                        placeholder="Your full name"
                                        value={leadInfo.full_name || ''}
                                        onChange={(e) => {
                                            setLeadInfo({ ...leadInfo, full_name: e.target.value });
                                            if (errors.full_name) setErrors(prev => ({ ...prev, full_name: undefined }));
                                        }}
                                        className={`bg-white border text-slate-700 text-sm placeholder:text-slate-400 focus:border-[#2B60EB] focus:ring-0 ${
                                            errors.full_name ? 'border-red-400' : 'border-slate-200'
                                        }`}
                                    />
                                    {errors.full_name && (
                                        <p className="text-xs text-red-400">{errors.full_name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-slate-700 text-sm">
                                        Email Address <span className="text-red-400">*</span>
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Your email address"
                                        value={leadInfo.email || ''}
                                        onChange={(e) => {
                                            setLeadInfo({ ...leadInfo, email: e.target.value });
                                            if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                                        }}
                                        className={`bg-white border text-slate-700 text-sm placeholder:text-slate-400 focus:border-[#2B60EB] focus:ring-0 ${
                                            errors.email ? 'border-red-400' : 'border-slate-200'
                                        }`}
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-400">{errors.email}</p>
                                    )}
                                </div>

                                {/* Company Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="company" className="text-slate-700 text-sm">
                                        Company Name
                                    </Label>
                                    <Input
                                        id="company"
                                        placeholder="Your company name"
                                        value={leadInfo.company_name || ''}
                                        onChange={(e) => setLeadInfo({ ...leadInfo, company_name: e.target.value })}
                                        className="bg-white border border-slate-200 text-slate-700 text-sm placeholder:text-slate-400 focus:border-[#2B60EB] focus:ring-0"
                                    />
                                </div>

                                {/* Role */}
                                <div className="space-y-2">
                                    <Label htmlFor="role" className="text-slate-700 text-sm">
                                        Role / Title
                                    </Label>
                                    <Input
                                        id="role"
                                        placeholder="Your role or title"
                                        value={leadInfo.role_title || ''}
                                        onChange={(e) => setLeadInfo({ ...leadInfo, role_title: e.target.value })}
                                        className="bg-white border border-slate-200 text-slate-700 text-sm placeholder:text-slate-400 focus:border-[#2B60EB] focus:ring-0"
                                    />
                                </div>
                            </div>

                            {/* Open text */}
                            <div className="space-y-2">
                                <Label htmlFor="openText" className="text-slate-700 text-sm">
                                    Anything specific you want us to address?
                                </Label>
                                <Textarea
                                    id="openText"
                                    placeholder="Optional — share any context about your current operations or what you are trying to solve."
                                    value={leadInfo.open_text || ''}
                                    onChange={(e) => setLeadInfo({ ...leadInfo, open_text: e.target.value })}
                                    className="w-full min-h-20 bg-white border border-slate-200 text-slate-700 text-sm placeholder:text-slate-400 focus:border-[#2B60EB] focus:ring-0"
                                    rows={3}
                                />
                            </div>

                            {/* Submit */}
                            <Button
                                onClick={handleSubmit}
                                className="w-full py-5 text-sm font-semibold text-white shadow-sm"
                                style={{ background: 'linear-gradient(to right, #2B60EB, #8B37EA)' }}
                            >
                                View My Operational Readiness Report
                            </Button>

                            <p className="text-xs text-center text-slate-400">
                                Your data is processed securely and never shared with third parties.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
