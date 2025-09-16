"use client";

import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <div className="bg-[#2A2A2A]">
      <footer className="max-w-[1440px] w-11/12 mx-auto">
        <div>
          <Image src={"/logo.png"} height={200} width={200} alt="Logo icon" className="lg:w-[122px] lg:h-[74px] mb-7" />
          <p className="text-[#ADADAD] text-sm md:text-lg lg:text-xl">
            TaskMama is the all-in-one app for mompreneurs — combining family
            calendars, chores, meal planning, and business tools with AI Daily
            Balance to keep life organized and stress-free.
          </p>
        </div>
        <div>
          <h1 className="text-sm md:text-lg lg:text-xl font-medium">Download it now</h1>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
