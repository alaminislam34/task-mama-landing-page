import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/Mongodb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { courseId } = await req.json();
  if (!courseId) {
    return NextResponse.json({ message: "Course ID is required" }, { status: 400 });
  }

  try {
    const db = (await clientPromise).db("TaskMamaDB"); // optional: specify DB

    // Optional: check if courseId exists in DB
    // const courseExists = await db.collection("courses").findOne({ _id: courseId });
    // if (!courseExists) return NextResponse.json({ message: "Invalid course ID" }, { status: 400 });

    // Optional: prevent duplicate purchases
    // const alreadyPurchased = await db.collection("purchases").findOne({ userId: session.user.id, courseId });
    // if (alreadyPurchased) return NextResponse.json({ message: "Course already purchased" }, { status: 400 });

    await db.collection("purchases").insertOne({
      userId: session.user.id,
      email: session.user.email,
      courseId,
      purchasedAt: new Date(),
    });

    return NextResponse.json({ message: "Purchase saved" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
