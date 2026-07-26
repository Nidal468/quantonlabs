import { Task, TaskStatus } from "@/model/task";
import { agentIds } from "@/type/utls";

export async function createTask({ userId, workspaceId, agentId, title, description, input, priority, steps, scheduledFor }: {
    userId: string;
    workspaceId: string;
    agentId: agentIds;
    title: string;
    description?: string;
    input?: any;
    priority?: "low" | "medium" | "high" | "urgent";
    steps?: {
        name: string;
        action: string;
        input?: any;
        output?: any;
        status: "pending" | "running" | "done" | "failed";
        error?: string;
        startedAt?: Date;
        finishedAt?: Date;
    }[];
    scheduledFor?: Date;
}) {
    const task = await Task.create({
        userId,
        agentId: agentId,
        workspaceId: workspaceId,
        title,
        description,
        input,
        priority: priority || "medium",
        steps,
        scheduledFor,
        status: "queued",
        retryCount: 0,
        maxRetries: 3,
    });

    return task
}

export async function updateTask({ _id, userId, status, workspaceId, agentId, priority, steps, scheduledFor }: {
    _id: string;
    userId: string;
    workspaceId: string;
    agentId: agentIds;
    priority?: "low" | "medium" | "high" | "urgent";
    status: TaskStatus,
    steps?: {
        name: string;
        action: string;
        input?: any;
        output?: any;
        status: "pending" | "running" | "done" | "failed";
        error?: string;
        startedAt?: Date;
        finishedAt?: Date;
    }[];
    scheduledFor?: Date;
}) {
    const task = await Task.findByIdAndUpdate(_id, {
        userId,
        agentId: agentId,
        workspaceId: workspaceId,
        priority: priority || "medium",
        steps,
        scheduledFor,
        status: status,
        retryCount: 0,
        maxRetries: 3,
    });

    return task
}