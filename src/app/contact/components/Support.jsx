"use client";

import Image from "next/image";
import React from "react";

function SupportSection() {
  return (
    <section className="bg-[#C5BBE4FC] py-12 lg:py-16">
      <div className="max-w-[1440px] w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start py-12">
        <div className="lg:mt-4">
          <h1 className="font-lato font-bold text-xl md:text-2xl lg:text-4xl leading-[130%] text-[#2A2A2A] max-w-3/4">
            Your feedback helps us make{" "}
            <span className="text-white"> TaskMama </span> even better for moms
            like you.
            <span className="text-white"> Let’s connect!</span>
          </h1>
        </div>
        <div className="">
          <div className="relative min-h-[150px] lg:min-h-[205px] flex flex-row gap-6">
            <div className="absolute top-0 left-0 flex items-center justify-between flex-col h-full">
              <div>
                <div className="h-10 w-10 border-[12px] border-white rounded-full flex items-center justify-center"></div>
              </div>
              <div className="h-full bg-[#BAAEAE] w-1"></div>
              <div>
                {" "}
                <div className="h-10 w-10 border-[12px] border-white rounded-full flex items-center justify-center"></div>
              </div>
            </div>
            <div className="ml-14 flex flex-col justify-between">
              <div className="space-y-[18px]">
                <h3 className="text-white font-lato text-lg md:text-2xl lg:text-4xl font-bold leading-[130%]">
                  Email
                </h3>
                <p className="text-[#4D4B4B] font-lato text-base md:text-xl lg:text-2xl font-bold leading-[130%]">
                  support@taskmama.app
                </p>
              </div>
              <div>
                <h3 className="text-white font-lato text-lg md:text-2xl lg:text-4xl font-bold leading-[130%]">
                  Social Media: Follow us and DM
                </h3>
              </div>
            </div>
          </div>
          <div className="ml-14 flex flex-row items-center gap-14 lg:gap-[70px] mt-6 md:mt-8 lg:mt-11">
            {/* Todo */}
            <a href="#">
              <Image
                src={"/icons/facebook.jpg"}
                height={60}
                width={60}
                alt="Social icon"
                className="h-[34px] md:h-[44px] lg:h-[54px] w-[34px] md:w-[44px] lg:w-[54px] object-cover"
              />
            </a>
            <a href="#">
              <Image
                src={"/icons/instagram.jpg"}
                height={60}
                width={60}
                alt="Social icon"
                className="h-[34px] md:h-[44px] lg:h-[54px] w-[34px] md:w-[44px] lg:w-[54px] object-cover"
              />
            </a>
            <a href="#">
              <Image
                src={"/icons/tiktok.jpg"}
                height={60}
                width={60}
                alt="Social icon"
                className="h-[34px] md:h-[44px] lg:h-[54px] w-[34px] md:w-[44px] lg:w-[54px] object-cover"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SupportSection;
