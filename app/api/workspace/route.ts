// /api/workspace

import connectMongo from "@/db/mongoose";
import { getUser } from "@/lib/hook/auth";
import { UserDocument } from "@/model/user";
import { Workspace } from "@/model/workspace";
import { NextRequest, NextResponse } from "next/server";
import "@/model/agent";
import "@/model/user";

export async function GET() {
    await connectMongo();

    const user: UserDocument | null = await getUser();

    if (!user) {
        return NextResponse.json(
            { error: "Invalid authentication" },
            { status: 401 }
        );
    }

    const workspaces = await Workspace.find({
        $or: [
            { ownerId: user._id },
            { "members.id": user._id }
        ]
    }).lean();

    return NextResponse.json(workspaces);
}

export async function POST(req: NextRequest) {
    try {
        await connectMongo();

        const user: UserDocument | null = await getUser();

        if (!user) {
            return NextResponse.json(
                { error: "Invalid authentication" },
                { status: 401 }
            );
        }

        const data = await req.json();

        if (!data.name?.trim()) {
            return NextResponse.json(
                { error: "Workspace name is required" },
                { status: 400 }
            );
        }

        // Create workspace
        const workspace = await Workspace.create({
            name: data.name.trim(),
            ownerId: user._id,
        });

        return NextResponse.json(workspace, {
            status: 201,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}