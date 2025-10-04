'use client'

import React from 'react'

export default function LoadingPage() {
  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#B0A2DA] border-t-transparent" aria-hidden="true"></div>
        <span className="text-[#B0A2DA] text-lg font-medium" role="status" aria-live="polite">Loading...</span>
      </div>
    </div>
  )
}
