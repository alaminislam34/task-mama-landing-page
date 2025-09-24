"use client";

import React from "react";
import { toast } from "react-toastify";

const courses = [
  {
    id: "course1",
    title: "Mom CEO Mode",
    price: 59.99, // price in cents for $59.99
  },
  {
    id: "course2",
    title: "Time Mastery for Working Moms",
    price: 59.99,
  },
];

export default function CourseSectionDemo() {
  const handleDemoPurchase = (course) => {
    toast.success(`Demo Purchase: ${course.title} successful!`, {
      pauseOnHover: true,
      style: { backgroundColor: "#E6E6FA", color: "#00000069", boxShadow:'' },
      hideProgressBar: true,
    });
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
                  ${(course.price)}
                </span>
                <button
                  onClick={() => handleDemoPurchase(course)}
                  className="bg-primary text-white py-2 px-6 rounded-full cursor-pointer transition-colors duration-300"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
