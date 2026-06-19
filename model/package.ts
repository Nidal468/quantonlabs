import { Document, Schema, model, models } from "mongoose";

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

export type AgentId = (typeof AGENT_IDS)[number];

export type PackageType = "recurring" | "one_off";

export type BillingCycle =
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly";

export type PackageLevel =
    | "basic"
    | "standard"
    | "premium"
    | "enterprise";

export interface PackageDocument extends Document {
    title: string;
    description: string;

    imageUrl?: string;
    category?: string;

    active: boolean;
    featured: boolean;

    includes: {
        agentId: AgentId;
    }[];

    level: PackageLevel;

    type: PackageType;

    amount: number;

    currency: "USD";

    cycle?: BillingCycle;

    stripeProductId?: string;
    stripePriceId?: string;
    stripeOneTimePriceId?: string;

    badge?: string;
    highlights: string[];

    sortOrder: number;

    createdAt: Date;
    updatedAt: Date;
}

const PackageSchema = new Schema<PackageDocument>(
    {
        // ===== PACKAGE INFO =====
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        imageUrl: {
            type: String,
        },

        category: {
            type: String,
            default: "General",
        },

        active: {
            type: Boolean,
            default: true,
            index: true,
        },

        featured: {
            type: Boolean,
            default: false,
        },

        // ===== ACCESS =====
        includes: [
            {
                agentId: {
                    type: String,
                    enum: AGENT_IDS,
                    required: true,
                },
            },
        ],

        level: {
            type: String,
            enum: ["basic", "standard", "premium", "enterprise"],
            required: true,
            index: true,
        },

        // ===== PRICING =====
        type: {
            type: String,
            enum: ["recurring", "one_off"],
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        currency: {
            type: String,
            enum: ["USD"],
            default: "USD",
        },

        cycle: {
            type: String,
            enum: ["daily", "weekly", "monthly", "yearly"],
        },

        // ===== STRIPE =====
        stripeProductId: {
            type: String,
            index: true,
        },

        stripePriceId: {
            type: String,
            index: true,
        },

        stripeOneTimePriceId: {
            type: String,
            index: true,
        },

        // ===== DISPLAY =====
        badge: {
            type: String,
        },

        highlights: {
            type: [String],
            default: [],
        },

        sortOrder: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const Package =
    models.Package ||
    model<PackageDocument>("Package", PackageSchema);