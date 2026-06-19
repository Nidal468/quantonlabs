// /api/datapage/route.ts

import connectMongo from "@/db/mongoose";
import { getUser } from "@/lib/hook/auth";
import { UserDocument } from "@/model/user";
import { NextRequest, NextResponse } from "next/server";
import { DataPage } from "@/model/datapage";
import { Agent } from "@/model/agent";
import { Reason_Model } from "@/quantonlabs/agents/operations/reason_model";
import { ingestDocument } from "@/lib/rag/ingestion.service";
import { savePage } from "@/lib/rag/storage.service";
import { Types } from "mongoose";
import { FileContent } from "@/lib/fileParser";
import { Workspace, WorkspaceDocument } from "@/model/workspace";

export async function GET() {
  await connectMongo();
  const user: UserDocument | null = await getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Invalid authentication" },
      { status: 401 }
    );
  }

  const documents = await DataPage.find({ uploaderId: user._id })
    .populate([
      { path: "agentId", select: "name email" },
      { path: "workspaceId", select: "name" },
      { path: "uploaderId", select: "name email avatar" },
    ])
    .lean();

  return NextResponse.json(documents);
}

export async function POST(req: NextRequest) {
  try {
    await connectMongo();

    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: {
      agentId: Types.ObjectId;
      workspaceId: Types.ObjectId;
      title: string;
      slug: string;
      type: string;
      content: {
        type: "text" | "spreadsheet" | "pdf" | "docx" | "unknown";
        data: FileContent;
      };
    } = await req.json();

    const {
      workspaceId,
      agentId,
      content,
      slug,
      type,
      title,
    } = body;

    if (!workspaceId || !agentId || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const agent = await Agent.findOne({ id: "operations" });

    if (!agent) {
      return NextResponse.json({ error: "Agent missing" }, { status: 500 });
    }

    const selectedWorkspace: WorkspaceDocument | null = await Workspace.findById(workspaceId);

    if (!selectedWorkspace) {
      return NextResponse.json({ error: "Invalid workspace" }, { status: 500 });
    }

    const preview = buildAIPreview(content);

    const aiResponse = await Reason_Model(
      preview,
      `
        You are a document intelligence system.

        You will be given structured content extracted from:
        - spreadsheets
        - PDFs
        - text documents

        Your job is to generate metadata that helps retrieval systems understand this document.

        Return ONLY valid JSON:

        {
          "title": string,
          "slug": string,
          "type": "note" | "memory" | "document" | "summary" | "task" | "system",
          "tags": string[],
          "metadata": {
            "source": string,
            "importance": number
          }
        }

        Rules:
        - title must describe the content clearly
        - slug must be lowercase dashed
        - importance: 0–10
        - no markdown
        - no extra text
        `,
      selectedWorkspace.config.openrouter?.key
    );

    console.log(`ai response ${JSON.stringify(aiResponse)}`);

    // EMBEDDING PIPELINE
    const embeddings = await ingestDocument(content, selectedWorkspace.config.openrouter?.key);

    // STORE
    const page = await savePage({
      pageData: {
        title: aiResponse.title || title,
        slug: aiResponse.slug || slug,
        type: aiResponse.type || type,
        tags: aiResponse.tags,
        metadata: aiResponse.metadata,
        content: JSON.stringify(content),
      },
      embeddings,
      user,
      agentId,
      workspaceId,
    });

    return NextResponse.json(page, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function buildAIPreview(content: any): string {
  if (!content?.data) return "";

  const { type, data } = content;

  switch (type) {
    case "text":
      return data.content?.slice(0, 12000) || "";

    case "spreadsheet":
      return (data.sheets || [])
        .map((sheet: any) => {
          const headers = sheet.headers?.join(" | ") || "";
          const rows = (sheet.rows || []).slice(0, 20);

          return `
[SPREADSHEET: ${sheet.name}]
Headers: ${headers}
Rows:
${rows.map((r: any[]) => r.join(" | ")).join("\n")}
          `.trim();
        })
        .join("\n\n");

    case "pdf":
      return (data.pages || [])
        .slice(0, 5)
        .map((p: any) => {
          const text = (p.blocks || [])
            .map((b: any) => b.text)
            .join("\n");

          return `
[PDF PAGE ${p.index}]
${text}
          `.trim();
        })
        .join("\n\n");

    default:
      return JSON.stringify(data).slice(0, 8000);
  }
}