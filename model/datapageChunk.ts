import mongoose, { Schema, model, Document } from "mongoose";

export interface DataPageChunkDocument extends Document {
  pageId: Schema.Types.ObjectId;

  agentId: Schema.Types.ObjectId;
  workspaceId: Schema.Types.ObjectId;
  uploaderId: Schema.Types.ObjectId;

  chunkIndex: number;

  content: string;

  vector: number[];

  createdAt: Date;
  updatedAt: Date;
}

const DataPageChunkSchema = new Schema<DataPageChunkDocument>(
  {
    pageId: {
      type: Schema.Types.ObjectId,
      ref: "DataPage",
      required: true,
      index: true,
    },

    agentId: {
      type: Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
      index: true,
    },

    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },

    uploaderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    chunkIndex: {
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
    },
  },
  {
    timestamps: true,
  }
);

// Important indexes for RAG + filtering
DataPageChunkSchema.index({ pageId: 1, chunkIndex: 1 });
DataPageChunkSchema.index({ agentId: 1 });
DataPageChunkSchema.index({ workspaceId: 1 });

export const DataPageChunk =
  mongoose.models.DataPageChunk ||
  model<DataPageChunkDocument>("DataPageChunk", DataPageChunkSchema);