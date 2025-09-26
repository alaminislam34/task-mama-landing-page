import clientPromise from "@/lib/Mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const db = (await clientPromise).db("TaskMamaDB");

    const user = await db.collection("users").findOne({ email });

    // শুধুমাত্র purchased courses return করবো
    const purchasedCourses = user?.purchasedCourses || [];

    return NextResponse.json({ purchasedCourses });
  } catch (err) {
    console.error("Error fetching user courses:", err);
    return NextResponse.json(
      { error: "Failed to fetch user courses" },
      { status: 500 }
    );
  }
}
