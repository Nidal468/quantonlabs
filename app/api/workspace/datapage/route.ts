// /api/workspace/datapage/route.ts

import connectMongo from "@/db/mongoose";
import { getUser } from "@/lib/hook/auth";
import { UserDocument } from "@/model/user";
import { NextRequest, NextResponse } from "next/server";
import { DataPage, DataPageDocument } from "@/model/datapage";

export async function GET(req: NextRequest) {
    await connectMongo();
    const user: UserDocument | null = await getUser();

    if (!user) {
        return NextResponse.json(
            { error: "Invalid authentication" },
            { status: 401 }
        );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const documents = await DataPage.find({ workspaceId: id })
        .populate([
            { path: "agentId", select: "name email" },
            { path: "workspaceId", select: "name" },
            { path: "uploaderId", select: "name email avatar" },
        ])
        .lean();

    return NextResponse.json(documents);
}
