"use client";

import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const testimonials = [
  {
    name: "Sophia R",
    location: "Boston, USA",
    text: "TaskMama is the first app that actually understands my day. The AI balances school drop-offs, client calls, and even reminds me to breathe. Total lifesaver",
    image: "/images/t1.jpg",
  },
  {
    name: "Rachel K.",
    location: "Boston, USA",
    text: "Before TaskMama, I had five different apps for work and family. Now everything — chores, invoices, and meal plans — is in one place. I finally feel organized",
    image: "/images/t2.jpg",
  },
  {
    name: "Alicia M",
    location: "Boston, USA",
    text: "My kids love the rewards for finishing chores, and I love flipping into Boss Mode to focus on my business. It’s like having a personal assistant in my pocket.",
    image: "/images/t3.jpg",
  },
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);

  // helper function to get correct testimonial for each position
  const getTestimonial = (pos) => {
    const newIndex = (index + pos + testimonials.length) % testimonials.length;
    return testimonials[newIndex];
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-row gap-3 items-center justify-center relative">
          {/* Left card */}
          <TestimonialCard data={getTestimonial(-1)} variant="side" />

          {/* Middle card */}
          <TestimonialCard data={getTestimonial(0)} variant="center" />

          {/* Right card */}
          <TestimonialCard data={getTestimonial(1)} variant="side" />

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="cursor-pointer absolute top-1/2 -translate-y-1/2 left-0"
          >
            <MdOutlineKeyboardArrowLeft className="text-7xl text-primary" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-0"
          >
            <MdOutlineKeyboardArrowRight className="text-7xl text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ data, variant }) {
  const isCenter = variant === "center";

  return (
    <div
      className={`flex flex-col gap-2 items-center rounded-3xl shadow-[4px_4px_4px_0px_#00000025] px-4 md:px-6 py-4 transition-all duration-500 
      ${isCenter ? "lg:max-w-[396px]" : "scale-90 max-w-[338px]"}`}
    >
      <Image
        src={data.image}
        height={200}
        width={200}
        alt="Client Image"
        className={`rounded-full object-cover bg-center bg-cover ${
          isCenter
            ? "h-[133px] w-[133px] -mt-[67px]"
            : "h-[80px] w-[80px] -mt-[40px]"
        }`}
      />
      <div className="flex flex-row gap-1 items-center">
        <FaStar className="text-amber-400" />
        <FaStar className="text-amber-400" />
        <FaStar className="text-amber-400" />
        <FaStar className="text-amber-400" />
      </div>
      <p className="text-sm tracking-tight leading-normal text-center">
        {data.text}
      </p>
      <h3 className="text-sm text-[#2596BE] text-center">{data.name}</h3>
      <p className="text-[10px] font-light text-center">{data.location}</p>
    </div>
  );
}
