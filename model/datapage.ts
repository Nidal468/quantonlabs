import mongoose, { Schema, model, Document } from "mongoose";

export interface DataPageDocument extends Document {
  agentId: Schema.Types.ObjectId;
  workspaceId: Schema.Types.ObjectId;
  uploaderId: Schema.Types.ObjectId;

  title: string;
  slug: string;

  content: string;

  type:
    | "note"
    | "memory"
    | "document"
    | "summary"
    | "task"
    | "system";

  tags: string[];

  metadata?: {
    source?: string;
    importance?: number;
  };

  isArchived: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const DataPageSchema = new Schema<DataPageDocument>(
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
      index: true,
    },

    uploaderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "note",
        "memory",
        "document",
        "summary",
        "task",
        "system",
      ],
      default: "note",
    },

    tags: {
      type: [String],
      default: [],
    },

    metadata: {
      source: {
        type: String,
        default: "",
      },

      importance: {
        type: Number,
        min: 0,
        max: 10,
        default: 2,
      },
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// indexes
DataPageSchema.index({ agentId: 1, type: 1 });
DataPageSchema.index({ workspaceId: 1, type: 1 });
DataPageSchema.index({ uploaderId: 1, type: 1 });

// full-text search still fine (optional)
DataPageSchema.index({
  title: "text",
  content: "text",
  tags: "text",
});

export const DataPage =
  mongoose.models.DataPage ||
  model<DataPageDocument>("DataPage", DataPageSchema);