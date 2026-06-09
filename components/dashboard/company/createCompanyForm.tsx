// app/dashboard/components/CreateCompanyPage.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, useCallback } from "react";

const CreateCompanySchema = z.object({
    name: z
        .string()
        .min(1, "Workspace name is required")
        .max(100, "Name must be under 100 characters")
        .trim(),
});

export type CreateCompanyInput = z.infer<typeof CreateCompanySchema>;

interface CreateCompanyPageProps {
    onSubmit: (data: CreateCompanyInput) => void;
}

export default function CreateCompanyPage({ onSubmit }: CreateCompanyPageProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<CreateCompanyInput>({
        resolver: zodResolver(CreateCompanySchema),
        mode: "onChange",
        defaultValues: { name: "" },
    });

    const handleFormSubmit = useCallback(
        async (data: CreateCompanyInput) => {
            setStatus("loading");
            setErrorMsg(null);
            try {
                await onSubmit(data);
                setStatus("success");
            } catch (err) {
                setStatus("error");
                setErrorMsg(err instanceof Error ? err.message : "Failed to create workspace");
            }
        },
        [onSubmit]
    );

    return (
        <div className="flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <AnimatePresence mode="wait">
                    {status === "success" ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            className="flex flex-col items-center justify-center py-8 text-center"
                        >
                            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                                <CheckCircle2 className="w-6 h-6 text-neutral-900" />
                            </div>
                            <h2 className="text-lg font-medium text-neutral-900">Workspace created</h2>
                            <p className="text-sm text-neutral-500 mt-1">
                                You can now switch to your new workspace.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit(handleFormSubmit)}
                            className="flex flex-col gap-5"
                            noValidate
                        >
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-sm font-medium text-neutral-700">
                                    Workspace name
                                </label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Acme Corp"
                                    {...register("name")}
                                    className={`h-11 border-neutral-200 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 transition-all ${errors.name ? "border-red-500 focus-visible:ring-red-500" : ""
                                        }`}
                                    autoFocus
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            {status === "error" && errorMsg && (
                                <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 text-xs text-red-500 bg-red-50 border border-red-100 rounded-md p-3"
                                >
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>{errorMsg}</span>
                                </motion.div>
                            )}

                            <Button
                                type="submit"
                                disabled={status === "loading" || !isValid}
                                className="h-11 bg-neutral-900 hover:bg-neutral-800 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "loading" ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Creating...
                                    </span>
                                ) : (
                                    "Create workspace"
                                )}
                            </Button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
