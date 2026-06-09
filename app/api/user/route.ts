import { getUser } from "@/lib/hook/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await getUser();
    return NextResponse.json(user, { status: 200 });
}