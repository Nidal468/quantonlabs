// model/task.ts

import { Schema, model, Types, Document, models } from "mongoose";

export type TaskStatus =
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "cancelled"
  | "retrying";

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface ITask extends Document {
  agentId: Schema.Types.ObjectId;
  workspaceId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  title: string;
  description?: string;

  status: TaskStatus;
  priority: TaskPriority;

  input?: any;        // raw user request or payload
  output?: any;       // final result from agent

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

  toolsUsed?: {
    name: string;
    input: any;
    output?: any;
    success: boolean;
    timestamp: Date;
  }[];

  error?: string;

  retryCount: number;
  maxRetries: number;

  scheduledFor?: Date;
  startedAt?: Date;
  completedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    agentId: {
      type: Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
      index: true,
    },

    workspaceId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Workspace",
      index: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true
    },

    title: { type: String, required: true },
    description: { type: String },

    status: {
      type: String,
      enum: [
        "queued",
        "running",
        "completed",
        "failed",
        "cancelled",
        "retrying",
      ],
      default: "queued",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },

    input: { type: Schema.Types.Mixed },
    output: { type: Schema.Types.Mixed },

    steps: [
      {
        name: String,
        action: String,
        input: Schema.Types.Mixed,
        output: Schema.Types.Mixed,
        status: {
          type: String,
          enum: ["pending", "running", "done", "failed"],
          default: "pending",
        },
        error: String,
        startedAt: Date,
        finishedAt: Date,
      },
    ],

    toolsUsed: [
      {
        name: String,
        input: Schema.Types.Mixed,
        output: Schema.Types.Mixed,
        success: Boolean,
        timestamp: { type: Date, default: Date.now },
      },
    ],

    error: String,

    retryCount: { type: Number, default: 0 },
    maxRetries: { type: Number, default: 3 },

    scheduledFor: Date,
    startedAt: Date,
    completedAt: Date,
  },
  { timestamps: true }
);

// Indexes for performance
TaskSchema.index({ agentId: 1, status: 1 });
TaskSchema.index({ status: 1, priority: 1 });
TaskSchema.index({ scheduledFor: 1 });
TaskSchema.index({ workspaceId: 1, type: 1 });
TaskSchema.index({ userId: 1, type: 1 });


export const Task = models.Task || model<ITask>("Task", TaskSchema);