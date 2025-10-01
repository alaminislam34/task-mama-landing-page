'use client'

// components/CourseCard.jsx (Improved UI/UX)
import React from "react";
import { FaPlayCircle, FaChevronRight, FaCheckCircle, FaClock, FaUserTie } from "react-icons/fa";

// Utility function to extract the Video ID for the thumbnail
const getEmbedUrl = (url) => {
  try {
    const videoIdMatch = url.match(
      /(?:\/embed\/|watch\?v=|youtu\.be\/|\/v\/|\/e\/|embed\/|v=|vi=|\/v%3D|e%3D|\.be\/)([^"&?\/ ]{11})/i
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch (e) {
    return null;
  }
};

const CourseCard = ({ course, onPlayCourse }) => {
  
  // --- Enhanced Data Handling ---
  const currentProgress = course.progress > 0 && course.progress < 100 ? course.progress : 
                          course.progress >= 100 ? 100 : 0;
  const isCompleted = currentProgress === 100;

  const videoId = getEmbedUrl(course.youtubeLink)?.split('/')[4]?.split('?')[0];
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '/placeholder-course.jpg';
  const primaryColorClass = 'bg-indigo-600'; // Define a primary color for consistency

  return (
    <div className={`
        bg-white rounded-xl shadow-xl transition duration-300 overflow-hidden 
        border-b-4 ${isCompleted ? 'border-green-500' : 'border-indigo-600'}
        transform hover:-translate-y-1 hover:shadow-2xl group
      `}
    >
      
      {/* 1. Thumbnail with Play Overlay and Progress Bar */}
      <div className="aspect-video w-full relative overflow-hidden bg-gray-100 cursor-pointer" onClick={() => onPlayCourse(course)}>
        <img
          src={thumbnailUrl}
          alt={`Thumbnail for ${course.title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FaPlayCircle className="text-white text-6xl drop-shadow-lg" />
        </div>

        {/* Progress Bar (at the bottom of the image) */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-300/80">
            <div 
                className={`h-full transition-all duration-500 ${isCompleted ? 'bg-green-500' : 'bg-indigo-600'}`} 
                style={{ width: `${currentProgress}%` }}
            ></div>
        </div>

      </div>

      {/* 2. Course Info Section */}
      <div className="p-6">
        
        {/* Title */}
        <h3 className="text-xl font-extrabold text-gray-900 line-clamp-2 mb-2 min-h-[56px] leading-tight">
          {course.title}
        </h3>
        
        {/* Meta Data (Author & Duration) */}
        <div className="flex items-center text-sm text-gray-500 mb-4 justify-between border-b pb-3">
            <span className="flex items-center mr-4">
                <FaUserTie className="w-4 h-4 mr-1 text-gray-400" /> 
                {course.author || 'Instructor'}
            </span>
            <span className="flex items-center">
                <FaClock className="w-4 h-4 mr-1 text-gray-400" />
                {course.duration || 'N/A'}
            </span>
        </div>

        {/* Progress Status Text */}
        <div className="flex items-center justify-between mb-5">
            <p className="text-sm font-semibold text-gray-700">
                {isCompleted ? 'Status:' : 'Your Progress:'}
            </p>
            <span className={`text-base font-bold flex items-center ${isCompleted ? 'text-green-600' : 'text-indigo-600'}`}>
                {isCompleted ? (
                    <>
                        <FaCheckCircle className="w-4 h-4 mr-1" /> Completed
                    </>
                ) : (
                    `${currentProgress}%`
                )}
            </span>
        </div>

        {/* CTA Button: Dynamic Text and Color */}
        <button
          onClick={() => onPlayCourse(course)}
          className={`
            w-full flex items-center justify-center px-4 py-3 font-bold rounded-full shadow-lg transition duration-200 
            transform hover:scale-[1.03] focus:outline-none focus:ring-4 text-white
            ${isCompleted 
                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-300' 
                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-300'
            }
          `}
          aria-label={isCompleted ? `Review ${course.title}` : `Continue watching ${course.title}`}
        >
          <FaPlayCircle className="mr-2 w-5 h-5" />
          {isCompleted ? 'Review Course' : 'Resume Learning'}
          <FaChevronRight className="ml-2 w-4 h-4 opacity-70" />
        </button>
      </div>
    </div>
  );
};

export default CourseCard;