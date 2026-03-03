"use client";

import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

function PricingSection() {
  const [isMamaMood, setIsMamaMood] = useState(true);

  // Clean, minimal feature item
  const FeatureItem = ({ text, isDark = false }) => (
    <li className="flex gap-3 items-start">
      <div
        className={`mt-1 shrink-0 ${isDark ? "text-[#8674bb]" : "text-[#8674bb]"}`}
      >
        <FaCheck size={12} />
      </div>
      <span
        className={`text-sm leading-tight ${isDark ? "text-gray-200" : "text-gray-600"}`}
      >
        {text}
      </span>
    </li>
  );

  return (
    <div className="bg-white py-16 md:py-24 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Simple Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
            Pricing <span className="text-[#8674bb]">Plans</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Simple, steady support for your home and mental load.
          </p>
        </div>

        {/* Clean Toggle */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200">
            <button
              onClick={() => setIsMamaMood(true)}
              className={`px-6 py-2.5 text-xs font-bold rounded-lg transition-all uppercase tracking-wider ${
                isMamaMood
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Home Mood
            </button>
            <button
              onClick={() => setIsMamaMood(false)}
              className={`px-6 py-2.5 text-xs font-bold rounded-lg transition-all uppercase tracking-wider ${
                !isMamaMood
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Work Mood
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div
          className={`grid grid-cols-1 gap-8 items-stretch ${isMamaMood ? "md:grid-cols-2 max-w-5xl mx-auto" : "max-w-xl mx-auto"}`}
        >
          {isMamaMood ? (
            <>
              {/* STARTER — BEGIN LIGHTLY */}
              <div className="flex flex-col p-8 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-colors">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Starter — Begin Lightly
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">Free</span>
                </div>
                <p className="text-sm text-gray-500 mb-6 font-medium italic">
                  A gentle place to begin.
                </p>
                <div className="text-[10px] font-bold text-[#8674bb] bg-[#8674bb]/10 px-3 py-1 rounded-full w-fit mb-8 uppercase tracking-tighter">
                  Try full calm for 7 days
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <FeatureItem text="One profile" />
                  <FeatureItem text="Personal & family task support" />
                  <FeatureItem text="Gentle daily flow guidance" />
                  <FeatureItem text="Limited Family Mood check-ins" />
                </ul>
                <button className="w-full py-3 px-6 rounded-xl border border-gray-200 text-gray-900 font-bold hover:bg-gray-50 transition-all uppercase text-xs tracking-widest">
                  Get Started
                </button>
              </div>

              {/* CALM — FAMILY SUPPORT */}
              <div className="flex flex-col p-8 rounded-2xl border-2 border-[#8674bb] bg-[#242430] shadow-xl relative z-10">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8674bb] text-white text-[10px] font-bold uppercase px-4 py-1 rounded-full tracking-widest">
                  Most Chosen
                </div>
                <h3 className="text-xs font-bold text-[#8674bb] uppercase tracking-widest mb-2">
                  Calm — Family Support
                </h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-white">$14.99</span>
                  <span className="text-gray-400 text-lg"> / month</span>
                </div>
                <div className="mb-6">
                  <span className="text-lg font-bold text-[#FDF6E3FD]">
                    $149.99
                  </span>
                  <span className="text-gray-400 text-sm"> / year</span>
                  <span className="ml-2 text-[10px] text-green-400 font-bold uppercase">
                    Best value - save $30
                  </span>
                </div>
                <p className="text-xs text-gray-300 mb-6 italic border-l-2 border-[#8674bb] pl-3">
                  Simple, steady support for home and mental load.
                </p>
                <ul className="space-y-4 mb-8 flex-grow">
                  <FeatureItem text="Multiple profiles (family + you)" isDark />
                  <FeatureItem text="Full Family Mood support" isDark />
                  <FeatureItem
                    text="Full AI support (Unload • Lighten Day • Calm)"
                    isDark
                  />
                  <FeatureItem text="Complete daily flow guidance" isDark />
                </ul>
                <div className="mt-auto pt-6 border-t border-white/10">
                  <p className="text-[10px] text-gray-400 text-center mb-4 uppercase tracking-tighter">
                    Less than $0.50/day for steady calm and daily support
                  </p>
                  <button className="w-full bg-[#8674bb] text-white py-3 px-6 rounded-xl font-bold hover:bg-[#7465a3] transition-all uppercase text-xs tracking-widest">
                    Start Family Support
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* FULL SUPPORT — FAMILY + WORK */}
              <div className="flex flex-col p-10 rounded-2xl border-2 border-[#8674bb] bg-[#242430] shadow-2xl relative">
                <h3 className="text-xs font-bold text-[#8674bb] uppercase tracking-widest mb-2">
                  Full Support — Family + Work
                </h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-white">$24.99</span>
                  <span className="text-gray-400 text-lg"> / month</span>
                  <span className="ml-2 text-[10px] text-gray-400 font-bold uppercase">
                    (Flexible)
                  </span>
                </div>
                <div className="mb-8">
                  <span className="text-2xl font-bold text-[#FDF6E3FD]">
                    $249.99
                  </span>
                  <span className="text-gray-400 text-lg"> / year</span>
                  <span className="ml-2 text-[10px] text-green-400 font-bold uppercase">
                    Best value- save $50
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-8 font-medium">
                  Complete support for your whole life.
                </p>
                <ul className="space-y-5 mb-10 flex-grow">
                  <FeatureItem text="Everything in Calm plan" isDark />
                  <FeatureItem text="Work / Business Mode unlocked" isDark />
                  <FeatureItem text="Scan & organization tools" isDark />
                  <FeatureItem
                    text="Full AI guidance across home + work"
                    isDark
                  />
                  <FeatureItem text="Complete daily balance system" isDark />
                </ul>
                <div className="mt-auto pt-6 border-t border-white/10">
                  <p className="text-[10px] text-gray-400 text-center mb-4 uppercase tracking-tighter">
                    Less than $0.70/day for full daily support
                  </p>
                  <button className="w-full bg-[#8674bb] text-white py-4 px-6 rounded-xl font-bold hover:bg-[#7465a3] transition-all uppercase text-xs tracking-widest">
                    Start Full Support
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Minimal Footer */}
        <p className="mt-12 text-center text-[10px] text-gray-400 uppercase tracking-widest">
          Everything your mind needs — in one calm system.
        </p>
      </div>
    </div>
  );
}

export default PricingSection;
