// app/admin/components/AgentPage.tsx
"use client";

import { useState } from "react";
import { useAgent } from "@/lib/hook/useAgent";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Loader2, AlertCircle, Brain, Megaphone, TrendingUp, Headphones, LayoutGrid, Package, DollarSign, UsersRound, FileText, Sparkles } from "lucide-react";
import { CreateAgentDialog } from "./CreateAgentDialog";

export const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    Megaphone,
    TrendingUp,
    Headphones,
    UsersRound,
    LayoutGrid,
    Package,
    DollarSign,
    Brain,
    FileText,
    Sparkles,
};

export function AgentPage() {
    const { agents, isLoading, error, deleteAgent, isDeleting } = useAgent();
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const handleDelete = async (id: string) => {
        await deleteAgent(id);
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-7 w-40" />
                    <Skeleton className="h-9 w-28" />
                </div>
                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-neutral-100">
                                {["Icon", "Name", "Domain", "Capabilities", "Created", "Actions"].map((h) => (
                                    <TableHead key={h} className="h-12 px-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                        {h}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[1, 2, 3].map((i) => (
                                <TableRow key={i} className="border-b border-neutral-50 last:border-b-0">
                                    <TableCell className="px-4 py-4"><Skeleton className="h-8 w-8 rounded-lg" /></TableCell>
                                    <TableCell className="px-4 py-4"><Skeleton className="h-5 w-32" /></TableCell>
                                    <TableCell className="px-4 py-4"><Skeleton className="h-5 w-20" /></TableCell>
                                    <TableCell className="px-4 py-4"><Skeleton className="h-5 w-40" /></TableCell>
                                    <TableCell className="px-4 py-4"><Skeleton className="h-5 w-24" /></TableCell>
                                    <TableCell className="px-4 py-4"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50/50 p-12 text-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="text-sm font-semibold text-red-900">Failed to load agents</h3>
                <p className="mt-1 text-sm text-red-700/80">{error instanceof Error ? error.message : "Unknown error occurred"}</p>
                <Button variant="outline" size="sm" className="mt-4 border-red-200 text-red-700 hover:bg-red-100 hover:text-red-800" onClick={() => window.location.reload()}>
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" className="bg-neutral-900 hover:bg-neutral-800 focus-visible:ring-neutral-900">
                            <Plus className="mr-2 h-4 w-4" />
                            New Agent
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create Agent</DialogTitle>
                        </DialogHeader>
                        <CreateAgentDialog onClose={() => setIsCreateOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Table Container */}
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <Table className="w-full border-collapse">
                        <TableHeader>
                            <TableRow className="border-b border-neutral-100 bg-neutral-50/60 hover:bg-neutral-50/60">
                                <TableHead className="w-[80px] px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Icon</TableHead>
                                <TableHead className="px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Name</TableHead>
                                <TableHead className="px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Domain</TableHead>
                                <TableHead className="px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Capabilities</TableHead>
                                <TableHead className="px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Created</TableHead>
                                <TableHead className="w-[80px] px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-neutral-100">
                            <AnimatePresence mode="wait">
                                {agents.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-32 px-4 py-8 text-center">
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                                                    <Brain className="h-6 w-6" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium text-neutral-900">No agents configured</p>
                                                    <p className="text-xs text-neutral-500">Get started by creating your first AI agent.</p>
                                                </div>
                                                <Button variant="outline" size="sm" className="mt-1 border-neutral-200 text-neutral-700 hover:bg-neutral-50" onClick={() => setIsCreateOpen(true)}>
                                                    <Plus className="mr-1.5 h-3.5 w-3.5" />
                                                    Create Agent
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    agents.map((agent) => {
                                        const IconComponent = iconMap[agent.icon || "Brain"] || Brain;
                                        return (
                                            <motion.tr
                                                key={agent.id}
                                                initial={{ opacity: 0, y: 4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -4 }}
                                                transition={{ duration: 0.15, ease: "easeOut" }}
                                                className="group/row border-b border-neutral-50 last:border-b-0 transition-colors hover:bg-neutral-50/70"
                                            >
                                                <TableCell className="px-4 py-3 align-middle">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 group-hover/row:bg-neutral-200/80 group-hover/row:text-neutral-700 transition-colors">
                                                        <IconComponent className="h-4 w-4" />
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-4 py-3 align-middle">
                                                    <span className="font-medium text-neutral-900">{agent.name}</span>
                                                </TableCell>
                                                <TableCell className="px-4 py-3 align-middle">
                                                    <span className="inline-flex items-center rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs font-medium text-neutral-600">
                                                        {agent.domain}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="px-4 py-3 align-middle">
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {agent.capabilities.slice(0, 3).map((cap) => (
                                                            <span key={cap} className="inline-flex items-center rounded bg-neutral-50 px-1.5 py-0.5 text-[11px] font-medium text-neutral-600 border border-neutral-200/80">
                                                                {cap}
                                                            </span>
                                                        ))}
                                                        {agent.capabilities.length > 3 && (
                                                            <span className="inline-flex items-center text-[11px] font-medium text-neutral-400">
                                                                +{agent.capabilities.length - 3}
                                                            </span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-4 py-3 align-middle">
                                                    <span className="text-xs font-mono text-neutral-500">
                                                        {formatDistanceToNow(new Date(agent.createdAt), { addSuffix: true })}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="px-4 py-3 align-middle text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        disabled={isDeleting}
                                                        onClick={() => handleDelete(agent.id)}
                                                        className="h-8 w-8 rounded-md text-neutral-400 hover:text-red-600 hover:bg-red-50 focus-visible:ring-red-500/20 transition-colors"
                                                        aria-label={`Delete agent ${agent.name}`}
                                                    >
                                                        {isDeleting ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </TableCell>
                                            </motion.tr>
                                        );
                                    })
                                )}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}