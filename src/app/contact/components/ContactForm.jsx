"use client";

import Image from "next/image";
import React from "react";

function ContactForm() {
  return (
    <section className="relative py-12 lg:pb-20">
      <div className="absolute top-0 left-0 w-full h-full  bg-[#B0A2DA]/10 blur-xl -z-10"></div>
      <div className="max-w-[1440px] w-11/12 mx-auto flex items-center justify-between">
        <div>
          <form className="space-y-4 lg:space-y-5 flex flex-col min-w-[490px]">
            <input
              type="email"
              placeholder="Email"
              className="py-3 lg:py-5 px-4 lg:px-6 lg:text-lg placeholder:text-[#6B6B6B] rounded-lg bg-white focus:outline-primary"
            />
            <input
              type="text"
              placeholder="Subject"
              className="py-3 lg:py-5 px-4 lg:px-6 lg:text-lg placeholder:text-[#6B6B6B] rounded-lg bg-white focus:outline-primary"
            />
            <textarea
              placeholder="Message"
              rows={5}
              className="py-3 lg:py-5 px-4 lg:px-6 lg:text-lg placeholder:text-[#6B6B6B] rounded-lg bg-white focus:outline-primary"
            ></textarea>
            <div className="flex justify-start items-center">
              <button className="lg:text-lg font-poppins text-white bg-[#C5BBE4] tracking-tight py-4 lg:py-6 px-8 lg:px-12 rounded-[40px_5px_50px_5px] mt-2 shadow-[0px_1.85px_3.15px_0px_#18A7B906,0px_8.15px_6.52px_0px_#18A7B90A,0px_20px_13px_0px_#18A7B90D,0px_38.52px_25.48px_0px_#18A7B90F,0px_64.81px_46.85px_0px_#18A7B913] cursor-pointer">
                Send Massage
              </button>
            </div>
          </form>
        </div>
        <div>
          <Image
            src={"/images/map.png"}
            height={600}
            width={800}
            alt="Map Image"
            className="lg:w-[782px] lg:h-[500px] object-center"
          />
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
