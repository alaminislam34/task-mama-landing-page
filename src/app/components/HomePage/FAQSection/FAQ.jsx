"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="border border-base-300 rounded-lg">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center px-4 py-3 font-semibold"
      >
        <span>{title}</span>
        <ChevronRight
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-3 text-sm text-gray-600">{content}</div>
      )}
    </div>
  );
};

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How do I create an account?",
      a: "Click the 'Sign Up' button in the top right corner and follow the registration process.",
    },
    {
      q: "I forgot my password. What should I do?",
      a: "Click on 'Forgot Password' on the login page and follow the instructions sent to your email.",
    },
    {
      q: "How do I update my profile information?",
      a: "Go to 'My Account' settings and select 'Edit Profile' to make changes.",
    },
  ];

  return (
    <div className="space-y-3">
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
