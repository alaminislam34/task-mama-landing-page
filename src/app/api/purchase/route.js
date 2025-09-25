import clientPromise from "@/lib/Mongodb";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Not authenticated" });

  const { courseId } = req.body;
  const db = (await clientPromise).db();

  await db.collection("purchases").insertOne({
    userId: session.userId,
    courseId,
    purchasedAt: new Date(),
  });

  res.status(200).json({ message: "Purchase saved" });
}
