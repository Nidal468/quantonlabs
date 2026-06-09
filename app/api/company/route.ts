import connectMongo from "@/db/mongoose";
import { getUser } from "@/lib/hook/auth";
import { Company } from "@/model/company";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await getUser();
    await connectMongo();
    const userCompany = await Company.find({ "members.id": user._id });
    return NextResponse.json(userCompany)
}