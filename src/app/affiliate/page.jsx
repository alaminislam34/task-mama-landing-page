"use client";

import React from "react";
import HeroSection from "./components/HeroSection";
import TaskMamaBenifit from "./components/TaskMamaBenifit";
import AmbassadorCTA from "./components/AmbassadorCTA";
import ShopifyProducts from "./components/ShopifyProducts/ShopifyProducts";

function Affiliate() {
  return (
    <section>
      <HeroSection />
      <TaskMamaBenifit />
      <AmbassadorCTA />
    </section>
  );
}

export default Affiliate;
