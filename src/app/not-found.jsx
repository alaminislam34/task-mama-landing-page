"use client";

import Image from "next/image";
import React from "react";

export default function NotFoundPage() {
  return (
    <div className="w-full min-h-[55vh] flex flex-col items-center justify-center relative py-12 lg:py-20">
      <div className="absolute top-0 left-0 w-full h-full  bg-[#B0A2DA]/10 blur-xl -z-10"></div>
      <Image
        src={"/images/404-error.png"}
        height={500}
        width={500}
        alt="Not Found Image"
        className="h-[250px] w-[250px] lg:h-[450px] lg:w-[450px]"
      />
      <p className="text-xl md:text-2xl lg:text-4xl font-semibold py-4 md:py-6 lg:py-8">
        Page Not Found
      </p>
      <a
        href="/"
        className="px-6 py-3 rounded-2xl bg-white text-[#B0A2DA] font-medium shadow hover:shadow-lg transition"
      >
        Back to Home
      </a>
    </div>
  );
}
