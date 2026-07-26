// /lib/api/task.ts

import { ITask } from "@/model/task";

export async function getTasks(agentId: string, workspaceId: string) {
  const res = await fetch(`/api/v1/tasks?agentId=${agentId}&workspaceId=${workspaceId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json() as Promise<ITask[]>;
}