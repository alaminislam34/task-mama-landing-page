// components/CourseCard.jsx
import React from "react";
import { FaPlayCircle, FaChevronRight } from "react-icons/fa";

// Utility function to extract the Video ID for the thumbnail
// (No change needed here, but it's kept for the thumbnail generation)
const getEmbedUrl = (url) => {
  try {
    const videoIdMatch = url.match(
      /(?:\/embed\/|watch\?v=|youtu\.be\/|\/v\/|\/e\/|embed\/|v=|vi=|\/v%3D|e%3D|\.be\/)([^"&?\/ ]{11})/i
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&autoplay=1`; // Added autoplay for modal
  } catch (e) {
    return null;
  }
};


// 🚨 NOTE: The parent component (CoursesPanel.jsx) MUST pass an onPlayCourse prop.
const CourseCard = ({ course, onPlayCourse }) => {
  
  // Extract the raw Video ID for the high-quality YouTube thumbnail URL
  const videoId = getEmbedUrl(course.youtubeLink)?.split('/')[4]?.split('?')[0];

  // Fallback link for the main course page (if it exists)
  const courseLink = `/courses/${course.id}`; 
  
  // High-quality YouTube thumbnail URL
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '/placeholder-course.jpg';


  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 transform hover:scale-[1.01] group">
      
      {/* 1. Static Thumbnail Image */}
      <div className="aspect-video w-full relative overflow-hidden bg-gray-100">
        <img
          src={thumbnailUrl}
          alt={`Thumbnail for ${course.title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Optional: Add a subtle overlay to indicate clickability */}
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
            <FaPlayCircle className="text-white text-5xl opacity-0 group-hover:opacity-70 transition-opacity" />
        </div>
      </div>

      {/* 2. Course Info and Button */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2 mb-4 min-h-[56px]">
          {course.title}
        </h3>
        
        {/* 'Continue Course' Button to open Modal */}
        <button
          onClick={() => onPlayCourse(course)}
          className="w-full flex items-center justify-center px-4 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 transition duration-150 transform hover:scale-[1.02]"
          aria-label={`Continue watching ${course.title}`}
        >
          Continue Course <FaChevronRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CourseCard;