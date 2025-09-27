'use client'

// components/CourseCard.jsx
import React from "react";
import { FaPlayCircle, FaChevronRight } from "react-icons/fa";

// Utility function to convert standard YouTube URL to embed URL
const getEmbedUrl = (url) => {
  try {
    const videoIdMatch = url.match(/(?:\/embed\/|watch\?v=|youtu\.be\/|\/v\/|\/e\/|embed\/|v=|vi=|\/v%3D|e%3D|\.be\/)([^"&?\/ ]{11})/i);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    
    // Default to a professional placeholder if ID is missing or URL is invalid
    if (!videoId) return null; 

    // Use loop=1&playlist=ID for looping (optional), modestbranding=1 for cleaner player
    return `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`;
  } catch (e) {
    return null;
  }
};

const CourseCard = ({ course }) => {
  // Use a professional, optimized placeholder image for faster loading
  const thumbnailUrl = `https://img.youtube.com/vi/${getEmbedUrl(course.youtubeLink)?.split('/')[4]?.split('?')[0]}/hqdefault.jpg`;
  const embedUrl = getEmbedUrl(course.youtubeLink);
  
  // State to handle lazy loading/placeholder display
  const [showVideo, setShowVideo] = React.useState(false);

  // Fallback link in case of invalid URL or local course content
  const courseLink = `/courses/${course.slug || course.id}`;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 transform hover:scale-[1.01] group">
      
      {/* Video Player / Placeholder */}
      <div className="aspect-video w-full relative">
        {embedUrl && (
          <>
            {showVideo ? (
              // 1. IFRAME: Only loads when explicitly requested (improves page speed)
              <iframe
                className="w-full h-full border-b border-gray-200"
                src={embedUrl}
                title={`Video for: ${course.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              // 2. PLACEHOLDER: Image with a prominent play button
              <div
                className="w-full h-full bg-cover bg-center flex items-center justify-center cursor-pointer"
                style={{ backgroundImage: `url(${thumbnailUrl})` }}
                onClick={() => setShowVideo(true)}
              >
                <div className="absolute inset-0 bg-black/30 transition-all duration-300 group-hover:bg-black/40"></div>
                <FaPlayCircle className="text-white text-5xl opacity-80 group-hover:opacity-100 transition-opacity z-10" />
              </div>
            )}
          </>
        )}
      </div>

      {/* Course Info */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2 mb-3">
          {course.title}
        </h3>
        
        {/* Continue Button */}
        <a 
          href={courseLink}
          className="w-full mt-3 flex items-center justify-center px-4 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 transition duration-150 transform hover:scale-[1.02]"
        >
          Continue Learning <FaChevronRight className="ml-2 w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default CourseCard;