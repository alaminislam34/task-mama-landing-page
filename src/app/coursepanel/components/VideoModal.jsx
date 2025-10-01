// components/components/VideoModal.jsx (Hypothetical)
"use client";
import { useEffect } from 'react';
import { FaTimes } from "react-icons/fa";

const VideoModal = ({ course, onClose, getEmbedUrl }) => {
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex justify-center items-center p-4 animate-fadeIn" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
        >
            {/* Modal Content - Increased size and border radius */}
            <div 
                className="bg-gray-900 rounded-2xl shadow-2xl relative w-full max-w-6xl transform animate-scaleUp" 
                onClick={(e) => e.stopPropagation()} // Stop click from closing modal
            >
                {/* Close Button - Larger and more accessible */}
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 p-3 bg-red-600 text-white rounded-full shadow-2xl hover:bg-red-700 transition duration-200 z-10 focus:outline-none focus:ring-4 focus:ring-red-400"
                    aria-label="Close video player"
                >
                    <FaTimes className="w-6 h-6"/>
                </button>

                {/* Video Title */}
                <h3 id="video-modal-title" className="text-2xl font-extrabold text-white p-6 pb-4">
                    Watching: <span className="text-indigo-400">{course.title}</span>
                </h3>

                {/* Video Player - Aspect Ratio for responsiveness */}
                <div className="aspect-video w-full bg-black">
                    <iframe
                        className="w-full h-full rounded-b-2xl"
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

export default VideoModal;