import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/Mongodb"; 

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    console.log(url);
    if (!code) {
      return NextResponse.json(
        { error: "No authorization code provided." },
        { status: 400 }
      );
    } // 🔹 Exchange authorization code for access token

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
      return NextResponse.json(
        { error: tokenData.error_description || tokenData.error },
        { status: 500 }
      );
    } 

    const profileResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );

    const profile = await profileResponse.json();

    if (!profile.email) {
      console.error("❌ No email in profile!");
      return NextResponse.json(
        { error: "Failed to fetch user profile from Google." },
        { status: 500 }
      );
    } 

    const client = await clientPromise;
    const db = client.db("TaskMamaDB");
    const usersCol = db.collection("users"); // 🔹 Upsert user data

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

    await usersCol.updateOne(filter, update, { upsert: true }); // 🔹 Fetch user document

    const user = await usersCol.findOne(filter); // Added a check in case user creation failed somehow

    if (!user) {
      throw new Error("Failed to retrieve user data after successful upsert.");
    } 

    const jwtToken = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        image: user.image,
        hasPaid: user.hasPaid,
      },
      process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
      { expiresIn: "7d" }
    ); 

    // todo: change to production url before deploy

    const response = NextResponse.redirect("https://www.taskmama.app");
    // const response = NextResponse.redirect("http://localhost:3000");
    // const response = NextResponse.redirect("https://task-mama.vercel.app");
    response.cookies.set("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
    }); 

    return response;
  } catch (err) {
    console.error("❌ Google OAuth Callback Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
