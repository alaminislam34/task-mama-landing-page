"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function CoursesPanel() {
  const { data: session, status } = useSession();
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") signIn(); // redirect to login

    if (session?.user?.email) {
      fetch(`/api/my-courses?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => setPurchasedCourses(data.purchasedCourses || []));
    }
  }, [status, session]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {session?.user?.name || session?.user?.email}
      </h1>

      <h2 className="text-xl font-semibold mb-4">Your Purchased Courses:</h2>

      {purchasedCourses.length === 0 ? (
        <p>You have not purchased any courses yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {purchasedCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <div className="aspect-video w-full mb-4 rounded-xl overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={course.youtubeLink}
                  title={course.title}
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
