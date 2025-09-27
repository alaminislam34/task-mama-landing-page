"use client";

import { useAuth } from "@/context/SessionProvider";
import { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaUserCircle,
  FaSignOutAlt,
  FaSpinner,
} from "react-icons/fa"; // Added icons for better UX


const handleLogout = async () => {
  await fetch("/api/auth/logout", { method: "POST" });
  window.location.href = "/signin"; // redirect after logout
};

export default function CoursesPanel() {
  const { user, loading: loadingAuth, logout } = useAuth();
  // State for fetched courses
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  // State for the data fetching status
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    // 1. Redirect if authentication is complete and there's no user
    if (!loadingAuth && !user) {
      // Use router.push in a real Next.js app, but window.location.href works for a quick redirect
      window.location.href = "/signin";
      return;
    }

    // 2. Fetch courses only if the user is authenticated (and we have their email)
    if (user?.email) {
      const fetchCourses = async () => {
        setLoadingCourses(true);
        try {
          // Assuming the API returns an object with a 'purchasedCourses' array
          const res = await fetch(`/api/my-courses?email=${user.email}`);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          setPurchasedCourses(data.purchasedCourses || []);
        } catch (err) {
          console.error("Failed to fetch courses:", err);
          // Optionally, set an error state to display a message to the user
          // setErrorFetchingCourses(true);
          setPurchasedCourses([]); // Ensure it's an array even on error
        } finally {
          setLoadingCourses(false);
        }
      };

      fetchCourses();
    }
  }, [loadingAuth, user]);

  // --- LOADING / SKELETON STATE ---
  if (loadingAuth || loadingCourses)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-xl">
          <FaSpinner className="animate-spin text-primary text-3xl mb-3" />
          <p className="text-xl font-semibold text-gray-700">
            {loadingAuth ? "Authenticating..." : "Loading Your Courses..."}
          </p>
        </div>
      </div>
    );

  // --- MAIN CONTENT ---
  return (
    <div className="max-w-[1440px] w-11/12 mx-auto p-4 sm:p-6 lg:p-8 min-h-[70vh]">
      {/* Header and Logout */}
      <header className="bg-white rounded-xl shadow-md p-6 mb-8 flex justify-between items-center border-b border-primary">
        <div className="flex items-center">
          <FaUserCircle className="text-4xl text-primary mr-3" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Welcome, {user?.name || user?.email.split("@")[0] || "User"}!
            </h1>
            <p className="text-sm text-gray-500">
              Manage your progress and access your learning materials.
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 bg-red-500 cursor-pointer text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          title="Sign Out"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </header>

      {/* Courses Section Title */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
        <FaBookOpen className="text-primary mr-2" />
        Your Purchased Courses
      </h2>

      {/* Course List / Empty State */}
      {purchasedCourses.length === 0 ? (
        // --- EMPTY STATE ---
        <div className="text-center p-10 bg-white rounded-xl shadow-lg border border-gray-200">
          <p className="text-xl text-gray-600 font-medium mb-4">
            It looks like you haven't purchased any courses yet.
          </p>
          <p className="text-gray-500">
            Explore our catalog to start your learning journey!
          </p>
          {/* A CTA button for exploring courses would be great here */}
          {/* <a href="/courses" className="mt-4 inline-block px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">Browse Courses</a> */}
        </div>
      ) : (
        // --- COURSE GRID ---
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {purchasedCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 transform hover:scale-[1.01]"
            >
              {/* Video Player */}
              <div className="aspect-video w-full">
                {/* Security Note: Ensure that course.youtubeLink is a safe embed URL. 
                  For optimal performance, consider lazy-loading the iframe or using a static image 
                  as a placeholder until the user clicks to play.
                */}
                <iframe
                  className="w-full h-full border-b border-gray-200"
                  // Using modestbranding=1 to clean up the player slightly
                  src={`${course.youtubeLink}?modestbranding=1`}
                  title={`Video for: ${course.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Course Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2">
                  {course.title}
                </h3>
                {/* Add a button or link to continue the course */}
                <button
                  onClick={() =>
                    console.log(`Navigating to course: ${course.id}`)
                  }
                  className="w-full mt-3 px-4 py-2 bg-primary/20 text-black font-medium rounded-lg hover:bg-primary hover:text-white cursor-pointer transition duration-150"
                >
                  Continue Course
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
