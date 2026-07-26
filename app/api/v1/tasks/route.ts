import { getUser } from "@/lib/hook/auth";
import { Agent } from "@/model/agent";
import { Task } from "@/model/task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const user = await getUser();
    const agentId = searchParams.get("agentId");
    const workspaceId = searchParams.get("workspaceId");

    if (!user) {
        return NextResponse.json(
            { error: "Invalid authentication" },
            { status: 401 }
        );
    }

    if (!workspaceId) {
        return NextResponse.json(
            { error: "Missing required field: workspaceId" },
            { status: 400 }
        );
    }

    // Build query filter
    const queryFilter: any = { workspaceId: workspaceId };

    // If agentId is provided, validate it and add to query
    if (agentId) {
        let selectedAgent = await Agent.findOne({ id: agentId });

        if (!selectedAgent) {
            selectedAgent = await Agent.findById(agentId);
        }

        if (!selectedAgent) {
            return NextResponse.json(
                { error: "Invalid agent" },
                { status: 400 }
            );
        }

        queryFilter.agentId = selectedAgent._id;
    }

    const tasks = await Task.find(queryFilter);

    return NextResponse.json(tasks);
}
