"use client";

import Link from "next/link";
import { useSchoolYear } from "@/hooks/use-school-year";

const stats = [
  { label: "General Average", value: "92", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "emerald" },
  { label: "Subjects", value: "8", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", color: "blue" },
  { label: "Attendance Rate", value: "96%", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
  { label: "Books Borrowed", value: "3", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", color: "purple" },
];

const recentGrades = [
  { subject: "Mathematics", quarter: "Q1", grade: 90 },
  { subject: "Science", quarter: "Q1", grade: 94 },
  { subject: "English", quarter: "Q1", grade: 88 },
  { subject: "Filipino", quarter: "Q1", grade: 92 },
  { subject: "Araling Panlipunan", quarter: "Q1", grade: 95 },
];

const todaySchedule = [
  { time: "7:00 - 7:45", subject: "Mathematics", teacher: "Juan Dela Cruz", room: "Room 101" },
  { time: "8:00 - 8:45", subject: "Science", teacher: "Maria Garcia", room: "Room 203" },
  { time: "9:00 - 9:45", subject: "English", teacher: "Ana Reyes", room: "Room 105" },
  { time: "10:00 - 10:45", subject: "Filipino", teacher: "Pedro Santos", room: "Room 108" },
  { time: "1:00 - 1:45", subject: "Araling Panlipunan", teacher: "Sofia Lim", room: "Room 201" },
];

const colorMap: Record<string, { bg: string; icon: string; ring: string }> = {
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", ring: "ring-emerald-500/10" },
  blue: { bg: "bg-blue-50", icon: "text-blue-600", ring: "ring-blue-500/10" },
  amber: { bg: "bg-amber-50", icon: "text-amber-600", ring: "ring-amber-500/10" },
  purple: { bg: "bg-purple-50", icon: "text-purple-600", ring: "ring-purple-500/10" },
};

function getGradeColor(grade: number) {
  if (grade >= 90) return "text-emerald-600";
  if (grade >= 85) return "text-blue-600";
  if (grade >= 80) return "text-amber-600";
  return "text-red-600";
}

export default function StudentsDashboard() {
  const sy = useSchoolYear();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">STUDENT DASHBOARD</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back! Here&apos;s your academic overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const c = colorMap[stat.color];
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center ring-1 ${c.ring}`}>
                <svg className={`w-6 h-6 ${c.icon}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/students/grades"
          className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-emerald-300 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-gray-800">View Grades</div>
              <div className="text-xs text-gray-400">Check your grades per quarter</div>
            </div>
          </div>
        </Link>
        <Link
          href="/students/schedule"
          className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-gray-800">My Schedule</div>
              <div className="text-xs text-gray-400">View your class schedule</div>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Grades */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-800">Recent Grades</h2>
            <Link href="/students/grades" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentGrades.map((g, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50/50 transition-colors">
                <div>
                  <div className="text-sm font-semibold text-gray-800">{g.subject}</div>
                  <div className="text-[11px] text-gray-400">{g.quarter}</div>
                </div>
                <div className={`text-lg font-black ${getGradeColor(g.grade)}`}>{g.grade}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-800">Today&apos;s Schedule</h2>
            <Link href="/students/schedule" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
              View Full
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {todaySchedule.map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50/50 transition-colors">
                <div className="text-xs font-mono text-gray-400 w-28 shrink-0">{item.time}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-800 truncate">{item.subject}</div>
                  <div className="text-[11px] text-gray-400">{item.teacher} &middot; {item.room}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
