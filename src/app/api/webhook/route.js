import Stripe from "stripe";
import { getMongoClientPromise } from "@/lib/Mongodb";
import { NextResponse } from "next/server";

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  return new Stripe(secretKey, {
    apiVersion: "2022-11-15",
  });
}

export async function POST(req) {
  try {
    const stripe = getStripe();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
    }

    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
      return NextResponse.json(
        { error: "Stripe signature missing" },
        { status: 400 }
      );
    }

    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

    if (event.type !== "checkout.session.completed") {
      return NextResponse.json({ received: true });
    }

    const session = event.data.object;

    let email = session.customer_details?.email;
    if (!email && session.customer) {
      const customer = await stripe.customers.retrieve(session.customer);
      email = customer.email;
    }

    if (!email) {
      return NextResponse.json({
        received: true,
        message: "Email not found",
      });
    }

    email = email.toLowerCase();

    const courseId = session.metadata?.courseId;
    if (!courseId) {
      return NextResponse.json({
        received: true,
        message: "Course ID missing",
      });
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
      return NextResponse.json({
        received: true,
        message: "Invalid course ID",
      });
    }

    const db = (await getMongoClientPromise()).db("TaskMamaDB");

    const updatePayload = {
      $addToSet: {
        purchasedCourses: {
          id: courseId,
          title: course.title,
          youtubeLink: course.youtubeLink,
          purchaseDate: new Date(),
        },
      },
      $set: {
        hasPaid: true,
        lastPurchaseDate: new Date(),
      },
    };

    await db.collection("users").updateOne({ email }, updatePayload, {
      upsert: true,
    });

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook processing error:", err);

    const message =
      err instanceof Error ? err.message : "Webhook processing error";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}