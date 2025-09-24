"use client";

import React from "react";
import AboutPageHeroSection from "./components/AboutPageHeroSection";
import SuperMom from "./components/SuperMom";
import WhatWeStandFor from "./components/WhatWeStandFor";
import OurMission from "./components/OurMission";
import WhatGuides from "./components/WhatGuidesUs";
import JoinAffiliate from "./components/JoinAffiliate";

function AboutUs() {
  return (
    <section>
      <AboutPageHeroSection />
      <section className="bg-[#F6F4FB]/50 blur-3xl -my-28 h-[280px] lg:h-[346px] w-full rounded-full"></section>
      <SuperMom />
      <WhatWeStandFor />
      <OurMission />
      <WhatGuides />
      <JoinAffiliate/>
    </section>
  );
}

export default AboutUs;
