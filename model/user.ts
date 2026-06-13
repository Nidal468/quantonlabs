import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;

  avatarUrl?: string;

  country?: string;

  companies: { id: string }[];

  // Stripe
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

  currentPlan?: string;

  trialEndsAt?: Date;
  subscriptionEndsAt?: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
    },

    avatarUrl: String,

    country: String,

    companies: {
      type: [{ id: String }],
      default: [],
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

    currentPlan: {
      type: String,
    },

    trialEndsAt: Date,

    subscriptionEndsAt: Date,
  },
  {
    timestamps: true,
  }
);

export const User =
  mongoose.models.User ||
  mongoose.model<UserDocument>("User", UserSchema);