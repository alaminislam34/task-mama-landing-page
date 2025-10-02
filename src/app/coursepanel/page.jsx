// components/CoursesPanel.jsx
"use client";

import { useAuth } from "@/context/SessionProvider";
import { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaUserCircle,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import CoursePanelSkeleton from "./components/CoursePanelSkeleton";
import CourseCard from "./components/CourseCard";
import VideoModal from "./components/VideoModal";

// ------------------------------------------------
// UTILITY: Convert standard YouTube URL to embed URL
// Moved here for context, but should ideally be in a utils folder
// ------------------------------------------------
const getEmbedUrl = (url) => {
  try {
    const videoIdMatch = url.match(
      /(?:\/embed\/|watch\?v=|youtu\.be\/|\/v\/|\/e\/|embed\/|v=|vi=|\/v%3D|e%3D|\.be\/)([^"&?\/ ]{11})/i
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&autoplay=1`;
  } catch (e) {
    return null;
  }
};

// ------------------------------------------------
// Logout Handler
// ------------------------------------------------
const handleLogout = async () => {
  await fetch("/api/auth/logout", { method: "POST" });
  window.location.href = "/signin";
};

// ------------------------------------------------
// MAIN COMPONENT: CoursesPanel (Improved UI/UX)
// ------------------------------------------------
export default function CoursesPanel() {
  const { user, loading: loadingAuth } = useAuth();
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [errorFetching, setErrorFetching] = useState(null);
  const [courseToPlay, setCourseToPlay] = useState(null);

  // Combined fetch and auth logic
  useEffect(() => {
    if (!loadingAuth && !user) {
      window.location.href = "/signin";
      return;
    }

    if (user?.email) {
      const fetchCourses = async () => {
        setLoadingCourses(true);
        setErrorFetching(null);
        try {
          const res = await fetch(`/api/my-courses?email=${user.email}`);
          if (!res.ok) {
            throw new Error(`Failed to fetch courses (Status: ${res.status})`);
          }
          const data = await res.json();
          setPurchasedCourses(data.purchasedCourses || []);
        } catch (err) {
          console.error("Failed to fetch courses:", err);
          setErrorFetching(
            "Could not load your course list. Please try again."
          );
          setPurchasedCourses([]);
        } finally {
          setLoadingCourses(false);
        }
      };

      fetchCourses();
    }
  }, [loadingAuth, user]);

  if (loadingAuth || loadingCourses)
    return <CoursePanelSkeleton isAuthLoading={loadingAuth} />;

  // --- MAIN CONTENT ---
  return (
    <div className="min-h-[60vh] py-8">
      <div className="max-w-[1440px] w-11/12 mx-auto p-4 sm:p-6 lg:p-8">
        {/* HEADER: Modern and Elevated */}
        <header className="bg-white rounded-3xl shadow-2xl p-6 lg:p-10 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center border-l-4 border-primary">
          <div className="flex items-center mb-4 md:mb-0">
            {/* User Avatar Placeholder */}
            <div>
              <div className="relative w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mr-4 text-primary border-2 border-indigo-300">
                <FaUserCircle className="text-4xl w-full h-full" />
              </div>
            </div>
            <div>
              <h1 className="text-base sm:text-xl md:text-2xl font-extrabold text-gray-900 leading-tight">
                Welcome Back,{" "}
                {user?.name || user?.email.split("@")[0] || "Learner"}!
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Your personalized learning hub is ready.
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center text-sm lg:text-base px-6 py-3 cursor-pointer bg-red-500 text-white font-semibold rounded-full shadow-lg hover:bg-red-600 transition duration-300 transform whitespace-nowrap"
            title="Sign Out"
          >
            <FaSignOutAlt className="mr-2 w-4 h-4" />
            Logout
          </button>
        </header>

        {/* Courses Section Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <FaBookOpen className="text-primary mr-3 text-2xl" />
          Active Courses & Learning Paths
        </h2>

        {/* Error Message */}
        {errorFetching && (
          <div
            className="p-4 mb-8 text-lg text-red-800 bg-red-100 border-l-4 border-red-500 rounded-lg"
            role="alert"
          >
            <span className="font-semibold">Connection Error:</span>{" "}
            {errorFetching}
          </div>
        )}

        {/* Course List / Empty State */}
        {purchasedCourses.length === 0 ? (
          <div className="text-center p-16 bg-white rounded-2xl shadow-inner border border-dashed border-indigo-200">
            <p className="text-2xl text-gray-700 font-extrabold mb-4">
              It's Quiet Here... Start a New Journey! 🚀
            </p>
            <p className="text-gray-500 max-w-lg mx-auto mb-8">
              Looks like your course list is empty. Explore our catalog and find
              the perfect course to kickstart your growth.
            </p>
            <a
              href="/"
              className="inline-block px-10 py-4 bg-primary text-white font-extrabold text-lg rounded-full shadow-xl hover:bg-primary transition transform hover:scale-105 hover:shadow-2xl"
            >
              Explore All Courses
            </a>
          </div>
        ) : (
          /* COURSE GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
            {purchasedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onPlayCourse={setCourseToPlay}
              />
            ))}
          </div>
        )}

        {/* VIDEO MODAL */}
        {courseToPlay && (
          <VideoModal
            course={courseToPlay}
            onClose={() => setCourseToPlay(null)}
            getEmbedUrl={getEmbedUrl} // Pass the utility function
          />
        )}
      </div>
    </div>
  );
}
