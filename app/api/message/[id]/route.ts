import connectMongo from "@/db/mongoose";
import { getUser } from "@/lib/hook/auth";
import { UserDocument } from "@/model/user";
import { Message } from "@/model/message";
import { NextRequest, NextResponse } from "next/server";

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

  const message = await Message.findById(id)
    .populate({ path: "agentId", select: "name avatar" })
    .populate({ path: "userId", select: "name email avatar" })
    .populate({ path: "workspaceId", select: "name" });

  if (!message) {
    return NextResponse.json(
      { error: "Resource not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(message);
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
    const message = await Message.findById(id);

    if (!message) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    if (message.userId.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    if (typeof data.role === "string") {
      message.role = data.role;
    }
    if (typeof data.content === "string") {
      message.content = data.content.trim();
    }
    if (typeof data.reasoning === "string") {
      message.reasoning = data.reasoning;
    }
    if (Array.isArray(data.toolCalls)) {
      message.toolCalls = data.toolCalls;
    }
    if (typeof data.metadata === "object" && data.metadata !== null) {
      message.metadata = { ...message.metadata, ...data.metadata };
    }

    await message.save();
    return NextResponse.json(message);
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
    const message = await Message.findById(id);

    if (!message) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    if (message.userId.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    await Message.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
