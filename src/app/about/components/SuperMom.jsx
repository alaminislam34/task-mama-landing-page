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
            Built by a mom. For{" "}
            <span className="text-primary"> real life. </span>
          </h1>
          <p className="font-roboto mb-10 text-lg lg:text-2xl text-[#4A4A4A]">
            TaskMama was created from real motherhood — the invisible mental
            load, the constant remembering, the quiet pressure to hold
            everything together.
          </p>
          <p className="font-roboto mb-10 text-lg lg:text-2xl text-[#4A4A4A]">
            We didn’t build another productivity app.{" "}
          </p>
          <p className="font-roboto mb-10 text-lg lg:text-2xl text-[#4A4A4A]">
            We built a calm system — a place where everything has somewhere to
            go.{" "}
          </p>
          <p className="font-roboto mb-10 text-lg lg:text-2xl text-[#4a4a4a]">
            TaskMama helps you:{" "}
          </p>
          <ul className="flex flex-col gap-2 mb-10 text-lg lg:text-2xl text-[#4A4A4A]">
            <li>• carry less</li>
            <li>• think clearer</li>
            <li>• move through your day with more ease</li>
          </ul>
          <p className="font-roboto mb-10 text-lg lg:text-2xl text-[#4A4A4A]">
            This is not about doing more. It’s about holding less.
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
