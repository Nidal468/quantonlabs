import connectMongo from "@/db/mongoose";
import { getUser } from "@/lib/hook/auth";
import { Agent } from "@/model/agent";
import { NextRequest, NextResponse } from "next/server";

// GET single agent
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

    const agent = await Agent.findOne({ id: id }).lean();

    if (!agent) {
        return NextResponse.json(
            { error: "Agent not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(agent);
}

// UPDATE agent (partial update)
export async function PATCH(req: NextRequest) {
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

    try {
        const body = await req.json();

        const updated = await Agent.findOneAndUpdate(
            { id: id },
            { $set: body },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json(
                { error: "Agent not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updated);
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || "Failed to update agent" },
            { status: 400 }
        );
    }
}

// DELETE agent
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

    const deleted = await Agent.findOneAndDelete({ id: id });

    if (!deleted) {
        return NextResponse.json(
            { error: "Agent not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true });
}