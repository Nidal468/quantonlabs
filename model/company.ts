import mongoose, { Schema, Document } from "mongoose";

export type CompanyPlan =
  | "standard"
  | "premium"
  | "enterprise";

export type CompanyRole =
  | "member"
  | "developer"
  | "admin";

export interface CompanyMember {
  id: string;
  role: CompanyRole;
}

export interface CompanyAgent {
  id: string;
}

export interface CompanyDocument extends Document {
  name: string;

  ownerId: string;

  agents: CompanyAgent[];

  members: CompanyMember[];

  plan: CompanyPlan;

  tokens: number;

  monthlyTokenLimit: number;
  monthlyTokenUsed: number;

  stripeCustomerId?: string;
  stripeSubscriptionId?: string;

  subscriptionStatus?:
    | "active"
    | "trialing"
    | "past_due"
    | "canceled"
    | "unpaid"
    | "incomplete"
    | "incomplete_expired";

  trialEndsAt?: Date;
  subscriptionEndsAt?: Date;
}

const CompanySchema = new Schema<CompanyDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    ownerId: {
      type: String,
      required: true,
      index: true,
    },

    agents: {
      type: [
        {
          id: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },

    members: {
      type: [
        {
          id: {
            type: String,
            required: true,
          },

          role: {
            type: String,
            enum: ["member", "developer", "admin"],
            default: "member",
          },
        },
      ],
      default: [],
    },

    plan: {
      type: String,
      enum: ["standard", "premium", "enterprise"],
      default: "standard",
    },

    // Purchased token balance
    tokens: {
      type: Number,
      default: 0,
    },

    // Monthly subscription allowance
    monthlyTokenLimit: {
      type: Number,
      default: 0,
    },

    monthlyTokenUsed: {
      type: Number,
      default: 0,
    },

    // Stripe
    stripeCustomerId: {
      type: String,
      index: true,
    },

    stripeSubscriptionId: {
      type: String,
      index: true,
    },

    subscriptionStatus: {
      type: String,
      enum: [
        "active",
        "trialing",
        "past_due",
        "canceled",
        "unpaid",
        "incomplete",
        "incomplete_expired",
      ],
    },

    trialEndsAt: Date,

    subscriptionEndsAt: Date,
  },
  {
    timestamps: true,
  }
);

export const Company =
  mongoose.models.Company ||
  mongoose.model<CompanyDocument>(
    "Company",
    CompanySchema
  );