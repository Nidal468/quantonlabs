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

// Game-like stat interfaces for agent skills
export interface SkillStats {
    speed: number;        // 0-100, how fast the skill executes
    accuracy: number;     // 0-100, precision of output
    tokenEfficiency: number; // 0-100, resource efficiency
    power: number;        // 0-100, overall impact strength
}

export interface DomainModifier {
    domain: AgentDomain;
    value: number;        // positive = buff, negative = debuff
}

export interface AgentSkillDocument extends Document {
    id: AgentId;
    name: string;
    domain: AgentDomain;
    description: string;
    capabilities: string[];
    icon: string;
    stats: SkillStats;
    buffs: DomainModifier[];
    debuffs: DomainModifier[];
    cost: number;         // 1-10, resource cost to activate
    createdAt: Date;
    updatedAt: Date;
}

const AgentSkillSchema = new Schema<AgentSkillDocument>(
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

        icon: {
            type: String,
            required: true,    
        },

        capabilities: {
            type: [String],
            default: [],
        },

        stats: {
            speed: {
                type: Number,
                required: true,
                min: 0,
                max: 100,
            },
            accuracy: {
                type: Number,
                required: true,
                min: 0,
                max: 100,
            },
            tokenEfficiency: {
                type: Number,
                required: true,
                min: 0,
                max: 100,
            },
            power: {
                type: Number,
                required: true,
                min: 0,
                max: 100,
            },
        },

        buffs: {
            type: [
                {
                    domain: { type: String, enum: AGENT_DOMAINS },
                    value: { type: Number, required: true },
                }
            ],
            default: [],
        },

        debuffs: {
            type: [
                {
                    domain: { type: String, enum: AGENT_DOMAINS },
                    value: { type: Number, required: true },
                }
            ],
            default: [],
        },

        cost: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
        },
    },
    {
        timestamps: true,
    }
);

export const Agent = models.Agent || model<AgentSkillDocument>("Agent", AgentSkillSchema);