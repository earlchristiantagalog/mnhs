"use client";

import { useState } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import { sanitizeGeneral } from "@/lib/sanitize";

const sections = [
  { label: "All Sections", value: "all" },
  { label: "Grade 7 - Emerald", value: "Grade 7 - Emerald" },
  { label: "Grade 7 - Ruby", value: "Grade 7 - Ruby" },
  { label: "Grade 8 - Sapphire", value: "Grade 8 - Sapphire" },
  { label: "Grade 8 - Topaz", value: "Grade 8 - Topaz" },
  { label: "Grade 9 - Pearl", value: "Grade 9 - Pearl" },
  { label: "Grade 9 - Diamond", value: "Grade 9 - Diamond" },
];

const initialStudents: Record<string, { name: string; lrn: string; status: string }[]> = {
  "Grade 7 - Emerald": [
    { name: "Maria Clara Santos", lrn: "123456789012", status: "present" },
    { name: "Juan Dela Cruz", lrn: "234567890123", status: "present" },
    { name: "Pedro Garcia", lrn: "345678901234", status: "absent" },
    { name: "Sofia Lim", lrn: "456789012345", status: "late" },
    { name: "Carlos Torres", lrn: "567890123456", status: "present" },
  ],
  "Grade 7 - Ruby": [
    { name: "Ana Reyes", lrn: "678901234567", status: "present" },
    { name: "Isabella Cruz", lrn: "789012345678", status: "present" },
    { name: "Miguel Santos", lrn: "890123456789", status: "absent" },
    { name: "Elena Torres", lrn: "901234567890", status: "present" },
  ],
  "Grade 8 - Sapphire": [
    { name: "Andrea Santos", lrn: "111213141516", status: "present" },
    { name: "Mark Reyes", lrn: "121314151617", status: "late" },
    { name: "Claire Garcia", lrn: "131415161718", status: "present" },
    { name: "James Lim", lrn: "141516171819", status: "present" },
    { name: "Nicole Cruz", lrn: "151617181920", status: "present" },
  ],
  "Grade 8 - Topaz": [
    { name: "Patrick Torres", lrn: "161718192021", status: "absent" },
    { name: "Angela Santos", lrn: "171819202122", status: "present" },
    { name: "Daniel Reyes", lrn: "181920212223", status: "present" },
    { name: "Rose Garcia", lrn: "192021222324", status: "present" },
  ],
  "Grade 9 - Pearl": [
    { name: "John Dela Cruz", lrn: "202122232425", status: "present" },
    { name: "Samantha Lim", lrn: "212223242526", status: "present" },
    { name: "Michael Torres", lrn: "222324252627", status: "late" },
    { name: "Christine Santos", lrn: "232425262728", status: "present" },
    { name: "Robert Reyes", lrn: "242526272829", status: "absent" },
  ],
  "Grade 9 - Diamond": [
    { name: "Anna Garcia", lrn: "252627282930", status: "present" },
    { name: "David Cruz", lrn: "262728293031", status: "present" },
    { name: "Jessica Santos", lrn: "272829303132", status: "present" },
    { name: "Kevin Lim", lrn: "282930313233", status: "present" },
  ],
};

const statusColors: Record<string, string> = {
  present: "bg-emerald-100 text-emerald-700",
  absent: "bg-red-100 text-red-700",
  late: "bg-amber-100 text-amber-700",
};

const statusOptions = [
  { label: "Present", value: "present" },
  { label: "Absent", value: "absent" },
  { label: "Late", value: "late" },
];

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedSection, setSelectedSection] = useState("all");
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const currentSection = selectedSection === "all" ? Object.keys(students)[0] : selectedSection;
  const currentStudents = students[currentSection] || [];

  const filtered = currentStudents.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.lrn.includes(search)
  );

  const updateStatus = (section: string, studentIndex: number, newStatus: string) => {
    setStudents((prev) => ({
      ...prev,
      [section]: prev[section].map((s, i) => (i === studentIndex ? { ...s, status: newStatus } : s)),
    }));
  };

  const handleSave = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      setSuccessMsg(`Attendance saved for "${currentSection}" on ${new Date(selectedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}!`);
      setTimeout(() => setSuccessMsg(""), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const presentCount = currentStudents.filter((s) => s.status === "present").length;
  const absentCount = currentStudents.filter((s) => s.status === "absent").length;
  const lateCount = currentStudents.filter((s) => s.status === "late").length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">ATTENDANCE</h1>
          <p className="text-sm text-gray-500 mt-0.5">Record and track student attendance</p>
        </div>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-4 py-3 rounded-lg animate-[fadeUp_0.2s_ease_both]">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          {successMsg}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div>
          <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="font-sans px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500 bg-gray-50 focus:bg-white transition-colors"
          />
        </div>
        <div className="flex-1 max-w-xs">
          <CustomSelect
            label="Section"
            options={sections}
            placeholder="Select section..."
            value={selectedSection}
            onChange={(val) => { setSelectedSection(val); setSearch(""); }}
          />
        </div>
        <div className="flex-1 max-w-sm">
          <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Search</label>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(sanitizeGeneral(e.target.value))}
              placeholder="Search by name or LRN..."
              className="font-sans w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500 bg-white transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-sm font-semibold text-emerald-700">Present: {presentCount}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg border border-red-200">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="text-sm font-semibold text-red-700">Absent: {absentCount}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-lg border border-amber-200">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="text-sm font-semibold text-amber-700">Late: {lateCount}</span>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-800">{currentSection}</h2>
            <p className="text-[11px] text-gray-400">{new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
          </div>
          <button
            onClick={handleSave}
            disabled={submitting}
            className="font-sans inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white border-none rounded-lg text-sm font-semibold cursor-pointer hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            {submitting ? "Saving..." : "Save Attendance"}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Name</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">LRN</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student, i) => {
                const originalIndex = currentStudents.indexOf(student);
                return (
                  <tr key={student.lrn} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{student.name}</td>
                    <td className="px-5 py-3.5 text-xs font-mono text-gray-500">{student.lrn}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        {statusOptions.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => updateStatus(currentSection, originalIndex, opt.value)}
                            className={`font-sans px-3 py-1.5 border text-xs font-semibold rounded-lg transition-all ${
                              student.status === opt.value
                                ? `${statusColors[opt.value]} border-transparent`
                                : "border-gray-200 text-gray-400 hover:border-gray-300 bg-white"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-400">No students found in this section.</div>
        )}
      </div>
    </div>
  );
}
