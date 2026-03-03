"use client";

import Image from "next/image";
import React from "react";

const details = [
  {
    bold: "Share the load, don’t carry it alone  —",
    det: "Assign and track family responsibilities — even for kids — so everything doesn’t live only in your mind. ",
  },
  {
    bold: "Stop remembering everything —",
    det: "Plan meals, track groceries, and know what’s already there — without mental effort. ",
  },
  {
    bold: " Find what you need, without searching in your head —",
    det: "Scan items, label with QR, and keep everything easy to find — calm, clear, simple. ",
  },
];

function AppDetails() {
  return (
    <div className="max-w-[1440px] mx-auto w-11/12 py-6 md:py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="w-full mx-auto lg:mx-0">
          <div
            style={{
              backgroundImage: "url('/images/app2.png')",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-[250px] h-[400px] lg:w-[380px] lg:h-[680px] relative lg:ml-20 mx-auto lg:mx-0"
          >
            <Image
              src={"/images/addItem.png"}
              height={200}
              width={200}
              alt="App Image"
              className="absolute lg:top-32 top-16 lg:-right-20 -right-14 border border-primary rounded-xl h-[140px] w-[140px] lg:h-[200px] lg:w-[200px] object-cover"
            />
            <Image
              src={"/images/meeting.png"}
              height={200}
              width={357}
              alt="App Image"
              className="absolute bottom-14 lg:bottom-28 lg:-right-44 -right-14 border border-primary rounded-xl h-[35px] w-[185px] lg:w-[350px] lg:h-[64px] object-cover"
            />
            <Image
              src={"/images/itemList.png"}
              height={500}
              width={1500}
              alt="App Image"
              className="absolute lg:bottom-28 bottom-14 lg:-left-16 -left-14 border border-primary rounded-xl lg:h-[220px] lg:w-[200px] h-[160px] w-[140px] object-cover bg-cover bg-center"
            />
          </div>
        </div>
        <div>
          <p className="font-roboto mb-10 text-lg lg:text-2xl text-[#4A4A4A]">
            See everything without holding it in your head Color-coded family
            flow with Google sync - so nothing slips, and your mind stays
            lighter.{" "}
          </p>
          <ol className="list-disc space-y-[30px] lg:space-y-[36px] mx-auto w-11/12 ">
            {details.map(({ bold, det }, i) => (
              <li key={i} className="text-base md:text-lg lg:text-2xl">
                <span className="font-medium">{bold} </span>{" "}
                <span className="text-[#5C5C5C]">{det}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default AppDetails;
