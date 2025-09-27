// components/CoursesPanel.jsx
"use client";

import { useAuth } from "@/context/SessionProvider";
import { useEffect, useState } from "react";
import { FaBookOpen, FaUserCircle, FaSignOutAlt, FaTimes } from "react-icons/fa"; // Added FaTimes for modal close
import CoursePanelSkeleton from "./components/CoursePanelSkeleton";
import CourseCard from "./components/CourseCard";

// ------------------------------------------------
// UTILITY: Convert standard YouTube URL to embed URL
// This is needed by the modal to correctly embed the video
// ------------------------------------------------
const getEmbedUrl = (url) => {
  try {
    // Regex to find the video ID from various YouTube URL formats
    const videoIdMatch = url.match(
      /(?:\/embed\/|watch\?v=|youtu\.be\/|\/v\/|\/e\/|embed\/|v=|vi=|\/v%3D|e%3D|\.be\/)([^"&?\/ ]{11})/i
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!videoId) return null;

    // Added &autoplay=1 to start the video automatically when the modal opens
    return `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&autoplay=1`;
  } catch (e) {
    return null;
  }
};

// ------------------------------------------------
// NEW COMPONENT: Video Modal
// ------------------------------------------------
const VideoModal = ({ course, onClose }) => {
    const embedUrl = getEmbedUrl(course.youtubeLink);

    if (!embedUrl) return null;

    // Logic to close modal on ESC key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        // Modal Backdrop
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex justify-center items-center p-4 transition-opacity duration-300" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
        >
            {/* Modal Content */}
            <div 
                className="bg-white rounded-xl shadow-2xl relative w-full max-w-4xl transform transition-transform duration-300 scale-95" 
                onClick={(e) => e.stopPropagation()} // Stop click from closing modal
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-3 -right-3 p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition z-10"
                    aria-label="Close video player"
                >
                    <FaTimes className="w-5 h-5"/>
                </button>

                {/* Video Title */}
                <h3 id="video-modal-title" className="text-xl font-bold text-gray-800 p-4 border-b">
                    Currently Watching: {course.title}
                </h3>

                {/* Video Player */}
                <div className="aspect-video w-full">
                    <iframe
                        className="w-full h-full rounded-b-xl"
                        src={embedUrl}
                        title={`Course Video: ${course.title}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="eager"
                    />
                </div>
            </div>
        </div>
    );
};


// ------------------------------------------------
// MAIN COMPONENT: CoursesPanel
// ------------------------------------------------
const handleLogout = async () => {
  await fetch("/api/auth/logout", { method: "POST" });
  window.location.href = "/signin";
};

export default function CoursesPanel() {
  const { user, loading: loadingAuth } = useAuth();
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [errorFetching, setErrorFetching] = useState(null);

  // NEW STATE: To hold the course object for the modal
  const [courseToPlay, setCourseToPlay] = useState(null); 

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
        // --- COURSE GRID: Passes the setCourseToPlay function ---
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 md:py-12">
          {purchasedCourses.map((course) => (
            <CourseCard 
                key={course.id} 
                course={course} 
                onPlayCourse={setCourseToPlay} // NEW PROP
            />
          ))}
        </div>
      )}

      {/* ------------------ VIDEO MODAL ------------------ */}
      {courseToPlay && (
        <VideoModal 
            course={courseToPlay} 
            onClose={() => setCourseToPlay(null)} 
        />
      )}
    </div>
  );
}