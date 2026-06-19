// /api/datapage/[id]/route.ts

import connectMongo from "@/db/mongoose";
import { getUser } from "@/lib/hook/auth";
import { UserDocument } from "@/model/user";
import { NextRequest, NextResponse } from "next/server";
import { DataPage, DataPageDocument } from "@/model/datapage";

export async function GET(req: NextRequest) {
  await connectMongo();
  const user: UserDocument | null = await getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Invalid authentication" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 }
    );
  }

  const document = await DataPage.findById(id)
    .populate([
      { path: "agentId", select: "name email" },
      { path: "workspaceId", select: "name" },
      { path: "uploaderId", select: "name email avatar" },
    ])
    .lean();

  if (!document) {
    return NextResponse.json(
      { error: "Resource not found" },
      { status: 404 }
    );
  }

  if (document.uploaderId.toString() !== user._id.toString()) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 403 }
    );
  }

  return NextResponse.json(document);
}

export async function PATCH(req: NextRequest) {
  await connectMongo();
  const user: UserDocument | null = await getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Invalid authentication" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 }
    );
  }

  try {
    const data = await req.json();
    const document = await DataPage.findOne({ _id: id });

    if (!document) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    if (document.uploaderId.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    if (typeof data.title === "string") {
      document.title = data.title.trim();
    }
    if (typeof data.content === "string") {
      document.content = data.content.trim();
    }
    if (typeof data.type === "string") {
      document.type = data.type;
    }
    if (Array.isArray(data.tags)) {
      document.tags = data.tags;
    }
    if (data.metadata) {
      document.metadata = {
        ...document.metadata,
        ...data.metadata,
      };
    }
    if (typeof data.isArchived === "boolean") {
      document.isArchived = data.isArchived;
    }

    await document.save();

    const updated = await DataPage.findById(document._id)
      .populate([
        { path: "agentId", select: "name email" },
        { path: "workspaceId", select: "name" },
        { path: "uploaderId", select: "name email avatar" },
      ])
      .lean();

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  await connectMongo();
  const user: UserDocument | null = await getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Invalid authentication" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 }
    );
  }

  try {
    const document = await DataPage.findOne({ _id: id });

    if (!document) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    if (document.uploaderId.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    await DataPage.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
