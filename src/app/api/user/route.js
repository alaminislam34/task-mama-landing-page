import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Not logged in" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      // 🔹 JWT verify
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return NextResponse.json(
          { error: "Session expired. Please login again." },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    // 🔹 Connect MongoDB
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db("TaskMamaDB");
    const usersCol = db.collection("users");

    // 🔹 Fetch user from DB
    const user = await usersCol.findOne(
      { email: decoded.email },
      { projection: { password: 0 } } // Exclude sensitive fields
    );

    // Close connection
    await client.close();

    if (!user) {
      return NextResponse.json(
        { error: "User not found in DB" },
        { status: 404 }
      );
    }

    // 🔹 Return fresh user data
    return NextResponse.json({ user });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
