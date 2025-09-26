// /app/api/checkout/route.js
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  try {
    const { email, courseId } = await req.json();

    if (!email || !courseId) {
      return NextResponse.json(
        { error: "Missing email or courseId" },
        { status: 400 }
      );
    }

    const courses = {
      course1: { name: "Mom CEO Mode", price: 59.99 },
      course2: { name: "Time Mastery for Working Moms", price: 59.99 },
    };

    const course = courses[courseId];
    if (!course) {
      return NextResponse.json({ error: "Invalid courseId" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: course.name },
            unit_amount: Math.round(course.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/`,
      metadata: { courseId }, // 👈 payment complete হলে webhook-এ যাবে
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: err.message || "Stripe checkout failed" },
      { status: 500 }
    );
  }
}
