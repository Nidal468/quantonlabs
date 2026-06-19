// /lib/api/task.ts

import { ITask } from "@/model/task";

export async function getTasks() {
  const res = await fetch("/api/task");

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json() as Promise<ITask[]>;
}

export async function createTask(data: Partial<ITask>) {
  const res = await fetch("/api/task", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create task");
  }

  return res.json() as Promise<ITask>;
}

export async function updateTask(id: string, data: Partial<ITask>) {
  const res = await fetch(`/api/task?id=${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update task");
  }

  return res.json() as Promise<ITask>;
}

export async function deleteTask(id: string) {
  const res = await fetch(`/api/task?id=${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete task");
  }

  return res.json();
}
