// /app/api/webhook/route.js
import Stripe from "stripe";
import clientPromise from "@/lib/Mongodb";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const config = { api: { bodyParser: false } };

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = session.customer_email;
      const courseId = session.metadata.courseId;

      const courses = {
        course1: {
          title: "Mom CEO Mode",
          youtubeLink: process.env.COURSE1_YOUTUBE,
        },
        course2: {
          title: "Time Mastery for Working Moms",
          youtubeLink: process.env.COURSE2_YOUTUBE,
        },
      };

      const course = courses[courseId];

      // Add this line to get DB instance
      const db = (await clientPromise).db("TaskMamaDB");

      await db.collection("users").updateOne(
        { email },
        {
          $addToSet: {
            purchasedCourses: {
              id: courseId,
              title: course.title,
              youtubeLink: course.youtubeLink,
            },
          },
          $set: { hasPaid: true },
        },
        { upsert: true }
      );

      console.log(`✅ Purchase saved for ${email}, course: ${courseId}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
