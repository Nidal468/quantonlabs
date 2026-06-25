import { NextResponse } from "next/server";
import connectMongo from "@/db/mongoose";
import { Agent } from "@/model/agent";

export async function POST(req: Request) {
    try {
        await connectMongo();

        const body = await req.json();

        // Validate input
        if (!body.agents || !Array.isArray(body.agents)) {
            return NextResponse.json(
                { message: "Invalid payload. 'agents' array is required." },
                { status: 400 }
            );
        }

        // Optional: basic validation per agent
        const validAgents = body.agents.filter((agent: any) =>
            agent.title && agent.category && agent.type
        );

        if (validAgents.length === 0) {
            return NextResponse.json(
                { message: "No valid agents to insert." },
                { status: 400 }
            );
        }

        const enrichedAgents = validAgents.map((agent: any) => ({
            ...agent,
            status: "idle"
        }));

        // Insert into DB
        const inserted = await Agent.insertMany(enrichedAgents, {
            ordered: false,
        });

        return NextResponse.json(
            {
                success: true,
                count: inserted.length,
                data: inserted,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Agent insert error:", error);

        return NextResponse.json(
            {
                message: "Server error",
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectMongo();

        const agents = await Agent.find();

        return NextResponse.json({
            success: true,
            data: agents,
        });
    } catch (error: any) {
        console.error("Agent fetch error:", error);

        return NextResponse.json(
            {
                message: "Server error",
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    try {
        await connectMongo();

        const body = await req.json();

        if (!body.id || !body.updateData) {
            return NextResponse.json(
                { message: "Invalid payload. 'id' and 'updateData' are required." },
                { status: 400 }
            );
        }

        const updatedAgent = await Agent.findByIdAndUpdate(
            body.id,
            body.updateData,
            { new: true, runValidators: true }
        );

        if (!updatedAgent) {
            return NextResponse.json(
                { message: "Agent not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: updatedAgent,
        });
    } catch (error: any) {
        console.error("Agent update error:", error);

        return NextResponse.json(
            {
                message: "Server error",
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        await connectMongo();

        const body = await req.json();

        if (!body.id) {
            return NextResponse.json(
                { message: "Invalid payload. 'id' is required." },
                { status: 400 }
            );
        }

        const deletedAgent = await Agent.findByIdAndDelete(body.id);

        if (!deletedAgent) {
            return NextResponse.json(
                { message: "Agent not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Agent deleted successfully",
        });
    } catch (error: any) {
        console.error("Agent delete error:", error);

        return NextResponse.json(
            {
                message: "Server error",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
