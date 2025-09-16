"use client";

import React from "react";
import Accordion from "./FAQ";

function FAQSection() {
  return (
    <div>
      <div className="py-12 lg:py-20 max-w-[1440px] w-11/12 mx-auto">
        <h1 className="pb-8 lg:pb-12 text-2xl md:text-4xl lg:text-5xl font-bold font-lato leading-normal text-center px-6">
          Curious? Let's Clear <span className="text-primary">Things Up</span>
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
         <Accordion/>
        </div>
      </div>
    </div>
  );
}

export default FAQSection;
