import connectMongo from "@/db/mongoose";
import { getUser } from "@/lib/hook/auth";
import { Workspace } from "@/model/workspace";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

function generateApiKey() {
  const raw = crypto.randomBytes(32).toString("hex");
  return `ak_live_${raw}`;
}

function hashApiKey(key: string) {
  return crypto.createHash("sha256").update(key).digest("hex");
}

async function getAuthorizedWorkspace(req: NextRequest) {
  await connectMongo();

  const { pathname } = new URL(req.url);
  const id = pathname.split("/")[pathname.split("/").length - 1];

  const user = await getUser();

  if (!user) {
    return {
      error: NextResponse.json(
        { error: "Invalid authentication" },
        { status: 401 }
      ),
    };
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return {
      error: NextResponse.json(
        { error: "Invalid workspace id" },
        { status: 400 }
      ),
    };
  }

  const workspace = await Workspace.findOne({
    _id: id,
    $or: [
      { ownerId: user._id },
      // add member permission checks here if needed
    ],
  });

  if (!workspace) {
    return {
      error: NextResponse.json(
        { error: "Workspace not found" },
        { status: 404 }
      ),
    };
  }

  return { workspace, user };
}

export async function POST(req: NextRequest) {
  const result = await getAuthorizedWorkspace(req);
  if ("error" in result) return result.error;

  const { workspace } = result;

  const body = await req.json().catch(() => null);
  const name = body?.name?.trim();

  if (!name) {
    return NextResponse.json(
      { error: "API key name is required" },
      { status: 400 }
    );
  }

  const plainKey = generateApiKey();
  const hashedKey = hashApiKey(plainKey);
  const prefix = plainKey.slice(0, 20);
  const createdAt = new Date();

  workspace.keys.push({
    name,
    prefix,
    hash: hashedKey,
    createdAt,
    lastUsedAt: undefined,
    revokedAt: null,
  });

  await workspace.save();

  return NextResponse.json({
    success: true,
    key: {
      id: workspace.keys[workspace.keys.length - 1]?._id,
      name,
      value: plainKey, // shown only once
      prefix,
      createdAt,
    },
    message:
      "API key created successfully. Save it now because it will not be shown again.",
  });
}

export async function DELETE(req: NextRequest) {
  const result = await getAuthorizedWorkspace(req);
  if ("error" in result) return result.error;

  const { workspace } = result;

  const body = await req.json().catch(() => null);
  const keyId = body?.keyId?.trim();

  if (!keyId) {
    return NextResponse.json(
      { error: "keyId is required" },
      { status: 400 }
    );
  }

  if (!mongoose.Types.ObjectId.isValid(keyId)) {
    return NextResponse.json(
      { error: "Invalid keyId" },
      { status: 400 }
    );
  }

  const existingKey = workspace.keys.find(
    (key: any) => key._id?.toString() === keyId
  );

  if (!existingKey) {
    return NextResponse.json(
      { error: "API key not found" },
      { status: 404 }
    );
  }

  workspace.keys = workspace.keys.filter(
    (key: any) => key._id?.toString() !== keyId
  );

  await workspace.save();

  return NextResponse.json({
    success: true,
    message: "API key deleted successfully",
    deletedKeyId: keyId,
  });
}