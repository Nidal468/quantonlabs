import connectMongo from "@/db/mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/auth-options";
import { User } from "@/model/user";

export async function GET(req: NextRequest) {
    const session: any = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json('Unauthorized', { status: 401 });
    };

    await connectMongo();
    const id = session.user.id;
    const user = await User.findById(id)
    return NextResponse.json(user, { status: 200 });
}