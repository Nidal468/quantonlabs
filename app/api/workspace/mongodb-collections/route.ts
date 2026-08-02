// app/api/workspace/mongodb-collections/route.ts

import { NextRequest, NextResponse } from "next/server";
import mongoose, { Connection } from "mongoose";
import { getUser } from "@/lib/hook/auth";
import { Workspace } from "@/model/workspace";
import connectMongo from "@/db/mongoose";

export async function GET(req: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("id");

    if (!workspaceId) {
      return NextResponse.json(
        { error: "Workspace ID is required" },
        { status: 400 }
      );
    }

    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Invalid authentication" },
        { status: 401 }
      );
    }

    // Find workspace
    let workspace;
    if (user.role === "admin") {
      workspace = await Workspace.findById(workspaceId);
    } else {
      workspace = await Workspace.findOne({
        _id: workspaceId,
        ownerId: user._id,
      });
    }

    if (!workspace) {
      return NextResponse.json(
        { error: "Workspace not found" },
        { status: 404 }
      );
    }

    // Check if MongoDB connection is configured
    const mongoKey = workspace.config?.mongodb?.key;
    if (!mongoKey) {
      return NextResponse.json(
        { error: "MongoDB connection not configured", collections: [] },
        { status: 200 }
      );
    }

    // Connect to user's MongoDB and fetch collections
    let userConnection: Connection | null = null;
    try {
      userConnection = await mongoose.createConnection(mongoKey, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
      }).asPromise();

      const db = userConnection.db;
      if (!db) {
        await userConnection.close();
        return NextResponse.json(
          { error: "Failed to access database", collections: [] },
          { status: 200 }
        );
      }
      const collections = await db.listCollections().toArray();

      // Close the connection
      await userConnection.close();

      return NextResponse.json({
        success: true,
        collections: collections.map((c: { name: string }) => c.name),
      });
    } catch (dbError) {
      if (userConnection) {
        await userConnection.close();
      }
      console.error("MongoDB connection error:", dbError);
      return NextResponse.json(
        { error: "Failed to connect to MongoDB", collections: [] },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error", collections: [] },
      { status: 500 }
    );
  }
}