"use client";

import Image from "next/image";
import React from "react";

function WhatWeStandFor() {
  return (
    <section className="relative">
      <section className="bg-[#E6E6FA8F] w-full h-full absolute top-0 left-0 -z-10 blur-2xl py-20"></section>
      <div className="max-w-[1440px] w-11/12 mx-auto flex flex-col-reverse lg:flex-row gap-20 items-center py-12 lg:py-28 relative">
        <Image
          src={"/icons/star1.png"}
          height={200}
          width={200}
          alt="Star icon"
          className="absolute h-[80px] md:h-[90px] lg:h-[102px] w-[80px] md:w-[90px] lg:w-[102px] bottom-0 right-0"
        />

       <div className="w-full flex items-center justify-center lg:justify-start lg:items-start">
         <div className="relative">
          <Image
            src={"/images/smily.jpg"}
            height={800}
            width={800}
            alt="Mom Image"
            className="absolute top-0 left-0 h-[300px] md:h-[353px] w-[300px] md:w-[460px] object-cover mx-auto rounded-[45px] -mt-6 lg:-mt-9 blur -z-10 "
          />
          <Image
            src={"/images/smily.jpg"}
            height={800}
            width={800}
            alt="Mom Image"
            className=" h-[300px] md:h-[353px] w-[300px] md:w-[460px] object-cover mx-auto rounded-[45px] ml-6 md:ml-10 lg:ml-16"
          />
        </div>
       </div>

        <div className="lg:max-w-3xl">
          <h1 className="text-[30px] md:text-4xl lg:text-[56px] font-bold font-lato mb-5 md:mb-7 lg:mb-10 leading-normal">
            What We
            <span className="text-primary"> Stand For</span>
          </h1>
          <p className="font-roboto mb-10 text-lg lg:text-2xl text-[#4A4A4A]">
            At TaskMama, we believe moms deserve tools that truly support their
            daily lives. That means building with empathy, designing with
            simplicity, and always keeping balance at the heart of everything we
            do. We’re not just creating another productivity app — we’re
            creating a space where family, business, and self-care can live in
            harmony.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhatWeStandFor;
