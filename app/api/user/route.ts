import connectMongo from "@/db/mongoose";
import { User } from "@/model/user";
import { NextResponse } from "next/server";

// GET /api/user -> get all users
export async function GET() {
  try {
    await connectMongo();

    const users = await User.find().select("-password"); // never expose password

    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST /api/user -> create user
export async function POST(req: Request) {
  try {
    await connectMongo();

    const body = await req.json();

    const user = await User.create(body);

    const safeUser = user.toObject();
    delete safeUser.password;

    return NextResponse.json(safeUser, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}