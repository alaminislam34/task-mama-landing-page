"use client";

import Image from "next/image";
import React from "react";

function AboutPageHeroSection() {
  return (
    <section className="relative py-12 lg:py-16">
      <section className="bg-[#F6F4FB]/50 blur-lg absolute top-0 left-0 w-full h-full -z-10"></section>

      <div className="flex flex-col lg:flex-row gap-20 justify-between items-center max-w-[1440px] w-11/12 mx-auto">
        <div className="text-center lg:text-left flex flex-col items-center justify-center lg:justify-start lg:items-start">
          {/* about us page title */}
          <h1 className="text-[30px] md:text-4xl lg:text-[56px] font-bold font-lato mb-7 leading-normal">
            Built by Moms, for <span className="text-primary">Moms</span>
          </h1>

          {/* about us page subtitle */}
          <p className="font-roboto lg:max-w-2/3 mb-10 text-lg lg:text-2xl text-[#4A4A4A]">
            TaskMama was created to help every mom turn the beautiful chaos of
            family, work, and life into balance - all in one calming, empowering
            app.
          </p>

          {/* app link */}

          <div>
            <div className="flex items-center gap-2 pt-4 md:pt-6">
              <a href="">
                <Image
                  src={"/icons/playstore.png"}
                  width={500}
                  height={300}
                  alt="Google play icon"
                  className="w-[100px] h-[32px] lg:w-[120px] lg:h-[40px]"
                />
              </a>
              <a href="">
                <Image
                  src={"/icons/applestore.png"}
                  width={500}
                  height={300}
                  alt="Google play icon"
                  className="w-[100px] h-[32px] lg:w-[120px] lg:h-[40px]"
                />
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="relative h-[350px] md:h-[500px] w-[350px] md:w-[500px] lg:h-[525px] lg:w-[525px]">
            <div className="bg-[#9B84E1] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-2/4 h-2/4 blur-2xl -z-10"></div>
            <Image
              src={"/icons/star1.png"}
              height={200}
              width={200}
              alt="Star icon"
              className="absolute h-[80px] md:h-[90px] lg:h-[102px] w-[80px] md:w-[90px] lg:w-[102px] -top-5 -left-5"
            />
            <Image
              src={"/icons/star1.png"}
              height={200}
              width={200}
              alt="Star icon"
              className="absolute h-[80px] md:h-[90px] lg:h-[102px] w-[80px] md:w-[90px] lg:w-[102px] -bottom-5 -right-5"
            />
            <Image
              src={"/images/aboutPageImage.png"}
              height={600}
              width={600}
              alt="Hero section Image"
              loading="lazy"
              quality={75}
              className="h-[350px] md:h-[500px] w-[350px] md:w-[500px] lg:h-[525px] lg:w-[525px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPageHeroSection;
