import { cleanAIResponse } from "@/quantonlabs/utils/clean_response";
import { OpenRouter } from "@/server/openrouter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { messages }: {
        messages: {
            role: string;
            content: string;
        }[]
    } = await req.json();

    const aiResponse = await OpenRouter({
        config: {
            mode: "chat",
            model: process.env.OPENROUTER_MODEL!,
            max_tokens: 40000,
            stream: false,
            messages: messages,
        },
        openRouterKey: process.env.OPENROUTER_API_KEY
    });

    const cleaned = cleanAIResponse(aiResponse.content);

    if (!cleaned) throw new Error("No valid JSON found");

    return NextResponse.json(cleaned)
}