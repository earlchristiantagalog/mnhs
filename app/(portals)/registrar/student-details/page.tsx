"use client";

import { useState, useEffect } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import { CustomDatePicker } from "@/components/ui/custom-date-picker";
import { sanitizeName, sanitizeLrn, sanitizePhone, sanitizeGeneral, sanitizeAddress, validateLrn, validatePhone, validateName } from "@/lib/sanitize";

const initialStudents = [
  { id: "STU-001", name: "Maria Clara Santos", lrn: "123456789012", grade: "Grade 7", section: "Rose", status: "active", gender: "Female", birthdate: "2014-03-15", contact: "09171234567", address: "Mabolo, Cebu City" },
  { id: "STU-002", name: "Juan Dela Cruz", lrn: "123456789013", grade: "Grade 11", section: "STEM-A", status: "active", gender: "Male", birthdate: "2008-07-22", contact: "09181234567", address: "Lahug, Cebu City" },
  { id: "STU-003", name: "Ana Reyes", lrn: "123456789014", grade: "Grade 7", section: "Sampaguita", status: "active", gender: "Female", birthdate: "2014-11-08", contact: "09191234567", address: "Apas, Cebu City" },
  { id: "STU-004", name: "Pedro Garcia", lrn: "123456789015", grade: "Grade 11", section: "ABM-A", status: "active", gender: "Male", birthdate: "2008-01-30", contact: "09201234567", address: "Kasambagan, Cebu City" },
  { id: "STU-005", name: "Sofia Lim", lrn: "123456789016", grade: "Grade 7", section: "Rose", status: "active", gender: "Female", birthdate: "2014-05-19", contact: "09211234567", address: "Mabolo, Cebu City" },
  { id: "STU-006", name: "Carlos Torres", lrn: "123456789017", grade: "Grade 11", section: "HUMSS-A", status: "active", gender: "Male", birthdate: "2008-09-03", contact: "09221234567", address: "Guadalupe, Cebu City" },
  { id: "STU-007", name: "Isabella Cruz", lrn: "123456789018", grade: "Grade 7", section: "Sampaguita", status: "active", gender: "Female", birthdate: "2014-12-25", contact: "09231234567", address: "Banilad, Cebu City" },
  { id: "STU-008", name: "Miguel Santos", lrn: "123456789019", grade: "Grade 11", section: "TVL-A", status: "inactive", gender: "Male", birthdate: "2008-04-11", contact: "09241234567", address: "Talamban, Cebu City" },
];

const gradeOptions = [
  { label: "Grade 7", value: "Grade 7" },
  { label: "Grade 8", value: "Grade 8" },
  { label: "Grade 9", value: "Grade 9" },
  { label: "Grade 10", value: "Grade 10" },
  { label: "Grade 11", value: "Grade 11" },
];

const gradeFilters = ["All", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11"];

interface Student {
  id: string;
  name: string;
  lrn: string;
  grade: string;
  section: string;
  status: string;
  gender: string;
  birthdate: string;
  contact: string;
  address: string;
}

interface FormData {
  lname: string;
  fname: string;
  mname: string;
  lrn: string;
  grade: string;
  section: string;
  gender: string;
  birthdate: string;
  contact: string;
  address: string;
}

const emptyForm: FormData = {
  lname: "", fname: "", mname: "", lrn: "", grade: "", section: "", gender: "", birthdate: "", contact: "", address: "",
};

export default function StudentDetailsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState("");
  const [maxYear, setMaxYear] = useState(2026);
  const [minYear, setMinYear] = useState(1990);

  useEffect(() => {
    const d = new Date();
    setMaxYear(d.getFullYear());
    setMinYear(d.getFullYear() - 36);
  }, []);

  const set = (field: keyof FormData, value: string) => {
    let sanitized = value;
    switch (field) {
      case "lname":
      case "fname":
      case "mname":
        sanitized = sanitizeName(value);
        break;
      case "lrn":
        sanitized = sanitizeLrn(value);
        break;
      case "contact":
        sanitized = sanitizePhone(value);
        break;
      case "section":
      case "address":
        sanitized = sanitizeGeneral(value);
        break;
    }
    setForm((prev) => ({ ...prev, [field]: sanitized }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.fname.trim()) e.fname = "First name is required";
    else if (!validateName(form.fname)) e.fname = "First name is invalid";
    if (!form.lname.trim()) e.lname = "Last name is required";
    else if (!validateName(form.lname)) e.lname = "Last name is invalid";
    if (!form.lrn.trim()) e.lrn = "LRN is required";
    else if (!validateLrn(form.lrn)) e.lrn = "LRN must be exactly 12 digits";
    if (!form.grade) e.grade = "Grade level is required";
    if (!form.section.trim()) e.section = "Section is required";
    else if (form.section.length > 50) e.section = "Section is too long";
    if (!form.gender) e.gender = "Gender is required";
    if (!form.birthdate) e.birthdate = "Birthdate is required";
    if (form.contact && !validatePhone(form.contact)) e.contact = "Invalid phone format (09XXXXXXXXX)";
    if (form.address.length > 200) e.address = "Address is too long";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const safeFname = sanitizeName(form.fname);
    const safeMname = sanitizeName(form.mname);
    const safeLname = sanitizeName(form.lname);
    const safeSection = sanitizeGeneral(form.section);
    const safeContact = sanitizePhone(form.contact);
    const safeAddress = sanitizeAddress(form.address);
    const fullName = `${safeFname}${safeMname ? " " + safeMname : ""} ${safeLname}`;
    const newId = `STU-${String(students.length + 1).padStart(3, "0")}`;

    setStudents((prev) => [
      { id: newId, name: fullName, lrn: form.lrn, grade: form.grade, section: safeSection, gender: form.gender, birthdate: form.birthdate, contact: safeContact, address: safeAddress, status: "active" },
      ...prev,
    ]);

    setForm(emptyForm);
    setErrors({});
    setSuccessMsg(`Student "${fullName}" added successfully!`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const filtered = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.lrn.includes(search) ||
      s.section.toLowerCase().includes(search.toLowerCase());
    const matchGrade = gradeFilter === "All" || s.grade === gradeFilter;
    return matchSearch && matchGrade;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">STUDENT DETAILS</h1>
          <p className="text-sm text-gray-500 mt-0.5">View enrolled student records and information</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            showForm ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200"
          }`}
        >
          {showForm ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              Close Form
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Add Student
            </>
          )}
        </button>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-4 py-3 rounded-lg animate-[fadeUp_0.2s_ease_both]">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          {successMsg}
        </div>
      )}

      {/* Data Entry Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-[fadeUp_0.3s_ease_both]">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800">Data Entry Form</h2>
              <p className="text-[11px] text-gray-400">Fill out the student information below</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Last Name *</label>
                <input
                  type="text"
                  value={form.lname}
                  onChange={(e) => set("lname", e.target.value)}
                  placeholder="e.g. Santos"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.lname ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.lname && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.lname}</p>}
              </div>
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">First Name *</label>
                <input
                  type="text"
                  value={form.fname}
                  onChange={(e) => set("fname", e.target.value)}
                  placeholder="e.g. Maria Clara"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.fname ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.fname && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.fname}</p>}
              </div>
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Middle Name</label>
                <input
                  type="text"
                  value={form.mname}
                  onChange={(e) => set("mname", e.target.value)}
                  placeholder="e.g. Reyes"
                  className="font-sans w-full px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* LRN + Grade + Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">LRN *</label>
                <input
                  type="text"
                  value={form.lrn}
                  onChange={(e) => set("lrn", e.target.value.replace(/\D/g, "").slice(0, 12))}
                  placeholder="12-digit LRN"
                  maxLength={12}
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.lrn ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.lrn && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.lrn}</p>}
              </div>
              <CustomSelect
                label="Grade Level *"
                options={gradeOptions}
                placeholder="Select grade..."
                value={form.grade}
                onChange={(val) => set("grade", val)}
                error={errors.grade}
              />
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Section *</label>
                <input
                  type="text"
                  value={form.section}
                  onChange={(e) => set("section", e.target.value)}
                  placeholder="e.g. Rose, STEM-A"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.section ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.section && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.section}</p>}
              </div>
            </div>

            {/* Gender + Birthdate + Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Gender *</label>
                <div className="flex gap-2">
                  {["Male", "Female"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => set("gender", g)}
                      className={`font-sans flex-1 py-2.5 border-[1.5px] rounded-lg text-sm font-semibold transition-all ${
                        form.gender === g
                          ? g === "Male" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-pink-500 bg-pink-50 text-pink-700"
                          : "border-gray-200 text-gray-500 hover:border-gray-300 bg-gray-50"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                {errors.gender && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.gender}</p>}
              </div>
              <CustomDatePicker
                label="Birthdate *"
                value={form.birthdate}
                onChange={(val) => set("birthdate", val)}
                error={errors.birthdate}
                maxYear={maxYear}
                minYear={minYear}
              />
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Contact Number</label>
                <input
                  type="tel"
                  value={form.contact}
                  onChange={(e) => set("contact", e.target.value.replace(/\D/g, "").slice(0, 11))}
                  placeholder="09XXXXXXXXX"
                  maxLength={11}
                  className="font-sans w-full px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                placeholder="e.g. Mabolo, Cebu City"
                className="font-sans w-full px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="font-sans inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white border-none rounded-lg text-sm font-semibold cursor-pointer hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Save Student
              </button>
              <button
                type="button"
                onClick={() => { setForm(emptyForm); setErrors({}); }}
                className="font-sans px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(sanitizeGeneral(e.target.value))}
            placeholder="Search by name, ID, LRN, or section..."
            className="font-sans w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500 bg-white transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {gradeFilters.map((g) => (
            <button
              key={g}
              onClick={() => setGradeFilter(g)}
              className={`font-sans px-3 py-2 border text-xs font-semibold rounded-lg transition-all ${
                gradeFilter === g
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600 bg-white"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">ID</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Name</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">LRN</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Grade</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Section</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Gender</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((stu) => (
                <tr key={stu.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-500">{stu.id}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{stu.name}</td>
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-400">{stu.lrn}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{stu.grade}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{stu.section}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      stu.gender === "Female" ? "bg-pink-50 text-pink-600" : "bg-blue-50 text-blue-600"
                    }`}>
                      {stu.gender}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      stu.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${stu.status === "active" ? "bg-emerald-500" : "bg-gray-400"}`} />
                      {stu.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="font-sans text-emerald-600 hover:text-emerald-700 text-xs font-semibold transition-colors">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-400">
            No students found matching your criteria.
          </div>
        )}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/50">
          <span className="text-xs text-gray-400">
            Showing {filtered.length} of {students.length} students
          </span>
        </div>
      </div>
    </div>
  );
}
