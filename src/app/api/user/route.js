import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    // 🔹 JWT verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔹 Connect MongoDB
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db("TaskMamaDB");
    const usersCol = db.collection("users");

    // 🔹 Fetch user from DB
    // Assuming the user document contains fields like name, email, image, phone, bio, memberSince, coursesEnrolled
    const user = await usersCol.findOne({ email: decoded.email }, { 
        projection: { password: 0 } // Exclude sensitive fields like password
    });

    // Close connection
    await client.close();

    if (!user) {
      return NextResponse.json({ error: "User not found in DB" }, { status: 404 });
    }

    // 🔹 Return fresh user data (HTTP 200 OK implied)
    return NextResponse.json({ user });
  } catch (err) {
    // This catches JWT errors (like expiration) or general server errors
    console.error("API Error:", err);
    return NextResponse.json({ error: "Authentication failed or server error" }, { status: 401 });
  }
}
