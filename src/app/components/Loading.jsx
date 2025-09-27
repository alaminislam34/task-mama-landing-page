// components/LoadingSpinner.jsx
"use client";

import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
    </div>
  );
}
