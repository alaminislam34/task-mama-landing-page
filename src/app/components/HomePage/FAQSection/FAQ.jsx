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
      a: "TaskMama’s AI looks at your family tasks, business to-dos, and personal goals, then suggests a realistic schedule you can adjust anytime.",
    },
    {
      q: "2. Can my kids use the app too?",
      a: "Yes! Task Mama is designed for the whole family. Kids can log in with their own profiles, see their chores— all in a safe, parent-controlled environment.",
    },
    {
      q: "3. Do I need multiple apps to use all the features?",
      a: "Nope — everything is built into Task Mama. From the family calendar to chores, meal planning, and inventory tracking, you get all the tools in one simple app.",
    },
    {
      q: "4. Which devices does Task Mama work on?",
      a: "Task Mama works on both iOS and Android devices, including smartphones and tablets. This means every family member can stay connected and organized, no matter what device they use.",
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
