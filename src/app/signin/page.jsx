"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { RiAppleLine } from "react-icons/ri";

export default function SignInPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-2 text-center text-gray-800">
          Sign in
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Sign in with your preferred provider
        </p>

        <div className="flex flex-col gap-4">
          {/* Google Login */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full py-3 rounded-xl bg-white border flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          {/* Apple Login (disabled) */}
          <button
            disabled
            className="w-full py-3 rounded-xl bg-black text-white flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
          >
            <RiAppleLine className="text-2xl" />
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
}
