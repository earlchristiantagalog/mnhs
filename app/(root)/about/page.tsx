import Link from "next/link";

const stats = [
  { val: "2,500+", lbl: "Students" },
  { val: "120+", lbl: "Faculty & Staff" },
  { val: "40", lbl: "Years of Excellence" },
  { val: "98%", lbl: "Pass Rate" },
];

const mvCards = [
  { title: "Mission", body: "To provide quality basic education that develops holistically Filipino learners equipped with 21st-century skills.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
  { title: "Vision", body: "A premier institution of learning producing globally competitive, morally upright, and socially responsible citizens.", icon: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z" },
  { title: "Core Values", body: "Maka-Diyos, Maka-Tao, Makakalikasan, at Makabansa.", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
  { title: "DepEd Alignment", body: "Region VII — fully aligned with the K to 12 Basic Education Program and DepEd's Matatag Curriculum.", icon: "M3 3h18v18H3zM3 9h18M9 21V9" },
];

const timeline = [
  { year: "1985", title: "School Founded", desc: "Mabolo National High School was established to serve the growing educational needs of the Mabolo community in Cebu City." },
  { year: "1995", title: "Expansion Period", desc: "The school expanded its facilities and programs, adding new classrooms and laboratories to accommodate a growing student population." },
  { year: "2005", title: "Curriculum Enhancement", desc: "MNHS adopted enhanced curriculum standards and integrated technology-based learning tools across all grade levels." },
  { year: "2013", title: "K to 12 Transition", desc: "Fully transitioned to the K to 12 curriculum, introducing Junior High School tracks and later the Senior High School program." },
  { year: "2016", title: "Senior High School Launch", desc: "Launched the Senior High School program with multiple strands including STEM, ABM, HUMSS, and TVL." },
  { year: "2023", title: "Digital Transformation", desc: "Implemented comprehensive digital learning infrastructure and modernized facilities for 21st-century education." },
];

const departments = [
  { key: "all", label: "All" },
  { key: "admin", label: "Administration" },
  { key: "science", label: "Science" },
  { key: "math", label: "Mathematics" },
  { key: "english", label: "English" },
  { key: "filipino", label: "Filipino" },
  { key: "ape", label: "MAPEH / APE" },
  { key: "tle", label: "TVL / TLE" },
  { key: "soc", label: "Social Studies" },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: "52vh" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-red-900 to-black" />
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/bg.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-red-800/20 blur-3xl pointer-events-none" style={{ transform: "translate(50%, -50%)" }} />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-yellow-400/5 blur-2xl pointer-events-none" style={{ transform: "translateY(50%)" }} />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 font-sans text-xs text-white/45 mb-4 animate-fade-in">
            <Link href="/" className="hover:text-white/80 transition-colors no-underline">Home</Link>
            <span>/</span>
            <span className="text-white/75">About Us</span>
          </nav>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-sans bg-yellow-400/10 border border-yellow-400/35 text-yellow-300 text-[0.65rem] sm:text-xs font-semibold tracking-[2px] sm:tracking-[3px] uppercase px-3 sm:px-4 py-2 rounded-sm mb-5 w-fit animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 flex-shrink-0" />
              <span className="font-sans truncate">Est. 1985 &middot; DepEd Accredited</span>
            </div>
            <h1 className="font-sans text-[2.2rem] sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-5 animate-fade-up">
              About <span className="text-yellow-300">MNHS</span>
            </h1>
            <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed font-light max-w-lg animate-fade-up" style={{ animationDelay: "100ms" }}>
              Empowering minds, building character, and shaping the future through quality education in Mabolo, Cebu City.
            </p>
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

      {/* History Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-12">
            <span className="font-sans text-xs font-bold tracking-[3px] uppercase mb-2 block" style={{ color: "#8B1010" }}>
              Our Story
            </span>
            <div className="w-12 h-0.5 mb-4 rounded-full" style={{ background: "#8B1010" }} />
            <h2 className="font-sans text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
              School History
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="font-sans text-gray-500 text-sm sm:text-base leading-relaxed font-light mb-4">
                Mabolo National High School was founded in <strong className="font-sans text-gray-800 font-semibold">1985</strong> to serve the educational needs of the Mabolo community in Cebu City. What began as a modest institution has grown into one of the region&apos;s most respected public secondary schools.
              </p>
              <p className="font-sans text-gray-500 text-sm sm:text-base leading-relaxed font-light mb-4">
                Over the decades, MNHS has consistently produced academically competent and socially responsible graduates who excel in various fields — from science and technology to arts and public service.
              </p>
              <p className="font-sans text-gray-500 text-sm sm:text-base leading-relaxed font-light mb-8">
                In <strong className="font-sans text-gray-800 font-semibold">2013</strong>, MNHS fully transitioned to the K to 12 curriculum, introducing Junior High School tracks and, two years later, the Senior High School program with multiple strands including STEM, ABM, HUMSS, and TVL — expanding pathways for students to pursue their chosen careers and higher education.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-200 rounded-xl overflow-hidden border border-gray-200">
                {mvCards.map((card) => (
                  <div key={card.title} className="bg-white p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                        style={{ background: "#8B10101a" }}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="#8B1010" strokeWidth="2" viewBox="0 0 24 24">
                          <path d={card.icon} />
                        </svg>
                      </div>
                      <span className="font-sans text-xs font-bold uppercase tracking-wide text-gray-800">
                        {card.title}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="font-sans text-sm font-bold uppercase tracking-[2px] text-gray-400 mb-6">
                Key Milestones
              </h3>
              <div className="flex flex-col">
                {timeline.map((item, i) => (
                  <div key={i} className="flex gap-4 pb-6 relative">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className="w-10 h-10 rounded-full border-2 flex items-center justify-center relative flex-shrink-0"
                        style={{ borderColor: "#8B1010", background: "#8B10101a" }}
                      >
                        <span className="w-3 h-3 rounded-full block" style={{ background: "#8B1010" }} />
                      </div>
                    </div>
                    <div className="pt-1.5 pb-1">
                      <div className="font-sans text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#8B1010" }}>
                        {item.year}
                      </div>
                      <h4 className="font-sans text-sm font-bold text-gray-900 leading-snug mb-1">
                        {item.title}
                      </h4>
                      <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-20 sm:py-28 bg-gray-50" id="faculty">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="font-sans text-xs font-bold tracking-[3px] uppercase mb-2 block" style={{ color: "#8B1010" }}>
                Our Team
              </span>
              <div className="w-12 h-0.5 mb-4 rounded-full" style={{ background: "#8B1010" }} />
              <h2 className="font-sans text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
                Faculty & Staff
              </h2>
              <p className="font-sans text-gray-500 text-sm leading-relaxed font-light mt-2 max-w-md">
                Meet the dedicated educators and staff who shape the MNHS experience every day.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {departments.map((dept, i) => (
              <button
                key={dept.key}
                className={`font-sans px-4 py-1.5 border-[1.5px] text-xs font-semibold tracking-wide uppercase rounded transition-all ${
                  i === 0
                    ? "text-white"
                    : "border-gray-200 bg-white text-gray-500 hover:border-[#8B1010] hover:text-[#8B1010]"
                }`}
                style={i === 0 ? { background: "#8B1010", borderColor: "#8B1010" } : undefined}
              >
                {dept.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white p-0 overflow-hidden rounded-lg border border-gray-100">
                <div className="bg-gray-100" style={{ height: 150 }} />
                <div className="p-4">
                  <div className="bg-gray-100 rounded mb-2" style={{ width: "75%", height: 14 }} />
                  <div className="bg-gray-100 rounded mb-3" style={{ width: "50%", height: 10 }} />
                  <div className="bg-gray-100 rounded" style={{ width: "40%", height: 18, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
