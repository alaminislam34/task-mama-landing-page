import { NextResponse } from "next/server";

function getSafeNextPath(nextValue) {
  if (!nextValue) {
    return "/";
  }

  if (!nextValue.startsWith("/") || nextValue.startsWith("//")) {
    return "/";
  }

  return nextValue;
}

export async function GET(req) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const appUrl = process.env.NEXTAUTH_URL;
  const url = new URL(req.url);
  const nextPath = getSafeNextPath(url.searchParams.get("next"));

  if (!clientId || !appUrl) {
    return NextResponse.json(
      { error: "Google OAuth is not configured on the server (GOOGLE_CLIENT_ID or NEXTAUTH_URL missing)." },
      { status: 500 },
    );
  }

  const redirectUri = `${appUrl}/api/auth/callback/google`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
    state: Buffer.from(JSON.stringify({ next: nextPath }), "utf8").toString(
      "base64url",
    ),
  });

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  return NextResponse.redirect(googleAuthUrl);
}