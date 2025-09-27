'use client'

// components/CoursePanelSkeleton.jsx
import React from "react";
import { FaSpinner } from "react-icons/fa";

const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 animate-pulse overflow-hidden">
    {/* Video Placeholder */}
    <div className="aspect-video w-full bg-gray-200"></div>
    {/* Info Placeholder */}
    <div className="p-5">
      <div className="h-5 w-3/4 bg-gray-200 rounded mb-3"></div>
      <div className="h-10 w-full bg-primary/30 rounded-lg"></div>
    </div>
  </div>
);

export default function CoursePanelSkeleton({ isAuthLoading }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center p-8">
      {/* Central Loading Box for Auth/Initial Load */}
      <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-2xl mb-12">
        <FaSpinner className="animate-spin text-primary text-4xl mb-4" />
        <p className="text-xl font-semibold text-gray-700">
          {isAuthLoading ? "Authenticating User..." : "Loading Your Courses..."}
        </p>
      </div>

      {/* Grid Skeleton */}
      {!isAuthLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}
    </div>
  );
}