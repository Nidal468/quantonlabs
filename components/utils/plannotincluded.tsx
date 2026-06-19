"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";

export default function PlanNotIncluded() {
    return (
        <div className="flex justify-center w-full">
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="w-fulld"
            >
                <div className="rounded-2xl border bg-card p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                            <Lock className="h-5 w-5 text-primary" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <h2 className="font-semibold">
                                Subscription Required
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                This AI agent isn't included in your current
                                plan. Upgrade to a package that includes access
                                to start using it.
                            </p>

                            <Link
                                href="/packages"
                                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
                            >
                                View Packages
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}