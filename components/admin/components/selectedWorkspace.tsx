// app/dashboard/admin/components/selectedWorkspace.tsx
"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { X, Users, Bot, CreditCard, Settings, CheckCircle2, AlertCircle, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { WorkspaceDocument } from "@/model/workspace";
import { Dispatch, SetStateAction, useState } from "react";
import { useAgent } from "@/lib/hook/useAgent";
import { getAgentIcon } from "@/components/dashboard/agents/selectedAgent";
import { useWorkspace } from "@/lib/hook/useWorkspace";

interface SelectedWorkspaceProps {
    selectedWorkspaceId: string;
    setSelectedWorkspaceId: (value: SetStateAction<string>) => void;
}

export default function SelectedWorkspace({ selectedWorkspaceId, setSelectedWorkspaceId }: SelectedWorkspaceProps) {
    
    const {
        workspaces
    } = useWorkspace();

    const [selectedTab, setSelectedTab] = useState<string>("overview");

    const tabs = [
        "overview",
        "agents",
        "calls",
        "tasks",
        "settings"
    ]

    const selectedWorkspace = workspaces.find((e) => e._id.toString() === selectedWorkspaceId)

    if (!selectedWorkspace) return null;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Workspace Details"
        >
            <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 16 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-2xl overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
            >
                <CardHeader className="border-b border-neutral-100 px-6 py-5 sm:px-8 sm:py-6 space-y-3">
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900">
                                {selectedWorkspace.name}
                            </CardTitle>
                            <CardDescription className="text-sm text-neutral-500">
                                Workspace configuration & subscription details
                            </CardDescription>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedWorkspaceId("")}
                            className="h-8 w-8 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                            aria-label="Close dialog"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-6 sm:p-8 space-y-6">
                    <div className="w-full flex items-center justify-start gap-2">
                        {tabs.map((tab, i) => (
                            <div className={`${selectedTab === tab ? "bg-zinc-700 text-white" : "bg-white"} shadow border w-full flex items-center justify-center py-1 rounded-md uppercase font-medium text-sm`} key={i} onClick={() => setSelectedTab(tab)}>
                                <h1>{tab}</h1>
                            </div>
                        ))}
                    </div>


                    <Separator className="my-4" />

                    {selectedTab === "overview" && <Overview selectedWorkspace={selectedWorkspace} />}
                    {selectedTab === "agents" && <Agents selectedWorkspace={selectedWorkspace} />}

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                        <Button
                            variant="outline"
                            onClick={() => setSelectedWorkspaceId("")}
                            className="border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                        >
                            Close
                        </Button>
                    </div>
                </CardContent>
            </motion.div>
        </motion.div>
    );
}

function Overview({ selectedWorkspace }: { selectedWorkspace: WorkspaceDocument }) {
    const formatDate = (date: Date | undefined) => {
        if (!date) return "Not set";
        return format(new Date(date), "MMM d, yyyy");
    };

    const getProviderStatus = (status: "active" | "inactive" | undefined) => {
        const isActive = status === "active";
        return {
            bg: isActive ? "bg-green-50" : "bg-neutral-100",
            text: isActive ? "text-green-700" : "text-neutral-400",
            icon: isActive ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <AlertCircle className="h-5 w-5 text-neutral-300" />,
            label: isActive ? "Configured" : "Not configured",
        };
    };
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Owner */}
            <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Owner</h3>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 border border-neutral-100">
                    <div className="h-9 w-9 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-medium text-neutral-600">
                        {selectedWorkspace.ownerId.toString().slice(-2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-neutral-900 truncate">
                            {selectedWorkspace.ownerId.toString()}
                        </p>
                        <p className="text-xs text-neutral-500">Workspace Owner</p>
                    </div>
                </div>
            </div>

            {/* Members & Agents */}
            <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Team & Agents</h3>
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-100 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-1">
                            <Users className="h-4 w-4 text-neutral-400" />
                            <span className="text-sm font-medium text-neutral-900">{selectedWorkspace.members.length}</span>
                        </div>
                        <p className="text-xs text-neutral-500">Members</p>
                    </div>
                    <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-100 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-1">
                            <Bot className="h-4 w-4 text-neutral-400" />
                            <span className="text-sm font-medium text-neutral-900">{selectedWorkspace.agents.length}</span>
                        </div>
                        <p className="text-xs text-neutral-500">Agents</p>
                    </div>
                </div>
            </div>

            {/* Billing */}
            <div className="space-y-2 md:col-span-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Billing & Subscription</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg border border-neutral-200 bg-white">
                        <p className="text-xs text-neutral-500 mb-1">Subscription ID</p>
                        <p className="font-mono text-xs text-neutral-700 truncate" title={selectedWorkspace.stripeSubscriptionId || ""}>
                            {selectedWorkspace.stripeSubscriptionId || "N/A"}
                        </p>
                    </div>
                    <div className="p-3 rounded-lg border border-neutral-200 bg-white">
                        <p className="text-xs text-neutral-500 mb-1">Customer ID</p>
                        <p className="font-mono text-xs text-neutral-700 truncate" title={selectedWorkspace.stripeCustomerId || ""}>
                            {selectedWorkspace.stripeCustomerId || "N/A"}
                        </p>
                    </div>
                    <div className="p-3 rounded-lg border border-neutral-200 bg-white">
                        <p className="text-xs text-neutral-500 mb-1">Subscription Ends</p>
                        <p className="font-mono text-xs text-neutral-700">
                            {formatDate(selectedWorkspace.subscriptionEndsAt)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Providers */}
            <div className="space-y-2 md:col-span-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Provider Configuration</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(["openrouter", "elevenlabs"] as const).map((provider) => {
                        const config = selectedWorkspace.config[provider];
                        const status = getProviderStatus(config?.status);
                        return (
                            <div key={provider} className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 bg-white hover:border-neutral-300 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-md ${status.bg} ${status.text}`}>
                                        <Settings className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-neutral-900 capitalize">{provider}</p>
                                        <p className="text-xs text-neutral-500">{status.label}</p>
                                    </div>
                                </div>
                                {status.icon}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

function Agents({ selectedWorkspace }: { selectedWorkspace: WorkspaceDocument }) {
    const { agents } = useAgent();
    const { updateWorkspace } = useWorkspace();

    const updateAgentStatus = ({ agentId, status }: { agentId: string, status: "Added" | "Not Added" }) => {
        if (status === "Not Added") {
            updateWorkspace({
                id: selectedWorkspace._id.toString(),
                data: {
                    agents: {
                        id: agentId,
                        status: true
                    }
                }
            })
        } else if (status === "Added") {
            updateWorkspace({
                id: selectedWorkspace._id.toString(),
                data: {
                    agents: {
                        id: agentId,
                        status: false
                    }
                }
            })
        }
    }
    return (
        <div className="w-full flex flex-col items-start justify-start gap-4">
            {agents.map((agent, i) => {
                const AgentIcon = getAgentIcon(agent.icon);
                const selectedAgentDataInCompany = selectedWorkspace.agents.find((e) => e.id.toString() === agent._id.toString());
                console.log(selectedAgentDataInCompany)
                const status = selectedAgentDataInCompany ? "Added" : "Not Added"
                return (
                    <div key={i} className="w-full bg-white shadow p-2 rounded-md border flex items-center justify-between">
                        <div className="flex items-center justify-center gap-2">
                            <div className="bg-black text-white p-2 rounded-md">
                                <AgentIcon size={14} />
                            </div>
                            <h1 className="text-sm">{agent.name}</h1>
                        </div>
                        <Button className="text-[12px]" onClick={() => updateAgentStatus({ agentId: agent._id.toString(), status })}>{status}</Button>
                    </div>
                )
            })}
        </div>
    )
}