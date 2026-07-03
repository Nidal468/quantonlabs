"use client";

import React, { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";

// UI Components (shadcn/ui)
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Icons
import {
  Megaphone,
  TrendingUp,
  Headphones,
  UsersRound,
  LayoutGrid,
  Package,
  DollarSign,
  Brain,
  ChevronLeft,
  TreeDeciduous,
  Database,
  Layers,
} from "lucide-react";

// Types & Models
import { AgentDocument } from "@/model/agent";
import { WorkspaceDocument } from "@/model/workspace";
import { ITask } from "@/model/task";
import { DataPageDocument } from "@/model/datapage";

// Hooks
import { useWorkspace } from "@/lib/hook/useWorkspace";
import { useSkills, useActiveSkills, useActivateSkill, useDeactivateSkill } from "@/lib/hook/useSkill";

// Components
import AgentChatPanel from "./agentChat";
import AgentUpload from "./agentUpload";
import SkillTree from "./SkillTree";
import AgentDetails from "./AgentDetails";
import DataPagesPanel from "./DataPagesPanel";


// --- Helper: Icon Mapping ---
export const getAgentIcon = (iconName: AgentDocument["icon"]) => {
  switch (iconName) {
    case "Megaphone": return Megaphone;
    case "TrendingUp": return TrendingUp;
    case "Headphones": return Headphones;
    case "UsersRound": return UsersRound;
    case "LayoutGrid": return LayoutGrid;
    case "Package": return Package;
    case "DollarSign": return DollarSign;
    case "Brain": return Brain;
    default: return Brain;
  }
};

export default function SelectedAgentDialog({
  selectedAgent,
  activeCompany,
  setSelectedAgent,
}: {
  activeCompany: WorkspaceDocument;
  selectedAgent: AgentDocument | null;
  setSelectedAgent: React.Dispatch<React.SetStateAction<AgentDocument | null>>;
}) {
  // ✅ Using YOUR existing hooks for data fetching
  const { useWorkspaceDatapages, useWorkspaceTasks } = useWorkspace();
  const { data: tasks } = useWorkspaceTasks(activeCompany._id.toString());
  const { data: datapages } = useWorkspaceDatapages(activeCompany._id.toString());

  // Fetch skills for the selected agent
  const agentId = selectedAgent?._id?.toString() || "";
  const { data: skills, isLoading: skillsLoading } = useSkills(selectedAgent?.id || undefined);

  // Fetch active skills from workspace
  const workspaceId = activeCompany._id.toString();
  const { data: activeSkillIds = [], isLoading: activeSkillsLoading } = useActiveSkills(
    workspaceId || undefined,
    agentId || undefined
  );

  // Mutations for activating/deactivating skills
  const activateMutation = useActivateSkill(() => {});
  const deactivateMutation = useDeactivateSkill(() => {});

  const handleToggleSkill = (skillName: string) => {
    if (!workspaceId || !agentId) return;

    const isActive = activeSkillIds.includes(skillName);

    if (isActive) {
      // Deactivate skill
      deactivateMutation.mutate({ workspaceId, agentId, skillName });
    } else {
      // Activate skill (will enforce max 5 on the API level)
      activateMutation.mutate({ workspaceId, agentId, skillName });
    }
  };

  if (!selectedAgent) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-neutral-950 flex items-start justify-center overflow-hidden">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedAgent(null)}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Agents
        </Button>
      </div>

      {/* Split Panel Layout */}
      <div className="w-full h-screen flex">
        {/* LEFT: Agent Chat */}
        <div className="w-[450px] min-w-[350px] h-full border-r border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950">
          <AgentChatPanel
            agent={selectedAgent}
            activeCompany={activeCompany}
            onClose={() => setSelectedAgent(null)}
          />
        </div>

        {/* RIGHT: Details + Tabs */}
        <div className="flex-1 h-full overflow-y-auto bg-neutral-50 dark:bg-neutral-900">
          {/* Upload Header */}
          <div className="w-full h-16 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between px-6 bg-white dark:bg-neutral-950 sticky top-0 z-10">
            <AgentUpload agent={selectedAgent} activeCompany={activeCompany} />
          </div>

          {/* Scrollable Content */}
          <div className="p-6 max-w-5xl">
            {/* Tabs: Details, Skills, Data Pages */}
            <Tabs defaultValue="skills" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-neutral-100 dark:bg-neutral-800">
                <TabsTrigger value="details" className="gap-2">
                  <Brain className="h-4 w-4" />
                  Details
                </TabsTrigger>
                <TabsTrigger value="skills" className="gap-2">
                  <TreeDeciduous className="h-4 w-4" />
                  Skill Tree
                </TabsTrigger>
                <TabsTrigger value="datapages" className="gap-2">
                  <Database className="h-4 w-4" />
                  Data Pages
                </TabsTrigger>
              </TabsList>

              {/* Details Tab */}
              <TabsContent value="details" className="mt-6">
                <AgentDetails agent={selectedAgent} />

                <Separator className="my-6" />

                {/* Active Skills Summary */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">Active Skills</h3>
                  {activeSkillsLoading ? (
                    <p className="text-sm text-neutral-500">Loading active skills...</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {activeSkillIds.length === 0 ? (
                        <Badge variant="outline" className="text-xs text-neutral-500 border-neutral-300 dark:border-neutral-600">
                          No active skills
                        </Badge>
                      ) : (
                        activeSkillIds.map((skillName: string) => {
                          const skill = skills?.find((s) => s.name === skillName);
                          return (
                            <Badge key={skillName} variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">
                              {skill?.icon ? `${skill.icon} ` : ""}${skillName}
                            </Badge>
                          );
                        })
                      )}
                    </div>
                  )}

                  {/* Agent Tasks */}
                  <h4 className="text-md font-semibold text-neutral-700 dark:text-neutral-300 mt-6">Related Tasks</h4>
                  {tasks && tasks.length > 0 ? (
                    <div className="space-y-2">
                      {tasks.slice(0, 5).map((task: ITask) => (
                        <div key={task._id?.toString()} className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{task.title}</span>
                          <Badge variant="outline" className={`text-xs ${
                            task.status === "completed" ? "bg-green-50 text-green-700 border-green-200" :
                            task.status === "running" || task.status === "retrying" ? "bg-blue-50 text-blue-700 border-blue-200" :
                            task.status === "failed" ? "bg-red-50 text-red-700 border-red-200" :
                            task.status === "cancelled" ? "bg-gray-50 text-gray-700 border-gray-200" :
                            "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }`}>
                            {task.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-neutral-500">No tasks found for this agent.</p>
                  )}
                </div>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="mt-6">
                {skillsLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <TreeDeciduous className="h-8 w-8 text-neutral-400 mb-3 animate-pulse" />
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Loading skills...</p>
                  </div>
                ) : skills && skills.length > 0 ? (
                  <SkillTree
                    skills={skills}
                    activeSkills={activeSkillIds as string[]}
                    onToggleActive={handleToggleSkill}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <TreeDeciduous className="h-8 w-8 text-neutral-400 mb-3" />
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">No skills found for this agent</p>
                    <p className="text-xs text-neutral-500 mt-1">Check the database configuration for this agent's skills.</p>
                  </div>
                )}
              </TabsContent>

              {/* Data Pages Tab */}
              <TabsContent value="datapages" className="mt-6">
                {datapages && datapages.length > 0 ? (
                  <DataPagesPanel datapages={datapages as any[]} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Database className="h-8 w-8 text-neutral-400 mb-3" />
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">No data pages found</p>
                    <p className="text-xs text-neutral-500 mt-1">Upload files to create data pages for this agent.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}