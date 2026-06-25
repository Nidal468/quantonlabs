import mongoose, { Schema, model, models, Document } from "mongoose";

export const AGENT_IDS = [
    "marketing",
    "sales",
    "cx",
    "people",
    "operations",
    "inventory",
    "finance",
    "governing",
] as const;

export const AGENT_DOMAINS = [
    "Growth",
    "Operations + Growth",
    "Operations",
    "Strategy",
] as const;

export type AgentId = (typeof AGENT_IDS)[number];
export type AgentDomain = (typeof AGENT_DOMAINS)[number];

export interface AgentDocument extends Document {
    id: AgentId;
    name: string;
    domain: AgentDomain;
    description: string;
    tags: string[];
    capabilities: string[];

    database: {
        id: Schema.Types.ObjectId;
        name: string;
        workspaceId: Schema.Types.ObjectId;
        keywords: string[];
    }[];

    permissions: {
        id: string;
    }[];
    icon: "Megaphone" | "TrendingUp" | "Headphones" | "UsersRound" | "LayoutGrid" | "Package" | "DollarSign" | "Brain";
    createdAt: Date;
    updatedAt: Date;
}

const AgentSchema = new Schema<AgentDocument>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
            enum: AGENT_IDS,
            index: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        domain: {
            type: String,
            required: true,
            enum: AGENT_DOMAINS,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        tags: {
            type: [String],
            default: [],
        },

        icon: {
            type: String,
            required: true,
            enum: [
                "Megaphone",
                "TrendingUp",
                "Headphones",
                "UsersRound",
                "LayoutGrid",
                "Package",
                "DollarSign",
                "Brain",
            ],
        },

        capabilities: {
            type: [String],
            default: [],
        },

        database: [
            {
                id: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: "DataPage",
                    index: true
                },

                name: {
                    type: String,
                    required: true,
                    trim: true,
                },

                keywords: {
                    type: [String],
                    default: [],
                },
                workspaceId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: "Workspace",
                    index: true
                }
            },
        ],

        permissions: [
            {
                id: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

AgentSchema.index({ "database.id": 1, type: 1 });
AgentSchema.index({ "database.workspaceId": 1, type: 1 });

export const Agent = models.Agent || model<AgentDocument>("Agent", AgentSchema);