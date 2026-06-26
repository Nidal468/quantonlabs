// app/dashboard/company/page.tsx
"use client";

import { WorkspaceDocument } from "@/model/workspace";
import { useWorkspace } from "@/lib/hook/useWorkspace";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Users, Bot, Calendar, Shield, RefreshCw,
  Activity, Server, CheckCircle2, AlertTriangle, XCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner"

// ─────────────────────────────────────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};
import { useUser } from "@/lib/context/user";
import { APIKeys } from "./api-keys/APIKeys";

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function WorkspaceHero({ workspace }: { workspace: WorkspaceDocument }) {
  return (
    <motion.div
      variants={itemVariants}
      className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gray-50 blur-2xl opacity-50 pointer-events-none" />

      <div className="relative flex flex-col md:flex-row gap-6 items-start justify-between">
        <div className="space-y-4 max-w-xl">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-transparent font-medium px-3 py-1.5 rounded-full text-xs uppercase tracking-wide">
              {workspace.plan} Plan
            </Badge>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <span className={cn("h-2 w-2 rounded-full", workspace.subscriptionStatus === "active" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-gray-300")} />
              <span className="capitalize font-medium">{workspace.subscriptionStatus || "No Subscription"}</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {workspace.name}
          </h1>

          <p className="text-sm text-gray-500 leading-relaxed">
            Manage your team, configure agents, and monitor system health for this workspace instance.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs font-mono text-gray-400 border-t border-gray-100 mt-2">
            <span>ID: {workspace._id?.toString().slice(0, 8)}...</span>
            <span>Created: {format(new Date(workspace.createdAt), "MMM d, yyyy")}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto">
          <Button variant="outline" size="sm" className="w-full justify-start gap-2 h-9 text-xs font-medium border-gray-200 hover:bg-gray-50 transition-all duration-200">
            <Activity className="h-3.5 w-3.5 text-blue-500" />
            View Analytics
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 h-9 text-xs font-medium hover:bg-gray-100 transition-all duration-200">
            <SettingsIcon className="h-3.5 w-3.5 text-gray-400" />
            Configuration
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function MembersCard({ workspace }: { workspace: WorkspaceDocument }) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
        <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-base font-semibold tracking-tight text-gray-900">Team Members</CardTitle>
            <CardDescription className="text-xs">{workspace.members.length} active users</CardDescription>
          </div>
          <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
            <Users className="h-4 w-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          {workspace.members.length === 0 ? (
            <EmptyState icon={Users} title="No members yet" description="Invite team members to collaborate." />
          ) : (
            <div className="flex flex-wrap gap-2">
              {workspace.members.slice(0, 6).map((member) => (
                <div key={member.id.toString()} className="group relative flex items-center justify-between w-full p-2 rounded-lg border border-gray-100 bg-white hover:border-blue-200 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 shadow-sm ring-1 ring-black/5">
                      {member.id.toString().slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-colors">User_{member.id.toString().slice(-4)}</span>
                  </div>
                  <Badge variant="outline" className="h-5 px-1.5 text-[9px] border-gray-200 bg-white/50 backdrop-blur-sm uppercase tracking-wider font-normal">
                    {member.role}
                  </Badge>
                </div>
              ))}
              {workspace.members.length > 6 && (
                <button className="h-7 w-full rounded-lg border border-dashed border-gray-200 bg-gray-50 text-xs text-gray-500 hover:bg-gray-100 transition-colors flex items-center justify-center font-medium">
                  +{workspace.members.length - 6} more
                </button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function AgentsCard({ workspace }: { workspace: WorkspaceDocument }) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
        <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-base font-semibold tracking-tight text-gray-900">Deployed Agents</CardTitle>
            <CardDescription className="text-xs">{workspace.agents.length} instances running</CardDescription>
          </div>
          <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center">
            <Bot className="h-4 w-4 text-purple-600" />
          </div>
        </CardHeader>
        <CardContent>
          {workspace.agents.length === 0 ? (
            <EmptyState icon={Server} title="No agents deployed" description="Deploy your first AI agent." />
          ) : (
            <div className="space-y-3">
              {workspace.agents.map((agent, idx) => (
                <motion.div
                  key={agent.id.toString()}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50/80 border border-gray-100 hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-2 w-2 rounded-full shadow-[0_0_8px_currentColor]",
                      agent.status ? "bg-emerald-500 text-emerald-500 animate-pulse" : "bg-gray-400 text-gray-400"
                    )} />
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">Agent_{agent.id.toString().slice(-4)}</p>
                      <p className="text-[10px] text-gray-400 font-mono">{agent.id.toString()}</p>
                    </div>
                  </div>
                  <Badge
                    variant={agent.status ? "default" : "outline"}
                    className={cn(
                      "h-5 px-2 text-[9px] uppercase tracking-wider",
                      agent.status ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-transparent shadow-sm" : "text-gray-400 border-gray-200 bg-transparent"
                    )}
                  >
                    {agent.status ? "Running" : "Stopped"}
                  </Badge>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

/**
 * Integrations Card 
 */
function IntegrationsCard({ workspace }: { workspace: WorkspaceDocument }) {
  const integrations = [
    {
      name: "OpenRouter",
      key: workspace.config?.openrouter,
      logo: "/Logos/OpenRouter.svg",
      bg: "bg-orange-50"
    },
    {
      name: "ElevenLabs",
      key: workspace.config?.elevenlabs,
      logo: "/Logos/elevenlabs.svg",
      bg: "bg-pink-50"
    }
  ];

  return (
    <motion.div variants={itemVariants}>
      <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
        <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-base font-semibold tracking-tight text-gray-900">Integrations</CardTitle>
            <CardDescription className="text-xs">External API Connections</CardDescription>
          </div>
          <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center">
            <Shield className="h-4 w-4 text-emerald-600" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {integrations.map((integration) => (
            <div key={integration.name} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-white hover:border-gray-200 transition-colors group">
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-md flex items-center justify-center ${integration.bg}`}>
                  <img
                    src={integration.logo}
                    alt={`${integration.name} logo`}
                    className="h-4 w-4 object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-700">{integration.name}</p>
                  <p className="text-[10px] text-gray-400 font-mono truncate max-w-[120px]">
                    {integration.key?.status === "active" ? "sk-••••••••••••" : "Not Configured"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {integration.key?.status === "active" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-gray-300 group-hover:text-red-400 transition-colors" />
                )}
              </div>
            </div>
          ))}

          <button className="w-full py-2 rounded-lg border border-dashed border-gray-200 text-xs font-medium text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/30 transition-all flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Add Connection
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility Components
// ─────────────────────────────────────────────────────────────────────────────

function EmptyState({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center border border-dashed border-gray-100 rounded-lg bg-gray-50/30">
      <div className="h-8 w-8 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-2">
        <Icon className="h-4 w-4 text-gray-400" />
      </div>
      <p className="text-xs font-medium text-gray-600">{title}</p>
      <p className="text-[10px] text-gray-400 mt-0.5">{description}</p>
    </div>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      {...props}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// Main Page Component
// ─────────────────────────────────────────────────────────────────────────────

export default function CompanyPage({ activeCompany }: { activeCompany: WorkspaceDocument }) {
  const { isLoading, updateWorkspace, generateKey, removeApiKey } = useWorkspace();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((res) => setTimeout(res, 800));
    window.location.reload();
    setRefreshing(false);
  };

  if (isLoading || !activeCompany) {
    return <DashboardSkeleton />;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full space-y-8 py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            System Operational
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
          className="h-8 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
        >
          <RefreshCw className={cn("mr-2 h-3.5 w-3.5", refreshing && "animate-spin")} />
          {refreshing ? "Syncing..." : "Refresh Data"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <WorkspaceHero workspace={activeCompany} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <MembersCard workspace={activeCompany} />

            <motion.div variants={itemVariants}>
              <Card className="border-gray-200 bg-gradient-to-br from-white to-gray-50 border-dashed">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Need Help?</h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-[200px]">Contact support for billing or technical issues.</p>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 text-xs border-transparent bg-white shadow-sm hover:bg-gray-50">
                    Documentation
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            <APIKeys workspace={activeCompany} isLoading={isLoading} generateKey={generateKey} removeApiKey={removeApiKey} />
          </div>

          <div className="space-y-6">
            <AgentsCard workspace={activeCompany} />
            <IntegrationsCard workspace={activeCompany} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Skeleton Loader
// ─────────────────────────────────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 py-10 px-4 sm:px-6 lg:px-8">
      <div className="h-12 border-b border-gray-100 pb-6 flex justify-between items-center">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>

      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm h-48 flex items-center justify-between">
        <div className="space-y-3 max-w-lg">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Skeleton className="h-48 w-full rounded-xl border border-gray-200" />
          <Skeleton className="h-32 w-full rounded-xl border border-dashed border-gray-200" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-xl border border-gray-200" />
          <Skeleton className="h-48 w-full rounded-xl border border-gray-200" />
        </div>
      </div>
    </div>
  );
}