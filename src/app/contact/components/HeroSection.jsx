"use client";

import Image from "next/image";
import React from "react";

function HeroSection() {
  return (
    <div className="py-8 lg:py-12 relative">
      <div className="absolute top-0 left-0 w-full h-full  bg-gradient-to-t from-[#B0A2DA]/10 via-[#B0A2DA]/5 to-white blur-xl -z-10"></div>
      <div className="py-12 md:py-20 lg:py-20 max-w-[1440px] w-11/12 mx-auto relative">
        {/* star icon */}
        <div className="absolute -top-8 lg:top-4 -z-10 left-0">
          <Image
            src={"/icons/star1.png"}
            width={400}
            height={400}
            alt="Star icon"
            className="w-[80px] h-[80px] lg:w-[102px] lg:h-[102px]"
          />
        </div>
        <div className="absolute -bottom-4 lg:bottom-4 right-0 -z-10">
          <Image
            src={"/icons/star1.png"}
            width={400}
            height={400}
            alt="Star icon"
            className="w-[80px] h-[80px] lg:w-[102px] lg:h-[102px]"
          />
        </div>

        {/* heading */}
        <h1 className="text-[30px] md:text-4xl lg:text-[56px] font-bold font-lato mx-auto text-center lg:max-w-[853px] max-w-[420px] sm:max-w-xl md:max-w-2xl mb-7 leading-normal">
          We’d Love to Hear From You We’d {"  "}
          <span className="text-primary"> Love to Hear From You</span>.
        </h1>

        {/* sub title */}
        <p className="font-roboto lg:max-w-[875px] max-w-[450px] sm:max-w-2xl md:max-w-3xl  mx-auto text-center mb-10 text-lg lg:text-2xl text-[#4A4A4A]">
          Have questions or ideas? TaskMama is here to listen, support, and
          help—whether it’s about the app, our courses, or joining the movement.
        </p>
      </div>
    </div>
  );
}

export default HeroSection;
