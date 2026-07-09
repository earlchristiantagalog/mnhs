"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen font-sans antialiased relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/bg.jpg')", backgroundPosition: "center 30%" }} />
      <div className="fixed inset-0 z-[1]" style={{ background: "linear-gradient(135deg, rgba(15,5,5,0.88) 0%, rgba(139,16,16,0.60) 50%, rgba(15,5,5,0.82) 100%)" }} />

      {/* Card */}
      <div className="relative z-[2] bg-white rounded-2xl w-full max-w-[380px] mx-3 shadow-[0_32px_80px_rgba(0,0,0,0.5)] animate-[fadeUp_0.5s_ease_both]">
        <div className="flex flex-col items-center gap-2 pt-5 pb-4 sm:pt-8 sm:pb-5">
          <div className="w-16 h-16 sm:w-[83px] sm:h-[83px] rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
            <img src="/image.png" alt="MNHS Logo" className="w-full h-full object-cover" />
          </div>
          <div className="text-center">
            <div className="text-sm sm:text-[18px] font-bold text-gray-900 leading-tight">Forgot Password</div>
            <div className="text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-[1.5px] font-medium mt-0.5">Academic Portal System</div>
          </div>
          <div className="w-[40px] h-[3px] bg-[#b81c1c] rounded-sm" />
        </div>

        {sent ? (
          <div className="px-5 sm:px-9 pb-6 sm:pb-8 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-[15px] sm:text-[16px] font-bold text-gray-900 mb-2">Check Your Email</h3>
            <p className="text-[11px] sm:text-[12px] text-gray-500 leading-relaxed mb-5 sm:mb-6">
              We&apos;ve sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold text-[#b81c1c] hover:text-[#8B1010] transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <div className="flex items-center gap-[7px] text-[11.5px] text-[#8B1010] bg-[#f9eded] border border-[rgba(184,28,28,0.2)] rounded-md px-3 py-[9px] mb-3 mx-5 sm:mx-9 animate-[fadeUp_0.2s_ease_both]">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="px-5 sm:px-9">
              <div className="mb-3 sm:mb-4">
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-[0.8px] mb-1.5">Email Address</label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    autoComplete="email"
                    className="w-full pl-9 pr-3 h-[40px] sm:h-[44px] border-[1.5px] border-gray-200 rounded-lg text-sm text-gray-900 bg-[#F8F8F6] outline-none transition-[border-color,box-shadow] duration-200 appearance-none focus:border-[#b81c1c] focus:shadow-[0_0_0_3px_rgba(184,28,28,0.1)] focus:bg-white font-sans"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-[42px] sm:h-[48px] bg-[#b81c1c] text-white border-none rounded-lg text-sm font-semibold cursor-pointer transition-[background,transform,box-shadow] duration-200 flex items-center justify-center gap-[9px] tracking-[0.3px] hover:bg-[#8B1010] hover:shadow-[0_6px_20px_rgba(184,28,28,0.35)] hover:-translate-y-px active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <div className="mt-4 sm:mt-5 pb-5 sm:pb-7 text-center">
              <Link href="/login" className="text-[11px] font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
