import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import connectMongo from "@/db/mongoose";
import { User, UserDocument } from "@/model/user";
import { getServerSession } from "next-auth";

export async function getUser() {
  const session: any = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  await connectMongo();
  const user: UserDocument | null = await User.findById(session?.user?.id)
  return user;
}