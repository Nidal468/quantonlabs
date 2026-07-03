import { NextRequest, NextResponse } from "next/server";
import { DataPageChunk } from "@/model/datapageChunk";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "DataPage ID is required" },
        { status: 400 }
      );
    }

    // Fetch all chunks for this data page, sorted by chunkIndex
    const chunks = await DataPageChunk.find({ pageId: id })
      .sort({ chunkIndex: 1 })
      .lean();

    return NextResponse.json({ chunks });
  } catch (error) {
    console.error("Error fetching datapage chunks:", error);
    return NextResponse.json(
      { error: "Failed to fetch chunks" },
      { status: 500 }
    );
  }
}