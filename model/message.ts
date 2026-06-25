// lib/models/message.ts

import { Document, model, models, Schema } from "mongoose";

export interface IMessage extends Document {
    agentId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    workspaceId: Schema.Types.ObjectId;

    role: "user" | "assistant" | "system";

    content: string;

    // Optional reasoning trace (for agent transparency / debugging / evals)
    reasoning?: string;

    // Tool calls made by the agent (function calling / tool use)
    toolCalls: {
        id: string;
        type: string;
        function: {
            name: string;
            arguments: string;
        };
        status: "pending" | "completed" | "error" | "running";
    }[];

    // Optional structured metadata for observability / analytics
    metadata?: {
        model?: string;
        latencyMs?: number;
        tokensUsed?: number;
        error?: string;
    };

    timestamp: Date;
}

const ToolCallSchema = new Schema(
    {
        id: { type: String, required: true },
        type: { type: String, required: true },
        function: {
            name: { type: String, required: true },
            arguments: { type: String, required: true },
        },
        status: { type: String, enum: ["pending", "completed", "error", "running"] }
    },
    { _id: false }
);

const MessageSchema = new Schema<IMessage>(
    {
        agentId: {
            type: Schema.Types.ObjectId,
            ref: "Agent",
            required: true,
            index: true,
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        workspaceId: {
            type: Schema.Types.ObjectId,
            ref: "Workspace",
            required: true,
            index: true,
        },

        role: {
            type: String,
            enum: ["user", "assistant", "system"],
            required: true,
            index: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
        },

        reasoning: {
            type: String,
            default: null,
        },

        toolCalls: {
            type: [ToolCallSchema],
            default: [],
        },

        metadata: {
            model: String,
            latencyMs: Number,
            tokensUsed: Number,
            error: String,
        },

        timestamp: {
            type: Date,
            default: Date.now,
            index: true,
        },
    },
    {
        timestamps: true, // adds createdAt + updatedAt automatically
        versionKey: false,
    }
);

// Indexing strategy for AI chat workloads
MessageSchema.index({ workspaceId: 1, agentId: 1, timestamp: -1 });
MessageSchema.index({ userId: 1, timestamp: -1 });

export const Message =
    models.Message || model<IMessage>("Message", MessageSchema);