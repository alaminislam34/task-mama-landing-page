"use client";

import React from "react";

export default function Success() {
  return (
    <div className="flex items-center justify-center min-h-[550px] px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-primary">🎉 Payment Successful!</h1>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Your course is now unlocked.
        </p>
        <a
          href="/"
          className="inline-block bg-primary hover:bg-primary text-white font-semibold py-3 px-6 rounded-full transition"
        >
          Go to Courses
        </a>
      </div>
    </div>
  );
}
