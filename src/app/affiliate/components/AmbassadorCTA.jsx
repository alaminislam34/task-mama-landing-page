"use client";

import Image from "next/image";
import React from "react";

function AmbassadorCTA() {
  return (
    <div>
      <div className="max-w-[1440px] w-11/12 mx-auto py-12 md:py-16 lg:py-20 flex flex-col lg:flex-row gap-12 lg:justify-between">
        <div className="">
          <h1 className="text-[30px] md:text-4xl lg:text-[56px] font-bold font-lato mb-5 md:mb-7 lg:mb-10 leading-normal">
            Apply now and become a
            <span className="text-primary"> TaskMama Ambassador</span>
          </h1>
          <p className="text-lg lg:text-2xl text-[#4A4A4A]">
            Together, we can grow the movement — and create a ripple of balance,
            confidence, and support for moms everywhere.
          </p>
          <div className="mt-8 lg:mt-12">
            <p className="text-xl md:text-2xl lg:text-3xl font-medium font-roboto leading-[150%]">
              Your Earnings at a Glance
            </p>
            <ul className="space-y-4 lg:space-y-6 list-disc list-inside mt-6">
              <li className="text-lg md:text-xl lg:text-2xl font-roboto leading-[150%] text-[#4A4A4A]">
                Subscriptions: 20% recurring commission every month
              </li>
              <li className="text-lg md:text-xl lg:text-2xl font-roboto leading-[150%] text-[#4A4A4A]">
                Mini-Courses: 20% commission on $59.99 courses
              </li>
              <li className="text-lg md:text-xl lg:text-2xl font-roboto leading-[150%] text-[#4A4A4A]">
                Merchandise: 20% commission on every item
              </li>
              <li className="text-lg md:text-xl lg:text-2xl font-roboto leading-[150%] text-[#4A4A4A]">
                Bonus Tiers: Earn 25% when you bring in 50+ paying subscriber
              </li>
            </ul>
          </div>
        </div>
        <div className="lg:w-1/3 flex justify-center items-center py-12 lg:py-0">
          <div className="relative">
            <div className="w-[284px] h-[426px] rounded-[30px] border-6 border-primary bg-primary/40 -ml-12 -mt-12"></div>
            <div className="w-[284px] h-[426px] rounded-[30px] bg-primary/80 absolute -bottom-12 blur left-0"></div>
          </div>
          <Image
            src={"/images/friendHaningout.jpg"}
            height={500}
            width={500}
            alt="Friend Haning out image"
            className="w-[284px] h-[426px] rounded-[30px] absolute"
          />
        </div>
      </div>
    </div>
  );
}

export default AmbassadorCTA;
