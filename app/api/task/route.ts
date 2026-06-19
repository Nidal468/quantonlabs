// /api/task/route.ts

import connectMongo from "@/db/mongoose";
import { getUser } from "@/lib/hook/auth";
import { Task } from "@/model/task";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await connectMongo();
    const user = await getUser();

    if (!user) {
        return NextResponse.json(
            { error: "Invalid authentication" },
            { status: 401 }
        );
    }

    try {
        const tasks = await Task.find({ userId: user._id })
            .lean()
            .populate({ path: "agentId", select: "name" })
            .populate({ path: "workspaceId", select: "name" })
            .populate({ path: "userId", select: "name email" })
            .sort({ createdAt: -1 });

        return NextResponse.json(tasks);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    await connectMongo();
    const user = await getUser();

    if (!user) {
        return NextResponse.json(
            { error: "Invalid authentication" },
            { status: 401 }
        );
    }

    try {
        const data = await req.json();

        if (!data.agentId || !data.workspaceId || !data.userId || !data.title) {
            return NextResponse.json(
                { error: "Missing required fields: agentId, workspaceId, userId, title" },
                { status: 400 }
            );
        }

        const task = await Task.create({
            ...data,
            userId: user._id,
        });

        return NextResponse.json(task, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
