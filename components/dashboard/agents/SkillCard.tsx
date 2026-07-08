"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { ChevronDown, ChevronUp, Zap, Target, Feather, Rocket } from "lucide-react";

export interface SkillStats {
  speed: number;
  accuracy: number;
  tokenEfficiency: number;
  power: number;
}

export interface DomainModifier {
  domain: string;
  value: number;
}

export interface AgentSkillData {
  _id?: string;
  id: string;
  name: string;
  domain: string;
  description: string;
  icon: string;
  capabilities: string[];
  stats: SkillStats;
  buffs: DomainModifier[];
  debuffs: DomainModifier[];
  cost: number;
  dependency: { agentSkillId: string }[];
  levels: {
    name: string;
    domain: string;
    description: string;
    icon: string;
    capabilities: string[];
    stats: SkillStats;
    buffs: DomainModifier[];
    debuffs: DomainModifier[];
    cost: number;
  }[]
}

interface SkillCardProps {
  skill: AgentSkillData;
  isActive?: boolean;
  isDisabled?: boolean;
  onToggleActive?: (skillName: string) => void;
}

const statConfig = [
  { key: "speed" as const, label: "Speed", icon: Zap, color: "bg-yellow-500" },
  { key: "accuracy" as const, label: "Accuracy", icon: Target, color: "bg-green-500" },
  { key: "tokenEfficiency" as const, label: "Token Efficiency", icon: Feather, color: "bg-blue-500" },
  { key: "power" as const, label: "Power", icon: Rocket, color: "bg-purple-500" },
];

const domainColors: Record<string, string> = {
  Growth: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  Operations: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  Strategy: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
  "Operations + Growth": "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800",
  "Strategy + Operations": "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap: Zap,
  Shield: Target,
  Feather: Feather,
  Repeat: ChevronUp,
  ScatterChart: Rocket,
  Search: Target,
  Mail: Zap,
  Eye: Target,
  UsersRound: Rocket,
  LayoutTemplate: ChevronDown,
  Radio: Zap,
  Video: Rocket,
  PieChart: Target,
  Sparkles: Zap,
  Map: ChevronUp,
  ShieldAlert: Target,
  CalendarDays: Feather,
  Crown: Rocket,
};

export default function SkillCard({ skill, isActive = false, isDisabled = false, onToggleActive }: SkillCardProps) {
  const [expanded, setExpanded] = useState(false);

  const DomainBadge = domainColors[skill.domain] || "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
  const SkillIcon = iconMap[skill.icon] || Zap;

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 ${isActive ? "ring-2 ring-emerald-500 dark:ring-emerald-400" : ""}`}>
      <CardHeader className="pb-3 px-4 pt-4 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${DomainBadge.split(" ")[0]}`}>
              <SkillIcon className={`h-5 w-5 ${DomainBadge.split(" ")[1]?.replace("bg-", "text-")}`} />
            </div>
            <div className="space-y-1 flex-1 min-w-0">
              <CardTitle className="text-sm font-semibold leading-tight">{skill.name}</CardTitle>
              <Badge variant="outline" className={`text-[10px] ${DomainBadge}`}>
                {skill.domain}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Toggle Switch */}
            <Switch
              checked={isActive}
              disabled={isDisabled && !isActive}
              onCheckedChange={(checked) => onToggleActive?.(skill.name)}
              className={`w-10 h-5 ${isActive ? "bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-600"}`}
            />
            <button
              onClick={() => setExpanded(!expanded)}
              className="rounded-md p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4 text-neutral-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-neutral-500" />
              )}
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 pt-0">
        <p className={`text-xs line-clamp-2 mb-3 ${isActive ? "text-neutral-600 dark:text-neutral-400" : "text-neutral-400 dark:text-neutral-500"}`}>
          {skill.description}
        </p>

        {/* Stats */}
        <div className="space-y-2.5">
          {statConfig.map(({ key, label, icon: StatIcon, color }) => (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className={`flex items-center gap-1.5 ${isActive ? "text-neutral-600 dark:text-neutral-400" : "text-neutral-400 dark:text-neutral-500"}`}>
                  <StatIcon className="h-3 w-3" />
                  {label}
                </span>
                <span className="font-medium text-neutral-800 dark:text-neutral-200">{skill.stats[key]}</span>
              </div>
              <Progress value={skill.stats[key]} className={`h-1.5 ${isActive ? "bg-neutral-100 dark:bg-neutral-800" : "bg-neutral-100 dark:bg-neutral-800"}`} />
            </div>
          ))}
        </div>

        {/* Cost */}
        <div className="mt-3 flex items-center gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${i < skill.cost ? "bg-amber-500" : "bg-neutral-200 dark:bg-neutral-700"
                }`}
            />
          ))}
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-3 space-y-3 border-t pt-3 border-neutral-100 dark:border-neutral-800">
            {/* Buffs & Debuffs */}
            {(skill.buffs.length > 0 || skill.debuffs.length > 0) && (
              <div className="space-y-2">
                {skill.buffs.map((buff, i) => (
                  <Badge key={`buff-${i}`} variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 text-[10px]">
                    ✦ {buff.domain} +{buff.value}%
                  </Badge>
                ))}
                {skill.debuffs.map((debuff, i) => (
                  <Badge key={`debuff-${i}`} variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 text-[10px]">
                    ✕ {debuff.domain} {debuff.value}%
                  </Badge>
                ))}
              </div>
            )}

            {/* Capabilities */}
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Capabilities</p>
              <div className="flex flex-wrap gap-1.5">
                {skill.capabilities.map((cap) => (
                  <Badge key={cap} variant="secondary" className="text-[10px] bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border-none">
                    {cap}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}