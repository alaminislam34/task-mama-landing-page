"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/SessionProvider";

const courses = [
  {
    id: "course1",
    image: "/images/MomCEOMode.jpg",
    title: "Mom CEO Mode",
    price: 59.99,
  },
  {
    id: "course2",
    image: "/images/mastermom.jpg",
    title: "Time Mastery for Working Moms",
    price: 59.99,
  },
];

export default function CourseSectionDemo() {
  const router = useRouter();
  const { user } = useAuth();
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`/api/my-courses?email=${user.email}`)
        .then((res) => res.json())
        .then((data) =>
          setPurchasedCourses(data.purchasedCourses?.map((c) => c.id) || []),
        );
    }
  }, [user]);

  const handlePurchase = async (course) => {
    if (!user) {
      const query = new URLSearchParams({
        next: "/coursepanel",
        courseId: course.id,
      }).toString();
      router.push(`/signin?${query}`);
      return;
    }

    if (purchasedCourses.includes(course.id)) {
      router.push("/coursepanel");
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, courseId: course.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Checkout API error:", data);
        alert(data.error || "Something went wrong with checkout!");
        return;
      }

      if (!data.id) {
        console.error("Checkout session ID missing:", data);
        alert("Stripe session ID was not returned.");
        return;
      }

      const stripePublishableKey =
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

      if (!stripePublishableKey) {
        console.error(
          "Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in client build.",
        );
        alert("Payment is temporarily unavailable. Please try again later.");
        return;
      }

      const stripe = await (
        await import("@stripe/stripe-js")
      ).loadStripe(stripePublishableKey);

      if (!stripe) {
        alert("Stripe failed to initialize.");
        return;
      }

      const result = await stripe.redirectToCheckout({ sessionId: data.id });

      if (result?.error) {
        console.error("Stripe redirect error:", result.error);
        alert(result.error.message || "Failed to redirect to Stripe checkout.");
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Checkout failed!");
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-[1440px] w-11/12 mx-auto py-6">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
          Our Courses
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-6 py-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="w-full max-w-md bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <Image
                width={400}
                height={200}
                src={course.image}
                alt={course.title}
                className="rounded-2xl mb-4 object-cover h-[250px] w-full"
              />
              <h3 className="text-2xl font-semibold mb-2 text-center py-6">
                {course.title}
              </h3>
              <span className="text-xl font-bold text-gray-900 mb-4 text-center">
                ${course.price}
              </span>

              <button
                onClick={() => handlePurchase(course)}
                className={`py-2 px-6 rounded-full cursor-pointer transition-transform duration-300 ${
                  purchasedCourses.includes(course.id)
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gradient-to-r from-primary/80 to-primary text-white"
                }`}
              >
                {purchasedCourses.includes(course.id)
                  ? "Continue Course"
                  : "Buy Now"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
