'use client'

// src/components/SkeletonGrid.jsx
import React from 'react';

// Component to display a visually appealing skeleton loading state
const SkeletonCard = () => (
    <div className="bg-gray-50 rounded-2xl shadow-lg p-5 flex flex-col animate-pulse h-96">
        {/* Image Placeholder */}
        <div className="h-56 w-full bg-gray-200 rounded-t-xl mb-4"></div>
        
        {/* Title Placeholder */}
        <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
        
        {/* Price/Category Placeholder */}
        <div className="flex justify-between items-center mb-4">
            <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
            <div className="h-3 w-1/6 bg-gray-200 rounded"></div>
        </div>
        
        {/* Description Placeholder */}
        <div className="h-3 w-full bg-gray-200 rounded mb-1"></div>
        <div className="h-3 w-11/12 bg-gray-200 rounded mb-1"></div>
        <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
    </div>
);

const SkeletonGrid = () => {
    // Show 8 skeleton cards while loading
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-4">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
    );
};

export default SkeletonGrid;