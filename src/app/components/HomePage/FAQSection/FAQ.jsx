"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border-[3px] border-[#0000001F] rounded-[26px] space-y-6 lg:space-y-[30px] py-4 px-6 md:py-6 md:px-8 lg:py-[34px] lg:px-9 cursor-pointer"
    >
      <button className="w-full flex justify-between items-center font-semibold cursor-pointer">
        <span className="font-lato font-medium text-sm md:text-lg lg:text-xl">
          {title}
        </span>
        <ChevronRight
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "-rotate-90" : "rotate-90"
          }`}
        />
      </button>
      {isOpen && (
        <div className="text-xs md:text-sm lg:text-[15px] text-[#00000069] leading-normal">
          {content}
        </div>
      )}
    </div>
  );
};

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "1. How does TaskMama’s AI help me plan my day?",
      a: "TaskMama gently organizes what’s on your mind — family needs, daily tasks, and priorities — into a realistic, flexible plan. You can adjust anytime, so your day feels guided, not pressured.",
    },
    {
      q: "2. Can my kids use the app too?",
      a: "Yes. TaskMama is designed for the whole family. Kids can have their own simple profiles to see chores and small responsibilities, all within a safe, parent-guided space. ",
    },
    {
      q: "3. Do I need multiple apps to use all the features? ",
      a: "No. Everything lives inside TaskMama — family calendar, tasks, meals, home flow, and work space — in one calm, simple system. ",
    },
    {
      q: "4. Which devices does TaskMama work on? ",
      a: "TaskMama works on iPhone and Android, giving you steady support wherever life happens — home, work, or in between. ",
    },
  ];

  return (
    <div className="space-y-4 md:space-y-5 lg:space-y-7">
      {faqs.map((faq, idx) => (
        <AccordionItem
          key={idx}
          title={faq.q}
          content={faq.a}
          isOpen={openIndex === idx}
          onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
        />
      ))}
    </div>
  );
}
