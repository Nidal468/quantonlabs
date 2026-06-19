import connectMongo from "@/db/mongoose";
import { useQuery } from "@/lib/hook/useQuery";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectMongo();

        const { searchParams } = new URL(req.url);

        const agentId = searchParams.get("agentId");
        const queryText = searchParams.get("query");
        const workspaceId = searchParams.get("workspaceId") as string;

        if (!agentId || !queryText) {
            return NextResponse.json(
                { error: "agentId and query are required" },
                { status: 400 }
            );
        }

        const results = await useQuery({ agentId, queryText, workspaceId })

        return NextResponse.json({
            results: results.slice(0, 10),
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Vector search failed" },
            { status: 500 }
        );
    }
}