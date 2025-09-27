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
    const user = await usersCol.findOne({ email: decoded.email });

    if (!user) {
      return NextResponse.json({ error: "User not found in DB" }, { status: 404 });
    }

    // 🔹 Return fresh user data
    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Invalid token" }, { status: 401 });
  }
}
