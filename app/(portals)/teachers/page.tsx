"use client";

import Link from "next/link";
import { useSchoolYear } from "@/hooks/use-school-year";

const stats = [
  { label: "My Students", value: "156", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", color: "emerald" },
  { label: "Classes Today", value: "6", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", color: "blue" },
  { label: "Present Today", value: "142", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
  { label: "Absent Today", value: "14", icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z", color: "red" },
];

const todaySchedule = [
  { time: "7:00 - 7:45", subject: "Mathematics", section: "Grade 7 - Emerald", room: "Room 101", status: "completed" },
  { time: "8:00 - 8:45", subject: "Mathematics", section: "Grade 7 - Ruby", room: "Room 101", status: "completed" },
  { time: "9:00 - 9:45", subject: "Algebra", section: "Grade 8 - Sapphire", room: "Room 203", status: "current" },
  { time: "10:00 - 10:45", subject: "Algebra", section: "Grade 8 - Topaz", room: "Room 203", status: "upcoming" },
  { time: "1:00 - 1:45", subject: "Geometry", section: "Grade 9 - Pearl", room: "Room 305", status: "upcoming" },
  { time: "2:00 - 2:45", subject: "Geometry", section: "Grade 9 - Diamond", room: "Room 305", status: "upcoming" },
];

const statusColors: Record<string, string> = {
  completed: "bg-emerald-100 text-emerald-700",
  current: "bg-blue-100 text-blue-700",
  upcoming: "bg-gray-100 text-gray-500",
};

const colorMap: Record<string, { bg: string; icon: string; ring: string }> = {
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", ring: "ring-emerald-500/10" },
  blue: { bg: "bg-blue-50", icon: "text-blue-600", ring: "ring-blue-500/10" },
  amber: { bg: "bg-amber-50", icon: "text-amber-600", ring: "ring-amber-500/10" },
  red: { bg: "bg-red-50", icon: "text-red-600", ring: "ring-red-500/10" },
};

export default function TeachersDashboard() {
  const sy = useSchoolYear();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">TEACHERS DASHBOARD</h1>
        <p className="text-sm text-gray-500 mt-0.5">Your classes, attendance, and schedule overview</p>
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
          href="/teachers/attendance"
          className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-emerald-300 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-gray-800">Take Attendance</div>
              <div className="text-xs text-gray-400">Record student attendance</div>
            </div>
          </div>
        </Link>
        <Link
          href="/teachers/schedule"
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

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-800">Today&apos;s Schedule</h2>
          <Link href="/teachers/schedule" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
            View Full Schedule
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Time</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Subject</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Section</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Room</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {todaySchedule.map((item, i) => (
                <tr key={i} className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors ${item.status === "current" ? "bg-blue-50/50" : ""}`}>
                  <td className="px-5 py-3.5 text-sm font-mono text-gray-600">{item.time}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{item.subject}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{item.section}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{item.room}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusColors[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
