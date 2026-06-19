import connectMongo from "@/db/mongoose";
import { getUser } from "@/lib/hook/auth";
import { NextRequest, NextResponse } from "next/server";
import { Package } from "@/model/package";

export async function GET() {
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Invalid authentication" },
      { status: 401 }
    );
  }

  await connectMongo();

  const packages = await Package.find().lean();

  return NextResponse.json(packages);
}

export async function POST(req: NextRequest) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Invalid authentication" },
      { status: 401 }
    );
  }

  await connectMongo();

  try {
    const data = await req.json();

    if (typeof data.title !== "string" || !data.title.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (typeof data.description !== "string") {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    if (typeof data.level !== "string" || !["basic", "standard", "premium", "enterprise"].includes(data.level)) {
      return NextResponse.json(
        { error: "Invalid level" },
        { status: 400 }
      );
    }

    if (typeof data.type !== "string" || !["recurring", "one_off"].includes(data.type)) {
      return NextResponse.json(
        { error: "Invalid type" },
        { status: 400 }
      );
    }

    if (typeof data.amount !== "number") {
      return NextResponse.json(
        { error: "Amount is required" },
        { status: 400 }
      );
    }

    if (typeof data.currency !== "string" || data.currency !== "USD") {
      return NextResponse.json(
        { error: "Currency must be USD" },
        { status: 400 }
      );
    }

    const document = new Package({
      title: data.title.trim(),
      description: data.description,
      active: data.active ?? false,
      featured: data.featured ?? false,
      includes: data.includes ?? [],
      level: data.level,
      type: data.type,
      amount: data.amount,
      currency: data.currency,
      highlights: data.highlights ?? [],
      sortOrder: data.sortOrder ?? 0,
    });

    await document.save();

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
