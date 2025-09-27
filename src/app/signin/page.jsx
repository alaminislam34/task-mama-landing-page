"use client";

import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { RiAppleFill, RiLoginBoxLine } from "react-icons/ri";
import { toast } from "react-toastify";

/**
 * SignInPage - Login page with social authentication
 * Currently supports Google OAuth; Apple login placeholder included.
 */
export default function SignInPage() {
  /**
   * Handle Google OAuth Login
   * Redirects user to Google's OAuth consent page.
   */
  const handleGoogleLogin = async () => {
    try {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      const appUrl = process.env.NEXT_PUBLIC_APP_URL;

      if (!clientId || !appUrl) {
        console.error("Google Login environment variables missing!");
        toast.error("Google login is not configured properly.");
        return;
      }

      const redirectUri = `${appUrl}/api/auth/callback/google`;
      const scope = encodeURIComponent("email profile openid");
      const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

      // Redirect to Google OAuth
      window.location.href = googleUrl;
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to initiate Google login. Please try again.");
    }
  };

  /**
   * Placeholder for Apple Login
   * Currently disabled in the UI.
   */
  const handleAppleLogin = () => {
    console.log("Apple Login tapped - Implementation pending");
    toast.info("Apple login is not implemented yet.");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-sm bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-gray-100">
        {/* Header Section */}
        <header className="text-center mb-8">
          <RiLoginBoxLine className="text-5xl text-primary mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="text-md text-gray-500 mt-1">
            Sign in to access your course panel.
          </p>
        </header>

        {/* Social Login Buttons */}
        <section className="flex flex-col gap-5">
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 px-4 rounded-xl bg-white border-2 border-gray-200 text-gray-700 font-semibold shadow-sm flex items-center justify-center gap-3 transition duration-200 
                       hover:bg-gray-100 hover:border-gray-300 active:scale-[0.99] focus:ring-4 focus:ring-indigo-100 focus:outline-none cursor-pointer"
            aria-label="Continue with Google"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          {/* Apple Login Button (Disabled) */}
          <button
            onClick={handleAppleLogin}
            disabled
            className="w-full py-3 px-4 rounded-xl bg-black text-white font-semibold shadow-lg flex items-center justify-center gap-3 opacity-80 cursor-not-allowed transition duration-200"
            aria-label="Continue with Apple (currently unavailable)"
            title="Apple Sign-In is currently unavailable"
          >
            <RiAppleFill className="text-2xl text-white" />
            Continue with Apple
          </button>
        </section>

        {/* Footer Terms */}
        <footer className="text-xs text-gray-400 mt-8 text-center px-4">
          By continuing, you agree to our{" "}
          <a
            href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            target="_blank"
            className="underline hover:text-indigo-600"
          >
            Terms and Conditions
          </a>
          &
          <Link
            href="/privacy-policy"
            className="underline hover:text-indigo-600"
          >
            Privacy Policy
          </Link>
          .
        </footer>
      </div>
    </div>
  );
}
