'use client'

import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

const images = [
  { href: "/images/man2.png" },
  { href: "/images/man3.jpg" },
  { href: "/images/man4.jpg" },
];

function HeroSection() {
  return (
    <div className="py-4 lg:pt-12">
      <div className="py-12 lg:py-14 relative">

        {/* star icon */}
      <div className="absolute -top-6 lg:top-4 -z-10 right-2 lg:right-8">
        <Image src={'/icons/star1.png'} width={400} height={400} alt="Star icon" className="w-[80px] h-[80px] lg:w-[102px] lg:h-[102px]"/>
      </div>
      <div className="absolute -bottom-8 lg:bottom-4 left-0 lg:left-12 -z-10">
        <Image src={'/icons/star1.png'} width={400} height={400} alt="Star icon" className="w-[80px] h-[80px] lg:w-[102px] lg:h-[102px]"/>
      </div>

      {/* heading */}
      <h1 className="text-[30px] md:text-4xl lg:text-[56px] font-bold font-lato mx-auto text-center lg:w-7/12 mb-7 leading-normal">
        Less chaos. More breathing room. Meet{" "}
        <span className="text-primary">TaskMama.</span>
      </h1>

      {/* sub title */}
      <p className="font-roboto text-center mb-10 text-lg lg:text-2xl text-[#4A4A4A]">
        Plan your day across roles with AI suggestions, shared family calendars,
        and simple business tools.
      </p>
      <div className="flex items-center justify-center">
        <div>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-3">
            <div className="flex flex-row">
              <Image
                src={"/images/man1.jpg"}
                height={100}
                width={100}
                alt="client image"
                className="w-[42px] h-[42px] rounded-full border border-white object-cover bg-cover"
              />
              {images.map((image) => (
                <Image
                  key={image.href}
                  src={image.href}
                  height={100}
                  width={100}
                  alt="client image"
                  className="w-[42px] h-[42px] rounded-full border border-white  object-cover bg-cover -ml-5"
                />
              ))}
            </div>
            <div className="space-y-1">
              <h3 className="text-base">Trusted by 5k+ Users</h3>
              <div className="flex flex-row gap-2 items-center">
                <div className="flex flex-row gap-[3px] items-center *:text-amber-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="text-xs font-light">4.3/5 ( 10k Reviews )</p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
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
        </div>
      </div>
    </div>
    <div className="mt-10 lg:mt-12 mx-auto">
      <Image src={'/images/appImage.png'} height={800} width={1227} alt="App Image" className="mx-auto"/>
    </div>
    </div>
  );
}

export default HeroSection;
