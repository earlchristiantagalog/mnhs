"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { CustomSelect } from "@/components/ui/custom-select";
import { CustomDatePicker } from "@/components/ui/custom-date-picker";
import { useSchoolYear } from "@/hooks/use-school-year";

const steps = [
  { n: 1, label: "Enrollment Type", desc: "Grade level & method" },
  { n: 2, label: "Learner Info", desc: "Personal & birth details" },
  { n: 3, label: "Address & Contact", desc: "Current & permanent address" },
  { n: 4, label: "Parents/Guardian", desc: "Family background" },
  { n: 5, label: "School Record", desc: "Previous school & SHS details" },
  { n: 6, label: "Review & Submit", desc: "Confirm & finalize" },
];

const gradeCards = [
  { val: "g7", badge: "JHS", title: "Incoming Grade 7", sub: "For incoming Grade 7 completers" },
  { val: "shs", badge: "SHS", title: "Incoming Grade 11", sub: "For incoming Senior High School" },
  { val: "trans", badge: "TRANSFER", title: "Transferee", sub: "From another school" },
  { val: "back", badge: "OLD", title: "Old Student", sub: "Returning MNHS student" },
];

const gradeLevels = [
  { val: "7", label: "Grade 7", track: "jhs" },
  { val: "8", label: "Grade 8", track: "jhs" },
  { val: "9", label: "Grade 9", track: "jhs" },
  { val: "10", label: "Grade 10", track: "jhs" },
  { val: "11", label: "Grade 11", track: "shs" },
];

const trackCards = [
  { val: "stem", label: "STEM", desc: "Science, Technology, Engineering & Mathematics" },
  { val: "abm", label: "ABM", desc: "Accountancy, Business & Management" },
  { val: "humss", label: "HUMSS", desc: "Humanities & Social Sciences" },
  { val: "tvl", label: "TVL", desc: "Technical-Vocational-Livelihood" },
];

const strandCards: Record<string, { val: string; label: string }[]> = {
  stem: [{ val: "general", label: "General Strand" }],
  abm: [{ val: "general", label: "General Strand" }],
  humss: [{ val: "general", label: "General Strand" }],
  tvl: [
    { val: "ict", label: "ICT" },
    { val: "home-econ", label: "Home Economics" },
    { val: "industrial", label: "Industrial Arts" },
  ],
};

const suffixes = ["Jr.", "Sr.", "II", "III", "IV", "V"];
const motherTongues = ["Cebuano", "Tagalog", "Ilocano", "Hiligaynon", "Waray", "Bicolano", "Pampango", "Pangasinense", "Other"];
const lwdTypes = ["Visual Impairment", "Hearing Impairment", "Learning Disability", "Physical/Motor Disability", "Speech Impairment", "Intellectual Disability", "Autism Spectrum Disorder", "Multiple Disabilities", "Other"];

export default function AdmissionsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const sy = useSchoolYear();
  const isOpen = sy?.isEnrollmentOpen ?? false;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [maxYear, setMaxYear] = useState(2026);
  const [minYear, setMinYear] = useState(1990);

  useEffect(() => {
    const d = new Date();
    setMaxYear(d.getFullYear());
    setMinYear(d.getFullYear() - 36);
  }, []);

  const [form, setForm] = useState({
    regMethod: "online",
    grade: "",
    gradeLevel: "",
    track: "",
    strand: "",
    semester: "1st",
    hasLRN: "yes", lrn: "",
    isBalik: "no",
    lname: "", fname: "", mname: "", suffix: "",
    dob: "", sex: "", pob: "", motherTongue: "",
    isIP: "no", ipGroup: "",
    is4PS: "no", fourpsId: "",
    isLWD: "no", lwdTypes: [] as string[], lwdOther: "",
    photoPreview: "",
    currHouse: "", currStreet: "", currProvince: "", currCity: "", currBarangay: "", currZip: "",
    permSame: "yes", permHouse: "", permStreet: "", permProvince: "", permCity: "", permBarangay: "", permZip: "",
    mobile: "", email: "",
    fatherLname: "", fatherFname: "", fatherMname: "", fatherContact: "", fatherOccupation: "",
    motherLname: "", motherFname: "", motherMname: "", motherContact: "", motherOccupation: "",
    guardianLname: "", guardianFname: "", guardianMname: "", guardianContact: "",
    prevSchool: "", prevSchoolId: "", lastGrade: "", lastSY: "",
    declare: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── Sanitization helpers ──────────────────────────────────────────
  const stripHtml = (s: string) => s.replace(/<[^>]*>/g, "").replace(/[<>"'`]/g, "").trim();
  const sanitizeName = (s: string) => s.replace(/[^a-zA-Z\s\-\.]/g, "").replace(/\s{2,}/g, " ").slice(0, 50);
  const sanitizePhone = (s: string) => s.replace(/[^0-9]/g, "").slice(0, 11);
  const sanitizeEmail = (s: string) => s.replace(/[^a-zA-Z0-9@._+\-]/g, "").slice(0, 100);
  const sanitizeAddress = (s: string) => s.replace(/[^a-zA-Z0-9\s,.\-#/]/g, "").replace(/\s{2,}/g, " ").slice(0, 100);
  const sanitizeZip = (s: string) => s.replace(/[^0-9]/g, "").slice(0, 4);
  const sanitizeLrn = (s: string) => s.replace(/[^0-9]/g, "").slice(0, 12);
  const sanitizeGeneral = (s: string) => stripHtml(s).slice(0, 100);
  const sanitizeOccupation = (s: string) => s.replace(/[^a-zA-Z\s,.\-/& ]/g, "").replace(/\s{2,}/g, " ").slice(0, 50);
  const sanitizeSchool = (s: string) => stripHtml(s).replace(/[<>]/g, "").slice(0, 150);
  const sanitizeId = (s: string) => s.replace(/[^a-zA-Z0-9\-]/g, "").slice(0, 20);
  // ──────────────────────────────────────────────────────────────────

  const set = (key: string, val: string | boolean | string[]) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  const validateStep = (step: number): boolean => {
    const e: Record<string, string> = {};

    if (step === 1) {
      if (!form.grade) e.grade = "Please select a grade level.";
      if ((form.grade === "trans" || form.grade === "back") && !form.gradeLevel) e.gradeLevel = "Please select the grade level to enroll in.";
      if ((form.grade === "shs" || ((form.grade === "trans" || form.grade === "back") && form.gradeLevel === "11")) && !form.track) e.track = "Please select an SHS track.";
      if ((form.grade === "shs" || ((form.grade === "trans" || form.grade === "back") && form.gradeLevel === "11")) && form.track && !form.strand) e.strand = "Please select a strand.";
      if (form.hasLRN === "yes" && !form.lrn.trim()) e.lrn = "LRN is required.";
      if (form.hasLRN === "yes" && form.lrn.trim() && form.lrn.trim().length !== 12) e.lrn = "LRN must be exactly 12 digits.";
    }

    if (step === 2) {
      if (!form.lname.trim()) e.lname = "Last name is required.";
      if (!form.fname.trim()) e.fname = "First name is required.";
      if (!form.dob) e.dob = "Birthdate is required.";
      if (!form.sex) e.sex = "Please select sex.";
      if (!form.pob.trim()) e.pob = "Place of birth is required.";
      if (!form.motherTongue) e.motherTongue = "Mother tongue is required.";
      if (form.isIP === "yes" && !form.ipGroup.trim()) e.ipGroup = "IP group is required.";
      if (form.is4PS === "yes" && !form.fourpsId.trim()) e.fourpsId = "4Ps ID is required.";
      if (form.isLWD === "yes" && form.lwdTypes.length === 0) e.lwdTypes = "Select at least one disability type.";
    }

    if (step === 3) {
      if (!form.currProvince.trim()) e.currProvince = "Province is required.";
      if (!form.currCity.trim()) e.currCity = "City is required.";
      if (!form.currBarangay.trim()) e.currBarangay = "Barangay is required.";
      if (!form.mobile.trim()) e.mobile = "Contact number is required.";
      if (form.mobile.trim() && !/^09\d{9}$/.test(form.mobile.trim())) e.mobile = "Enter a valid 11-digit Philippine mobile number.";
      if (!form.email.trim()) e.email = "Email is required.";
      if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter a valid email address.";
      if (form.permSame !== "yes") {
        if (!form.permProvince.trim()) e.permProvince = "Province is required.";
        if (!form.permCity.trim()) e.permCity = "City is required.";
        if (!form.permBarangay.trim()) e.permBarangay = "Barangay is required.";
      }
    }

    if (step === 4) {
      if (!form.fatherLname.trim()) e.fatherLname = "Father's last name is required.";
      if (!form.fatherFname.trim()) e.fatherFname = "Father's first name is required.";
      if (form.fatherContact.trim() && !/^09\d{9}$/.test(form.fatherContact.trim())) e.fatherContact = "Enter a valid 11-digit number.";
      if (!form.motherLname.trim()) e.motherLname = "Mother's last name is required.";
      if (!form.motherFname.trim()) e.motherFname = "Mother's first name is required.";
      if (form.motherContact.trim() && !/^09\d{9}$/.test(form.motherContact.trim())) e.motherContact = "Enter a valid 11-digit number.";
    }

    if (step === 5) {
      if (!form.prevSchool.trim()) e.prevSchool = "School name is required.";
      if (!form.lastGrade) e.lastGrade = "Last grade completed is required.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((s) => Math.min(steps.length, s + 1));
    }
  };

  const getPos = (e: React.TouchEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e: React.TouchEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.TouchEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1f2937";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDraw = () => setIsDrawing(false);

  const clearCanvas = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const Err = ({ field }: { field: string }) => errors[field] ? (
    <p className="font-sans text-[11px] text-red-500 mt-1 flex items-center gap-1">
      <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
      {errors[field]}
    </p>
  ) : null;

  const pct = ((currentStep - 1) / (steps.length - 1)) * 100;

  if (!isOpen) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <section className="relative overflow-hidden flex items-center" style={{ minHeight: "calc(90vh - 72px)", background: "linear-gradient(135deg, #3b0404 0%, #8B1010 45%, #1a0000 100%)" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(212,160,23,0.07) 0%, transparent 65%)" }} />
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/bg.jpg')" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 40% at 10% 80%, rgba(255,255,255,0.04) 0%, transparent 60%)" }} />

          <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 py-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-yellow-400/60" />
              <span className="font-sans text-yellow-300/80 text-[0.68rem] font-bold uppercase tracking-[3px]">School Year {sy?.syLabel ?? "2025–2026"}</span>
            </div>

            <div className="inline-flex items-center gap-2.5 bg-white/8 border border-white/15 backdrop-blur-sm text-white/70 text-xs font-semibold px-4 py-2 rounded-full mb-8 w-fit">
              Enrollment Portal Closed
            </div>

            <h1 className="font-sans font-black text-white leading-[1.05] mb-6" style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)", maxWidth: 700, letterSpacing: "-0.02em" }}>
              Online Enrollment is Currently Closed
            </h1>

            <p className="font-sans text-white/55 font-light leading-relaxed mb-10" style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", maxWidth: 520 }}>
              The enrollment portal will reopen for the next school year. Please check back during the official enrollment period announced by the school.
            </p>

            <div className="flex flex-wrap gap-3 mb-14">
              <Link href="/" className="inline-flex items-center gap-2.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm px-7 py-3.5 rounded-xl transition-all no-underline shadow-lg shadow-yellow-900/30">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Back to Home
              </Link>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-400/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <div>
                  <div className="font-sans text-white font-bold text-sm mb-0.5">Walk-in Registration Available</div>
                  <div className="font-sans text-white/45 text-xs font-light leading-relaxed">Download the form and register in person at the Registrar&apos;s Office.</div>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/18 border border-white/20 hover:border-white/35 text-white text-xs font-bold rounded-xl transition-all backdrop-blur-sm">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download PDF Form
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #8B1010, #3b0404)" }} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/bg.jpg')" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <nav className="flex items-center gap-2 font-sans text-xs text-white/45 mb-4">
            <Link href="/" className="hover:text-white/80 transition-colors no-underline">Home</Link>
            <span>/</span><span className="text-white/75">Admissions</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/35 text-yellow-300 text-[0.65rem] font-semibold tracking-[2px] uppercase px-3 py-1.5 rounded-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 flex-shrink-0" />SY {sy?.syLabel ?? "2025–2026"}
          </div>
          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3">Online Enrollment</h1>
          <p className="font-sans text-white/65 text-sm sm:text-base font-light leading-relaxed max-w-xl mb-6">Fill out the form below to enroll at Mabolo National High School.</p>
        </div>
      </div>

      {/* Mobile Step Bar */}
      <div className="sticky top-0 z-40 bg-gray-900 px-4 py-3 sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="font-sans text-sm font-bold text-white">Step {currentStep} — {steps[currentStep - 1].label}</span>
          <span className="font-sans text-xs text-white/50">{currentStep} / {steps.length}</span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-400 rounded-full transition-all duration-400" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Form Layout */}
      <div className="max-w-5xl mx-auto px-0 sm:px-4 lg:px-6 py-0 sm:py-8 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-0 lg:gap-7 items-start w-full">

        {/* Sidebar */}
        <aside className="hidden lg:block lg:sticky lg:top-4">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-gray-900 px-5 py-4">
              <div className="font-sans text-[10px] uppercase tracking-[2px] text-white/40 mb-1">Enrollment Progress</div>
              <div className="font-sans text-sm font-bold text-white">Step {currentStep} of {steps.length}</div>
              <div className="h-0.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full transition-all duration-400" style={{ width: `${pct}%` }} />
              </div>
            </div>
            <div className="py-2">
              {steps.map((s) => (
                <button
                  key={s.n}
                  onClick={() => setCurrentStep(s.n)}
                  className={`flex items-start gap-3 px-4 py-2.5 cursor-pointer border-l-[3px] transition-all w-full text-left ${
                    currentStep === s.n ? "border-l-brand bg-gray-50" : "border-transparent hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold transition-all ${
                    currentStep === s.n ? "border-brand bg-brand text-white" : currentStep > s.n ? "border-forest bg-forest text-white" : "border-gray-300 text-gray-400"
                  }`}>
                    {currentStep > s.n ? (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                    ) : s.n}
                  </div>
                  <div>
                    <div className={`font-sans text-sm font-semibold ${currentStep === s.n ? "text-gray-900" : "text-gray-400"}`}>{s.label}</div>
                    <div className="font-sans text-xs text-gray-400 font-light">{s.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Form Panel */}
        <div className="bg-white border-0 sm:border border-gray-200 rounded-none sm:rounded-xl overflow-hidden shadow-sm">

          {/* Step 1 — Enrollment Type */}
          {currentStep === 1 && (
            <div>
              <div className="px-5 sm:px-8 pt-6 pb-5 border-b border-gray-100">
                <div className="font-sans text-[10px] font-bold uppercase tracking-[2px] text-brand mb-1">Step 1 of 6</div>
                <h2 className="font-sans text-xl font-bold text-gray-900 mb-0.5">Enrollment Type &amp; Program</h2>
                <p className="font-sans text-sm text-gray-400 font-light">Choose how you&apos;d like to register, then select your grade level and program.</p>
              </div>
              <div className="px-5 sm:px-8 py-6 space-y-6">
                {/* Registration Method */}
                <div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />Registration Method
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { val: "online", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", title: "Online Registration", sub: "Fill out the entire form digitally" },
                      { val: "walkin", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "Walk-in Registration", sub: "Download & print, submit at Registrar" },
                    ].map((m) => (
                      <button key={m.val} onClick={() => set("regMethod", m.val)} className={`border-2 rounded-xl p-4 cursor-pointer flex items-start gap-3 relative text-left transition-all ${form.regMethod === m.val ? "border-brand bg-brand/5" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${form.regMethod === m.val ? "bg-brand/10" : "bg-gray-100"}`}>
                          <svg className={`w-5 h-5 ${form.regMethod === m.val ? "text-brand" : "text-gray-400"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={m.icon} /></svg>
                        </div>
                        <div>
                          <div className={`font-sans text-sm font-bold leading-snug ${form.regMethod === m.val ? "text-brand" : "text-gray-800"}`}>{m.title}</div>
                          <div className="font-sans text-xs text-gray-500 font-light mt-0.5">{m.sub}</div>
                        </div>
                        {form.regMethod === m.val && (
                          <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-brand border-2 border-brand flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grade Level */}
                <div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />Grade Level to Enroll
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {gradeCards.map((g) => (
                      <button key={g.val} onClick={() => set("grade", g.val)} className={`border-2 rounded-xl p-4 cursor-pointer hover:border-gray-300 relative text-left transition-all ${form.grade === g.val ? "border-brand bg-brand/5" : errors.grade ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-white"}`}>
                        <div className="font-sans text-[10px] font-bold uppercase tracking-wide bg-gray-100 text-gray-400 px-2 py-0.5 rounded inline-block mb-2">{g.badge}</div>
                        <div className="font-sans text-sm font-bold text-gray-900">{g.title}</div>
                        <div className="font-sans text-xs text-gray-400 font-light">{g.sub}</div>
                        {form.grade === g.val && <div className="absolute top-3 right-3 w-4 h-4 rounded-full border-[1.5px] border-brand bg-brand flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-white" /></div>}
                      </button>
                    ))}
                  </div>
                  <Err field="grade" />
                </div>
                {form.grade && (
                  <div>
                    <div className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />Learner Reference Number
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-4">
                      <div>
                        <div className="font-sans text-xs font-bold text-gray-700 mb-2">Do you have an LRN?</div>
                        <div className="flex gap-4">
                          {["yes", "no"].map((v) => (
                            <label key={v} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                              <input type="radio" name="hasLRN" checked={form.hasLRN === v} onChange={() => set("hasLRN", v)} className="accent-brand" /> {v === "yes" ? "Yes" : "No"}
                            </label>
                          ))}
                        </div>
                      </div>
                      {form.hasLRN === "yes" && (
                        <div>
                          <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">LRN <span className="text-brand">*</span></label>
                          <input type="text" value={form.lrn} onChange={(e) => set("lrn", sanitizeLrn(e.target.value))} placeholder="123456789012" maxLength={12} className={`font-sans w-full px-3.5 py-2.5 border rounded-lg text-sm bg-white ${errors.lrn ? "border-red-400 bg-red-50/30" : "border-gray-200"}`} />
                          <Err field="lrn" />
                        </div>
                      )}
                      <div>
                        <div className="font-sans text-xs font-bold text-gray-700 mb-2">Are you a Balik-Aral (returning student)?</div>
                        <div className="flex gap-4">
                          {["yes", "no"].map((v) => (
                            <label key={v} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                              <input type="radio" name="isBalik" checked={form.isBalik === v} onChange={() => set("isBalik", v)} className="accent-brand" /> {v === "yes" ? "Yes" : "No"}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Grade Level (for Transferee / Old Student) */}
                {(form.grade === "trans" || form.grade === "back") && (
                  <div>
                    <div className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />Grade Level to Enroll
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                      {gradeLevels.filter((gl) => form.grade === "back" ? gl.val !== "7" : true).map((gl) => (
                        <button key={gl.val} onClick={() => { set("gradeLevel", gl.val); set("track", ""); set("strand", ""); }} className={`border-2 rounded-xl p-3 cursor-pointer text-center transition-all ${form.gradeLevel === gl.val ? "border-brand bg-brand/5" : errors.gradeLevel ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                          <div className="font-sans text-sm font-bold text-gray-900">{gl.label}</div>
                          <div className="font-sans text-[10px] text-gray-400 uppercase tracking-wide">{gl.track === "shs" ? "Senior High" : "Junior High"}</div>
                          {form.gradeLevel === gl.val && <div className="mt-1.5 w-4 h-4 rounded-full border-[1.5px] border-brand bg-brand flex items-center justify-center mx-auto"><div className="w-2 h-2 rounded-full bg-white" /></div>}
                        </button>
                      ))}
                    </div>
                    <Err field="gradeLevel" />
                  </div>
                )}

                {/* SHS Track */}
                {(form.grade === "shs" || ((form.grade === "trans" || form.grade === "back") && form.gradeLevel === "11")) && (
                  <div>
                    <div className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />SHS Track
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {trackCards.map((t) => (
                        <button key={t.val} onClick={() => { set("track", t.val); set("strand", ""); }} className={`border-2 rounded-xl p-3 cursor-pointer text-left transition-all ${form.track === t.val ? "border-brand bg-brand/5" : errors.track ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                          <div className="font-sans text-sm font-bold text-gray-900">{t.label}</div>
                          <div className="font-sans text-[11px] text-gray-400">{t.desc}</div>
                        </button>
                      ))}
                    </div>
                    <Err field="track" />

                    {form.track && strandCards[form.track] && (
                      <div className="mt-4">
                        <div className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />Strand <span className="text-brand ml-1">*</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {strandCards[form.track].map((s) => (
                            <button key={s.val} onClick={() => set("strand", s.val)} className={`border-2 rounded-xl p-3 cursor-pointer text-left transition-all ${form.strand === s.val ? "border-brand bg-brand/5" : errors.strand ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                              <div className="font-sans text-sm font-bold text-gray-900">{s.label}</div>
                            </button>
                          ))}
                        </div>
                        <Err field="strand" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2 — Learner Info */}
          {currentStep === 2 && (
            <div>
              <div className="px-5 sm:px-8 pt-6 pb-5 border-b border-gray-100">
                <div className="font-sans text-[10px] font-bold uppercase tracking-[2px] text-brand mb-1">Step 2 of 6</div>
                <h2 className="font-sans text-xl font-bold text-gray-900 mb-0.5">Learner Information</h2>
                <p className="font-sans text-sm text-gray-400 font-light">Enter information exactly as it appears on the PSA Birth Certificate.</p>
              </div>
              <div className="px-5 sm:px-8 py-6 space-y-6">
                {/* Name */}
                <div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-3 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />Full Name
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">Last Name <span className="text-brand">*</span></label>
                      <input type="text" value={form.lname} onChange={(e) => set("lname", sanitizeName(e.target.value).toUpperCase())} placeholder="REYES" className={`font-sans w-full px-3.5 py-2.5 border rounded-lg text-sm bg-white ${errors.lname ? "border-red-400 bg-red-50/30" : "border-gray-200"}`} />
                      <Err field="lname" />
                    </div>
                    <div>
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">First Name <span className="text-brand">*</span></label>
                      <input type="text" value={form.fname} onChange={(e) => set("fname", sanitizeName(e.target.value).toUpperCase())} placeholder="MARIA" className={`font-sans w-full px-3.5 py-2.5 border rounded-lg text-sm bg-white ${errors.fname ? "border-red-400 bg-red-50/30" : "border-gray-200"}`} />
                      <Err field="fname" />
                    </div>
                    <div>
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">Middle Name</label>
                      <input type="text" value={form.mname} onChange={(e) => set("mname", sanitizeName(e.target.value).toUpperCase())} placeholder="SANTOS" className="font-sans w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm bg-white" />
                    </div>
                  </div>
                </div>

                {/* Birth Details */}
                <div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-3 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />Birth Details
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <CustomDatePicker
                        label="Birthdate *"
                        value={form.dob}
                        onChange={(val) => set("dob", val)}
                        error={errors.dob}
                        maxYear={maxYear}
                        minYear={minYear}
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">Sex <span className="text-brand">*</span></label>
                      <div className="flex gap-4 mt-1">
                        {["Male", "Female"].map((s) => (
                          <label key={s} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                            <input type="radio" name="sex" value={s} checked={form.sex === s} onChange={() => set("sex", s)} className="accent-brand" /> {s}
                          </label>
                        ))}
                      </div>
                      <Err field="sex" />
                    </div>
                    <div>
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">Place of Birth <span className="text-brand">*</span></label>
                      <input type="text" value={form.pob} onChange={(e) => set("pob", sanitizeAddress(e.target.value).toUpperCase())} placeholder="CEBU CITY" className={`font-sans w-full px-3.5 py-2.5 border rounded-lg text-sm bg-white ${errors.pob ? "border-red-400 bg-red-50/30" : "border-gray-200"}`} />
                      <Err field="pob" />
                    </div>
                    <div>
                      <CustomSelect
                        label="Mother Tongue *"
                        placeholder="Select mother tongue..."
                        value={form.motherTongue}
                        onChange={(val) => set("motherTongue", val)}
                        options={motherTongues.map((mt) => ({ label: mt, value: mt }))}
                        error={errors.motherTongue}
                      />
                    </div>
                  </div>
                </div>

                {/* IP & 4Ps */}
                <div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-3 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />Indigenous Peoples &amp; 4Ps
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <div className="font-sans text-xs font-bold text-gray-700 mb-2">Belonging to any Indigenous Peoples community?</div>
                      <div className="flex gap-4">
                        {["yes", "no"].map((v) => (
                          <label key={v} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                            <input type="radio" name="isIP" checked={form.isIP === v} onChange={() => set("isIP", v)} className="accent-brand" /> {v === "yes" ? "Yes" : "No"}
                          </label>
                        ))}
                      </div>
                      {form.isIP === "yes" && (
                        <div className="mt-3">
                          <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">IP Group / Community <span className="text-brand">*</span></label>
                          <input type="text" value={form.ipGroup} onChange={(e) => set("ipGroup", sanitizeGeneral(e.target.value))} placeholder="e.g. T'boli, B'laan, Lumad..." className={`font-sans w-full px-3.5 py-2.5 border rounded-lg text-sm bg-white ${errors.ipGroup ? "border-red-400 bg-red-50/30" : "border-gray-200"}`} />
                          <Err field="ipGroup" />
                        </div>
                      )}
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <div className="font-sans text-xs font-bold text-gray-700 mb-2">Is your family a beneficiary of 4Ps?</div>
                      <div className="flex gap-4">
                        {["yes", "no"].map((v) => (
                          <label key={v} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                            <input type="radio" name="is4PS" checked={form.is4PS === v} onChange={() => set("is4PS", v)} className="accent-brand" /> {v === "yes" ? "Yes" : "No"}
                          </label>
                        ))}
                      </div>
                      {form.is4PS === "yes" && (
                        <div className="mt-3">
                          <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">4Ps Household ID <span className="text-brand">*</span></label>
                          <input type="text" value={form.fourpsId} onChange={(e) => set("fourpsId", sanitizeId(e.target.value))} placeholder="HH-ID number" className={`font-sans w-full px-3.5 py-2.5 border rounded-lg text-sm bg-white ${errors.fourpsId ? "border-red-400 bg-red-50/30" : "border-gray-200"}`} />
                          <Err field="fourpsId" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* LWD */}
                <div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-3 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />Learner with Disability (LWD)
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <div className="font-sans text-xs font-bold text-gray-700 mb-2">Is the learner with disability?</div>
                    <div className="flex gap-4">
                      {["yes", "no"].map((v) => (
                        <label key={v} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                          <input type="radio" name="isLWD" checked={form.isLWD === v} onChange={() => set("isLWD", v)} className="accent-brand" /> {v === "yes" ? "Yes" : "No"}
                        </label>
                      ))}
                    </div>
                    {form.isLWD === "yes" && (
                      <div className="mt-3">
                        <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-2">Select type(s) of disability:</label>
                        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 ${errors.lwdTypes ? "ring-1 ring-red-400 rounded-lg p-1" : ""}`}>
                          {lwdTypes.map((lt) => (
                            <label key={lt} className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer text-xs font-sans transition-all ${form.lwdTypes.includes(lt) ? "border-brand bg-brand/5 text-brand" : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"}`}>
                              <input type="checkbox" checked={form.lwdTypes.includes(lt)} onChange={() => {
                                const types = form.lwdTypes.includes(lt) ? form.lwdTypes.filter((t) => t !== lt) : [...form.lwdTypes, lt];
                                set("lwdTypes", types);
                              }} className="accent-brand w-3.5 h-3.5 flex-shrink-0" />
                              {lt}
                            </label>
                          ))}
                        </div>
                        <Err field="lwdTypes" />
                        {form.lwdTypes.includes("Other") && (
                          <div className="mt-2">
                            <input type="text" value={form.lwdOther} onChange={(e) => set("lwdOther", sanitizeGeneral(e.target.value))} placeholder="Specify other disability..." className="font-sans w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm bg-white" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-3 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />2x2 ID Photo
                  </div>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-brand/50 transition-colors bg-gray-50">
                    {form.photoPreview ? (
                      <div className="space-y-3">
                        <img src={form.photoPreview} alt="Preview" className="w-24 h-24 rounded-lg object-cover mx-auto border border-gray-200" />
                        <button type="button" onClick={() => set("photoPreview", "")} className="font-sans text-xs text-red-500 hover:text-red-700 font-semibold">Remove Photo</button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <div className="font-sans text-sm text-gray-600 font-medium mb-1">Click to upload 2x2 ID photo</div>
                        <div className="font-sans text-[11px] text-gray-400">JPG or PNG, max 2MB</div>
                        <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (!["image/jpeg", "image/png"].includes(file.type)) {
                            alert("Only JPG and PNG files are allowed.");
                            e.target.value = "";
                            return;
                          }
                          if (file.size > 2 * 1024 * 1024) {
                            alert("File size must be under 2MB.");
                            e.target.value = "";
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = (ev) => set("photoPreview", ev.target?.result as string);
                          reader.readAsDataURL(file);
                        }} />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Address & Contact */}
          {currentStep === 3 && (
            <div>
              <div className="px-5 sm:px-8 pt-6 pb-5 border-b border-gray-100">
                <div className="font-sans text-[10px] font-bold uppercase tracking-[2px] text-brand mb-1">Step 3 of 6</div>
                <h2 className="font-sans text-xl font-bold text-gray-900 mb-0.5">Address &amp; Contact</h2>
                <p className="font-sans text-sm text-gray-400 font-light">Provide current and permanent address details.</p>
              </div>
              <div className="px-5 sm:px-8 py-6 space-y-6">
                <div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-3 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />Current Address
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    <div>
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">House No.</label>
                      <input type="text" value={form.currHouse} onChange={(e) => set("currHouse", sanitizeAddress(e.target.value))} placeholder="123" className="font-sans w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white" />
                    </div>
                    <div>
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">Street</label>
                      <input type="text" value={form.currStreet} onChange={(e) => set("currStreet", sanitizeAddress(e.target.value))} placeholder="Street name" className="font-sans w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white" />
                    </div>
                    <div>
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">Province <span className="text-brand">*</span></label>
                      <input type="text" value={form.currProvince} onChange={(e) => set("currProvince", sanitizeAddress(e.target.value))} placeholder="Cebu" className={`font-sans w-full px-3 py-2.5 border rounded-lg text-sm bg-white ${errors.currProvince ? "border-red-400 bg-red-50/30" : "border-gray-200"}`} />
                      <Err field="currProvince" />
                    </div>
                    <div>
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">City <span className="text-brand">*</span></label>
                      <input type="text" value={form.currCity} onChange={(e) => set("currCity", sanitizeAddress(e.target.value))} placeholder="Cebu City" className={`font-sans w-full px-3 py-2.5 border rounded-lg text-sm bg-white ${errors.currCity ? "border-red-400 bg-red-50/30" : "border-gray-200"}`} />
                      <Err field="currCity" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">Barangay <span className="text-brand">*</span></label>
                      <input type="text" value={form.currBarangay} onChange={(e) => set("currBarangay", sanitizeAddress(e.target.value))} placeholder="Mabolo" className={`font-sans w-full px-3 py-2.5 border rounded-lg text-sm bg-white ${errors.currBarangay ? "border-red-400 bg-red-50/30" : "border-gray-200"}`} />
                      <Err field="currBarangay" />
                    </div>
                    <div>
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">Zip Code</label>
                      <input type="text" value={form.currZip} onChange={(e) => set("currZip", sanitizeZip(e.target.value))} placeholder="6000" maxLength={4} className="font-sans w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-3 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />Contact Details
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">Contact Number <span className="text-brand">*</span></label>
                      <input type="tel" value={form.mobile} onChange={(e) => set("mobile", sanitizePhone(e.target.value))} placeholder="09XX-XXX-XXXX" maxLength={11} className={`font-sans w-full px-3.5 py-2.5 border rounded-lg text-sm bg-white ${errors.mobile ? "border-red-400 bg-red-50/30" : "border-gray-200"}`} />
                      <Err field="mobile" />
                    </div>
                    <div>
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">Email Address <span className="text-brand">*</span></label>
                      <input type="email" value={form.email} onChange={(e) => set("email", sanitizeEmail(e.target.value))} placeholder="student@email.com" className={`font-sans w-full px-3.5 py-2.5 border rounded-lg text-sm bg-white ${errors.email ? "border-red-400 bg-red-50/30" : "border-gray-200"}`} />
                      <Err field="email" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-3 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />Permanent Address
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer mb-4 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                    <input type="checkbox" checked={form.permSame === "yes"} onChange={(e) => set("permSame", e.target.checked ? "yes" : "no")} className="accent-brand w-4 h-4 flex-shrink-0" />
                    <span className="font-sans text-sm text-gray-700">Same as current address</span>
                  </label>
                  {form.permSame !== "yes" && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">House No.</label>
                          <input type="text" value={form.permHouse} onChange={(e) => set("permHouse", sanitizeAddress(e.target.value))} placeholder="123" className="font-sans w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white" />
                        </div>
                        <div>
                          <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">Street</label>
                          <input type="text" value={form.permStreet} onChange={(e) => set("permStreet", sanitizeAddress(e.target.value))} placeholder="Street name" className="font-sans w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white" />
                        </div>
                        <div>
                          <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">Province <span className="text-brand">*</span></label>
                          <input type="text" value={form.permProvince} onChange={(e) => set("permProvince", sanitizeAddress(e.target.value))} placeholder="Cebu" className={`font-sans w-full px-3 py-2.5 border rounded-lg text-sm bg-white ${errors.permProvince ? "border-red-400 bg-red-50/30" : "border-gray-200"}`} />
                          <Err field="permProvince" />
                        </div>
                        <div>
                          <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">City <span className="text-brand">*</span></label>
                          <input type="text" value={form.permCity} onChange={(e) => set("permCity", sanitizeAddress(e.target.value))} placeholder="Cebu City" className={`font-sans w-full px-3 py-2.5 border rounded-lg text-sm bg-white ${errors.permCity ? "border-red-400 bg-red-50/30" : "border-gray-200"}`} />
                          <Err field="permCity" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">Barangay <span className="text-brand">*</span></label>
                          <input type="text" value={form.permBarangay} onChange={(e) => set("permBarangay", sanitizeAddress(e.target.value))} placeholder="Mabolo" className={`font-sans w-full px-3 py-2.5 border rounded-lg text-sm bg-white ${errors.permBarangay ? "border-red-400 bg-red-50/30" : "border-gray-200"}`} />
                          <Err field="permBarangay" />
                        </div>
                        <div>
                          <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">Zip Code</label>
                          <input type="text" value={form.permZip} onChange={(e) => set("permZip", sanitizeZip(e.target.value))} placeholder="6000" maxLength={4} className="font-sans w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4 — Parents/Guardian */}
          {currentStep === 4 && (
            <div>
              <div className="px-5 sm:px-8 pt-6 pb-5 border-b border-gray-100">
                <div className="font-sans text-[10px] font-bold uppercase tracking-[2px] text-brand mb-1">Step 4 of 6</div>
                <h2 className="font-sans text-xl font-bold text-gray-900 mb-0.5">Parent&apos;s / Guardian&apos;s Information</h2>
                <p className="font-sans text-sm text-gray-400 font-light">Provide information about parents or legal guardian.</p>
              </div>
              <div className="px-5 sm:px-8 py-6 space-y-6">
                {[
                  { title: "Father&apos;s Name", prefix: "father", fields: ["lname", "fname", "mname", "contact", "occupation"] },
                  { title: "Mother&apos;s Maiden Name", prefix: "mother", fields: ["lname", "fname", "mname", "contact", "occupation"] },
                ].map((parent) => (
                  <div key={parent.prefix}>
                    <div className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-3 flex items-center gap-2 pb-2 border-b border-gray-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" /><span dangerouslySetInnerHTML={{ __html: parent.title }} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      {parent.fields.map((f) => {
                        const key = `${parent.prefix}${f.charAt(0).toUpperCase() + f.slice(1)}`;
                        const labels: Record<string, string> = { lname: "Last Name", fname: "First Name", mname: "Middle Name", contact: "Contact Number", occupation: "Occupation" };
                        const phs: Record<string, string> = { lname: "Last name", fname: "First name", mname: "Middle name", contact: "09XX-XXX-XXXX", occupation: "e.g. Teacher, Engineer" };
                        const isRequired = f === "lname" || f === "fname";
                        const sanitize = f === "contact" ? sanitizePhone : f === "occupation" ? sanitizeOccupation : sanitizeName;
                        return (
                          <div key={f}>
                            <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">{labels[f]}{isRequired && " "}<span className="text-brand">{isRequired ? "*" : ""}</span></label>
                            <input type={f === "contact" ? "tel" : "text"} value={form[key as keyof typeof form] as string} onChange={(e) => set(key, sanitize(e.target.value))} placeholder={phs[f]} className={`font-sans w-full px-3 py-2.5 border rounded-lg text-sm bg-white ${errors[key] ? "border-red-400 bg-red-50/30" : "border-gray-200"}`} />
                            <Err field={key} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Guardian */}
                <div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-3 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />Guardian (if applicable)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {[
                      { key: "guardianLname", label: "Last Name", ph: "Last name" },
                      { key: "guardianFname", label: "First Name", ph: "First name" },
                      { key: "guardianMname", label: "Middle Name", ph: "Middle name" },
                      { key: "guardianContact", label: "Contact Number", ph: "09XX-XXX-XXXX" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">{f.label}</label>
                        <input type={f.key.includes("Contact") ? "tel" : "text"} value={form[f.key as keyof typeof form] as string} onChange={(e) => set(f.key, f.key.includes("Contact") ? sanitizePhone(e.target.value) : sanitizeName(e.target.value))} placeholder={f.ph} className="font-sans w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documentary Requirements */}
                <div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-3 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />Documentary Requirements
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 flex items-start gap-3">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <div>
                      <div className="font-sans text-xs font-bold text-amber-800 mb-0.5">Please prepare the following documents</div>
                      <div className="font-sans text-[11px] text-amber-700/80">Check all that apply. Original copies must be presented upon enrollment.</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      "PSA Birth Certificate (original + 1 photocopy)",
                      "Form 137 / SF9 (Learner's Permanent Record)",
                      "Certificate of Good Moral Character",
                      "Certificate of Completion / Diploma",
                      "2x2 ID Photo (white background)",
                      "Medical Certificate (if applicable)",
                      "Transfer Credentials (for transferees)",
                      "Previous Report Card (if available)",
                    ].map((req) => (
                      <label key={req} className="flex items-start gap-3 border border-gray-200 rounded-lg px-3 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors">
                        <input type="checkbox" className="accent-brand w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span className="font-sans text-sm text-gray-700">{req}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5 — School Record */}
          {currentStep === 5 && (
            <div>
              <div className="px-5 sm:px-8 pt-6 pb-5 border-b border-gray-100">
                <div className="font-sans text-[10px] font-bold uppercase tracking-[2px] text-brand mb-1">Step 5 of 6</div>
                <h2 className="font-sans text-xl font-bold text-gray-900 mb-0.5">Previous School Record</h2>
                <p className="font-sans text-sm text-gray-400 font-light">For returning learners and transferees.</p>
              </div>
              <div className="px-5 sm:px-8 py-6 space-y-5">
                <div className="flex items-start gap-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg px-4 py-3 text-xs text-blue-800">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>For returning learners and transferees, complete all fields below.</span>
                </div>
                <div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-3 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />Last School Attended
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">School Name <span className="text-brand">*</span></label>
                      <input type="text" value={form.prevSchool} onChange={(e) => set("prevSchool", sanitizeSchool(e.target.value))} placeholder="Full name of school" className={`font-sans w-full px-3.5 py-2.5 border rounded-lg text-sm bg-white ${errors.prevSchool ? "border-red-400 bg-red-50/30" : "border-gray-200"}`} />
                      <Err field="prevSchool" />
                    </div>
                    <div>
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">School ID</label>
                      <input type="text" value={form.prevSchoolId} onChange={(e) => set("prevSchoolId", sanitizeId(e.target.value))} placeholder="School ID" className="font-sans w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm bg-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <CustomSelect
                        label="Last Grade Completed *"
                        placeholder="Select grade..."
                        value={form.lastGrade}
                        onChange={(val) => set("lastGrade", val)}
                        options={["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10"].map((g) => ({ label: g, value: g }))}
                        error={errors.lastGrade}
                      />
                    </div>
                    <div>
                      <CustomSelect
                        label="Last School Year"
                        placeholder="Select school year..."
                        value={form.lastSY}
                        onChange={(val) => set("lastSY", val)}
                        options={(sy?.recentYears ?? ["2025-2026", "2024-2025", "2023-2024"]).map((s) => ({ label: s, value: s }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6 — Review & Submit */}
          {currentStep === 6 && (
            <div>
              <div className="px-5 sm:px-8 pt-6 pb-5 border-b border-gray-100">
                <div className="font-sans text-[10px] font-bold uppercase tracking-[2px] text-brand mb-1">Step 6 of 6</div>
                <h2 className="font-sans text-xl font-bold text-gray-900 mb-0.5">Review &amp; Submit</h2>
                <p className="font-sans text-sm text-gray-400 font-light">Review all information carefully before final submission.</p>
              </div>
              <div className="px-5 sm:px-8 py-6 space-y-4">
                {[
                  { title: "Enrollment Type", fields: [
                    { label: "Applicant Type", val: gradeCards.find((g) => g.val === form.grade)?.title || "—" },
                    { label: "Grade Level", val: form.grade === "g7" ? "Grade 7" : form.grade === "shs" ? "Grade 11" : form.gradeLevel ? `Grade ${form.gradeLevel}` : "—" },
                    { label: "SHS Track", val: trackCards.find((t) => t.val === form.track)?.label || "—" },
                  ]},
                  { title: "Learner Information", fields: [
                    { label: "Full Name", val: [form.fname, form.mname, form.lname].filter(Boolean).join(" ").toUpperCase() || "—" },
                    { label: "Birthdate", val: form.dob || "—" },
                    { label: "Sex", val: form.sex || "—" },
                    { label: "Place of Birth", val: form.pob || "—" },
                  ]},
                  { title: "Address & Contact", fields: [
                    { label: "Current Address", val: [form.currHouse, form.currStreet, form.currBarangay, form.currCity, form.currProvince].filter(Boolean).join(", ") || "—" },
                    { label: "Contact Number", val: form.mobile || "—" },
                    { label: "Email", val: form.email || "—" },
                  ]},
                  { title: "Parents / Guardian", fields: [
                    { label: "Father", val: [form.fatherFname, form.fatherMname, form.fatherLname].filter(Boolean).join(" ").toUpperCase() || "—" },
                    { label: "Mother", val: [form.motherFname, form.motherMname, form.motherLname].filter(Boolean).join(" ").toUpperCase() || "—" },
                  ]},
                ].map((block) => (
                  <div key={block.title} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-100 px-4 py-2.5 flex items-center justify-between">
                      <span className="font-sans text-[10px] font-bold uppercase tracking-[2px] text-gray-600">{block.title}</span>
                      <button onClick={() => setCurrentStep(steps.findIndex((s) => s.label === block.title.split(" ")[0]) + 1 || 1)} className="font-sans text-xs text-brand font-semibold hover:underline">Edit</button>
                    </div>
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {block.fields.map((f) => (
                        <div key={f.label}>
                          <strong className="block font-sans text-[10px] uppercase tracking-wide text-gray-400 font-bold mb-0.5">{f.label}</strong>
                          <span className="font-sans text-sm text-gray-900">{f.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Declaration */}
                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[2px] text-gray-500 mb-3">Certification / Declaration</div>
                  <p className="font-sans text-sm text-gray-600 font-light leading-relaxed mb-3">I hereby certify that the information provided above are true and correct to the best of my knowledge.</p>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.declare} onChange={(e) => set("declare", e.target.checked)} className="mt-1 accent-brand w-4 h-4 flex-shrink-0" />
                    <span className="font-sans text-sm text-gray-900 font-medium leading-relaxed">I certify that the information provided are true and correct and I同意 to the terms.</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Footer */}
          <div className="px-5 sm:px-8 py-4 border-t border-gray-100 flex items-center justify-between gap-3 flex-wrap">
            <button onClick={() => setCurrentStep((s) => Math.max(1, s - 1))} disabled={currentStep === 1} className="inline-flex items-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-lg transition-all bg-white disabled:opacity-40 disabled:cursor-not-allowed">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>Back
            </button>
            <span className="font-sans text-xs text-gray-400">{currentStep} of {steps.length}</span>
            {currentStep < steps.length ? (
              <button onClick={handleNext} className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors">
                Continue <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
              </button>
            ) : (
              <button disabled={!form.declare} className="inline-flex items-center gap-2 bg-forest hover:bg-green-900 text-white font-bold text-sm px-7 py-2.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                Submit Application <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
