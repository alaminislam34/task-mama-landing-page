"use client";

import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { toast } from "react-toastify";
import Modal from "react-modal";

const courses = [
  { id: "course1", title: "Mom CEO Mode", price: 59.99 },
  { id: "course2", title: "Time Mastery for Working Moms", price: 59.99 },
];

export default function CourseSectionDemo() {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handlePurchase = async (course) => {
    if (!session) {
      setSelectedCourse(course);
      setModalOpen(true); // show login modal
      return;
    }

    // ✅ Call your API to create Stripe checkout session
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session.user.email, courseId: course.id }),
    });

    const data = await res.json();
    if (res.ok && data.id) {
      // Redirect to Stripe checkout
      const stripe = (await import("@stripe/stripe-js")).loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );
      (await stripe).redirectToCheckout({ sessionId: data.id });
    } else {
      toast.error("Something went wrong with checkout!");
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Our Courses
        </h2>
        <div className="grid md:grid-cols-2 gap-10 justify-items-center">
          {courses.map((course) => (
            <div
              key={course.id}
              className="w-full max-w-md bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-3 duration-300 p-8 flex flex-col justify-between"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 text-center">
                {course.title}
              </h3>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-bold text-gray-900">
                  ${course.price}
                </span>
                <button
                  onClick={() => handlePurchase(course)}
                  className="bg-primary text-white py-2 px-6 rounded-full cursor-pointer transition-colors duration-300"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Login Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Please Login to Continue
        </h2>

        <div className="flex flex-col gap-4">
          {/* Email Login */}
          <button
            onClick={() => signIn("email")}
            className="w-full py-3 bg-blue-600 text-white rounded hover:opacity-90"
          >
            Login / Signup with Email
          </button>

          {/* Google Login */}
          <button
            onClick={() => signIn("google")}
            className="w-full py-3 bg-red-500 text-white rounded hover:opacity-90"
          >
            Login with Google
          </button>
        </div>

        <button
          onClick={() => setModalOpen(false)}
          className="mt-6 w-full py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
      </Modal>
    </section>
  );
}
