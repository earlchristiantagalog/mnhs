"use client";

import { useState } from "react";
import Link from "next/link";

const stats = [
  { val: "2,500+", lbl: "Students" },
  { val: "120+", lbl: "Faculty & Staff" },
  { val: "4", lbl: "SHS Strands" },
  { val: "40+", lbl: "Years of Excellence" },
];

const jhsSubjects = [
  { title: "English", desc: "Communication skills, literature appreciation, and grammar mastery for academic and real-world contexts.", icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", bg: "#eff6ff", color: "#2563eb" },
  { title: "Filipino", desc: "Pag-unawa, pagsusuri, at pagsulat sa Filipino para sa iba't ibang layunin at konteksto.", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", bg: "#fef3c7", color: "#d97706" },
  { title: "Mathematics", desc: "Numeracy, algebraic thinking, geometry, statistics, and problem-solving across grade levels.", icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z", bg: "#f0fdf4", color: "#16a34a" },
  { title: "Science", desc: "Scientific method, biology, chemistry, physics, and earth science fundamentals.", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z", bg: "#fdf2f8", color: "#db2777" },
  { title: "Araling Panlipunan", desc: "Philippine history, geography, governance, economics, and cultural identity.", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", bg: "#f5f3ff", color: "#7c3aed" },
  { title: "TLE", desc: "Technology and Livelihood Education covering practical skills and livelihood projects.", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", bg: "#fff7ed", color: "#ea580c" },
  { title: "MAPEH", desc: "Music, Arts, Physical Education, and Health for holistic development.", icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3", bg: "#ecfdf5", color: "#059669" },
  { title: "Values Education", desc: "Moral development, character formation, and ethical decision-making.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", bg: "#fef2f2", color: "#dc2626" },
  { title: "Computer Education", desc: "Basic computer literacy, digital citizenship, and introductory computing skills.", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", bg: "#f0f9ff", color: "#0284c7" },
];

const strands = [
  {
    name: "STEM",
    track: "Academic Track",
    gradient: "linear-gradient(135deg,#1e3a5f 0%,#0f2040 100%)",
    badgeBg: "rgba(59,130,246,.2)",
    badgeText: "#93c5fd",
    dot: "#3b82f6",
    desc: "For students bound for engineering, medicine, IT, natural sciences, and research-based careers.",
    subjects: ["Pre-Calculus & Basic Calculus", "General Physics I & II", "General Chemistry I & II", "General Biology I & II", "Research / Capstone Project"],
  },
  {
    name: "ABM",
    track: "Academic Track",
    gradient: "linear-gradient(135deg,#1a3a1a 0%,#0d2010 100%)",
    badgeBg: "rgba(34,197,94,.2)",
    badgeText: "#86efac",
    dot: "#22c55e",
    desc: "Designed for future accountants, entrepreneurs, managers, and business professionals.",
    subjects: ["Business Mathematics", "Fundamentals of Accountancy", "Business Finance & Economics", "Organization & Management", "Applied Economics"],
  },
  {
    name: "HUMSS",
    track: "Academic Track",
    gradient: "linear-gradient(135deg,#3a1a4f 0%,#200d35 100%)",
    badgeBg: "rgba(168,85,247,.2)",
    badgeText: "#d8b4fe",
    dot: "#a855f7",
    desc: "For aspiring teachers, lawyers, social workers, writers, communicators, and public servants.",
    subjects: ["Creative Writing / Malikhaing Pagsulat", "Introduction to World Religions", "Community Engagement & Solidarity", "Philippine Politics & Governance", "Trends, Networks & Critical Thinking"],
  },
  {
    name: "TVL-ICT",
    track: "TVL Track",
    gradient: "linear-gradient(135deg,#3a2010 0%,#201008 100%)",
    badgeBg: "rgba(251,146,60,.2)",
    badgeText: "#fed7aa",
    dot: "#fb923c",
    desc: "TESDA-aligned strand preparing students for ICT industry certifications and immediate employment.",
    subjects: ["Computer Systems Servicing (NC II)", "Web & Graphic Design", "Programming (Java / Python Basics)", "Technical Drafting Fundamentals", "Work Immersion (OJT)"],
  },
];

const jhsReqs = [
  "Form 138 / Report Card (Original & Photocopy)",
  "Birth Certificate (PSA-authenticated)",
  "Certificate of Good Moral Character",
  "2x2 ID Picture (4 copies)",
  "Incoming Grade 7: Form 137 from Elementary School",
];

const shsReqs = [
  "Form 138 / Report Card (Original & Photocopy)",
  "Birth Certificate (PSA-authenticated)",
  "Certificate of Good Moral Character",
  "2x2 ID Picture (4 copies)",
  "Grade 10 Final Grade Sheet",
  "HS Graduation Diploma or Certificate",
];

export default function ProgramsPage() {
  const [activeTab, setActiveTab] = useState<"jhs" | "shs">("jhs");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ minHeight: "52vh" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-red-900 to-black" />
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/bg.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-red-800/20 blur-3xl pointer-events-none" style={{ transform: "translate(50%, -50%)" }} />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-yellow-400/5 blur-2xl pointer-events-none" style={{ transform: "translateY(50%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-28">
          <div className="flex items-center gap-2 font-sans text-xs text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors no-underline">Home</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/75">Programs</span>
          </div>
          <div className="max-w-2xl animate-fade-up">
            <div className="flex items-center gap-2 font-sans bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-[0.65rem] sm:text-xs font-semibold tracking-[3px] uppercase px-4 py-2 rounded-sm mb-5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 flex-shrink-0" />
              Academic Curriculum
            </div>
            <h1 className="font-sans text-[2.2rem] sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-4">
              Academic <span className="text-yellow-300">Programs</span>
            </h1>
            <p className="font-sans text-white/65 text-sm sm:text-base leading-relaxed font-light max-w-lg">
              Discover our comprehensive K to 12 curriculum offering JHS core subjects and specialized SHS strands designed to prepare every student for college, work, and life.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 sm:py-12" style={{ background: "#1E5631" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <div key={i} className={`${i < 3 ? "md:border-r md:border-white/20" : ""} px-2`}>
                <div className="font-sans text-3xl sm:text-4xl font-black text-yellow-300 leading-none mb-1">
                  {stat.val}
                </div>
                <div className="font-sans text-xs text-white/60 uppercase tracking-widest font-medium">
                  {stat.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 sm:py-28 bg-white" id="programs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-10 sm:mb-12">
            <span className="font-sans text-xs font-bold tracking-[3px] uppercase mb-2 block" style={{ color: "#8B1010" }}>
              Curriculum
            </span>
            <div className="w-12 h-0.5 mb-4 rounded-full" style={{ background: "#8B1010" }} />
            <h2 className="font-sans text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-3">
              Our Academic Offerings
            </h2>
            <p className="font-sans text-gray-500 text-sm sm:text-base leading-relaxed font-light max-w-xl">
              We offer a complete K to 12 curriculum spanning Junior and Senior High School, giving every learner a pathway to their future.
            </p>
          </div>

          {/* Level Tabs */}
          <div className="flex border-b-2 border-gray-200 mb-10">
            <button
              onClick={() => setActiveTab("jhs")}
              className={`font-sans px-6 sm:px-8 py-3 text-sm font-semibold tracking-wide -mb-[2px] transition-colors duration-200 ${
                activeTab === "jhs"
                  ? "border-b-2 -mb-[2px]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              style={activeTab === "jhs" ? { color: "#8B1010", borderBottomColor: "#8B1010" } : undefined}
            >
              Junior High School
            </button>
            <button
              onClick={() => setActiveTab("shs")}
              className={`font-sans px-6 sm:px-8 py-3 text-sm font-semibold tracking-wide -mb-[2px] transition-colors duration-200 ${
                activeTab === "shs"
                  ? "border-b-2 -mb-[2px]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              style={activeTab === "shs" ? { color: "#8B1010", borderBottomColor: "#8B1010" } : undefined}
            >
              Senior High School
            </button>
          </div>

          {/* JHS Panel */}
          {activeTab === "jhs" && (
            <div>
              <p className="font-sans text-gray-500 text-sm leading-relaxed font-light max-w-2xl mb-8">
                Grade 7 to Grade 10 students follow the K to 12 core curriculum, which builds foundational literacy, numeracy, scientific reasoning, and civic values across all learning areas.
              </p>

              <div className="font-sans text-[10px] font-bold uppercase tracking-[2px] text-gray-400 mb-5">
                Core Learning Areas
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 rounded-xl overflow-hidden border border-gray-200">
                {jhsSubjects.map((subj) => (
                  <div key={subj.title} className="group bg-white p-6 hover:bg-gray-50 transition-colors duration-200">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 flex-shrink-0"
                      style={{ background: subj.bg }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke={subj.color} strokeWidth="2" viewBox="0 0 24 24">
                        <path d={subj.icon} />
                      </svg>
                    </div>
                    <h4 className="font-sans font-bold text-gray-900 text-sm mb-1.5">
                      {subj.title}
                    </h4>
                    <p className="font-sans text-gray-500 text-xs leading-relaxed font-light">
                      {subj.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SHS Panel */}
          {activeTab === "shs" && (
            <div>
              <p className="font-sans text-gray-500 text-sm leading-relaxed font-light max-w-2xl mb-8">
                Senior High School at MNHS offers specialized strands under the Academic and TVL tracks. Each strand prepares students for college, technical-vocational programs, and employment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {strands.map((strand) => (
                  <div key={strand.name} className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col">
                    <div className="p-7" style={{ background: strand.gradient }}>
                      <span
                        className="font-sans inline-block text-[10px] font-black tracking-[2px] uppercase px-3 py-1 rounded-sm mb-4"
                        style={{ background: strand.badgeBg, color: strand.badgeText }}
                      >
                        {strand.track}
                      </span>
                      <h3 className="font-sans font-black text-white text-xl leading-tight mb-2">
                        {strand.name}
                      </h3>
                      <p className="font-sans text-white/60 text-sm leading-relaxed font-light">
                        {strand.desc}
                      </p>
                    </div>
                    <div className="bg-gray-50 border-t border-gray-200 p-6 flex-1">
                      <div className="font-sans text-[10px] font-bold uppercase tracking-[2px] text-gray-400 mb-4">
                        Specialized Subjects
                      </div>
                      <ul className="flex flex-col gap-2.5 list-none">
                        {strand.subjects.map((subj) => (
                          <li key={subj} className="flex items-center gap-2.5 font-sans text-sm text-gray-600 font-light">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: strand.dot }} />
                            {subj}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Admission Requirements */}
      <section className="py-20 sm:py-28 bg-gray-50" id="requirements">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-10 sm:mb-12">
            <span className="font-sans text-xs font-bold tracking-[3px] uppercase mb-2 block" style={{ color: "#8B1010" }}>
              Enrollment
            </span>
            <div className="w-12 h-0.5 mb-4 rounded-full" style={{ background: "#8B1010" }} />
            <h2 className="font-sans text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-3">
              Admission Requirements
            </h2>
            <p className="font-sans text-gray-500 text-sm sm:text-base leading-relaxed font-light max-w-xl">
              Below are the documentary requirements for incoming JHS and SHS students. All documents must be submitted to the Registrar&apos;s Office during enrollment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* JHS Requirements */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 sm:p-7 border-b border-gray-100 flex items-center gap-4" style={{ background: "linear-gradient(135deg,#8B1010 0%,#8B1010 100%)" }}>
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l9-5-9-5-9 5 9 5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-sans font-black text-white text-lg leading-tight">Junior High School</h3>
                  <p className="font-sans text-white/65 text-xs mt-0.5">Grades 7 &amp; 8 Incoming Students</p>
                </div>
              </div>
              <div className="p-6 sm:p-7">
                <ul className="flex flex-col gap-3.5 list-none">
                  {jhsReqs.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#8B10101a" }}>
                        <svg className="w-2.5 h-2.5" fill="none" stroke="#8B1010" strokeWidth="3" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-sans text-sm text-gray-600 leading-relaxed font-light">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SHS Requirements */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 sm:p-7 border-b border-gray-100 flex items-center gap-4" style={{ background: "linear-gradient(135deg,#1e3a5f 0%,#0f2040 100%)" }}>
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-sans font-black text-white text-lg leading-tight">Senior High School</h3>
                  <p className="font-sans text-white/65 text-xs mt-0.5">Grade 11 Incoming Students</p>
                </div>
              </div>
              <div className="p-6 sm:p-7">
                <ul className="flex flex-col gap-3.5 list-none">
                  {shsReqs.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#1e3a5f1a" }}>
                        <svg className="w-2.5 h-2.5" fill="none" stroke="#1e3a5f" strokeWidth="3" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-sans text-sm text-gray-600 leading-relaxed font-light">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#8B1010 0%,#8B1010 100%)" }}>
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle,#fff,transparent 70%)", transform: "translate(30%,-30%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle,#D4A017,transparent 70%)", transform: "translate(-30%,30%)" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <span className="font-sans text-[10px] font-bold tracking-[3px] uppercase text-yellow-300/80 mb-3 block">
            Ready to Start?
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            Begin Your Academic Journey
          </h2>
          <p className="font-sans text-white/65 text-sm sm:text-base leading-relaxed font-light max-w-lg mx-auto mb-8">
            Enrollment is open to all incoming Grade 7 and Senior High School students. Take the first step toward your future today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 font-sans bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold text-sm tracking-wide px-7 py-3.5 rounded transition-all hover:scale-105 no-underline shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Enroll Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-sans border border-white/40 hover:border-white/80 hover:bg-white/10 text-white font-semibold text-sm tracking-wide px-7 py-3.5 rounded transition-all no-underline"
            >
              Contact Us
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
