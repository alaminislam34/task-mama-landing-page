"use client";
import React from "react";
import AboutPageHeroSection from "../components/AboutUsPage/AboutPageHeroSection";
import SuperMom from "../components/AboutUsPage/SuperMom";

function AboutUs() {
  return (
    <section>
      <AboutPageHeroSection />
      <section className="bg-[#F6F4FB]/50 blur-3xl -my-28 h-[280px] lg:h-[446px] w-full rounded-full"></section>
      <SuperMom/>
    </section>
  );
}

export default AboutUs;
