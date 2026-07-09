import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <div className="relative mb-6">
          <span className="text-[120px] sm:text-[180px] font-black text-gray-100 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-20 h-20 sm:w-28 sm:h-28 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">Page Not Found</h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Please check the URL or go back to the homepage.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
          <Link
            href="javascript:history.back()"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </Link>
        </div>
      </div>

      {/* Decorative Footer */}
      <div className="mt-12 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <img src="/image.png" alt="MNHS" className="w-5 h-5 rounded-full object-cover" />
          <span>Mabolo National High School</span>
        </div>
      </div>
    </div>
  );
}
