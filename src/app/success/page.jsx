// /app/success/page.js
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaSpinner } from "react-icons/fa"; // Import icons

// Define the colors for the component
const SUCCESS_COLOR = "text-green-500";
const BUTTON_COLOR = "bg-indigo-600 hover:bg-indigo-700";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  
  // State to manage the visual status
  const [status, setStatus] = useState("Processing Payment...");
  const [icon, setIcon] = useState(<FaSpinner className="animate-spin" />);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // In a real application, you would send the sessionId to your backend 
    // here to finalize the order and verify the payment status (e.g., Stripe API).
    
    // For this example, we assume success if a sessionId is present.
    if (sessionId) {
      // Simulate a small processing delay for a more realistic feel
      const timer = setTimeout(() => {
        setStatus("Payment Successful!");
        setIcon(<FaCheckCircle />);
        setIsSuccess(true);
      }, 1000); 

      return () => clearTimeout(timer); // Cleanup the timer
    } else {
      // Handle missing sessionId, which might indicate an error or direct access
      setStatus("Verification Pending. Please check your email.");
      setIcon(<FaSpinner className="animate-spin" />);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-10 text-center border-t-8 border-indigo-600">
        
        {/* Icon Area */}
        <div className={`mx-auto mb-6 ${isSuccess ? SUCCESS_COLOR : 'text-gray-400'}`}>
          <div className="text-6xl inline-block p-2">
            {icon}
          </div>
        </div>

        {/* Status Message */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          {status}
        </h1>
        
        {/* Confirmation Text */}
        <p className="text-gray-600 mb-8 text-lg">
          {isSuccess
            ? "Congratulations! Your order has been completed and your new course is now unlocked."
            : "We are verifying your payment details. This usually takes just a moment."
          }
        </p>

        {/* Call to Action Button */}
        <a
          href="/coursepanel"
          className={`inline-flex items-center justify-center w-full px-8 py-3 text-lg font-semibold text-white transition duration-300 rounded-full shadow-lg transform hover:scale-[1.02] ${BUTTON_COLOR} focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50`}
        >
          Go to My Courses
          <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}