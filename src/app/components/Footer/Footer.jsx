"use client";

import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <div className="bg-[#2A2A2A] py-8 lg:py-10 ">
      <footer className="max-w-[1440px] w-11/12 mx-auto flex flex-col md:flex-row  items-center gap-8 lg:gap-12 px-8 md:px-10 lg:px-[60px]">
        <div>
          <Image
            src={"/logo.png"}
            height={200}
            width={200}
            alt="Logo icon"
            className="w-[100px] h-[62px] lg:w-[122px] lg:h-[74px] mb-7"
          />
          <p className="text-[#ADADAD] text-sm md:text-lg lg:text-xl">
            TaskMama is the all-in-one app for mompreneurs — combining family
            calendars, chores, meal planning, and business tools with AI Daily
            Balance to keep life organized and stress-free.
          </p>
        </div>
        <div className="w-3/6 md:w-2/3 lg:w-2/7">
          <div className="flex flex-col items-center justify-center">
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
        </div>
      </footer>
      <div className="border-b border-white w-full mt-12 md:mt-16 lg:mt-20"></div>
    </div>
  );
}

export default Footer;
