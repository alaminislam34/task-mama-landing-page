import Stripe from "stripe";
import clientPromise from "@/lib/Mongodb";
import { NextResponse } from "next/server";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    console.error("🚨 Stripe signature missing!");
    return NextResponse.json({ error: "Stripe signature missing" }, { status: 400 });
  }

  try {
    // Verify Stripe webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("✅ Stripe webhook event received:", event.type);

    if (event.type !== "checkout.session.completed") {
      console.log("ℹ️ Ignored event type:", event.type);
      return NextResponse.json({ received: true });
    }

    const session = event.data.object;

    // Get customer email
    let email = session.customer_details?.email;
    if (!email && session.customer) {
      const customer = await stripe.customers.retrieve(session.customer);
      email = customer.email;
    }

    if (!email) {
      console.error("🚨 No email found in session or customer object:", session);
      return NextResponse.json({ received: true, message: "Email not found" });
    }

    email = email.toLowerCase();

    // Get courseId from metadata
    const courseId = session.metadata?.courseId;
    if (!courseId) {
      console.error(`🚨 No courseId in session metadata for ${email}`);
      return NextResponse.json({ received: true, message: "Course ID missing" });
    }

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
    if (!course) {
      console.error(`🚨 Invalid courseId: ${courseId} for email: ${email}`);
      return NextResponse.json({ received: true, message: "Invalid course ID" });
    }

    // Update MongoDB
    const db = (await clientPromise).db("TaskMamaDB");
    const updatePayload = {
      $addToSet: {
        purchasedCourses: {
          id: courseId,
          title: course.title,
          youtubeLink: course.youtubeLink,
          purchaseDate: new Date(),
        },
      },
      $set: { hasPaid: true, lastPurchaseDate: new Date() },
    };

    const result = await db.collection("users").updateOne(
      { email },
      updatePayload,
      { upsert: true }
    );

    console.log(`✅ Purchase saved for ${email}, course: ${courseId}`);
    console.log("📝 MongoDB update result:", result);

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("🚨 Webhook processing error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
