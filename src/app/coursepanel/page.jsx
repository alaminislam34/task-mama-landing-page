"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CoursesPanel() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // user login না করলে login page এ redirect করো
      signIn();
    }
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {session?.user?.name}
      </h1>

      <p className="text-gray-700">
        Here you can access your purchased courses:
      </p>

      {/* এখানে course list দেখাবে */}
    </div>
  );
}
