import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="bg-gray-950 pt-14 pb-8"
      style={{ borderTop: "4px solid #8B1010" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 mb-8"
          style={{ borderBottom: "1px solid rgba(255,255,255,.08)" }}
        >
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="font-sans text-base font-bold text-white mb-2">
              MABOLO NATIONAL HIGH SCHOOL
            </div>
            <p className="font-sans text-xs text-white/35 leading-relaxed font-light">
              Mabolo National High School is a public secondary institution
              under the Department of Education, committed to academic excellence
              and holistic development of learners.
            </p>
          </div>
          <div>
            <h5 className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-white/30 mb-4">
              Quick Links
            </h5>
            <ul className="list-none flex flex-col gap-2.5">
              {[
                { label: "About", href: "/about" },
                { label: "Programs", href: "/programs" },
                { label: "News", href: "/news" },
                { label: "SSLG Officer", href: "/sslg" },
                { label: "Admissions", href: "/admissions" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-white/50 hover:text-white text-sm transition-colors no-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-white/30 mb-4">
              Programs
            </h5>
            <ul className="list-none flex flex-col gap-2.5">
              {["STEM", "ABM", "HUMSS", "TVL Track"].map((prog) => (
                <li key={prog}>
                  <Link
                    href="/programs"
                    className="font-sans text-white/50 hover:text-white text-sm transition-colors no-underline"
                  >
                    {prog}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-white/30 mb-4">
              Contact
            </h5>
            <ul className="list-none flex flex-col gap-2.5">
              <li>
                <span className="font-sans text-white/50 text-sm">
                  Mabolo, Cebu City, Philippines
                </span>
              </li>
              <li>
                <a
                  href="tel:063266526"
                  className="font-sans text-white/50 hover:text-white text-sm transition-colors no-underline"
                >
                  (063) 266-5526
                </a>
              </li>
              <li>
                <a
                  href="mailto:mabolonhs.cebucity@deped.gov.ph"
                  className="font-sans text-white/50 hover:text-white text-sm transition-colors no-underline"
                >
                  mabolonhs.cebucity@deped.gov.ph
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-white/25">
            &copy; {new Date().getFullYear()} Mabolo National High School. All
            rights reserved.
          </p>
          <span className="font-sans text-[10px] text-white/30 uppercase tracking-[2px] border border-white/10 px-3 py-1 rounded">
            DepEd Region VII - Central Visayas
          </span>
        </div>
      </div>
    </footer>
  );
}
