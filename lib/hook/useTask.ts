// /lib/hook/useTask.ts

"use client";

import { useQuery } from "@tanstack/react-query";
import { ITask } from "@/model/task";
import { getTasks } from "@/lib/api/task";

export function useTask(agentId?: string, workspaceId?: string) {
  const hasAgentId = !!agentId;
  const queryEnabled = hasAgentId ? (!!agentId && !!workspaceId) : !!workspaceId;

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery<ITask[]>({
    queryKey: ["tasks", agentId, workspaceId],
    queryFn: () => getTasks(hasAgentId ? agentId : "", workspaceId || ""),
    enabled: queryEnabled && !!workspaceId,
  });

  return { tasks, isLoading, error };
}
