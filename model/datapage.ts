import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface DataPageEmbedding {
  index: number;

  content: string;

  vector: number[];

  createdAt: Date;
}

export interface DataPageDocument extends Document {
  agentId: Schema.Types.ObjectId;
  workspaceId: Schema.Types.ObjectId;
  title: string;
  slug: string;

  content: string;

  embeddings: DataPageEmbedding[];

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
    lastAccessedAt?: Date;
  };

  isArchived: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const EmbeddingSchema = new Schema<DataPageEmbedding>(
  {
    index: {
      type: Number,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    vector: {
      type: [Number],
      required: true,
      default: [],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

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
      index: true
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

    embeddings: {
      type: [EmbeddingSchema],
      default: [],
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
        default: 5,
      },

      lastAccessedAt: {
        type: Date,
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

DataPageSchema.index({ agentId: 1, type: 1 });
DataPageSchema.index({ workspaceId: 1, type: 1 });

DataPageSchema.index({
  title: "text",
  content: "text",
  tags: "text",
});

export const DataPage =
  mongoose.models.DataPage ||
  model<DataPageDocument>("DataPage", DataPageSchema);