// app/dashboard/agents/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Plus, MoreHorizontal, Edit, Trash2, AlertCircle, Brain, Megaphone, TrendingUp, Headphones, UsersRound, LayoutGrid, Package, DollarSign, FileText, Sparkles } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useAgent } from "@/lib/hook/useAgent";
import { WorkspaceDocument } from "@/model/workspace";
import { AgentDocument } from "@/model/agent";
import SelectedAgentDialog from "./selectedAgent";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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

export default function AgentsPage({ activeCompany }: { activeCompany: WorkspaceDocument }) {
  const { agents, isLoading, error } = useAgent();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<AgentDocument | null>(null);

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAgentStatus = (agentId: string) => {
    const workspaceAgent = activeCompany.agents?.find((a) => a.id.toString() === agentId);
    return workspaceAgent?.status || "inactive";
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            <Input placeholder="Search agents..." className="pl-9 bg-white border-neutral-200" disabled readOnly value={''} />
          </div>
        </div>
        <Card className="border-neutral-200 shadow-sm">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-medium text-neutral-500">All Agents</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-neutral-100">
                  <TableHead className="w-[80px]">Icon</TableHead>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Capabilities</TableHead>
                  <TableHead>Database</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[120px]">Created</TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3].map((i) => (
                  <TableRow key={i} className="border-neutral-100">
                    <TableCell className="py-4 px-4"><div className="h-8 w-8 rounded-lg bg-neutral-100 animate-pulse" /></TableCell>
                    <TableCell className="py-4 px-4"><div className="h-4 w-32 bg-neutral-100 animate-pulse rounded" /></TableCell>
                    <TableCell className="py-4 px-4"><div className="h-4 w-20 bg-neutral-100 animate-pulse rounded" /></TableCell>
                    <TableCell className="py-4 px-4"><div className="h-4 w-40 bg-neutral-100 animate-pulse rounded" /></TableCell>
                    <TableCell className="py-4 px-4"><div className="h-4 w-16 bg-neutral-100 animate-pulse rounded" /></TableCell>
                    <TableCell className="py-4 px-4"><div className="h-4 w-16 bg-neutral-100 animate-pulse rounded" /></TableCell>
                    <TableCell className="py-4 px-4"><div className="h-4 w-20 bg-neutral-100 animate-pulse rounded" /></TableCell>
                    <TableCell className="py-4 px-4"><div className="h-8 w-8 ml-auto bg-neutral-100 animate-pulse rounded" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
          <Input
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white border-neutral-200"
          />
        </div>
      </div>

      {/* Table */}
      <Card className="border-neutral-200 shadow-sm">
        <CardHeader className="pb-0">
          <CardTitle className="text-sm font-medium text-neutral-500">All Agents</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="w-full border-collapse">
              <TableHeader>
                <TableRow className="border-b border-neutral-100 bg-neutral-50/60 hover:bg-neutral-50/60">
                  <TableHead className="w-20 px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Icon</TableHead>
                  <TableHead className="px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Name</TableHead>
                  <TableHead className="px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Domain</TableHead>
                  <TableHead className="px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Capabilities</TableHead>
                  <TableHead className="px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Database</TableHead>
                  <TableHead className="px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</TableHead>
                  <TableHead className="w-[120px] px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Created</TableHead>
                  <TableHead className="w-[60px] px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-neutral-100">
                <AnimatePresence mode="wait">
                  {filteredAgents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-32 px-4 py-8 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                            <Brain className="h-6 w-6" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-neutral-900">No agents found</p>
                            <p className="text-xs text-neutral-500">Try adjusting your search or check your plan.</p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAgents.map((agent, i) => {
                      const IconComponent = iconMap[agent.icon || "Brain"] || Brain;
                      const status = getAgentStatus(agent._id.toString());
                      const isActive = status ? "active" : "inactive";
                      console.log(isActive)
                      return (
                        <motion.tr
                          key={i}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="group/row border-b border-neutral-50 last:border-b-0 transition-colors hover:bg-neutral-50/70"
                          onClick={() => setSelectedAgent(agent)}
                        >
                          <TableCell className="px-4 py-3 align-middle">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 group-hover/row:bg-neutral-200/80 group-hover/row:text-neutral-700 transition-colors">
                              <IconComponent className="h-4 w-4" />
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-3 align-middle">
                            <div className="flex flex-col">
                              <span className="font-medium text-neutral-900">{agent.name}</span>
                              <span className="mt-0.5 text-xs text-neutral-500 line-clamp-1">{agent.description}</span>
                            </div>
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
                              {agent.database.length} {agent.database.length === 1 ? "connection" : "connections"}
                            </span>
                          </TableCell>
                          <TableCell className="px-4 py-3 align-middle">
                            <Badge variant={status ? "default" : "secondary"} className="capitalize">
                              {isActive}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-4 py-3 align-middle">
                            <span className="text-xs font-mono text-neutral-500">
                              {formatDistanceToNow(new Date(agent.createdAt), { addSuffix: true })}
                            </span>
                          </TableCell>
                        </motion.tr>
                      );
                    })
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <SelectedAgentDialog activeCompany={activeCompany} selectedAgent={selectedAgent} setSelectedAgent={setSelectedAgent} />
    </div>
  );
}
