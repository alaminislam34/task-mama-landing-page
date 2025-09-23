'use client'

import Image from "next/image";
import React from "react";

function OurMission() {
  return (
    <section className="">
      <div className="max-w-[1440px] w-11/12 mx-auto flex flex-col lg:flex-row gap-16 items-center py-24 lg:py-40 relative">
        <Image
          src={"/icons/star1.png"}
          height={200}
          width={200}
          alt="Star icon"
          className="absolute h-[80px] md:h-[90px] lg:h-[102px] w-[80px] md:w-[90px] lg:w-[102px] top-0 left-0"
        />
        <div className="lg:max-w-3xl">
          <h1 className="text-[30px] md:text-4xl lg:text-[56px] font-bold font-lato mb-5 md:mb-7 lg:mb-10 leading-normal">
            Our
            <span className="text-primary"> Mission & Vision</span>
          </h1>
          <p className="font-roboto text-lg lg:text-2xl text-[#4A4A4A]">
            At TaskMama, our mission is to give moms the tools they need to stay
            organized, confident, and balanced every day. We’re driven by a
            vision of a world where moms never have to choose between family and
            business — where both can thrive together in harmony. By simplifying
            the chaos of daily life with smart, empathetic design, TaskMama
            empowers mompreneurs to grow their dreams while cherishing time with
            loved ones.
          </p>
        </div>
        <div className="w-full flex items-center justify-center lg:justify-end lg:items-end">
          <div className="relative">
            <div className="absolute top-0 left-0 h-[300px] md:h-[353px] w-[300px] md:w-[460px] bg-[#B0A2DA80] object-cover mx-auto rounded-[45px] -mt-4 lg:-mt-5 -ml-4 lg:-ml-5 blur -z-10"></div>
            <Image
              src={"/images/mission.jpg"}
              height={800}
              width={800}
              alt="Mom Image"
              className=" h-[300px] md:h-[353px] w-[300px] md:w-[460px] object-top object-cover bg-top mx-auto rounded-[45px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurMission;
