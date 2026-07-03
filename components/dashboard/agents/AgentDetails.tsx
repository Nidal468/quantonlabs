"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AgentDocument } from "@/model/agent";
import { getAgentIcon } from "./selectedAgent";
import { Brain, Database } from "lucide-react";

interface AgentDetailsProps {
  agent: AgentDocument;
}

const domainColors: Record<string, string> = {
  Growth: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  Operations: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  Strategy: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
  "Operations + Growth": "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800",
};

export default function AgentDetails({ agent }: AgentDetailsProps) {
  const IconComponent = getAgentIcon(agent.icon);
  const domainColor = domainColors[agent.domain] || "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";

  return (
    <div className="space-y-4">
      {/* Agent Header */}
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${domainColor.split(" ").slice(0, 2).join(" ")}`}>
          <IconComponent className="h-6 w-6" />
        </div>
        <div className="space-y-1 flex-1">
          <CardTitle className="text-lg font-bold">{agent.name}</CardTitle>
          <Badge variant="outline" className={domainColor}>
            {agent.domain}
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Description */}
      <div className="space-y-2">
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{agent.description}</p>
      </div>

      <Separator />

      {/* Tags */}
      {agent.tags && agent.tags.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">Tags</h4>
          <div className="flex flex-wrap gap-1.5">
            {agent.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px] bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border-none">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Capabilities */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">Capabilities</h4>
        <div className="grid grid-cols-1 gap-1.5">
          {agent.capabilities.map((cap) => (
            <div key={cap} className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="h-1 w-1 rounded-full bg-emerald-500" />
              {cap}
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Database Connections */}
      <Card className="border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <Database className="h-4 w-4" />
              Database Connections
            </span>
            <Badge variant="outline" className={domainColor}>
              {agent.database.length}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}