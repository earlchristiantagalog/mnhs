import Link from "next/link";

const stats = [
  { val: "15", lbl: "Executive Officers" },
  { val: "46", lbl: "Representatives" },
  { val: "61", lbl: "Total Officers" },
];

const sslgCards = [
  { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75", title: "Leadership", desc: "Providing direction and advocacy for the entire student body." },
  { icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z", title: "Representation", desc: "Bridging the gap between students and school administration." },
  { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Excellence", desc: "Promoting academic, cultural, and civic excellence school-wide." },
];

const president = {
  name: "Maria Santos",
  role: "SSLG President",
  grade: "Grade 12 — STEM",
};

const executiveOfficers = [
  { name: "Juan Dela Cruz", role: "Vice President", grade: "Grade 12 — HUMSS" },
  { name: "Ana Reyes", role: "Secretary", grade: "Grade 11 — ABM" },
  { name: "Carlos Garcia", role: "Treasurer", grade: "Grade 12 — STEM" },
  { name: "Lisa Mendoza", role: "Auditor", grade: "Grade 11 — TVL" },
  { name: "Mark Lim", role: "PRO Internal", grade: "Grade 12 — STEM" },
  { name: "Sofia Tan", role: "PRO External", grade: "Grade 11 — HUMSS" },
  { name: "David Cruz", role: "Sergeant-at-Arms", grade: "Grade 12 — ABM" },
  { name: "Maria Lim", role: "Business Manager", grade: "Grade 11 — STEM" },
];

const representatives = [
  { name: "Rachel Ann Booc", section: "Grade 7 — Diligence" },
  { name: "Kevin Roy Tiangco", section: "Grade 7 — Honesty" },
  { name: "Jessie Gales", section: "Grade 8 — Integrity" },
  { name: "Precious Gem Echavez", section: "Grade 8 — Perseverance" },
  { name: "Clarence Bation", section: "Grade 8 — Courage" },
  { name: "Justine Sambalud", section: "Grade 9 — Courage" },
  { name: "Aljhun Vañez", section: "Grade 9 — Respect" },
  { name: "Mia Gabrielle Tumulak", section: "Grade 9 — Diligence" },
  { name: "Renzie Tumulak", section: "Grade 10 — Responsibility" },
  { name: "Junric Tumulak", section: "Grade 10 — Wisdom" },
  { name: "Angelica Mae Rivas", section: "Grade 10 — Integrity" },
  { name: "Joshua Alba", section: "Grade 11 — STEM" },
  { name: "Jessa Gucor", section: "Grade 11 — ABM" },
  { name: "Jana Ibañez", section: "Grade 11 — HUMSS" },
  { name: "Clint Lomotos", section: "Grade 11 — TVL" },
  { name: "Rose Ann Polito", section: "Grade 12 — STEM" },
  { name: "Shaira Dela Cruz", section: "Grade 12 — ABM" },
  { name: "Mark Joseph Comiling", section: "Grade 12 — HUMSS" },
  { name: "Karen Mae Ybañez", section: "Grade 12 — TVL" },
];

export default function SSLGPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: "48vh", background: "linear-gradient(135deg,#8B1010 0%,#2a0a0a 100%)" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-red-900 to-black" />
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/bg.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-red-800/20 blur-3xl pointer-events-none" style={{ transform: "translate(50%, -50%)" }} />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-yellow-400/5 blur-2xl pointer-events-none" style={{ transform: "translateY(50%)" }} />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 font-sans text-xs text-white/45 mb-6 animate-fade-in">
            <Link href="/" className="hover:text-white/80 transition-colors no-underline">Home</Link>
            <span>/</span>
            <span className="text-white/75">SSLG Officers</span>
          </nav>

          <div className="max-w-2xl animate-fade-up">
            <div className="flex items-center gap-2 font-sans bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-[0.65rem] sm:text-xs font-semibold tracking-[3px] uppercase px-4 py-2 rounded-sm mb-5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 flex-shrink-0" />
              Student Leadership
            </div>
            <h1 className="font-sans text-[2rem] sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-4">
              Supreme Student <span className="text-yellow-300">Leadership</span> Government
            </h1>
            <p className="font-sans text-white/65 text-sm sm:text-base leading-relaxed font-light max-w-lg">
              The elected voice of the student body — leading initiatives, representing peers, and shaping the MNHS community.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 sm:py-12" style={{ background: "#1E5631" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            {stats.map((s, i) => (
              <div key={s.lbl} className={`px-2 ${i < stats.length - 1 ? "border-r border-white/20" : ""}`}>
                <div className="font-sans text-3xl sm:text-4xl font-black text-yellow-300 leading-none mb-1">{s.val}</div>
                <div className="font-sans text-xs text-white/60 uppercase tracking-widest font-medium">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the SSLG */}
      <section className="py-16 sm:py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <span className="font-sans text-xs font-bold tracking-[3px] uppercase mb-2 block" style={{ color: "#8B1010" }}>Student Government</span>
              <div className="w-12 h-0.5 mb-4 rounded-full" style={{ background: "#8B1010" }} />
              <h2 className="font-sans text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">About the SSLG</h2>
              <p className="font-sans text-gray-500 text-sm sm:text-base leading-relaxed font-light">
                The Supreme Student Legislative Government (SSLG) is the highest governing body of student leadership in Mabolo National High School. It represents the interests and welfare of the entire student body while fostering meaningful leadership, civic engagement, and school spirit.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-200 rounded-xl overflow-hidden border border-gray-200">
              {sslgCards.map((card) => (
                <div key={card.title} className="bg-white p-5 sm:p-6">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: "#8B10101a" }}>
                    <svg className="w-4 h-4" style={{ color: "#8B1010" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d={card.icon} />
                    </svg>
                  </div>
                  <div className="font-sans text-xs font-bold uppercase tracking-wide text-gray-800 mb-1">{card.title}</div>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed font-light">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Executive Officers — Org Chart */}
      <section className="py-20 sm:py-28 bg-white" id="officers">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="font-sans text-xs font-bold tracking-[3px] uppercase mb-2 block" style={{ color: "#8B1010" }}>Executive Council</span>
              <div className="w-12 h-0.5 mb-4 rounded-full" style={{ background: "#8B1010" }} />
              <h2 className="font-sans text-3xl sm:text-4xl font-black text-gray-900 leading-tight">SSLG Officers</h2>
            </div>
          </div>

          {/* Org Chart */}
          <div className="flex flex-col items-center py-4">
            {/* President */}
            <div className="bg-white border-2 rounded-xl px-6 py-4 shadow-md text-center min-w-[200px]" style={{ borderColor: "#8B1010" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2" style={{ background: "#8B1010" }}>
                {president.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="font-sans font-black text-gray-900 text-sm">{president.name}</div>
              <div className="font-sans text-[11px] font-bold uppercase tracking-wide" style={{ color: "#8B1010" }}>{president.role}</div>
              <div className="font-sans text-[10px] text-gray-400 mt-0.5">{president.grade}</div>
            </div>

            {/* Line President → VP */}
            <div className="w-px h-8 bg-gray-300" />

            {/* Vice President */}
            <div className="bg-white border-2 rounded-xl px-5 py-3 shadow-md text-center min-w-[180px]" style={{ borderColor: "#1E5631" }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2" style={{ background: "#1E5631" }}>
                {executiveOfficers[0].name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="font-sans font-bold text-gray-900 text-sm">{executiveOfficers[0].name}</div>
              <div className="font-sans text-[11px] font-semibold" style={{ color: "#1E5631" }}>{executiveOfficers[0].role}</div>
              <div className="font-sans text-[10px] text-gray-400">{executiveOfficers[0].grade}</div>
            </div>

            {/* Line VP → Officers */}
            <div className="w-px h-8 bg-gray-300" />

            {/* Officers section */}
            <div className="flex flex-col items-center w-full max-w-4xl">
              {/* Horizontal bar — spans from first to last card center */}
              <div className="h-px bg-gray-300" style={{ width: "calc(100% - 100% / 7.8)", marginLeft: "calc(100% / 550)" }} />

              {/* Officers row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 w-full">
                {executiveOfficers.slice(1).map((officer) => (
                  <div key={officer.name} className="flex flex-col items-center">
                    {/* Vertical line from bar to card */}
                    <div className="w-px h-6 bg-gray-300" />
                    <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200 w-full">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-xs mx-auto mb-2" style={{ background: "#1E5631" }}>
                        {officer.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="font-sans font-bold text-gray-900 text-[11px] mb-0.5 leading-tight">{officer.name}</div>
                      <div className="font-sans text-[9px] font-semibold mb-0.5" style={{ color: "#8B1010" }}>{officer.role}</div>
                      <div className="font-sans text-[8px] text-gray-400">{officer.grade}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Representatives */}
      <section className="py-20 sm:py-28 bg-gray-50" id="representatives">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-8">
            <span className="font-sans text-xs font-bold tracking-[3px] uppercase mb-2 block" style={{ color: "#8B1010" }}>Representatives</span>
            <div className="w-12 h-0.5 mb-4 rounded-full" style={{ background: "#8B1010" }} />
            <h2 className="font-sans text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-2">Class &amp; Committee Representatives</h2>
            <p className="font-sans text-gray-500 text-sm leading-relaxed font-light max-w-xl">
              Grade-level and committee representatives who bridge the gap between students and the executive council.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {representatives.map((rep) => (
              <div key={rep.name} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-xs mx-auto mb-2" style={{ background: "#1E5631" }}>
                  {rep.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="font-sans font-bold text-gray-900 text-xs mb-0.5 line-clamp-1">{rep.name}</div>
                <div className="font-sans text-[10px] text-gray-400 line-clamp-1">{rep.section}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#8B1010 0%,#8B1010 100%)" }}>
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle,#fff,transparent 70%)", transform: "translate(30%,-30%)" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <span className="font-sans text-[10px] font-bold tracking-[3px] uppercase text-yellow-300/80 mb-3 block">Want to Lead?</span>
          <h2 className="font-sans text-3xl sm:text-4xl font-black text-white leading-tight mb-4">Be Part of the SSLG</h2>
          <p className="font-sans text-white/65 text-sm sm:text-base leading-relaxed font-light max-w-lg mx-auto mb-8">
            Elections are held every school year. All bona fide students of Mabolo National High School are encouraged to participate — run for office or cast your vote.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/admissions" className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold text-sm tracking-wide px-7 py-3.5 rounded transition-all hover:scale-105 no-underline shadow-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Learn More
            </Link>
            <Link href="/#contact" className="inline-flex items-center gap-2 border border-white/40 hover:border-white/80 hover:bg-white/10 text-white font-semibold text-sm tracking-wide px-7 py-3.5 rounded transition-all no-underline">
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
