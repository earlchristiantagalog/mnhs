import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* 403 Number */}
        <div className="relative mb-6">
          <span className="text-[120px] sm:text-[180px] font-black text-gray-100 leading-none select-none">
            403
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-20 h-20 sm:w-28 sm:h-28 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">Access Denied</h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto mb-8">
          You don&apos;t have permission to access this page. Please contact the administrator or log in with the correct account.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Log In
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
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
