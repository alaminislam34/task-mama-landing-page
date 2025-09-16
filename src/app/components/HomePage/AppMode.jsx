"use client";

import Image from "next/image";
import React from "react";

function AppMode() {
  return (
    <div className="relative">
      <div className="absolute w-full h-full bg-[#E6E6FA8F] blur-lg -z-10"></div>
      <div className="max-w-[1440px] mx-auto w-11/12 py-12 lg:py-20 relative">
        {/* star icon */}
        <div className="absolute top-6 -z-10 left-0">
          <Image
            src={"/icons/star1.png"}
            width={400}
            height={400}
            alt="Star icon"
            className="w-[80px] h-[80px] lg:w-[102px] lg:h-[102px]"
          />
        </div>
        <div className="absolute bottom-6 right-0 -z-10">
          <Image
            src={"/icons/star1.png"}
            width={400}
            height={400}
            alt="Star icon"
            className="w-[80px] h-[80px] lg:w-[102px] lg:h-[102px]"
          />
        </div>

        {/* app mode screen shot */}
        <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-16 items-center">
          <div className="flex flex-col gap-12 items-center justify-center">
            <h1 className="font-lato font-bold text-[32px] md:text-4xl lg:text-5xl text-center leading-normal">
              Mama Mode
            </h1>
            <Image
              src={"/images/mamaMode.png"}
              height={1200}
              width={1200}
              alt="Mama Mode Screenshot"
              className="lg:w-[350px] lg:h-[680px] w-[300px] h-[580px] bg-center bg-cover  object-fitt"
            />
          </div>
          <div className="flex flex-col gap-12 items-center justify-center">
            <h1 className="font-lato font-bold text-[32px] md:text-4xl lg:text-5xl text-center leading-normal">
              Business Mode
            </h1>
            <Image
              src={"/images/businessMode.png"}
              height={1200}
              width={1200}
              alt="Mama Mode Screenshot"
              className="lg:w-[350px] lg:h-[680px] w-[300px] h-[580px] bg-center bg-cover object-fitt"
            />
          </div>
        </div>
      </div>
        <p className="text-base md:text-xl lg:text-[32px] text-center font-medium leading-normal py-10 md:py-16 lg:py-20 max-w-6xl mx-auto w-11/12 text-[#5C5C5C]">
          Switch views instantly — see family tasks and meal plans in Mama Mode,
          then flip to Boss Mode for client tasks and invoices.”
        </p>
    </div>
  );
}

export default AppMode;
