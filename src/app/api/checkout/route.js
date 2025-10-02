import Stripe from "stripe";
import { NextResponse } from "next/server";

// Initialize Stripe outside the handler for performance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  try {
    // Now requiring email and courseId from the client
    const { email, courseId } = await req.json(); // --- Input Validation ---

    if (!email || !courseId) {
      return NextResponse.json(
        { error: "Missing email or courseId in request body." },
        { status: 400 }
      );
    } // NOTE: Using $59.99 for both courses, as defined in your payload.

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
    } // --- Stripe Session Creation ---

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email, // This pre-populates the email on Stripe's checkout page
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.name,
              description: `Access for ${course.name} course.`,
            },
            unit_amount: Math.round(course.price * 100), // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment", // Crucial: pass session ID back to the success page for verification
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`, // CRITICAL: This metadata is used by the webhook to know which course to unlock
      metadata: { courseId },
    });

    console.log("💳 Stripe Checkout session created:", session.id); // Return the session ID to the client for client-side redirect (using Stripe.js)

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error("🚨 Stripe checkout session creation failed:", err); // For production, return a generic error to the client
    return NextResponse.json(
      { error: "Failed to initialize payment service. Please try again." },
      { status: 500 }
    );
  }
}
