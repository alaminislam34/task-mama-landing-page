"use client";

import AppDetails from "./components/HomePage/AppDetails";
import AppMode from "./components/HomePage/AppMode";
import ChatbotSection from "./components/HomePage/ChatbotSection";
import FeaturesSection from "./components/HomePage/FeaturesSection";
import HeroSection from "./components/HomePage/HeroSection";
import PricingSection from "./components/HomePage/PricingSection";
import Testimonial from "./components/HomePage/Testimonial";

export default function Home() {
  return (
    <div className="font-roboto">
      <section className="relative">
        <section className="bg-[#F6F4FB]/50 blur-lg absolute top-0 left-0 w-full h-full -z-10"></section>
        <div className="max-w-[1440px] mx-auto w-11/12 ">
          <HeroSection />
        </div>
      </section>

      <FeaturesSection />
      <AppDetails/>
      <AppMode/>
      <ChatbotSection/>
      <PricingSection/>
      <Testimonial/>
    </div>
  );
}
