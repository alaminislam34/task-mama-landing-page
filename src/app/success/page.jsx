"use client";

export default function SuccessPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 bg-gray-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-10 text-center border-t-8 border-primary">
        <div className="mx-auto mb-6 h-16 w-16 text-[#9071eb] text-6xl">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className="h-full w-full"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Congratulations! Your course is unlocked. Click below to go to your
          dashboard.
        </p>

        <a
          href="/coursepanel"
          className="inline-flex items-center justify-center w-full px-8 py-3 text-lg font-semibold transition duration-300 rounded-full shadow-lg bg-primary text-white hover:bg-[#9071eb]"
        >
          Go to My Courses
          <svg
            className="ml-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
