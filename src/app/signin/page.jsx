"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const [providers, setProviders] = useState({});

  useEffect(() => {
    getProviders().then((prov) => setProviders(prov));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login / Signup</h1>

        {Object.values(providers).map((provider) => (
          <button
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className={`w-full py-3 mb-4 rounded text-white ${
              provider.name === "Email" ? "bg-blue-600" : "bg-red-500"
            } hover:opacity-90 transition`}
          >
            {provider.name === "Email"
              ? "Login / Signup with Email"
              : `Login with ${provider.name}`}
          </button>
        ))}
      </div>
    </div>
  );
}
