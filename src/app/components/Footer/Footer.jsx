"use client";

import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <div className="bg-[#2A2A2A]">
      <footer className="max-w-[1440px] w-11/12 mx-auto flex  items-center gap-8 lg:gap-12 py-12">
        <div>
          <Image
            src={"/logo.png"}
            height={200}
            width={200}
            alt="Logo icon"
            className="lg:w-[122px] lg:h-[74px] mb-7"
          />
          <p className="text-[#ADADAD] text-sm md:text-lg lg:text-xl">
            TaskMama is the all-in-one app for mompreneurs — combining family
            calendars, chores, meal planning, and business tools with AI Daily
            Balance to keep life organized and stress-free.
          </p>
        </div>
        <div className="w-3/6"> 
          <h1 className="text-sm md:text-lg lg:text-xl font-medium text-center text-white py-4">
            Download it now
          </h1>
          <div className="flex items-center gap-2">
            <a href="" target="_blank">
              <Image
                src={"/icons/playstore.png"}
                width={500}
                height={300}
                alt="Google play icon"
                className="w-[100px] h-[32px] lg:w-[120px] lg:h-[40px]"
              />
            </a>
            <a href="" target="_blank">
              <Image
                src={"/icons/applestore.png"}
                width={500}
                height={300}
                alt="Google play icon"
                className="w-[100px] h-[32px] lg:w-[120px] lg:h-[40px]"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
