"use client";

import React from "react";
import Accordion from "./FAQ";
import Image from "next/image";

function FAQSection() {
  return (
    <div>
      <div className="py-12 lg:py-20 max-w-[1440px] w-11/12 mx-auto">
        <h1 className="pb-8 lg:pb-12 text-2xl md:text-4xl lg:text-5xl font-bold font-lato leading-normal text-center px-6">
          Wondering if this will help you{" "}
          <span className="text-primary">feel lighter?</span>
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center my-8 lg:my-12">
          <Accordion />
          <div>
            <Image
              src={"/images/taskmamaApp.png"}
              height={800}
              width={500}
              alt="App Image"
              className=" mx-auto h-[580px] w-[320px] lg:h-[650px] lg:w-[350px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQSection;
