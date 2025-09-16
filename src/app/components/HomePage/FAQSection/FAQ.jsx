"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border-[3px] border-[#0000001F] rounded-[26px] space-y-6 lg:space-y-[30px] py-4 px-6 md:py-6 md:px-8 lg:py-[34px] lg:px-9"
    >
      <button className="w-full flex justify-between items-center font-semibold">
        <span className="font-lato font-medium text-sm md:text-lg lg:text-xl">
          {title}
        </span>
        <ChevronRight
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
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
      a: "Click on 'Forgot Password' on the login page and follow the instructions sent to your email.",
    },
    {
      q: "3. Do I need multiple apps to use all the features?",
      a: "Go to 'My Account' settings and select 'Edit Profile' to make changes.",
    },
    {
      q: "4.Does TaskMama work with Google Calendar and other tools?",
      a: "Go to 'My Account' settings and select 'Edit Profile' to make changes.",
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
