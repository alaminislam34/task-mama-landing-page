"use client";

import Image from "next/image";
import React from "react";

function ChatbotSection() {
  return (
    <div>
      <div className="text-center max-w-6xl w-11/12 mx-auto py-12 lg:py-20 space-y-6 lg:space-y-10">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold font-lato leading-normal">
          Meet Your
          <span className="text-primary">AI Support</span>
        </h1>
        <p className="text-base md:text-xl lg:text-[32px] font-medium leading-normal text-[#5C5C5C]">
          A gentle guide that helps your day feel lighter — organizing what
          matters, easing the mental load, and keeping life steady.
        </p>
      </div>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[#E6E6FA8F] blur-lg -z-10"></div>
        <div>
          <div className="max-w-[1440px] w-11/12 mx-auto py-12 lg:py-20">
            <Image
              src={"/images/aipart.png"}
              height={1500}
              width={1800}
              alt="Chatbot Screenshot"
              className="lg:w-[808px] lg:h-[680px] mx-auto object-fill rounded-[50px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatbotSection;
