"use client";

import React from "react";
// Import all necessary icons for a clean look
import { FcGoogle } from "react-icons/fc";
import { RiAppleFill, RiLoginBoxLine } from "react-icons/ri"; 

export default function SignInPage() {
  // --- Authentication Logic ---
  // Google Login handler
  async function handleGoogleLogin() {
    try {
      // NOTE: In a production Next.js application using a library like NextAuth.js or Clerk,
      // you would use a client-side method like signIn('google') to handle the redirect.
      // This is the manual OAuth 2.0 flow for reference:
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID; 
      const redirectUri = "http://localhost:3000/api/auth/callback/google";
      const scope = encodeURIComponent("email profile openid");
      const responseType = "code";
      const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

      window.location.href = googleUrl; // Redirect to Google
    } catch (err) {
      console.error("Google login error:", err);
      // UX Improvement: Show a user-facing error message here
    }
  }

  // Apple Login handler (Placeholder)
  function handleAppleLogin() {
    console.log("Apple Login Tapped - Implementation Pending");
    // Implementation for Apple Sign-In goes here
  }

  // --- Component Render ---
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-sm bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <RiLoginBoxLine className="text-5xl text-primary mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back!
          </h1>
          <p className="text-md text-gray-500 mt-1">
            Sign in to access your course panel.
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="flex flex-col gap-5">
          
          {/* 1. Google Login (Primary, High-Contrast Button) */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 px-4 rounded-xl bg-white border-2 border-gray-200 text-gray-700 font-semibold shadow-sm flex items-center justify-center gap-3 transition duration-200 
                       hover:bg-gray-100 hover:border-gray-300 active:scale-[0.99] focus:ring-4 focus:ring-indigo-100 focus:outline-none cursor-pointer"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          {/* 2. Apple Login (Secondary, Dark-Themed Button) */}
          <button
            onClick={handleAppleLogin}
            // Temporarily disable with an appropriate style
            disabled={true} 
            className="w-full py-3 px-4 rounded-xl bg-black text-white font-semibold shadow-lg flex items-center justify-center gap-3 opacity-80 cursor-not-allowed transition duration-200"
            title="Apple Sign-In is currently unavailable"
          >
            <RiAppleFill className="text-2xl text-white" />
            Continue with Apple
          </button>
          
        </div>

        {/* Optional: Footer Text for Terms/Privacy */}
        <p className="text-xs text-gray-400 mt-8 text-center px-4">
          By continuing, you agree to our <a href="/terms" className="underline hover:text-indigo-600">Terms of Service</a> and <a href="/privacy" className="underline hover:text-indigo-600">Privacy Policy</a>.
        </p>

      </div>
    </div>
  );
}