"use client";

import Image from "next/image";
import React from "react";
const cards = [
  {
    path: "/icons/image (2).png",
    title: "Balance First",
    des: "Moms deserve time for family, business, and themselves — without constant sacrifice.",
  },
  {
    path: "/icons/image (1).png",
    title: "Simplicity Always",
    des: " Technology should make life calmer, not more complicated. Every feature is designed to be clear, easy, and intuitive.",
  },
  {
    path: "/icons/image.png",
    title: "Built for Every Mom",
    des: "We focus on the real challenges of motherhood, running a home, building a career, and raising a family, because no one else was creating tools made just for you.",
  },
];
function WhatGuides() {
  return (
    <div className="py-6 md:py-8 lg:py-24 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[#E6E6FA8F] blur-xl -z-10"></div>

      <div className="max-w-[1440px] mx-auto w-11/12 relative">
        <Image
          src={"/icons/star1.png"}
          height={200}
          width={200}
          alt="Star icon"
          className="absolute h-[80px] md:h-[90px] lg:h-[102px] w-[80px] md:w-[90px] lg:w-[102px] -top-16 right-0 -z-10"
        />
        {/* heading */}
        <h1 className="font-lato font-bold text-[32px] md:text-4xl lg:text-5xl text-center lg:text-left leading-normal mb-6">
          What Guides Us
          <span className="text-primary"> Every Day</span>
        </h1>
        <p className="font-roboto text-lg lg:text-2xl text-[#4A4A4A] text-center lg:text-left max-w-2xl leading-normal">
          TaskMama isn’t just an app — it’s built on values that reflect what
          moms truly need to thrive.
        </p>

        {/* Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-6 space-y-6 py-12 *:w-full">
          {cards.map((card) => (
            <div
              key={card.path}
              className="lg:min-w-[420px] lg:min-h-[302px] w-[350px] h-[280px] rounded-2xl shadow-[0px_40px_40px_0px_#00000030] py-6 px-[42px] flex flex-col justify-center bg-white mx-auto"
            >
              <Image
                src={card.path}
                height={100}
                width={100}
                alt="Calender icon"
                className="w-12 h-12 lg:w-16 lg:h-16 mb-6 md:mb-8 lg:mb-10"
              />
              <h1 className="font-bold text-lg md:text-xl lg:text-[25px] font-lato mb-4">
                {card.title}
              </h1>
              <p className="text-sm md:text-base lg:text-lg font-normal text-[#555555]">
                {card.des}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhatGuides;
