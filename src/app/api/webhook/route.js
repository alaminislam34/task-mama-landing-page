// /app/api/webhook/route.js
import Stripe from "stripe";
import clientPromise from "@/lib/Mongodb";
import { NextResponse } from "next/server";

// Initialize Stripe once outside the handler
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

// IMPORTANT: The export const config is only for the Pages Router.
// For App Router, we rely on req.text() to get the raw body.

export async function POST(req) {
  // 1. Get raw body and signature
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  try {
    // 2. Construct event (verifies signature)
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = session.customer_email;
      // Use optional chaining for safety, though Stripe metadata should be reliable
      const courseId = session.metadata?.courseId; 

      const courses = {
        course1: {
          title: "Mom CEO Mode",
          youtubeLink: 'https://youtu.be/qtw_FTnodvY',
        },
        course2: {
          title: "Time Mastery for Working Moms",
          youtubeLink: 'https://youtu.be/G_dlMxuG5iI',
        },
      };

      const course = courses[courseId];

      // CRITICAL CHECK: Ensure the course data exists before proceeding
      if (!course) {
        console.error(`🚨 ERROR: Invalid or missing courseId: ${courseId} for email: ${email}`);
        // Return 200 to acknowledge but not retry, as the course data is the issue
        return NextResponse.json({ received: true, message: "Course ID not found in mapping." });
      }

      // 3. Connect to DB and perform update
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
          // Assuming 'hasPaid' is a necessary flag for premium users
          $set: { hasPaid: true }, 
        },
        { upsert: true } // Creates user if they don't exist
      );

      console.log(`✅ Purchase saved for ${email}, course: ${courseId}`);
    }

    // 4. Acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("🚨 Webhook Error:", err.message);
    // Return 400 status to inform Stripe the event failed processing
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}