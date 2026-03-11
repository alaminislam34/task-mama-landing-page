import Stripe from "stripe";
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

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to create a checkout session." },
    { status: 405 }
  );
}

export async function POST(req) {
  try {
    const stripe = getStripe();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!appUrl) {
      throw new Error("NEXT_PUBLIC_APP_URL is not configured");
    }

    const { email, courseId } = await req.json();

    if (!email || !courseId) {
      return NextResponse.json(
        { error: "Missing email or courseId in request body." },
        { status: 400 }
      );
    }

    const courses = {
      course1: { name: "Mom CEO Mode", price: 59.99 },
      course2: { name: "Time Mastery for Working Moms", price: 59.99 },
    };

    const course = courses[courseId];

    if (!course) {
      return NextResponse.json(
        { error: `Invalid courseId: ${courseId} provided.` },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.name,
              description: `Access for ${course.name} course.`,
            },
            unit_amount: Math.round(course.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/`,
      metadata: { courseId },
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error("Stripe checkout session creation failed:", err);

    const message =
      err instanceof Error
        ? err.message
        : "Failed to initialize payment service. Please try again.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}