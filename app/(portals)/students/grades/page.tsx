"use client";

import { useState } from "react";

const quarters = ["Q1", "Q2", "Q3", "Q4"];

interface SubjectGrade {
  subject: string;
  grades: Record<string, number>;
}

const initialGrades: SubjectGrade[] = [
  { subject: "Mathematics", grades: { Q1: 90, Q2: 0, Q3: 0, Q4: 0 } },
  { subject: "Science", grades: { Q1: 94, Q2: 0, Q3: 0, Q4: 0 } },
  { subject: "English", grades: { Q1: 88, Q2: 0, Q3: 0, Q4: 0 } },
  { subject: "Filipino", grades: { Q1: 92, Q2: 0, Q3: 0, Q4: 0 } },
  { subject: "Araling Panlipunan", grades: { Q1: 95, Q2: 0, Q3: 0, Q4: 0 } },
  { subject: "MAPEH", grades: { Q1: 91, Q2: 0, Q3: 0, Q4: 0 } },
  { subject: "Values Education", grades: { Q1: 96, Q2: 0, Q3: 0, Q4: 0 } },
  { subject: "TLE", grades: { Q1: 93, Q2: 0, Q3: 0, Q4: 0 } },
];

function getGradeColor(grade: number) {
  if (grade === 0) return "text-gray-300";
  if (grade >= 90) return "text-emerald-600";
  if (grade >= 85) return "text-blue-600";
  if (grade >= 80) return "text-amber-600";
  return "text-red-600";
}

function getGradeBg(grade: number) {
  if (grade === 0) return "bg-gray-50";
  if (grade >= 90) return "bg-emerald-50";
  if (grade >= 85) return "bg-blue-50";
  if (grade >= 80) return "bg-amber-50";
  return "bg-red-50";
}

function getGradeLabel(grade: number) {
  if (grade === 0) return "—";
  if (grade >= 90) return "Excellent";
  if (grade >= 85) return "Very Good";
  if (grade >= 80) return "Good";
  if (grade >= 75) return "Satisfactory";
  return "Needs Improvement";
}

export default function GradesPage() {
  const [selectedQuarter, setSelectedQuarter] = useState("Q1");
  const [grades] = useState<SubjectGrade[]>(initialGrades);

  const gradedSubjects = grades.filter((g) => g.grades[selectedQuarter] > 0);
  const average = gradedSubjects.length > 0
    ? Math.round(gradedSubjects.reduce((sum, g) => sum + g.grades[selectedQuarter], 0) / gradedSubjects.length)
    : 0;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">GRADES</h1>
        <p className="text-sm text-gray-500 mt-0.5">View your grades for each quarter</p>
      </div>

      {/* Quarter Tabs */}
      <div className="flex flex-wrap gap-2">
        {quarters.map((q) => (
          <button
            key={q}
            onClick={() => setSelectedQuarter(q)}
            className={`font-sans px-4 py-2.5 border text-sm font-semibold rounded-lg transition-all ${
              selectedQuarter === q
                ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200"
                : "border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600 bg-white"
            }`}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Average Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">General Average</div>
            <div className={`text-4xl font-black ${getGradeColor(average)}`}>{average || "—"}</div>
            <div className="text-sm text-gray-500 mt-1">{getGradeLabel(average)}</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Subjects Graded</div>
            <div className="text-2xl font-black text-gray-800">{gradedSubjects.length} / {grades.length}</div>
          </div>
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-800">Subject Grades — {selectedQuarter}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Subject</th>
                {quarters.map((q) => (
                  <th key={q} className={`text-center text-[11px] font-bold uppercase tracking-wider px-5 py-3 ${q === selectedQuarter ? "text-emerald-600 bg-emerald-50" : "text-gray-400"}`}>
                    {q}
                  </th>
                ))}
                <th className="text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Average</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g) => {
                const allGrades = Object.values(g.grades).filter((v) => v > 0);
                const subjAvg = allGrades.length > 0 ? Math.round(allGrades.reduce((a, b) => a + b, 0) / allGrades.length) : 0;
                return (
                  <tr key={g.subject} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4 text-sm font-semibold text-gray-800">{g.subject}</td>
                    {quarters.map((q) => (
                      <td key={q} className={`px-5 py-4 text-center text-sm font-bold ${getGradeColor(g.grades[q])} ${q === selectedQuarter ? "bg-emerald-50/50" : ""}`}>
                        {g.grades[q] || "—"}
                      </td>
                    ))}
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getGradeBg(subjAvg)} ${getGradeColor(subjAvg)}`}>
                        {subjAvg || "—"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Scale */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-bold text-gray-800 mb-3">Grade Scale</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { range: "90 - 100", label: "Excellent", color: "bg-emerald-100 text-emerald-700" },
            { range: "85 - 89", label: "Very Good", color: "bg-blue-100 text-blue-700" },
            { range: "80 - 84", label: "Good", color: "bg-amber-100 text-amber-700" },
            { range: "75 - 79", label: "Satisfactory", color: "bg-orange-100 text-orange-700" },
            { range: "Below 75", label: "Needs Improvement", color: "bg-red-100 text-red-700" },
          ].map((s) => (
            <div key={s.range} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${s.color}`}>
              <span>{s.range}</span>
              <span className="opacity-60">({s.label})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
