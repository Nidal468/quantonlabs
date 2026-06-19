// /api/workspace/task/route.ts

import connectMongo from "@/db/mongoose";
import { getUser } from "@/lib/hook/auth";
import { Task } from "@/model/task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await connectMongo();
    const user = await getUser();

    if (!user) {
        return NextResponse.json(
            { error: "Invalid authentication" },
            { status: 401 }
        );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        const tasks = await Task.find({ workspaceId: id })
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
