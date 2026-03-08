"use client";

import Image from "next/image";
import React from "react";
const cards = [
  {
    path: "/icons/image (2).png",
    title: "Balance Begins with Less Load ",
    des: "When moms don’t have to carry everything alone, family, work, and everyday life can exist with more calm and less strain",
  },
  {
    path: "/icons/image (1).png",
    title: "Simplicity Always",
    des: " Support should feel simple and calm — never overwhelming. Everything in TaskMama is designed to be clear, gentle, and easy to use, so your mind can rest instead of working harder. ",
  },
  {
    path: "/icons/image.png",
    title: "Built for Real Moms",
    des: "TaskMama is shaped by the real weight of motherhood — running a home, managing life, caring for family, and carrying more than anyone sees. Because moms deserve support that truly understands what they hold every day.",
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
          TaskMama isn’t just an app — it’s built on one simple belief: moms
          don’t need more pressure, they need real support. Everything we create
          is designed to help you carry less, feel calmer, and know you don’t
          have to hold everything alone.
        </p>

        {/* Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-6 space-y-6 py-12 *:w-full">
          {cards.map((card) => (
            <div
              key={card.path}
              className="rounded-2xl shadow-[0px_40px_40px_0px_#00000030] p-4 md:p-6 flex flex-col justify-start h-full bg-white mx-auto"
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
