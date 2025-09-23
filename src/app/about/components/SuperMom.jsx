"use client";

import Image from "next/image";
import React from "react";

function SuperMom() {
  return (
    <section className="">
      <div className="max-w-[1440px] w-11/12 mx-auto flex flex-col lg:flex-row gap-16 items-center py-12 lg:py-28 relative">
        <Image
          src={"/icons/star1.png"}
          height={200}
          width={200}
          alt="Star icon"
          className="absolute h-[80px] md:h-[90px] lg:h-[102px] w-[80px] md:w-[90px] lg:w-[102px] -bottom-6 lg:bottom-0 right-0"
        />
        <div>
          <h1 className="text-[30px] md:text-4xl lg:text-[56px] font-bold font-lato mb-5 md:mb-7 lg:mb-10 leading-normal">
            For Moms Who Do It All—
            <span className="text-primary">and Own It</span>
          </h1>
          <p className="font-roboto mb-10 text-lg lg:text-2xl text-[#4A4A4A]">
            TaskMama is created by a mom, for moms—to help you organize your
            life, reclaim your time and energy, and focus on what matters most.
            It’s more than just an app; it’s a supportive community where moms
            encourage each other, celebrate every win, and redefine what it
            means to thrive in motherhood.
          </p>
        </div>
        <div className="relative">
          <div className="h-[328px] w-[350px] md:w-[420px] rounded-[45px] bg-[#E6E6FA8F] flex items-center justify-center "></div>
          <Image
            src={"/images/mom.png"}
            height={800}
            width={800}
            alt="Mom Image"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[373px] w-[260px] object-cover mx-auto"
          />
        </div>
      </div>
    </section>
  );
}

export default SuperMom;
