"use client";
import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const slides = [
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
  // add more slides if needed
];

export default function TestimonialSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 16 },
    breakpoints: {
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 24 } },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const getRelativeIndex = (idx) =>
    (idx - currentSlide + slides.length) % slides.length;

  return (
    <section className="py-12">
      <div className="pb-14">
        <h1 className="font-lato font-bold text-2xl md:text-4xl lg:text-[54px] text-center py-6">
          Reviews/<span className="text-primary">testimonials</span>
        </h1>
      </div>
      <div className="relative max-w-[1440px] w-11/12 mx-auto py-12">
        <div
          ref={sliderRef}
          className="keen-slider flex items-center max-w-10/12 mx-auto"
        >
          {slides.map((slide, idx) => {
            const relativeIndex = getRelativeIndex(idx);
            const isCenter = relativeIndex === 1; // center slide in current view

            return (
              <div
                key={idx}
                className="keen-slider__slide flex justify-center pt-14 px-4 pb-4"
              >
                <div
                  className={`flex flex-col items-center gap-2 rounded-3xl shadow-[4px_4px_4px_0px_#00000025] px-6 py-4 transition-all duration-500 ease-in-out w-full  ${
                    isCenter
                      ? "lg:max-w-[396px] min-h-[242px] scale-100"
                      : "max-w-[338px] scale-90 opacity-90"
                  }`}
                >
                  <Image
                    src={slide.image}
                    width={200}
                    height={200}
                    alt={slide.name}
                    className={`rounded-full object-cover ${
                      isCenter
                        ? "-mt-[67px] h-[133px] w-[133px]"
                        : "-mt-[40px] h-[80px] w-[80px]"
                    }`}
                  />
                  <div className="flex gap-1 items-center">
                    {[...Array(4)].map((_, i) => (
                      <FaStar key={i} className="text-amber-400" />
                    ))}
                  </div>
                  <p className={`text-sm tracking-tight leading-normal ${!isCenter && 'text-[#0000007D]'}`}>
                    {slide.text}
                  </p>
                  <h3 className="text-sm text-[#2596BE] text-center">
                    {slide.name}
                  </h3>
                  <p className="text-[10px] font-light text-center">
                    {slide.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => instanceRef.current?.prev()}
          className="cursor-pointer absolute top-1/2 -translate-y-1/2 left-0"
        >
          <MdOutlineKeyboardArrowLeft className="text-7xl text-primary" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => instanceRef.current?.next()}
          className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-0"
        >
          <MdOutlineKeyboardArrowRight className="text-7xl text-primary" />
        </button>
      </div>
    </section>
  );
}
