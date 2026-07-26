import connectMongo from "@/db/mongoose";
import { getUser } from "@/lib/hook/auth";
import { Message } from "@/model/message";
import { cleanAIResponse } from "@/quantonlabs/utils/clean_response";
import { createTask, updateTask } from "@/server/helpers/usetask";
import { OpenRouter } from "@/server/openrouter";
import { agentIds } from "@/type/utls";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { messages, workspaceId, agentId }: {
        messages: {
            role: string;
            content: string;
        }[];
        workspaceId: string,
        agentId: agentIds,
    } = await req.json();

    const user = await getUser();

    if (!user) {
        return NextResponse.json("invalid auth", { status: 500 });
    }

    await connectMongo()

    const userMessage = messages[messages.length - 1];
    const userId = user._id.toString();

    const task1 = await createTask({
        userId: user._id.toString(),
        workspaceId,
        agentId: agentId,
        title: "Session started",
        description: `stream chat requested by ${user._id} from ${workspaceId}`,
        input: `user message ${JSON.stringify(userMessage.content)}`,
        priority: "medium",
        steps: [
            { name: "Save user message", action: "Save", status: "running" },
            { name: "Fetch user conversation", action: "Fetch", status: "pending" },
            { name: "Stream agent response", action: "Stream", status: "pending" },
        ],
    });

    await Message.create({
        userId,
        agentId: agentId,
        workspaceId,
        role: userMessage.role || "user",
        timestamp: new Date(),
        content: userMessage.content,
    });

    await updateTask({
        _id: task1._id.toString(),
        userId,
        workspaceId,
        agentId: agentId,
        priority: "medium",
        status: "running",
        steps: [
            { name: "Save user message", action: "Save", status: "done" },
            { name: "Fetch user conversation", action: "Fetch", status: "running" },
            { name: "Stream agent response", action: "Stream", status: "pending" },
        ],
    });

    const oldMessages = await Message.find({
        userId,
        agentId: agentId,
        workspaceId,
    })
        .sort({ createdAt: -1 })
        .limit(4);

    const context = oldMessages.map(({ role, content }) => ({ role, content }));


    const aiResponse = await OpenRouter({
        config: {
            mode: "chat",
            model: process.env.OPENROUTER_MODEL!,
            max_tokens: 40000,
            stream: false,
            messages: [
                ...context,
                ...messages
            ],
        },
        openRouterKey: process.env.OPENROUTER_API_KEY
    });

    const cleaned = cleanAIResponse(aiResponse.content);

    if (!cleaned) throw new Error("No valid JSON found");

    await updateTask({
        _id: task1._id.toString(),
        userId,
        workspaceId,
        agentId: agentId,
        priority: "medium",
        status: "completed",
        steps: [
            { name: "Save user message", action: "Save", status: "done" },
            { name: "Fetch user conversation", action: "Fetch", status: "done" },
            { name: "Stream agent response", action: "Stream", status: "done" },
        ],
    });

    return NextResponse.json(cleaned)
}