import connectMongo from "@/db/mongoose";
import { getUser } from "@/lib/hook/auth";
import { User } from "@/model/user";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongo();
        const authUser = await getUser();
        
        const users = await User.findById(authUser._id).select("-password");

        return NextResponse.json(users, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        );
    }
}
