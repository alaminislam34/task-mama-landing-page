"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
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

  useEffect(() => {
    if (user && selectedCourse) {
      handlePurchase(selectedCourse);
      setModalOpen(false);
      setSelectedCourse(null);
    }
  }, [user]);

  const handlePurchase = async (course) => {
    if (!user) {
      setSelectedCourse(course);
      setModalOpen(true);
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

      const stripe = await (
        await import("@stripe/stripe-js")
      ).loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

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

  const handleGoogleLogin = async () => {
    try {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      const appUrl = process.env.NEXT_PUBLIC_APP_URL;

      if (!clientId || !appUrl) {
        console.error("Google Login environment variables missing!");
        toast.error("Google login is not configured properly.");
        return;
      }

      const redirectUri = `${appUrl}/api/auth/callback/google`;
      const scope = encodeURIComponent("email profile openid");
      const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

      // Redirect to Google OAuth
      window.location.href = googleUrl;
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to initiate Google login. Please try again.");
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

      {/* Login Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        ariaHideApp={false}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div className="max-w-xl w-full mx-auto bg-white p-8 rounded-2xl shadow-2xl relative">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
            Welcome Back 👋
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Please login to continue
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 rounded-xl flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 shadow-sm transition cursor-pointer"
            >
              <FcGoogle className="w-5 h-5" />
              <span className="text-gray-700">Continue with Google</span>
            </button>
          </div>

          <button
            onClick={() => setModalOpen(false)}
            className="w-full mt-6 py-2 text-sm text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </section>
  );
}
