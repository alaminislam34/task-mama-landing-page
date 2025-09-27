// /app/api/auth/callback/google/route.js
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

/**
 * Google OAuth Callback Route
 * Exchanges authorization code for access token,
 * fetches user profile, upserts user in MongoDB,
 * and returns a JWT cookie for authentication.
 */
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "No authorization code provided." }, { status: 400 });
    }

    // 🔹 Exchange authorization code for access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
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

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error("Google Token Error:", tokenData);
      return NextResponse.json(
        { error: tokenData.error_description || tokenData.error },
        { status: 500 }
      );
    }

    // 🔹 Fetch user's Google profile
    const profileResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profile = await profileResponse.json();

    if (!profile.email) {
      return NextResponse.json({ error: "Failed to fetch user profile from Google." }, { status: 500 });
    }

    // 🔹 Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db("TaskMamaDB");
    const usersCol = db.collection("users");

    // 🔹 Upsert user data (create if not exists)
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

    // 🔹 Fetch the user document after upsert
    const user = await usersCol.findOne(filter);

    // 🔹 Generate JWT for authentication
    const jwtToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        image: user.image,
        hasPaid: user.hasPaid,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // JWT expiration
    );

    // 🔹 Set JWT as HttpOnly cookie and redirect to home
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.set("token", jwtToken, {
      httpOnly: true, // cannot be accessed by JS
      secure: process.env.NODE_ENV === "production", // only HTTPS in production
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
      sameSite: "lax", // CSRF protection
    });

    // Close MongoDB connection
    await client.close();

    return response;

  } catch (err) {
    console.error("❌ Google OAuth Callback Error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
