"use client";

import Image from "next/image";
import React from "react";
const cards = [
  {
    path: "/icons/calender.png",
    title: "All-in-one for Mompreneurs",
    des: "Family calendar , chores, meal planning, AND business tools like CRM and invoices - no more app juggling",
  },
  {
    path: "/icons/light.png",
    title: "AI Daily Balance",
    des: "AI builds realistic days across school runs, client calls, and self-care.",
  },
  {
    path: "/icons/user.png",
    title: "Role-switch Mode",
    des: "Flip between ‘Mama Mode’ and ‘Boss Mode’ to focus without overwhelm",
  },
];
function FeaturesSection() {
  return (
    <div className="py-6 md:py-8 lg:py-16 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[#E6E6FA8F] blur-xl -z-10"></div>

      <div className="max-w-[1440px] mx-auto w-11/12">
        {/* heading */}
        <h1 className="font-lato font-bold text-[32px] md:text-4xl lg:text-5xl text-center leading-normal">
          Everything you need in <br />{" "}
          <span className="text-primary">one place</span>{" "}
        </h1>

        {/* Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-6 py-12">
          {cards.map((card) => (
            <div
              key={card.path}
              className="lg:w-[420px] lg:h-[302px] w-[350px] h-[280px] rounded-2xl shadow-[0px_40px_40px_0px_#00000030] py-6 px-[42px] flex flex-col justify-center bg-white mx-auto"
            >
              <Image
                src={card.path}
                height={100}
                width={100}
                alt="Calender icon"
                className="w-12 h-12 lg:w-16 lg:h-16 mb-6 md:mb-8 lg:mb-10 mx-auto"
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

export default FeaturesSection;
