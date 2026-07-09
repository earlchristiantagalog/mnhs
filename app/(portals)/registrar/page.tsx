"use client";

import { useSchoolYear } from "@/hooks/use-school-year";

const stats = [
  {
    label: "TOTAL APPLICANTS",
    value: "1,247",
    change: "+12.5%",
    up: true,
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    label: "ENROLLED",
    value: "892",
    change: "+8.3%",
    up: true,
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "PENDING",
    value: "289",
    change: "-5.2%",
    up: false,
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    label: "REJECTED",
    value: "66",
    change: "-2.1%",
    up: false,
    icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
  },
];

const recentApplicants = [
  { id: "APP-001", name: "Maria Clara Santos", grade: "Grade 7", status: "pending", date: "Jun 15, 2026" },
  { id: "APP-002", name: "Juan Dela Cruz", grade: "Grade 11 - STEM", status: "enrolled", date: "Jun 14, 2026" },
  { id: "APP-003", name: "Ana Reyes", grade: "Grade 7", status: "pending", date: "Jun 14, 2026" },
  { id: "APP-004", name: "Pedro Garcia", grade: "Grade 11 - ABM", status: "enrolled", date: "Jun 13, 2026" },
  { id: "APP-005", name: "Sofia Lim", grade: "Grade 7", status: "rejected", date: "Jun 12, 2026" },
  { id: "APP-006", name: "Carlos Torres", grade: "Grade 11 - HUMSS", status: "pending", date: "Jun 12, 2026" },
];

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  enrolled: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

export default function RegistrarDashboard() {
  const sy = useSchoolYear();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">REGISTRARS PORTAL</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage the portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <svg className={`w-5 h-5 ${stat.iconColor}`} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>
              <span className={`text-xs font-semibold ${stat.up ? "text-emerald-600" : "text-red-500"}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-black text-gray-900">{stat.value}</div>
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Applicants */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-800">Recent Applicants</h2>
          <a href="/registrar/applicants" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
            View All
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">ID</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Name</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Grade Level</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentApplicants.map((app) => (
                <tr key={app.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-500">{app.id}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{app.name}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{app.grade}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusColors[app.status]}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">{app.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
