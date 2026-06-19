import connectMongo from "@/db/mongoose";
import { getUser } from "@/lib/hook/auth";
import { UserDocument } from "@/model/user";
import { Message } from "@/model/message";
import { NextRequest, NextResponse } from "next/server";
import { Agent, AgentDocument } from "@/model/agent";
import { OpenRouter } from "@/server/openrouter";
import { extractToolCall } from "@/lib/toolCallParser";
import { useQuery } from "@/lib/hook/useQuery";
import { Workspace, WorkspaceDocument } from "@/model/workspace";

export async function GET(req: NextRequest) {
    await connectMongo();
    const user: UserDocument | null = await getUser();

    if (!user) {
        return NextResponse.json({ error: "Invalid authentication" }, { status: 401 });
    };

    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    const agentId = searchParams.get("agentId");

    const messages = await Message.find({ userId: user._id, workspaceId, agentId })
        .lean()
        .populate({ path: "agentId", select: "name avatar" })
        .populate({ path: "userId", select: "name email avatar" })
        .populate({ path: "workspaceId", select: "name" })
        .sort({ timestamp: -1 });

    return NextResponse.json(messages);
}

type Data = {
    agentId: string;
    workspaceId: string;
    role: "user" | "assistant" | "system";
    content: string;
    context: {
        role: "user" | "assistant" | "system";
        content: string;
    }[];
};

export async function POST(req: NextRequest) {
    await connectMongo();
    const user: UserDocument | null = await getUser();

    if (!user) {
        return NextResponse.json({ error: "Invalid authentication" }, { status: 401 });
    }

    try {
        const data: Data = await req.json();

        if (!data.agentId || !data.workspaceId || !data.role || !data.content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 1. Save user message immediately
        await Message.create({
            userId: user._id,
            agentId: data.agentId,
            workspaceId: data.workspaceId,
            role: data.role,
            timestamp: new Date(),
            content: data.content,
        });

        // 2. Get the streaming response
        const stream = await handleCallAgent({
            agentId: data.agentId,
            message: { role: data.role, content: data.content },
            userId: user._id.toString(),
            workspaceId: data.workspaceId,
            context: JSON.stringify(data.context)
        });

        // 3. Return stream with proper SSE headers
        return new NextResponse(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Transfer-Encoding": "chunked",
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

const handleCallAgent = async ({
    agentId,
    message,
    userId,
    workspaceId,
    context
}: {
    agentId: string;
    message: { role: "user" | "assistant" | "system"; content: string };
    userId: string;
    workspaceId: string;
    context: string;
}) => {
    const selectedAgent: AgentDocument | null = await Agent.findById(agentId);

    if (!selectedAgent) {
        throw new Error("Agent not found");
    }

    const systemPrompt = `
You are ${selectedAgent.name}.

Domain:
${selectedAgent.domain}

Description:
${selectedAgent.description}

Capabilities:
${selectedAgent.capabilities.join(", ")}

Context:
${context.slice(-600)}

You may use tools when needed to retrieve external or internal knowledge. for example is the user requests you for some kind of data but you dont know so then you can call any tool you think will help

Always prefer calling tools instead of guessing when information is missing or uncertain.
`;

    let messages: any[] = [
        { role: "system", content: systemPrompt },
        { role: message.role, content: message.content },
    ];

    const MAX_ITERATIONS = 3;
    let knowledgeContext: {
        chunkIndex: number;
        content: string;
    }[] = [];

    const selectedWorkspace: WorkspaceDocument | null = await Workspace.findById(workspaceId);

    if (!selectedWorkspace) {
        throw new Error("Workspace not found");
    }

    const openrouterkey = selectedWorkspace.config.openrouter?.key;
    // Tool calling loop (non-streaming)
    for (let i = 0; i < MAX_ITERATIONS; i++) {
        const response = await OpenRouter({
            config: {
                mode: "chat",
                model: openrouterkey
                    ? process.env.OPENROUTER_MODEL!
                    : "openai/gpt-5-mini",

                stream: false,
                max_tokens: 2000,
                messages,

                tools: [
                    {
                        type: "function",
                        function: {
                            name: "search_knowledge",
                            description: "Search internal knowledge base",
                            parameters: {
                                type: "object",
                                properties: {
                                    query: { type: "string" }
                                },
                                required: ["query"]
                            }
                        }
                    }
                ],

                tool_choice: "auto"
            },
            openRouterKey: openrouterkey
        });

        const message = response;
        console.log(message)
        // 1. If tool call exists → execute tool
        if (message?.tool_calls?.length) {
            const toolCall = message.tool_calls[0];

            if (toolCall.function.name === "search_knowledge") {
                const args = JSON.parse(toolCall.function.arguments);

                const results = await useQuery({
                    agentId,
                    workspaceId,
                    queryText: args.query,
                });
                
                knowledgeContext.push(...results);

                // IMPORTANT: send tool result back to model
                messages.push(message);

                messages.push({
                    role: "tool",
                    tool_call_id: toolCall.id,
                    content: JSON.stringify(results),
                });

                continue;
            }
        }

        // 2. No tool call → final answer
        messages.push(message);
        break;
    }

    // Prepare final streaming prompt
    const finalMessages = [
        {
            role: "system",
            content: `You are an AI agent your task is to help the user.

                You are ${selectedAgent.name}.

                Domain:
                ${selectedAgent.domain}

                Description:
                ${selectedAgent.description}

                Capabilities:
                ${selectedAgent.capabilities.join(", ")}

                previous messages context: ${context}

                
                Your personality is cold and calculating and you follow reason and logic.
                Always answer in a professional and business style.
                If tools are called then the data from them will be provided to you and if they cant find anything then you will be informed and can just tell the user you didnt find anything or couldnt do it or cant do it
                Just provide the user with a satisfying answer with data that has been provided to you.`,
        },
        { role: message.role, content: message.content },
    ];

    if (knowledgeContext.length > 0) {
        finalMessages.push({
            role: "system",
            content: `Knowledge Context (from vector DB) provided by tool call search_knowledge: ${JSON.stringify(knowledgeContext)}\nUse this context if relevant. Ignore if not useful.`,
        });
    } else {
        finalMessages.push({
            role: "system",
            content: `Tool call search result: Could not find anything related inside the vector database`,
        });
    }

    // Get the raw SSE stream from OpenRouter
    const openRouterStream = await OpenRouter({
        config: {
            mode: "chat",
            model: openrouterkey ? process.env.OPENROUTER_MODEL! : "openai/gpt-oss-20b",
            stream: true,
            max_tokens: 40000,
            messages: finalMessages,
        },
        openRouterKey: openrouterkey
    });

    // Wrap stream to parse SSE, accumulate content/reasoning, and forward exactly
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    let buffer = "";
    let fullResponse = "";
    let fullReasoning = "";
    let isDone = false;

    return new ReadableStream({
        start(controller) {
            const reader = openRouterStream.getReader();
            (async () => {
                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) {
                            isDone = true;
                            break;
                        }
                        buffer += decoder.decode(value, { stream: true });

                        // Split by newline, keep incomplete line in buffer
                        const lines = buffer.split("\n");
                        buffer = lines.pop() || "";

                        for (const line of lines) {
                            if (!line.startsWith("data: ")) continue;

                            const payload = line.slice(6);

                            // Forward exact line to frontend
                            controller.enqueue(encoder.encode(line + "\n"));

                            if (payload.trim() === "[DONE]") {
                                isDone = true;
                                continue;
                            }

                            try {
                                const chunk = JSON.parse(payload);
                                const delta = chunk.choices?.[0]?.delta;

                                if (delta?.content) fullResponse += delta.content;
                                if (delta?.reasoning) fullReasoning += delta.reasoning;
                            } catch {
                                // Ignore malformed JSON chunks
                            }
                        }
                    }
                } finally {
                    // Handle last incomplete line if stream ends without newline


                    if (buffer.startsWith("data: ")) {
                        const payload = buffer.slice(6);
                        controller.enqueue(encoder.encode(buffer + "\n"));
                        if (payload.trim() !== "[DONE]") {
                            try {
                                const chunk = JSON.parse(payload);
                                const delta = chunk.choices?.[0]?.delta;
                                if (delta?.content) fullResponse += delta.content;
                                if (delta?.reasoning) {
                                    fullReasoning += delta.reasoning
                                };
                            } catch { }
                        }
                    }

                    // Save complete response to DB only after stream finishes


                    await Message.create({
                        userId,
                        agentId,
                        workspaceId,
                        role: "assistant",
                        timestamp: new Date(),
                        content: fullResponse,
                        reasoning: fullReasoning
                    });

                    controller.close();
                }
            })();
        },
        cancel() {
            // Optional: handle client disconnect gracefully
        },
    });
};
