"use client";

import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <footer className="bg-[#2A2A2A] py-8 lg:py-10">
      <div className="max-w-[1440px] w-11/12 mx-auto flex flex-col md:flex-row items-start md:items-center md:justify-between gap-8 lg:gap-12">
        {/* Logo + Description */}
        <div className="flex-1">
          <Image
            src="/logo.png"
            alt="Logo icon"
            width={122}
            height={74}
            className="mb-7"
          />
          <p className="text-[#ADADAD] text-sm md:text-lg lg:text-xl">
            TaskMama is the all-in-one app for mompreneurs — combining family
            calendars, chores, meal planning, and business tools with AI Daily
            Balance to keep life organized and stress-free.
          </p>
        </div>

          {/* Download Buttons */}
        <div className="flex items-center justify-center w-full md:w-1/4">
          <div className="flex-1 flex flex-col items-center mx-auto">
            <h2 className="text-sm md:text-lg lg:text-xl font-medium text-white mb-4 text-center">
              Download it now
            </h2>
            <div className="flex gap-2">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/icons/playstore.png"
                  alt="Google Play"
                  width={120}
                  height={40}
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/icons/applestore.png"
                  alt="App Store"
                  width={120}
                  height={40}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-white w-full mt-12 md:mt-16 lg:mt-20"></div>

      {/* Copyright */}
      <p className="text-center text-[#ADADAD] text-xs md:text-sm pt-6 lg:pt-8">
        Copyright © 2025 TaskMama - All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
