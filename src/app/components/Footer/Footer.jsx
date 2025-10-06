"use client";

import Image from "next/image";
import Link from "next/link";
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
            TaskMama is the all-in-one app for every mom - from stay-at-home to
            working, new to seasoned - combining family calendars, chores, meal
            planning, and business tools with Al Daily Balance to keep life
            organized and stress-free.
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
            <div className="flex flex-row gap-8 mt-6 md:mt-8 lg:mt-11">
              {/* Todo */}
              <a href="https://www.facebook.com/share/1Jo9bH967Z/?mibextid=wwXIfr">
                <Image
                  src={"/icons/facebook.jpg"}
                  height={60}
                  width={60}
                  alt="Social icon"
                  className="h-[34px] md:h-[34px] lg:h-[40px] w-[34px] md:w-[34px] lg:w-[40px] object-cover"
                />
              </a>
              <a href="https://www.instagram.com/task_mama?igsh=NW5pcGU4aGlkNTkz&utm_source=qr">
                <Image
                  src={"/icons/instagram.jpg"}
                  height={60}
                  width={60}
                  alt="Social icon"
                  className="h-[34px] md:h-[34px] lg:h-[40px] w-[34px] md:w-[34px] lg:w-[40px] object-cover"
                />
              </a>
              <a href="https://www.tiktok.com/@taskmama?_t=ZP-90KpvBisqad&_r=1">
                <Image
                  src={"/icons/tiktok.jpg"}
                  height={60}
                  width={60}
                  alt="Social icon"
                  className="h-[34px] md:h-[34px] lg:h-[40px] w-[34px] md:w-[34px] lg:w-[40px] object-cover"
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
        Copyright © 2025 TaskMama - All Rights Reserved.{" "}
        <a
          href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Terms & Conditions
        </a>{" "}
        |{" "}
        <Link href="/privacy-policy" className="hover:underline">
          Privacy Policy
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
