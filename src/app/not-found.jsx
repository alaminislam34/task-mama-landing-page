'use client'

import React from 'react'

export default function NotFoundPage() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-[#B0A2DA] text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>
      <a
        href="/"
        className="px-6 py-3 rounded-2xl bg-white text-[#B0A2DA] font-medium shadow hover:shadow-lg transition"
      >
        Go Home
      </a>
    </div>
  )
}
