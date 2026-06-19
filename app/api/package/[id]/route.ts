import connectMongo from "@/db/mongoose";
import { getUser } from "@/lib/hook/auth";
import { NextRequest, NextResponse } from "next/server";
import { Package } from "@/model/package";

export async function GET(req: NextRequest) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Invalid authentication" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID is required" },
      { status: 400 }
    );
  }

  await connectMongo();

  const document = await Package.findById(id).lean();

  if (!document) {
    return NextResponse.json(
      { error: "Resource not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(document);
}

export async function PATCH(req: NextRequest) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Invalid authentication" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID is required" },
      { status: 400 }
    );
  }

  await connectMongo();

  try {
    const data = await req.json();

    const document = await Package.findById(id);

    if (!document) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    if (typeof data.title === "string") {
      document.title = data.title.trim();
    }

    if (typeof data.description === "string") {
      document.description = data.description;
    }

    if (typeof data.imageUrl === "string") {
      document.imageUrl = data.imageUrl;
    }

    if (typeof data.category === "string") {
      document.category = data.category;
    }

    if (typeof data.active === "boolean") {
      document.active = data.active;
    }

    if (typeof data.featured === "boolean") {
      document.featured = data.featured;
    }

    if (Array.isArray(data.includes)) {
      document.includes = data.includes;
    }

    if (typeof data.level === "string") {
      document.level = data.level;
    }

    if (typeof data.type === "string") {
      document.type = data.type;
    }

    if (typeof data.amount === "number") {
      document.amount = data.amount;
    }

    if (typeof data.currency === "string") {
      document.currency = data.currency;
    }

    if (typeof data.cycle === "string") {
      document.cycle = data.cycle;
    }

    if (typeof data.stripeProductId === "string") {
      document.stripeProductId = data.stripeProductId;
    }

    if (typeof data.stripePriceId === "string") {
      document.stripePriceId = data.stripePriceId;
    }

    if (typeof data.stripeOneTimePriceId === "string") {
      document.stripeOneTimePriceId = data.stripeOneTimePriceId;
    }

    if (typeof data.badge === "string") {
      document.badge = data.badge;
    }

    if (Array.isArray(data.highlights)) {
      document.highlights = data.highlights;
    }

    if (typeof data.sortOrder === "number") {
      document.sortOrder = data.sortOrder;
    }

    await document.save();

    return NextResponse.json(document);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Invalid authentication" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID is required" },
      { status: 400 }
    );
  }

  await connectMongo();

  const document = await Package.findById(id);

  if (!document) {
    return NextResponse.json(
      { error: "Resource not found" },
      { status: 404 }
    );
  }

  await document.deleteOne();

  return NextResponse.json({ message: "Resource deleted" });
}
