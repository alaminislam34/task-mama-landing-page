// app/api/users/route.js
import clientPromise from "@/lib/Mongodb";

export async function GET(req) {
  try {
    const db = (await clientPromise).db("TaskMamaDB");
    const users = await db
      .collection("users")
      .find({})
      .project({ _id: 0, name: 1, email: 1, image: 1, hasPaid: 1 })
      .toArray();

    return new Response(JSON.stringify({ users }), { status: 200 });
  } catch (err) {
    console.error("Error fetching users:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch users" }),
      { status: 500 }
    );
  }
}
