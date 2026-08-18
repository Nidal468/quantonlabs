import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(req: NextRequest) {
  const url = new URL(req.url);
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Already signed in and visiting an auth page: go to the workspace.
  if ((url.pathname === "/auth/signin" || url.pathname === "/auth/signup") && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Workspace routes require a session. Unauthenticated visitors go home
  // rather than to a sign-in form, since the workspace is not open for
  // public registration.
  const isProtected =
    url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/admin");

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/signin/:path*",
    "/auth/signup/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};