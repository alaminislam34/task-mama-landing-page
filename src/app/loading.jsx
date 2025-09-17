'use client'

import React from 'react'

export default function LoadingPage() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center bg-[#B0A2DA]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent" aria-hidden="true"></div>
        <span className="text-white text-lg font-medium" role="status" aria-live="polite">Loading...</span>
      </div>
    </div>
  )
}
