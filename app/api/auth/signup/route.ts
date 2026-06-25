import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongo from "@/db/mongoose";
import { User } from "@/model/user";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "/public/images/avatar");

export async function POST(req: Request) {
  try {
    await connectMongo();

    const formData = await req.formData();

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const companyName = formData.get("companyName") as string;
    const country = formData.get("country") as string;
    const currency = formData.get("currency") as string;
    const inviteCode = formData.get("inviteCode") as string | undefined;

    const file = formData.get("file") as File | null;

    // check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    let avatarUrl = "";

    if (file) {
      // ensure folder exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);

      // this is what you store in DB
      avatarUrl = `/images/avatar/${fileName}`;
    }

    if (!inviteCode) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        username,
        email,
        password: hashedPassword,
        avatarUrl,
        credits: 0,
        currency,
        country,
        money: 0,
        companies: [
          {
            name: companyName,
            role: "Owner",
            agents: [],
            tasks: [],
            reports: [],
            notifications: []
          },
        ],
      });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}