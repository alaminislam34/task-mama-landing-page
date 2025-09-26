// /app/success/page.js
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    if (sessionId) {
      setStatus("✅ Payment successful! Your course is unlocked.");
    }
  }, [sessionId]);

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-2xl font-bold">{status}</h1>
      <a
        href="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go Home
      </a>
    </div>
  );
}
