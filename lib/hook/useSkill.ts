"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

export interface AgentSkillDocument {
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
}

// Fetch all skills for a given agent id (from JSON files)
export async function getSkills(agentId?: string): Promise<AgentSkillDocument[]> {
  if (!agentId) return [];
  
  const res = await fetch(`/api/skill?agentId=${encodeURIComponent(agentId)}`);
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}

export function useSkills(agentId?: string) {
  return useQuery<AgentSkillDocument[]>({
    queryKey: ["skills", agentId],
    queryFn: () => getSkills(agentId),
    enabled: !!agentId,
  });
}

// Fetch active skills for an agent in a workspace (from MongoDB)
export async function getActiveSkills(workspaceId: string, agentId: string): Promise<string[]> {
  const res = await fetch(`/api/workspace/${workspaceId}`);
  if (!res.ok) throw new Error("Failed to fetch workspace");
  const data = await res.json();
  
  const workspaceAgent = data.agents?.find((a: any) => a.id === agentId);
  return workspaceAgent?.activeSkillIds || [];
}

export function useActiveSkills(workspaceId?: string, agentId?: string) {
  return useQuery<string[]>({
    queryKey: ["activeSkills", workspaceId, agentId],
    queryFn: () => getActiveSkills(workspaceId!, agentId!),
    enabled: !!(workspaceId && agentId),
  });
}

// Activate a skill mutation
export async function activateSkill(params: { workspaceId: string; agentId: string; skillName: string }): Promise<{ activeSkillIds: string[]; message: string }> {
  const res = await fetch("/api/skill", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error("Failed to activate skill");
  return res.json();
}

export function useActivateSkill(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: activateSkill,
    onSuccess: (data, variables) => {
      // Invalidate active skills query to refresh the UI
      queryClient.invalidateQueries({ queryKey: ["activeSkills", variables.workspaceId, variables.agentId] });
      onSuccess?.();
    },
  });
}

// Deactivate a skill mutation
export async function deactivateSkill(params: { workspaceId: string; agentId: string; skillName: string }): Promise<{ activeSkillIds: string[]; message: string }> {
  const res = await fetch("/api/skill", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error("Failed to deactivate skill");
  return res.json();
}

export function useDeactivateSkill(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deactivateSkill,
    onSuccess: (data, variables) => {
      // Invalidate active skills query to refresh the UI
      queryClient.invalidateQueries({ queryKey: ["activeSkills", variables.workspaceId, variables.agentId] });
      onSuccess?.();
    },
  });
}

// Helper: check if a skill is currently active
export function isSkillActive(skillName: string, activeSkillIds: string[]): boolean {
  return activeSkillIds.includes(skillName);
}