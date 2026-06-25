import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(req: NextRequest) {
  const url = new URL(req.url);
  // Check if user is logged in
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If logged in and visiting signin/signup → redirect to dashboard
  if ((url.pathname === "/auth/signin" || url.pathname === "/auth/signup") && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect /dashboard for logged-in users only
  if (url.pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/signin/:path*", "/auth/signup/:path*", "/dashboard/:path*"],
};