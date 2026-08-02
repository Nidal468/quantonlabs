// /api/models/lmstudio

import { NextResponse } from "next/server";

export async function GET() {
    try {
        // LMStudio runs locally, no API key needed
        const res = await fetch("http://localhost:1234/v1/models", {
            headers: {
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
            name: model.id, // LMStudio uses id as name
            object: model.object,
            owned_by: model.owned_by,
        }));

        return NextResponse.json({ models });
    } catch (error) {
        console.error("LMStudio models error:", error);
        return NextResponse.json(
            { error: "Failed to connect to LMStudio. Make sure it's running on localhost:1234" },
            { status: 500 }
        );
    }
}