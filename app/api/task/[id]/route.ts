// /api/task/[id]/route.ts

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

    if (!id) {
        return NextResponse.json(
            { error: "Task ID is required" },
            { status: 400 }
        );
    }

    try {
        const task = await Task.findOne({ _id: id, userId: user._id })
            .lean()
            .populate({ path: "agentId", select: "name" })
            .populate({ path: "workspaceId", select: "name" })
            .populate({ path: "userId", select: "name email" });

        if (!task) {
            return NextResponse.json(
                { error: "Resource not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(task);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PATCH(req: NextRequest) {
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

    if (!id) {
        return NextResponse.json(
            { error: "Task ID is required" },
            { status: 400 }
        );
    }

    try {
        const data = await req.json();
        const document = await Task.findOne({ _id: id, userId: user._id });

        if (!document) {
            return NextResponse.json(
                { error: "Resource not found" },
                { status: 404 }
            );
        }

        if (typeof data.title === "string") document.title = data.title.trim();
        if (typeof data.description === "string") document.description = data.description.trim();
        if (data.status) document.status = data.status;
        if (data.priority) document.priority = data.priority;
        if (typeof data.retryCount === "number") document.retryCount = data.retryCount;
        if (typeof data.maxRetries === "number") document.maxRetries = data.maxRetries;
        if (data.scheduledFor) document.scheduledFor = new Date(data.scheduledFor);
        if (data.startedAt) document.startedAt = new Date(data.startedAt);
        if (data.completedAt) document.completedAt = new Date(data.completedAt);
        if (typeof data.error === "string") document.error = data.error.trim();

        if (data.input) document.input = data.input;
        if (data.output) document.output = data.output;

        if (Array.isArray(data.steps)) document.steps = data.steps;
        if (Array.isArray(data.toolsUsed)) document.toolsUsed = data.toolsUsed;

        await document.save();
        return NextResponse.json(document);
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
    const user = await getUser();

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
            { error: "Task ID is required" },
            { status: 400 }
        );
    }

    try {
        const document = await Task.findOneAndDelete({ _id: id, userId: user._id });

        if (!document) {
            return NextResponse.json(
                { error: "Resource not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
