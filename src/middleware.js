// /middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.NEXTAUTH_SECRET));

    return NextResponse.next();
  } catch (err) {
    console.error("Middleware token error:", err.message);
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

export const config = {
  matcher: ["/coursepanel/:path*"],
};
