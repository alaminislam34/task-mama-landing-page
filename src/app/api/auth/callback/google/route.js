import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "No code found" }, { status: 400 });
    }

    // 🔹 Token Exchange
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (tokenData.error) {
      return NextResponse.json({ error: tokenData }, { status: 500 });
    }

    // 🔹 Fetch User Info
    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profile = await userRes.json();

     // 🔹 Connect MongoDB
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db("TaskMamaDB");
    const usersCol = db.collection("users");

    // 🔹 Upsert user
    const filter = { email: profile.email };
    const update = {
      $set: {
        name: profile.name,
        image: profile.picture,
        providers: ["google"],
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
        hasPaid: false,
      },
    };
    await usersCol.updateOne(filter, update, { upsert: true });

    // 🔹 Create JWT
    const jwtToken = jwt.sign(
      {
        email: profile.email,
        name: profile.name,
        image: profile.picture,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 🔹 Redirect to home with cookie
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.set("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 604800,
      path: "/",
    });

    return response;

  } catch (err) {
    console.error("❌ Callback Error:", err);
    return NextResponse.json({ error: err.message || "Server Error" }, { status: 500 });
  }
}
