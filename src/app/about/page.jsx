"use client";
import React from "react";
import AboutPageHeroSection from "../components/AboutUsPage/AboutPageHeroSection";
import SuperMom from "../components/AboutUsPage/SuperMom";
import WhatWeStandFor from "../components/AboutUsPage/WhatWeStandFor";
import OurMission from "../components/AboutUsPage/OurMission";

function AboutUs() {
  return (
    <section>
      <AboutPageHeroSection />
      <section className="bg-[#F6F4FB]/50 blur-3xl -my-28 h-[280px] lg:h-[346px] w-full rounded-full"></section>
      <SuperMom/>
      <WhatWeStandFor/>
      <OurMission/>
    </section>
  );
}

export default AboutUs;
