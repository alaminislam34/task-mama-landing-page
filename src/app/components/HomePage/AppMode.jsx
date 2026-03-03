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
        <div className="absolute -bottom-6 right-0 -z-10">
          <Image
            src={"/icons/star1.png"}
            width={400}
            height={400}
            alt="Star icon"
            className="w-[80px] h-[80px] lg:w-[102px] lg:h-[102px]"
          />
        </div>
        <div className="text-center py-12 space-y-6">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold font-lato leading-normal">
            For Moms Who <span className="text-primary">Carry a Lot </span>
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-[#5C5C5C] leading-normal md:leading-[40px]">
            Being a mom is beautiful — and mentally heavy. At TaskMama, we see
            you — the late nights, the constant remembering, the invisible load
            you carry every day. TaskMama was created by a mom, for moms — to
            give your mind a safe place for what it’s holding, so life can feel
            calmer, clearer, and easier to move through. More than an app,
            TaskMama is a supportive space where moms feel understood, share
            real life, and realize they don’t have to carry everything alone.
            You don’t have to push harder. You don’t have to hold it all. You
            can carry less — and live lighter.
          </p>
        </div>
        {/* app mode screen shot */}
        <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-16 items-center">
          <div className="flex flex-col gap-12 items-center justify-center">
            <h1 className="font-lato font-bold text-2xl md:text-3xl lg:text-4xl text-center leading-normal">
              Home Mode
            </h1>
            <Image
              src={"/images/homeMode.png"}
              height={1200}
              width={1200}
              alt="Home Mode"
              className="lg:w-[350px] lg:h-[680px] rounded-[50px] w-[300px] h-[580px] bg-center bg-cover  object-fitt"
            />
          </div>
          <div className="flex flex-col gap-12 items-center justify-center">
            <h1 className="font-lato font-bold text-2xl md:text-3xl lg:text-4xl text-center leading-normal">
              Work Mode - do this in app too
            </h1>
            <Image
              src={"/images/work.png"}
              height={1200}
              width={1200}
              alt="Work Mode - do this in app too"
              className="lg:w-[350px] lg:h-[680px] rounded-[50px] w-[300px] h-[580px] bg-center bg-cover object-fitt"
            />
          </div>
        </div>
      </div>
      <p className="text-base md:text-xl lg:text-[32px] text-center font-medium leading-normal py-10 md:py-16 lg:py-20 max-w-6xl mx-auto w-11/12 text-[#5C5C5C]">
        Move gently between home and work. See family flow, meals, and home —
        then shift to clients and business — without holding everything at once.
      </p>
    </div>
  );
}

export default AppMode;
