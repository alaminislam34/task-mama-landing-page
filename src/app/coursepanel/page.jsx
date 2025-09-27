// components/CoursesPanel.jsx
"use client";

import { useAuth } from "@/context/SessionProvider";
import { useEffect, useState } from "react";
import { FaBookOpen, FaUserCircle, FaSignOutAlt } from "react-icons/fa"; 
import CoursePanelSkeleton from "./components/CoursePanelSkeleton";
import CourseCard from "./components/CourseCard";
// import CourseCard from "./CourseCard"; 
// import CoursePanelSkeleton from "./CoursePanelSkeleton"; 

const handleLogout = async () => {
  // Assuming useAuth provides a clean logout method
  await fetch("/api/auth/logout", { method: "POST" });
  window.location.href = "/signin"; // Redirect after logout
};

export default function CoursesPanel() {
  const { user, loading: loadingAuth } = useAuth();
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [errorFetching, setErrorFetching] = useState(null);

  useEffect(() => {
    // 1. Handle Redirect
    if (!loadingAuth && !user) {
      window.location.href = "/signin"; 
      return;
    }

    // 2. Fetch Courses
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
          // Assume data structure is { purchasedCourses: [...] }
          setPurchasedCourses(data.purchasedCourses || []);
        } catch (err) {
          console.error("Failed to fetch courses:", err);
          setErrorFetching("Could not load your course list. Please try again.");
          setPurchasedCourses([]);
        } finally {
          setLoadingCourses(false);
        }
      };

      fetchCourses();
    }
  }, [loadingAuth, user]);

  // --- LOADING / SKELETON STATE ---
  if (loadingAuth || loadingCourses)
    return <CoursePanelSkeleton isAuthLoading={loadingAuth} />;

  // --- MAIN CONTENT ---
  return (
    <div className="max-w-[1440px] w-11/12 mx-auto p-4 sm:p-6 lg:p-8 min-h-[70vh] font-sans">
      
      {/* Header and Logout */}
      <header className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center border-t-4 border-primary">
        <div className="flex items-center mb-4 sm:mb-0">
          <FaUserCircle className="text-5xl text-primary mr-4" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
              Welcome Back, {user?.name || user?.email.split("@")[0] || "Learner"}!
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Your personalized learning space.
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center px-5 py-2.5 bg-red-600 text-white font-medium rounded-xl shadow-md hover:bg-red-700 transition duration-200 transform hover:scale-[1.02] text-sm"
          title="Sign Out"
        >
          <FaSignOutAlt className="mr-2 w-4 h-4" />
          Logout
        </button>
      </header>

      {/* Courses Section Title */}
      <h2 className="text-3xl font-bold text-gray-700 mb-8 flex items-center border-b pb-2">
        <FaBookOpen className="text-primary mr-3 text-2xl" />
        Your Active Courses
      </h2>

      {/* Error Message */}
      {errorFetching && (
         <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            <span className="font-medium">Error:</span> {errorFetching}
        </div>
      )}

      {/* Course List / Empty State */}
      {purchasedCourses.length === 0 ? (
        // --- EMPTY STATE ---
        <div className="text-center p-12 bg-gray-50 rounded-2xl shadow-inner border border-dashed border-gray-300">
          <p className="text-2xl text-gray-600 font-bold mb-4">
            No Active Courses Found 📚
          </p>
          <p className="text-gray-500 max-w-lg mx-auto mb-6">
            It looks like your course list is empty. Start a new chapter in your learning journey today!
          </p>
          <a href="/courses" 
             className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-primary/90 transition transform hover:scale-105"
          >
            Browse All Courses
          </a>
        </div>
      ) : (
        // --- COURSE GRID ---
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {purchasedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}