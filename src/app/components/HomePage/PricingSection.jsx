import Image from "next/image";
import React from "react";
import { FaCheck } from "react-icons/fa";

function PricingSection() {
  return (
    <div className="relative pb-14">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full max-w-[1440px] w-11/12 mx-auto">
        <div className="w-full h-full relative mx-auto">
          {/* star icon */}
          <div className="absolute -bottom-12 -z-10 left-0">
            <Image
              src={"/icons/star1.png"}
              width={400}
              height={400}
              alt="Star icon"
              className="w-[80px] h-[80px] lg:w-[102px] lg:h-[102px]"
            />
          </div>
          <div className="absolute -bottom-12 -z-10 right-0">
            <Image
              src={"/icons/star1.png"}
              width={400}
              height={400}
              alt="Star icon"
              className="w-[80px] h-[80px] lg:w-[102px] lg:h-[102px]"
            />
          </div>
          <div className="absolute top-6 right-0 -z-10">
            <Image
              src={"/icons/star1.png"}
              width={400}
              height={400}
              alt="Star icon"
              className="w-[80px] h-[80px] lg:w-[102px] lg:h-[102px]"
            />
          </div>
        </div>
      </div>
      {/* section title description */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[#E6E6FA8F] blur-lg"></div>
        <div className="text-center max-w-6xl w-11/12 mx-auto py-12 lg:py-20 space-y-6 lg:space-y-10">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold font-lato leading-normal">
            Our Pricing <span className="text-primary">Plans</span>
          </h1>
          <p className="text-base md:text-xl lg:text-[32px] font-medium leading-normal text-[#5C5C5C]">
            Pick an account plan that fits your workflow
          </p>
        </div>
      </div>

      {/* pricing card section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 max-w-[1440px] w-11/12 mx-auto py-12 lg:py-20">
        <div className="bg-[#242430] rounded-[20px] text-white p-4 lg:p-6 md:-mr-4 z-0 lg:h-[574px] h-[500px] w-[350px] md:w-[364px]">
          <p className="text-base md:text-lg lg:text-[25px] font-medium tracking-tight mb-4">
            Starter
          </p>
          <div className="flex items-center gap-2.5">
            <h1 className="font-bold text-2xl md:text-4xl lg:text-[50px] font-poppins text-[#FDF6E3FD]">
              Free
            </h1>{" "}
            <p className="text-xs p-[10px] rounded-[5px] font-medium border border-primary">
              7 days Free Trial
            </p>
          </div>
          <ul className="font-poppins space-y-3 mt-28 px-4">
            <li className="flex flex-row gap-2 items-start">
              <span className="mt-1.5">
                <FaCheck className="text-[#A009B9] text-lg" />
              </span>{" "}
              <span className="text-sm md:text-base lg:text-xl">
                1 User Profile
              </span>
            </li>
            <li className="flex flex-row gap-2 items-start">
              <span className="mt-1.5">
                <FaCheck className="text-[#A009B9] text-lg" />
              </span>{" "}
              <span className="text-sm md:text-base lg:text-xl">
                Basic task manager(Personal/ Family task){" "}
              </span>
            </li>
            <li className="flex flex-row gap-2 items-start">
              <span className="mt-1.5">
                <FaCheck className="text-[#A009B9] text-lg" />
              </span>{" "}
              <span className="text-sm md:text-base lg:text-xl">
                Limited access on family mood
              </span>
            </li>
          </ul>
        </div>
        <div className="bg-[#242430] rounded-[20px] text-white p-4 lg:p-6 z-10 bg-gradient-to-b from-[#B0A2DA] to-[#9E8CD4] lg:h-[574px] h-[500px] w-[350px] md:w-[364px]">
          <p className="text-base md:text-lg lg:text-[25px] font-medium tracking-tight mb-4">
            Monthly Premium plan
          </p>
          <div className="flex items-center gap-2.5 relative">
            <h1 className="font-bold text-2xl md:text-4xl lg:text-[50px] font-poppins text-[#FDF6E3FD]">
              $14.99<span className="text-xs md:text-sm text-white">/Month</span>
            </h1>{" "}
            <span className="text-xs md:text-sm font-bold absolute top-0 right-0">
              (Recommended)
            </span>
          </div>
          <ul className="font-poppins space-y-3 mt-28 px-4">
            <li className="flex flex-row gap-2 items-start">
              <span className="mt-1.5">
                <FaCheck className="text-[#A009B9] text-lg" />
              </span>{" "}
              <span className="text-sm md:text-base lg:text-xl">
                Access multiple User Profile
              </span>
            </li>
            <li className="flex flex-row gap-2 items-start">
              <span className="mt-1.5">
                <FaCheck className="text-[#A009B9] text-lg" />
              </span>{" "}
              <span className="text-sm md:text-base lg:text-xl">
                Unlock the Boss Mood feature{" "}
              </span>
            </li>
            <li className="flex flex-row gap-2 items-start">
              <span className="mt-1.5">
                <FaCheck className="text-[#A009B9] text-lg" />
              </span>{" "}
              <span className="text-sm md:text-base lg:text-xl">
                Full access on family mood
              </span>
            </li>
            <li className="flex flex-row gap-2 items-start">
              <span className="mt-1.5">
                <FaCheck className="text-[#A009B9] text-lg" />
              </span>{" "}
              <span className="text-sm md:text-base lg:text-xl">
                Full access on AI Chatbot
              </span>
            </li>
          </ul>
        </div>
        <div className="bg-[#7D778E] rounded-[20px] text-white p-4 lg:p-6 md:-ml-4 z-0 lg:h-[574px] h-[500px] w-[350px] md:w-[364px]">
          <p className="text-base md:text-lg lg:text-[25px] font-medium tracking-tight mb-4">
            Yearly Premium plan
          </p>
          <div className="flex items-center gap-2.5">
            <h1 className="font-bold text-2xl md:text-4xl lg:text-[50px] font-poppins">
              <span className="text-[#FDF6E3FD]">$149.99</span><span className="text-xs md:text-sm font-bold">/Year</span>
            </h1>{" "}
          </div>
          <ul className="font-poppins space-y-3 mt-28 px-4">
            <li className="flex flex-row gap-2 items-start">
              <span className="mt-1.5">
                <FaCheck className="text-[#A009B9] text-lg" />
              </span>{" "}
              <span className="text-sm md:text-base lg:text-xl">
                Access multiple User Profile
              </span>
            </li>
            <li className="flex flex-row gap-2 items-start">
              <span className="mt-1.5">
                <FaCheck className="text-[#A009B9] text-lg" />
              </span>{" "}
              <span className="text-sm md:text-base lg:text-xl">
                Unlock the Boss Mood feature{" "}
              </span>
            </li>
            <li className="flex flex-row gap-2 items-start">
              <span className="mt-1.5">
                <FaCheck className="text-[#A009B9] text-lg" />
              </span>{" "}
              <span className="text-sm md:text-base lg:text-xl">
                Full access on family mood
              </span>
            </li>
            <li className="flex flex-row gap-2 items-start">
              <span className="mt-1.5">
                <FaCheck className="text-[#A009B9] text-lg" />
              </span>{" "}
              <span className="text-sm md:text-base lg:text-xl">
                Full access on AI Chatbot
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PricingSection;
