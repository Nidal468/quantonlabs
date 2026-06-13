// app/dashboard/company/page.tsx
"use client";

import { WorkspaceDocument } from "@/model/workspace";
import { useWorkspace } from "@/lib/hook/useWorkspace";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Users, Bot, Key, Calendar, Shield, RefreshCw, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function OverviewCard({ workspace }: { workspace: WorkspaceDocument }) {
  const statusColors: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    trialing: "bg-blue-50 text-blue-700 border-blue-200",
    past_due: "bg-amber-50 text-amber-700 border-amber-200",
    canceled: "bg-red-50 text-red-700 border-red-200",
    unpaid: "bg-gray-50 text-gray-700 border-gray-200",
    incomplete: "bg-gray-50 text-gray-700 border-gray-200",
    incomplete_expired: "bg-gray-50 text-gray-700 border-gray-200",
  };

  return (
    <Card className="border-gray-200 shadow-sm rounded-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold tracking-tight">Workspace Overview</CardTitle>
        <CardDescription>Core configuration and subscription details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Workspace Name</p>
            <p className="text-xl font-bold tracking-tight text-gray-900">{workspace.name}</p>
          </div>
          <Badge variant="outline" className="px-2.5 py-0.5 text-xs font-medium bg-gray-50 text-gray-600">
            {workspace.plan}
          </Badge>
        </div>

        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-gray-500">Subscription Status</p>
            <div className="flex items-center gap-2">
              <div className={cn("h-2 w-2 rounded-full", workspace.subscriptionStatus === "active" ? "bg-emerald-500" : "bg-gray-300")} />
              <span className="font-medium capitalize">{workspace.subscriptionStatus || "No Subscription"}</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500">Created At</p>
            <div className="flex items-center gap-1.5 text-gray-700">
              <Calendar className="h-3.5 w-3.5" />
              <span className="font-medium">{workspace.createdAt ? format(new Date(workspace.createdAt), "MMM d, yyyy") : "N/A"}</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500">Workspace ID</p>
            <p className="font-mono text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-100 truncate max-w-[180px]">
              {workspace._id?.toString().slice(0, 12)}...
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500">Owner ID</p>
            <p className="font-mono text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-100 truncate max-w-[180px]">
              {workspace.ownerId?.toString().slice(0, 12)}...
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MembersCard({ workspace }: { workspace: WorkspaceDocument }) {
  return (
    <Card className="border-gray-200 shadow-sm rounded-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold tracking-tight">Team Members</CardTitle>
            <CardDescription>{workspace.members.length} active members</CardDescription>
          </div>
          <Users className="h-5 w-5 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        {workspace.members.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="h-10 w-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No members yet.</p>
            <p className="text-xs text-gray-400">Members will appear here once added.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {workspace.members.map((member) => (
              <div key={member.id.toString()} className="flex items-center justify-between rounded-lg border border-gray-100 p-3 bg-gray-50/40 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                    {member.id.toString().slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Member {member.id.toString().slice(-4)}</p>
                    <p className="text-xs text-gray-500 font-mono">{member.id.toString()}</p>
                  </div>
                </div>
                <Badge variant="outline" className="px-2 py-0.5 text-xs font-medium bg-white">
                  {member.role}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AgentsCard({ workspace }: { workspace: WorkspaceDocument }) {
  return (
    <Card className="border-gray-200 shadow-sm rounded-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold tracking-tight">Agents</CardTitle>
            <CardDescription>{workspace.agents.length} configured agents</CardDescription>
          </div>
          <Bot className="h-5 w-5 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        {workspace.agents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="h-10 w-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-2">
              <Bot className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No agents configured.</p>
            <p className="text-xs text-gray-400">Agents will appear here once deployed.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {workspace.agents.map((agent) => (
              <div key={agent.id.toString()} className="flex items-center justify-between rounded-lg border border-gray-100 p-3 bg-gray-50/40 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Agent {agent.id.toString().slice(-4)}</p>
                    <p className="text-xs text-gray-500 font-mono">{agent.id.toString()}</p>
                  </div>
                </div>
                <Badge variant="outline" className="px-2 py-0.5 text-xs font-medium bg-white">
                  {true ? "Active" : "Inactive"}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function IntegrationsCard({ workspace }: { workspace: WorkspaceDocument }) {
  return (
    <Card className="border-gray-200 shadow-sm rounded-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold tracking-tight">Integrations</CardTitle>
            <CardDescription>Connected external services</CardDescription>
          </div>
          <Key className="h-5 w-5 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* OpenRouter */}
        <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3 bg-gray-50/40">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Shield className="h-4 w-4 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">OpenRouter</p>
              <p className="text-xs text-gray-500 font-mono">{workspace.config?.openrouter?.key ? "sk-or-v1-••••••••" : "Not configured"}</p>
            </div>
          </div>
          <Badge variant="outline" className={cn("px-2 py-0.5 text-xs font-medium", workspace.config?.openrouter?.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-gray-50 text-gray-500 border-gray-200")}>
            {workspace.config?.openrouter?.status === "active" ? "Connected" : "Disconnected"}
          </Badge>
        </div>

        {/* ElevenLabs */}
        <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3 bg-gray-50/40">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Shield className="h-4 w-4 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">ElevenLabs</p>
              <p className="text-xs text-gray-500 font-mono">{workspace.config?.elevenlabs?.key ? "sk-••••••••" : "Not configured"}</p>
            </div>
          </div>
          <Badge variant="outline" className={cn("px-2 py-0.5 text-xs font-medium", workspace.config?.elevenlabs?.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-gray-50 text-gray-500 border-gray-200")}>
            {workspace.config?.elevenlabs?.status === "active" ? "Connected" : "Disconnected"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page Component
// ─────────────────────────────────────────────────────────────────────────────

export default function CompanyPage({ activeCompany }: { activeCompany: WorkspaceDocument }) {
  const { isLoading } = useWorkspace();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((res) => setTimeout(res, 800));
    setRefreshing(false);
  };

  if (isLoading || !activeCompany) {
    return (
      <div className="mx-auto w-full max-w-6xl space-y-8 py-8 px-4 sm:px-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-2 border-gray-200 shadow-sm rounded-xl">
            <CardHeader className="pb-4"><Skeleton className="h-6 w-32" /></CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
          <Card className="border-gray-200 shadow-sm rounded-xl">
            <CardHeader className="pb-3"><Skeleton className="h-6 w-24" /></CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto w-full max-w-6xl space-y-8 py-8 px-4 sm:px-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Workspace Dashboard</h1>
          <p className="text-sm text-gray-500">Monitor your active workspace configuration and team status.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-1.5 border-gray-200 hover:bg-gray-50"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw className={cn("h-3.5 w-3.5", refreshing && "animate-spin")} />
          {refreshing ? "Syncing..." : "Sync Status"}
        </Button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Overview (Spans 2 columns on large screens) */}
        <div className="xl:col-span-2">
          <OverviewCard workspace={activeCompany} />
        </div>

        {/* Integrations (Right column) */}
        <IntegrationsCard workspace={activeCompany} />
      </div>

      {/* Members & Agents (Bottom row) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MembersCard workspace={activeCompany} />
        <AgentsCard workspace={activeCompany} />
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          Data is refreshed manually. For billing or settings adjustments, contact your workspace administrator.
        </p>
      </div>
    </motion.div>
  );
}
