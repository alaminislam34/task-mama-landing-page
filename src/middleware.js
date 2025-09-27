// /middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // jwtVerify ব্যবহার করলে Next.js Edge Compatible হয়

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // যদি token না থাকে → login page এ redirect
  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  try {
    // JWT verify (Edge friendly)
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

    // Valid token → next()
    return NextResponse.next();
  } catch (err) {
    console.error("Middleware token error:", err.message);
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

// Middleware configuration: কোন routes এ লাগবে
export const config = {
  matcher: ["/coursepanel/:path*"], // /coursepanel এবং তার subroutes
};
