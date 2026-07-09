"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim()) {
      setError("Please enter your account number or email.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen font-sans antialiased relative overflow-hidden">
      {/* Success Overlay */}
      <div className={`fixed inset-0 z-[999] flex flex-col items-center justify-center transition-all duration-300 p-6 ${success ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} style={{ background: "rgba(15,5,5,0.97)" }}>
        <div className="w-[72px] h-[72px] rounded-full border-2 border-yellow-500 flex items-center justify-center text-[28px] text-yellow-500 mb-5 animate-pulse">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <div className="text-[22px] font-bold text-white text-center">Welcome back!</div>
        <div className="text-xs text-gray-400 mt-2 text-center">Redirecting to your portal...</div>
      </div>

      {/* Background */}
      <div className="fixed inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/bg.jpg')", backgroundPosition: "center 30%" }} />
      <div className="fixed inset-0 z-[1]" style={{ background: "linear-gradient(135deg, rgba(15,5,5,0.88) 0%, rgba(139,16,16,0.60) 50%, rgba(15,5,5,0.82) 100%)" }} />

      {/* Card */}
      <div className="relative z-[2] bg-white rounded-2xl w-full max-w-[380px] mx-3 shadow-[0_32px_80px_rgba(0,0,0,0.5)] animate-[fadeUp_0.5s_ease_both]">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2 pt-5 pb-4 sm:pt-8 sm:pb-5">
          <div className="w-16 h-16 sm:w-[83px] sm:h-[83px] rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
            <img src="/image.png" alt="MNHS Logo" className="w-full h-full object-cover" />
          </div>
          <div className="text-center">
            <div className="text-sm sm:text-[18px] font-bold text-gray-900 leading-tight">Mabolo National High School</div>
            <div className="text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-[1.5px] font-medium mt-0.5">Academic Portal System</div>
          </div>
          <div className="w-[40px] h-[3px] bg-[#b81c1c] rounded-sm" />
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-[7px] text-[11.5px] text-[#8B1010] bg-[#f9eded] border border-[rgba(184,28,28,0.2)] rounded-md px-3 py-[9px] mb-3 mx-5 sm:mx-9 animate-[fadeUp_0.2s_ease_both]">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="px-5 sm:px-9">
          {/* Identifier */}
          <div className="mb-3">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-[0.8px] mb-1.5">Account No. or Email</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none transition-colors duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. 12345678 or user@mnhs.com"
                autoComplete="username"
                className="w-full pl-9 pr-3 h-[40px] sm:h-[44px] border-[1.5px] border-gray-200 rounded-lg text-sm text-gray-900 bg-[#F8F8F6] outline-none transition-[border-color,box-shadow] duration-200 appearance-none focus:border-[#b81c1c] focus:shadow-[0_0_0_3px_rgba(184,28,28,0.1)] focus:bg-white font-sans"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-[0.8px] mb-1.5">Password</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none transition-colors duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full pl-9 pr-10 h-[40px] sm:h-[44px] border-[1.5px] border-gray-200 rounded-lg text-sm text-gray-900 bg-[#F8F8F6] outline-none transition-[border-color,box-shadow] duration-200 appearance-none focus:border-[#b81c1c] focus:shadow-[0_0_0_3px_rgba(184,28,28,0.1)] focus:bg-white font-sans"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none text-gray-400 text-[13px] cursor-pointer p-1.5 transition-colors duration-200 hover:text-gray-900 min-w-8 min-h-8 flex items-center justify-center"
                aria-label="Toggle password visibility"
              >
                {showPw ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[42px] sm:h-[48px] bg-[#b81c1c] text-white border-none rounded-lg text-sm font-semibold cursor-pointer transition-[background,transform,box-shadow] duration-200 flex items-center justify-center gap-[9px] tracking-[0.3px] hover:bg-[#8B1010] hover:shadow-[0_6px_20px_rgba(184,28,28,0.35)] hover:-translate-y-px active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4m-5-4l5-5-5-5m5 5H3" /></svg>
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-4 sm:mt-5 pb-5 sm:pb-7" />
      </div>

      {/* Below-card links */}
      <div className="relative z-[2] flex items-center justify-center gap-6 mt-5">
        <Link href="/" className="text-white/50 hover:text-white text-[11px] font-medium uppercase tracking-[1px] transition-colors duration-200">
          Home
        </Link>
        <span className="text-white/20 text-[10px]">|</span>
        <Link href="/admissions" className="text-white/50 hover:text-white text-[11px] font-medium uppercase tracking-[1px] transition-colors duration-200">
          Enroll
        </Link>
        <span className="text-white/20 text-[10px]">|</span>
        <Link href="/forgot-password" className="text-white/50 hover:text-white text-[11px] font-medium uppercase tracking-[1px] transition-colors duration-200">
          Forgot Password
        </Link>
      </div>
    </div>
  );
}
