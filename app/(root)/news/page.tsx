"use client";

import { useState } from "react";
import Link from "next/link";
import { useSchoolYear } from "@/hooks/use-school-year";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 5;

const categories = [
  { key: "all", label: "All" },
  { key: "general", label: "General" },
  { key: "enrollment", label: "Enrollment" },
  { key: "academic", label: "Academic" },
  { key: "event", label: "Event" },
  { key: "urgent", label: "Urgent" },
];

const quickLinks = [
  { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", label: "Online Enrollment Portal", href: "/admissions" },
  { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", label: "Faculty Directory", href: "/about#faculty" },
  { icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z", label: "Academic Programs", href: "/programs" },
  { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", label: "Contact the School", href: "/contact" },
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const sy = useSchoolYear();

  const announcements = [
    {
      id: 1,
      title: `Enrollment Now Open for School Year ${sy?.syLabel.replace("–", "-") ?? "2025-2026"}`,
      body: "Registration for new and returning students is now ongoing. Visit our admissions page for more details on requirements and schedules. Early registrants will be given priority in class assignments.",
      category: "enrollment",
      date: "Jun 15, 2026",
      pinned: true,
      gradient: "bg-gradient-to-br from-red-800 to-red-950",
    },
    {
      id: 2,
      title: "MNHS Students Excel in Regional Science Fair",
      body: "Our students brought home multiple awards from the recently concluded Regional Science and Technology Fair, showcasing excellence in research and innovation.",
      category: "academic",
      date: "May 28, 2026",
      pinned: false,
      gradient: "bg-gradient-to-br from-forest to-green-900",
    },
    {
      id: 3,
      title: `School Year ${(sy?.syStart ?? 2025) - 1}-${sy?.syStart ?? 2025} Closing Ceremony`,
      body: "Join us as we celebrate the accomplishments of our students and faculty during the end-of-year ceremony. The event will be held at the school gymnasium.",
      category: "event",
      date: "Apr 10, 2026",
      pinned: false,
      gradient: "bg-gradient-to-br from-amber-600 to-amber-900",
    },
    {
      id: 4,
      title: "Parent-Teacher Conference Schedule",
      body: "Scheduled parent-teacher conferences for all grade levels will take place next month. Please check the detailed schedule posted at the bulletin board.",
      category: "general",
      date: "Mar 22, 2026",
      pinned: false,
      gradient: "bg-gradient-to-br from-red-800 to-red-950",
    },
    {
      id: 5,
      title: "Emergency Holiday: Class Suspension Notice",
      body: "Due to severe weather conditions, all classes are suspended tomorrow. Stay safe and monitor official announcements for updates on class resumption.",
      category: "urgent",
      date: "Mar 15, 2026",
      pinned: false,
      gradient: "bg-gradient-to-br from-forest to-green-900",
    },
    {
      id: 6,
      title: "Brigada Eskwela 2026 Volunteers Needed",
      body: "We are calling on parents, alumni, and community members to join this year's Brigada Eskwela. Help us prepare our school for the incoming school year.",
      category: "general",
      date: "Mar 5, 2026",
      pinned: false,
      gradient: "bg-gradient-to-br from-amber-600 to-amber-900",
    },
    {
      id: 7,
      title: "Math Olympiad Qualifying Round Results",
      body: "Congratulations to all students who participated in the Math Olympiad qualifying round. The list of qualifiers for the division level is now posted at the bulletin board.",
      category: "academic",
      date: "Feb 28, 2026",
      pinned: false,
      gradient: "bg-gradient-to-br from-forest to-green-900",
    },
    {
      id: 8,
      title: "Health Advisory: Flu Prevention Tips",
      body: "As the flu season approaches, please observe proper hygiene practices. Wash your hands regularly, wear masks when feeling unwell, and report any symptoms to the school nurse.",
      category: "urgent",
      date: "Feb 20, 2026",
      pinned: false,
      gradient: "bg-gradient-to-br from-red-800 to-red-950",
    },
    {
      id: 9,
      title: "Intramurals 2026 Schedule Released",
      body: "The schedule for this year's intramurals has been finalized. Check the posted schedule for your batch's assigned events and competition dates.",
      category: "event",
      date: "Feb 15, 2026",
      pinned: false,
      gradient: "bg-gradient-to-br from-amber-600 to-amber-900",
    },
    {
      id: 10,
      title: "SHS Enrollment Guidelines Posted",
      body: "Senior High School enrollment guidelines for incoming Grade 11 students are now available. Visit the admissions office or check our website for strand availability and requirements.",
      category: "enrollment",
      date: "Feb 10, 2026",
      pinned: false,
      gradient: "bg-gradient-to-br from-red-800 to-red-950",
    },
    {
      id: 11,
      title: "School Cancellation Due to Typhoon",
      body: "All classes are suspended until further notice due to the typhoon affecting the region. Stay safe and monitor official channels for updates on class resumption.",
      category: "urgent",
      date: "Jan 30, 2026",
      pinned: false,
      gradient: "bg-gradient-to-br from-forest to-green-900",
    },
    {
      id: 12,
      title: "MNHS Celebrates Founding Anniversary",
      body: "Join us as we celebrate another year of excellence and community service. Various activities and programs have been prepared for the week-long celebration.",
      category: "event",
      date: "Jan 20, 2026",
      pinned: false,
      gradient: "bg-gradient-to-br from-amber-600 to-amber-900",
    },
  ];

  const filtered = activeCategory === "all"
    ? announcements
    : announcements.filter((a) => a.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const featured = paginated.find((a) => a.pinned) || paginated[0];
  const rest = paginated.filter((a) => a !== featured);

  const handleCategoryChange = (key: string) => {
    setActiveCategory(key);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: "48vh" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-red-900 to-black" />
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/bg.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-red-800/20 blur-3xl pointer-events-none" style={{ transform: "translate(50%, -50%)" }} />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-yellow-400/5 blur-2xl pointer-events-none" style={{ transform: "translateY(50%)" }} />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 font-sans text-xs text-white/45 mb-4 animate-fade-in">
            <Link href="/" className="hover:text-white/80 transition-colors no-underline">Home</Link>
            <span>/</span>
            <span className="text-white/75">News &amp; Announcements</span>
          </nav>

          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-sans bg-yellow-400/10 border border-yellow-400/35 text-yellow-300 text-[0.65rem] sm:text-xs font-semibold tracking-[2px] sm:tracking-[3px] uppercase px-3 sm:px-4 py-2 rounded-sm mb-5 w-fit animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 flex-shrink-0" />
              Latest Updates
            </div>
            <h1 className="font-sans text-[2.2rem] sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-5 animate-fade-up">
              News &amp; <span className="text-yellow-300">Announcements</span>
            </h1>
            <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed font-light max-w-lg animate-fade-up" style={{ animationDelay: "100ms" }}>
              Stay up to date with the latest happenings, achievements, events, and official announcements from Mabolo National High School.
            </p>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-8">
            <span className="font-sans text-xs font-bold tracking-[3px] uppercase mb-2 block" style={{ color: "#8B1010" }}>
              Browse All
            </span>
            <div className="w-12 h-0.5 mb-4 rounded-full" style={{ background: "#8B1010" }} />
            <h2 className="font-sans text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
              School Announcements
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                className={`font-sans px-4 py-1.5 border-[1.5px] text-xs font-semibold tracking-wide uppercase rounded transition-all ${
                  activeCategory === cat.key
                    ? "text-white"
                    : "border-gray-200 bg-white text-gray-500 hover:border-[#8B1010] hover:text-[#8B1010]"
                }`}
                style={activeCategory === cat.key ? { background: "#8B1010", borderColor: "#8B1010" } : undefined}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_288px] gap-8 xl:gap-12">
            {/* Main Content */}
            <div>
              {/* Search */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                <div className="relative flex-1 max-w-xs">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search announcements..."
                    className="font-sans w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#8B1010] bg-gray-50 focus:bg-white transition-colors"
                  />
                </div>
                <span className="font-sans text-xs text-gray-400 font-medium whitespace-nowrap">
                  {filtered.length} announcement{filtered.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Featured Card */}
              {featured && (
                <div className="border border-gray-200 rounded-xl overflow-hidden mb-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className={`${featured.gradient} min-h-[220px] flex items-center justify-center`}>
                      <svg className="w-16 h-16 text-white/15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
                        <path d="M14 2v6h6" />
                      </svg>
                    </div>
                    <div className="p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded" style={{ background: "#8B10101a", color: "#8B1010" }}>
                          {featured.category}
                        </span>
                        {featured.pinned && (
                          <span className="font-sans text-[10px] font-bold uppercase tracking-widest bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded">
                            Pinned
                          </span>
                        )}
                      </div>
                      <h3 className="font-sans font-black text-gray-900 text-lg leading-snug mb-2">
                        {featured.title}
                      </h3>
                      <p className="font-sans text-gray-500 text-xs leading-relaxed font-light mb-3 line-clamp-3">
                        {featured.body}
                      </p>
                      <span className="font-sans text-xs text-gray-400">{featured.date}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* News List */}
              <div className="flex flex-col gap-4">
                {rest.map((ann) => (
                  <div key={ann.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col sm:flex-row bg-white">
                    <div className={`${ann.gradient} sm:w-44 min-h-[140px] flex items-center justify-center flex-shrink-0`}>
                      <svg className="w-10 h-10 text-white/15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
                        <path d="M14 2v6h6" />
                      </svg>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded" style={{ background: "#8B10101a", color: "#8B1010" }}>
                          {ann.category}
                        </span>
                        <span className="font-sans text-xs text-gray-400">{ann.date}</span>
                      </div>
                      <h3 className="font-sans font-bold text-gray-900 text-sm leading-snug mb-1.5 line-clamp-2">
                        {ann.title}
                      </h3>
                      <p className="font-sans text-gray-500 text-xs leading-relaxed font-light flex-1 line-clamp-2 mb-3">
                        {ann.body}
                      </p>
                      <span className="font-sans inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#8B1010" }}>
                        Read more
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          text="Previous"
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          aria-disabled={currentPage === 1}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>

                      {getPageNumbers().map((page, i) =>
                        page === "ellipsis" ? (
                          <PaginationItem key={`ellipsis-${i}`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        ) : (
                          <PaginationItem key={page}>
                            <PaginationLink
                              isActive={currentPage === page}
                              onClick={() => setCurrentPage(page)}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}

                      <PaginationItem>
                        <PaginationNext
                          text="Next"
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          aria-disabled={currentPage === totalPages}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-5">
              {/* Official Announcements */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h4 className="font-sans text-[10px] font-bold uppercase tracking-[2px] text-gray-800 mb-4 pb-3 border-b border-gray-200 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" style={{ color: "#8B1010" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                  Official Announcements
                </h4>
                <div className="flex flex-col gap-0">
                  {announcements.slice(0, 4).map((ann, i) => (
                    <div key={ann.id} className={`pb-3 ${i < 3 ? "border-b border-gray-200" : ""}`}>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="font-sans text-[10px] text-gray-400">{ann.date}</span>
                        <span className="font-sans text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded" style={{ background: "#8B10101a", color: "#8B1010" }}>
                          {ann.category}
                        </span>
                      </div>
                      <h5 className="font-sans text-xs font-bold text-gray-800 leading-snug mb-0.5 line-clamp-2">
                        {ann.title}
                      </h5>
                      <p className="font-sans text-[11px] text-gray-400 leading-relaxed line-clamp-1">
                        {ann.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Browse by Topic */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h4 className="font-sans text-[10px] font-bold uppercase tracking-[2px] text-gray-800 mb-4 pb-3 border-b border-gray-200">
                  Browse by Topic
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["enrollment", "academic", "event", "urgent", "general"].map((tag) => (
                    <button
                      key={tag}
                      className="font-sans text-[11px] font-semibold border-[1.5px] border-gray-200 bg-white text-gray-500 hover:border-[#8B1010] hover:text-[#8B1010] px-3 py-1.5 rounded-full uppercase tracking-wide transition-all"
                    >
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Resources */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h4 className="font-sans text-[10px] font-bold uppercase tracking-[2px] text-gray-800 mb-4 pb-3 border-b border-gray-200">
                  Quick Resources
                </h4>
                <div className="flex flex-col gap-2">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 hover:border-[#8B1010] hover:text-[#8B1010] transition-all no-underline group"
                    >
                      <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#8B1010" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d={link.icon} />
                      </svg>
                      <span className="font-sans font-medium">{link.label}</span>
                      <svg className="w-2.5 h-2.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
