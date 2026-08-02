// /api/models/openrouter

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const apiKey = req.headers.get("x-api-key") || req.nextUrl.searchParams.get("key");

        if (!apiKey) {
            return NextResponse.json(
                { error: "API key is required" },
                { status: 400 }
            );
        }

        const res = await fetch("https://openrouter.ai/api/v1/models", {
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            return NextResponse.json(
                { error: `Failed to fetch models: ${errorText}` },
                { status: res.status }
            );
        }

        const data = await res.json();

        // Return models with relevant info
        const models = (data.data || []).map((model: any) => ({
            id: model.id,
            name: model.name,
            description: model.description,
            context_length: model.context_length,
            pricing: {
                prompt: model.pricing?.prompt,
                completion: model.pricing?.completion,
                image: model.pricing?.image,
                request: model.pricing?.request,
            },
            architecture: model.architecture,
        }));

        return NextResponse.json({ models });
    } catch (error) {
        console.error("OpenRouter models error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}