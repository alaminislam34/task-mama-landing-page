"use client";

import React from "react";
import HeroSection from "./components/HeroSection";
import TaskMamaBenifit from "./components/TaskMamaBenifit";
import AmbassadorCTA from "./components/AmbassadorCTA";
import ShopifyProduct from "./components/ShopifyProduct";

function Affiliate() {
  return (
    <section>
     <HeroSection/>
     <TaskMamaBenifit/>
     <AmbassadorCTA/>
     <ShopifyProduct/>
    </section>
  );
}

export default Affiliate;
