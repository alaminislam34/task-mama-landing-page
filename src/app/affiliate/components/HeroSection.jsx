"use client";

import Image from "next/image";
import React from "react";

function HeroSection() {
  return (
    <section>
      <div className="max-w-[1440px] w-11/12 mx-auto py-12 md:py-16 lg:py-20 flex flex-col lg:flex-row justify-center lg:justify-between gap-6 lg:gap-8 items-center">
        <div className="text-center lg:text-left">
          <h1 className="text-[30px] md:text-4xl lg:text-[56px] font-bold mb-7 leading-normal">
            <span className="text-primary">Affiliate program</span> <br /> We’re
            so excited to announce the TaskMama{" "}
            <span className="text-primary">Ambassador Program</span>
          </h1>
          <p className="text-lg lg:text-2xl text-[#4A4A4A]">
            This isn’t just about earning commission (though that’s a perk).
            It’s about becoming part of a supportive movement of moms who are
            juggling family and business, while lifting each other up along the
            way." Let me know if you'd like any further changes!
          </p>
        </div>
        <div className="w-full flex items-center justify-center lg:justify-end lg:items-end mt-12 lg:mt-0">
          <div className="relative">
            <Image
              src={"/images/groupGirlUsingLaptop.jpg"}
              height={800}
              width={800}
              alt="Mom Image"
              quality={75}
              className="absolute top-0 right-4 lg:right-6 h-[300px] md:h-[353px] w-[340px] sm:w-[400px] md:w-[560px] object-cover mx-auto rounded-[45px] -mt-4 lg:-mt-6 blur -z-10"
            />
            <Image
              src={"/images/groupGirlUsingLaptop.jpg"}
              height={800}
              width={800}
              quality={75}
              alt="Mom Image"
              className=" h-[300px] md:h-[353px] w-[340px] sm:w-[400px] md:w-[560px] object-cover mx-auto rounded-[45px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
