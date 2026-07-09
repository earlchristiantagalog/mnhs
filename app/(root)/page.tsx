"use client";

import Link from "next/link";
import { useSchoolYear } from "@/hooks/use-school-year";

const programs = [
  {
    title: "STEM",
    desc: "Senior High School strand focused on science, technology, engineering, and mathematics.",
    tag: "Academic Track",
    icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  },
  {
    title: "ABM",
    desc: "Senior High School strand focused on accountancy, business, and management.",
    tag: "Academic Track",
    icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
  },
  {
    title: "HUMSS",
    desc: "Senior High School strand focused on humanities and social sciences.",
    tag: "Academic Track",
    icon: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  },
  {
    title: "TVL",
    desc: "Senior High School strand focused on technical-vocational skills and employability.",
    tag: "TVL Track",
    icon: "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z",
  },
];

const stats = [
  { val: "2,500+", lbl: "Students" },
  { val: "120+", lbl: "Faculty & Staff" },
  { val: "40", lbl: "Years of Excellence" },
  { val: "98%", lbl: "Pass Rate" },
];

const cards = [
  { title: "Mission", body: "To provide quality basic education that develops holistically Filipino learners equipped with 21st-century skills.", icon: "fa-bullseye" },
  { title: "Vision", body: "A premier institution of learning producing globally competitive, morally upright, and socially responsible citizens.", icon: "fa-eye" },
  { title: "Core Values", body: "Maka-Diyos, Maka-Tao, Makakalikasan, at Makabansa.", icon: "fa-star" },
  { title: "Achievements", body: "Multiple regional & national awards in academics, sports, and the arts.", icon: "fa-trophy" },
];

const admissionsSteps = [
  { title: "Online Registration", desc: "Fill out the online enrollment form with your complete details and required information." },
  { title: "Document Submission", desc: "Submit your Form 138, Birth Certificate, and other required documents to the registrar." },
  { title: "Assessment & Verification", desc: "Our staff will verify your documents and assess your academic standing." },
  { title: "Confirmation", desc: "Receive your enrollment confirmation and class schedule via email or SMS." },
];

export default function Home() {
  const sy = useSchoolYear();
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-red-900 to-black" />
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/bg.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-red-800/20 blur-3xl pointer-events-none" style={{ transform: "translate(50%, -50%)" }} />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-yellow-400/5 blur-2xl pointer-events-none" style={{ transform: "translateY(50%)" }} />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-sans bg-yellow-400/10 border border-yellow-400/35 text-yellow-300 text-[0.65rem] sm:text-xs font-semibold tracking-[2px] sm:tracking-[3px] uppercase px-3 sm:px-4 py-2 rounded-sm mb-5 w-fit max-w-full animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 flex-shrink-0" />
              <span className="font-sans truncate">Welcome to MNHS</span>
            </div>

            <h1 className="font-sans text-[2.2rem] sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-5 animate-fade-up">
              Mabolo National
              <br />
              High School
            </h1>

            <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed font-light max-w-lg mb-8 animate-fade-up" style={{ animationDelay: "100ms" }}>
              Empowering minds, building character, and shaping the future through quality education since 1985.
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "200ms" }}>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 font-sans text-white font-semibold text-sm tracking-wide px-6 py-3 rounded transition-all no-underline shadow-lg hover:opacity-90"
                style={{ background: "#8B1010" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Enroll Now
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-sans border border-white/40 hover:border-white/80 hover:bg-white/10 text-white font-semibold text-sm tracking-wide px-6 py-3 rounded transition-all no-underline"
              >
                Learn More
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-forest py-10 sm:py-12" style={{ background: "#1E5631" }}>
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

      {/* About Section */}
      <section className="py-20 sm:py-28 bg-white" id="about">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div
                className="aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center relative"
                style={{ background: "linear-gradient(135deg,#fef3c7,#fde68a)" }}
              >
                <svg className="w-20 h-20 text-amber-400/40 absolute" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div
                className="absolute -bottom-5 -right-4 sm:-bottom-6 sm:-right-6 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center text-white text-center shadow-xl"
                style={{ background: "#8B1010" }}
              >
                <span className="font-sans text-2xl sm:text-3xl font-black leading-none">40</span>
                <span className="font-sans text-[10px] sm:text-xs uppercase tracking-wider opacity-80 leading-tight mt-0.5 px-2">
                  Years
                </span>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl bg-red-50 border border-red-100 -z-10" />
            </div>

            <div className="order-1 lg:order-2">
              <span className="font-sans text-xs font-bold tracking-[3px] uppercase mb-2 block" style={{ color: "#8B1010" }}>
                ABOUT US
              </span>
              <div className="w-12 h-0.5 mb-4 rounded-full" style={{ background: "#8B1010" }} />
              <h2 className="font-sans text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
                A Legacy of Learning
                <br />
                Since <span style={{ color: "#8B1010" }}>1985</span>
              </h2>
              <p className="font-sans text-gray-500 text-sm sm:text-base leading-relaxed font-light mb-3">
                Mabolo National High School has been a pillar of academic excellence in Cebu City for over four decades. We are committed to nurturing well-rounded individuals equipped with the knowledge and values needed for the future.
              </p>
              <p className="font-sans text-gray-500 text-sm sm:text-base leading-relaxed font-light mb-6">
                Our dedicated faculty and modern facilities provide an ideal environment for learning, growth, and personal development.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-200 rounded-xl overflow-hidden border border-gray-200">
                {cards.map((card) => (
                  <div key={card.title} className="bg-white p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#8B1010" }} />
                      <span className="font-sans text-xs font-bold uppercase tracking-wide text-gray-800">
                        {card.title}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 sm:py-28 relative overflow-hidden" id="programs" style={{ background: "#8B1010" }}>
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-30 pointer-events-none"
          style={{ background: "rgba(0,0,0,.3)", transform: "translate(33%,-50%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "rgba(0,0,0,.2)", transform: "translate(-33%,50%)" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
            <div>
              <span className="font-sans text-xs font-bold tracking-[3px] uppercase mb-2 block text-yellow-300/80">
                PROGRAMS
              </span>
              <div className="w-12 h-0.5 mb-3 rounded-full bg-yellow-400" />
              <h2 className="font-sans text-3xl sm:text-4xl font-black text-white leading-tight">
                Senior High School
                <br />
                Academic Programs
              </h2>
            </div>
            <p className="font-sans text-white/65 text-sm leading-relaxed max-w-xs font-light">
              Choose the strand that aligns with your passion and career goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden border border-white/10">
            {programs.map((program, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <div
                  key={program.title}
                  className="group bg-white/10 p-7 sm:p-8 hover:bg-white/20 transition-colors duration-200 cursor-default"
                >
                  <div className="font-sans text-3xl font-black text-white/15 group-hover:text-white/30 transition-colors leading-none mb-4">
                    {num}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-white/10 group-hover:bg-white/20 flex items-center justify-center mb-4 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path d={program.icon} />
                    </svg>
                  </div>
                  <h3 className="font-sans font-bold text-white text-base leading-snug mb-2">
                    {program.title}
                  </h3>
                  <p className="font-sans text-white/65 text-sm leading-relaxed font-light mb-4">
                    {program.desc}
                  </p>
                  <span className="font-sans inline-block text-[10px] font-bold uppercase tracking-widest text-yellow-300 bg-white/10 group-hover:bg-white/20 px-2.5 py-1 rounded transition-colors">
                    {program.tag}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 font-sans border border-white/40 hover:border-white hover:bg-white/10 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-all no-underline"
            >
              View All Programs
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 sm:py-28 bg-white" id="news">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
            <div>
              <span className="font-sans text-xs font-bold tracking-[3px] uppercase mb-2 block" style={{ color: "#8B1010" }}>
                NEWS & ANNOUNCEMENTS
              </span>
              <div className="w-12 h-0.5 mb-3 rounded-full" style={{ background: "#8B1010" }} />
              <h2 className="font-sans text-3xl sm:text-4xl font-black text-gray-900">
                Latest Updates
              </h2>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold border-b border-transparent pb-0.5 transition-all no-underline whitespace-nowrap"
              style={{ color: "#8B1010" }}
            >
              View All News
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: `Enrollment Now Open for School Year ${sy?.syLabel.replace("–", "-") ?? "2025–2026"}`,
                excerpt: "Registration for new and returning students is now ongoing. Visit our admissions page for more details.",
                category: "Announcement",
                date: "Jun 15, 2026",
                gradient: "bg-gradient-to-br from-red-800 to-red-950",
              },
              {
                title: "MNHS Students Excel in Regional Science Fair",
                excerpt: "Our students brought home multiple awards from the recently concluded Regional Science and Technology Fair.",
                category: "Achievement",
                date: "May 28, 2026",
                gradient: "bg-gradient-to-br from-forest to-green-900",
              },
              {
                title: `School Year ${sy?.syStart ?? 2025}-${sy?.syEnd ?? 2026} Closing Ceremony`,
                excerpt: "Join us as we celebrate the accomplishments of our students and faculty during the end-of-year ceremony.",
                category: "Event",
                date: "Apr 10, 2026",
                gradient: "bg-gradient-to-br from-amber-600 to-amber-900",
              },
            ].map((news) => (
              <div
                key={news.title}
                className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col bg-white"
              >
                <div className={`relative h-44 ${news.gradient} flex items-center justify-center overflow-hidden`}>
                  <svg className="w-12 h-12 text-white/20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10l6 6v10a2 2 0 0 1-2 2z" />
                    <path d="M14 2v6h6" />
                  </svg>
                  <span className="font-sans absolute bottom-3 left-3 bg-white/90 text-gray-700 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                    {news.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 font-sans text-xs text-gray-400 mb-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {news.date}
                  </div>
                  <h3 className="font-sans font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-red-800 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="font-sans text-gray-500 text-xs leading-relaxed font-light flex-1 line-clamp-3 mb-4">
                    {news.excerpt}
                  </p>
                  <Link
                    href="/news"
                    className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold hover:gap-2.5 transition-all no-underline mt-auto"
                    style={{ color: "#8B1010" }}
                  >
                    Read more
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions Section */}
      <section className="py-20 sm:py-28 relative overflow-hidden" id="admissions" style={{ background: "#8B1010" }}>
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-30 pointer-events-none"
          style={{ background: "rgba(0,0,0,.3)", transform: "translate(33%,-50%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "rgba(0,0,0,.2)", transform: "translate(-33%,50%)" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="font-sans text-xs font-bold tracking-[3px] uppercase text-yellow-300/80 mb-2 block">
                ADMISSIONS
              </span>
              <div className="w-12 h-0.5 bg-yellow-400 mb-4 rounded-full" />
              <h2 className="font-sans text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                Start Your Journey
                <br />
                With Us
              </h2>
              <p className="font-sans text-white/65 text-sm sm:text-base leading-relaxed font-light mb-8">
                Become part of the <strong className="font-sans text-white font-semibold">MNHS</strong> family. We
                welcome all learners committed to academic growth and personal
                excellence.
              </p>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 font-sans bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold text-sm tracking-wide px-7 py-3.5 rounded transition-all hover:scale-105 no-underline shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Click to Enroll Online
              </Link>
            </div>

            <div className="flex flex-col divide-y divide-white/10">
              {admissionsSteps.map((step, i) => (
                <div
                  key={i}
                  className={`flex gap-4 sm:gap-5 items-start py-5 ${
                    i === 0 ? "first:pt-0" : ""
                  } ${i === admissionsSteps.length - 1 ? "last:pb-0" : ""}`}
                >
                  <div className="w-10 h-10 border border-yellow-400/40 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-sans font-bold text-yellow-400 text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-sans text-white font-bold text-sm uppercase tracking-wide mb-1">
                      {step.title}
                    </h4>
                    <p className="font-sans text-white/55 text-sm font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
