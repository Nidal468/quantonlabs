// /api/workspace/[id]

import connectMongo from "@/db/mongoose";
import { getUser } from "@/lib/hook/auth";
import { UserDocument } from "@/model/user";
import { Workspace } from "@/model/workspace";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const user = await getUser();

    if (!user) {
        return NextResponse.json(
            { error: "Invalid authentication" },
            { status: 401 }
        );
    }

    const workspace = await Workspace.findOne({
        _id: id,
        $or: [
            { ownerId: user._id },
            { "members.id": user._id }
        ]
    });

    if (!workspace) {
        return NextResponse.json(
            { error: "Workspace not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(workspace);
}

export async function DELETE(req: NextRequest) {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const user = await getUser();

    if (!user) {
        return NextResponse.json(
            { error: "Invalid authentication" },
            { status: 401 }
        );
    }

    const workspace = await Workspace.findOneAndDelete({
        _id: id,
        ownerId: user._id,
    });

    if (!workspace) {
        return NextResponse.json(
            { error: "Workspace not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({
        success: true,
    });
}

export async function PATCH(req: NextRequest) {
    try {
        await connectMongo();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const user: UserDocument | null = await getUser();

        if (!user) {
            return NextResponse.json(
                { error: "Invalid authentication" },
                { status: 401 }
            );
        }

        const data = await req.json();

        const workspace = await Workspace.findOne({
            _id: id,
            ownerId: user._id,
        });

        if (!workspace) {
            return NextResponse.json(
                { error: "Workspace not found" },
                { status: 404 }
            );
        }

        // Update only allowed fields
        if (typeof data.name === "string") {
            workspace.name = data.name.trim();
        }

        if (data.plan) {
            workspace.plan = data.plan;
        }

        if (data.config) {
            workspace.config = {
                ...workspace.config,
                ...data.config,
            };
        }

        await workspace.save();

        return NextResponse.json(workspace);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}