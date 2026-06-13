import connectMongo from "@/db/mongoose";
import { getUser } from "@/lib/hook/auth";
import { Agent } from "@/model/agent";
import { NextResponse } from "next/server";

// GET all agents
export async function GET() {
    await connectMongo();

    const user = await getUser();
    if (!user) {
        return NextResponse.json(
            { error: "Invalid authentication" },
            { status: 401 }
        );
    }

    const agents = await Agent.find().lean();

    return NextResponse.json(agents);
}

// CREATE new agent
export async function POST(req: Request) {
    await connectMongo();

    const user = await getUser();
    if (!user) {
        return NextResponse.json(
            { error: "Invalid authentication" },
            { status: 401 }
        );
    }

    try {
        const body = await req.json();

        const agent = await Agent.create(body);

        return NextResponse.json(agent, { status: 201 });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || "Failed to create agent" },
            { status: 400 }
        );
    }
}