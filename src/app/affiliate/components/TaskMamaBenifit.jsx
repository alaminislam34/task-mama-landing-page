"use client";

import Image from "next/image";
import React from "react";

function TaskMamaBenifit() {
  return (
    <section className="overflow-hidden">
      <div className="max-w-[1440px] w-11/12 mx-auto flex flex-col-reverse gap-16 py-12 md:py-16 lg:py-20 lg:flex-row justify-between">
        <div className="flex items-center justify-center lg:justify-end lg:items-end mt-12 lg:mt-0">
          <div className="relative">
            <div className="absolute top-0 left-0 h-[300px] md:h-[353px] w-[300px] md:w-[460px] bg-[#B0A2DA80] object-cover mx-auto rounded-[45px] -mt-4 lg:-mt-5 -ml-4 lg:-ml-5 blur -z-10"></div>
            <Image
              src={"/images/motherDougher.jpg"}
              height={800}
              width={800}
              alt="Mom Image"
              className=" h-[300px] md:h-[353px] w-[300px] md:w-[460px] object-top object-cover bg-top mx-auto rounded-[45px]"
            />
          </div>
        </div>
        <div className="space-y-8 lg:w-3/5">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font-lato leading-normal">
            As a TaskMama Ambassador, you’l :
          </h1>
          <ul className="space-y-4">
            <li className="text-[#4a4a4a] text-base md:text-xl lg:text-2xl font-medium font-lato">
              <p>✨ Earn 20% commission on subscriptions, courses, and merch</p>
            </li>
            <li className="text-[#4a4a4a] text-base md:text-xl lg:text-2xl font-medium font-lato">
              <p>✨ Get exclusive perks + early access to feature</p>
            </li>
            <li className="text-[#4a4a4a] text-base md:text-xl lg:text-2xl font-medium font-lato">
              <p>✨ Join a supportive community of moms making an impac</p>
            </li>
            <li className="text-[#4a4a4a] text-base md:text-xl lg:text-2xl font-medium font-lato">
              <p>
                ✨ Share tools that actually help moms thrive, not just surviv
              </p>
            </li>
          </ul>
          <p className="text-[#584F73] font-bold text-base md:text-xl lg:text-[25px]">
            It’s 100% free to join, and you don’t need a huge following — just a
            heart for helping moms.
          </p>
        </div>
      </div>
    </section>
  );
}

export default TaskMamaBenifit;
