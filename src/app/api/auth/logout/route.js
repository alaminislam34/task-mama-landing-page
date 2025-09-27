// app/api/auth/logout/route.js
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Clear JWT cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",       // cookie path must match the one you set on login
    maxAge: 0,       // expire immediately
  });

  return response;
}
