// /middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const url = req.nextUrl.clone();

  // শুধু /coursepanel route protect করা হবে
  if (url.pathname.startsWith("/coursepanel")) {
    try {
      const session = await getToken({ req, secret });

      if (!session) {
        // User logged in না → redirect to signin
        url.pathname = "/signin";
        return NextResponse.redirect(url);
      }
    } catch (err) {
      console.error("Middleware error:", err);
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }

  // baki routes e normal access
  return NextResponse.next();
}

// শুধুমাত্র /coursepanel route apply হবে
export const config = {
  matcher: ["/coursepanel/:path*"],
};
