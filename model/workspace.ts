import mongoose, { Schema, Document } from "mongoose";

export type WorkspacePlan =
  | "standard"
  | "premium"
  | "enterprise";

export type WorkspaceRole =
  | "member"
  | "developer"
  | "admin";

export interface WorkspaceMember {
  id: Schema.Types.ObjectId;
  role: WorkspaceRole;
}

export interface WorkspaceAgent {
  id: Schema.Types.ObjectId;
  status: boolean;
}

export interface WorkspaceDocument extends Document {
  name: string;

  ownerId: Schema.Types.ObjectId;

  agents: WorkspaceAgent[];

  members: WorkspaceMember[];

  plan: WorkspacePlan;

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

  config: {
    openrouter?: {
      status: "active" | "inactive";
      key: string;
    };
    elevenlabs?: {
      status: "active" | "inactive";
      key: string;
    };
    mongodb?: {
      status: "active" | "inactive";
      key: string;
    };
  };

  keys: {
    _id: string,
    name: string,
    prefix: string,
    hash: string,
    createdAt: Date,
    lastUsedAt: Date,
    revokedAt: Date,
  }[];

  createdAt: Date;
  updatedAt: Date;
}

const ProviderConfigSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    key: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const ConfigSchema = new Schema(
  {
    openrouter: {
      type: ProviderConfigSchema,
      default: () => ({}),
    },

    elevenlabs: {
      type: ProviderConfigSchema,
      default: () => ({}),
    },

    mongodb: {
      type: ProviderConfigSchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

const WorkspaceSchema = new Schema<WorkspaceDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "User"
    },

    agents: {
      type: [
        {
          id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Agent"
          },
          status: {
            type: Boolean,
            default: false
          }
        },
      ],
      default: [],
    },

    members: {
      type: [
        {
          id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
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

    config: {
      type: ConfigSchema,
      default: () => ({}),
    },
    keys: {
      type: [
        {
          name: { type: String, required: true },
          prefix: { type: String, required: true },
          hash: { type: String, required: true },
          createdAt: { type: Date, default: Date.now },
          lastUsedAt: { type: Date, default: null },
          revokedAt: { type: Date, default: null },
        },
      ],
      default: [],
      _id: true
    },
  },
  {
    timestamps: true,
  }
);

WorkspaceSchema.index({ "members.id": 1 });
WorkspaceSchema.index({ "agents.id": 1 });
WorkspaceSchema.index({ ownerId: 1 });

export const Workspace =
  mongoose.models.Workspace ||
  mongoose.model<WorkspaceDocument>(
    "Workspace",
    WorkspaceSchema
  );