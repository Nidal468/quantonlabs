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
} from "lucide-react";

// Types & Models
import { AgentDocument } from "@/model/agent";
import { WorkspaceDocument } from "@/model/workspace";
import { ITask } from "@/model/task";
import { DataPageDocument } from "@/model/datapage";

// Hooks
import { useWorkspace } from "@/lib/hook/useWorkspace";
import AgentChatPanel from "./agentChat";
import { Button } from "@/components/ui/button";
import AgentUpload from "./agentUpload";


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

  if (!selectedAgent) return null;

  const AgentIcon = getAgentIcon(selectedAgent.icon);
  const selectedAgentDataInCompany = activeCompany.agents.find((e) => e.id.toString() === selectedAgent._id.toString());

  return (
    selectedAgent &&
    <div className="w-full h-screen fixed top-0 left-0 bg-white flex items-center justify-center">
      {/* AI agent chat */}
      <div className="w-140 h-full border-r border-zinc-700">
        <AgentChatPanel agent={selectedAgent} activeCompany={activeCompany} onClose={() => setSelectedAgent(null)} />
      </div>

      <div className="w-full h-full">
        <div className="w-full h-20 border flex items-center justify-start px-5">
          <AgentUpload agent={selectedAgent} activeCompany={activeCompany}/>
        </div>
      </div>
    </div>
  );
}
