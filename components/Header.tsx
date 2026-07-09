"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSchoolYear } from "@/hooks/use-school-year";

const navItems = [
  { label: "ABOUT", href: "/about", match: "about" },
  { label: "PROGRAMS", href: "/programs", match: "programs" },
  { label: "NEWS", href: "/news", match: "news" },
  { label: "SSLG OFFICER", href: "/sslg", match: "sslg" },
  { label: "ADMISSIONS", href: "/admissions", match: "admissions" },
  { label: "CONTACT", href: "/contact", match: "contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const sy = useSchoolYear();
  const enrollOpen = sy?.isEnrollmentOpen ?? false;

  return (
    <>
      {/* Topbar */}
      <div className="hidden md:flex items-center justify-between bg-[#8B1010] text-white/75 font-sans text-[0.72rem] tracking-[0.4px] px-10 h-9">
        <span>DepEd Region VII - Central Visayas</span>
        <div className="flex gap-6">
          <a
            href="mailto:mabolonhs.cebucity@deped.gov.ph"
            className="font-sans text-white/75 hover:text-white transition-colors no-underline"
          >
            mabolonhs.cebucity@deped.gov.ph
          </a>
          <a
            href="tel:063266526"
            className="font-sans text-white/75 hover:text-white transition-colors no-underline"
          >
            (063) 266-5526
          </a>
        </div>
      </div>

      {/* Navbar */}
      <nav
        className="sticky top-0 z-[999] bg-white border-b border-gray-200 shadow-[0_1px_8px_rgba(0,0,0,0.06)] h-[72px] flex items-center justify-between gap-2 px-4 md:px-10 w-full"
      >
        <Link href="/" className="flex items-center gap-2.5 min-w-0 flex-1 no-underline">
          
          <div className="w-13 h-13 rounded-full border-[0.2px] border-gray-300 bg-red-50 flex items-center justify-center overflow-hidden flex-shrink-0">
            <img
              src="/image.png"
              alt="Mabolo National High School Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="min-w-0" style={{ overflow: "hidden", lineHeight: 1.25 }}>
            <span
              className="block font-sans font-bold text-[#8B1010] leading-tight truncate"
              style={{ fontSize: "clamp(0.68rem, 2.8vw, 0.95rem)" }}
            >
              MABOLO NATIONAL HIGH SCHOOL
            </span>
            <span className="hidden sm:block font-sans text-[0.65rem] text-gray-400 uppercase tracking-wide truncate">
              Mabolo, Cebu City &middot; Est. 1985
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center list-none gap-0 h-[72px] flex-shrink-0">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href} className="h-full flex items-center">
                <Link
                  href={item.href}
                  className={`flex items-center px-2 xl:px-3 pt-1 pb-[10px] font-sans text-[0.78rem] font-medium tracking-[0.3px] border-b-[3px] transition-colors duration-200 no-underline whitespace-nowrap ${
                    isActive
                      ? "text-[#b81c1c] border-[#b81c1c]"
                      : "text-gray-600 border-transparent hover:text-[#b81c1c] hover:border-[#b81c1c]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="h-full flex items-center pl-2">
            <Link
              href={enrollOpen ? "/admissions" : "/login"}
              className={`inline-flex items-center h-[38px] px-5 font-sans text-[0.75rem] font-semibold tracking-wide rounded-[3px] transition-colors no-underline whitespace-nowrap ${
                enrollOpen
                  ? "bg-[#b81c1c] hover:bg-[#8B1010] text-white"
                  : "bg-gray-900 hover:bg-gray-800 text-white"
              }`}
            >
              {enrollOpen ? "ENROLL NOW" : "LOGIN"}
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="lg:hidden flex items-center justify-center p-2 rounded text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 z-[9999] h-full bg-white shadow-2xl flex flex-col w-[280px] max-w-[85vw] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between bg-[#8B1010] px-5 py-[18px] flex-shrink-0">
          <span className="font-sans text-white font-bold text-[0.88rem]">MABOLO NATIONAL HS</span>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="flex items-center text-white/75 hover:text-white p-1 rounded transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <ul className="list-none flex-1 py-2.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-5 py-3.5 font-sans text-[0.9rem] font-medium border-l-[3px] transition-all no-underline ${
                    isActive
                      ? "text-[#b81c1c] bg-red-50 border-[#b81c1c]"
                      : "text-gray-600 border-transparent hover:text-[#b81c1c] hover:bg-red-50 hover:border-[#b81c1c]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="px-5 pb-6 flex-shrink-0">
          <Link
            href={enrollOpen ? "/admissions" : "/login"}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center justify-center w-full font-sans font-bold text-[0.84rem] py-3.5 rounded transition-colors no-underline ${
              enrollOpen
                ? "bg-[#b81c1c] hover:bg-[#8B1010] text-white"
                : "bg-gray-900 hover:bg-gray-800 text-white"
            }`}
          >
            {enrollOpen ? "ENROLL NOW" : "LOGIN"}
          </Link>
        </div>
      </div>
    </>
  );
}
