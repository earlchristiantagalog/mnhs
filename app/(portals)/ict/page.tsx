"use client";

import { useSchoolYear } from "@/hooks/use-school-year";

const stats = [
  {
    label: "TOTAL EQUIPMENT",
    value: "342",
    change: "+18 this month",
    up: true,
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "FUNCTIONAL",
    value: "298",
    change: "87.1%",
    up: true,
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "UNDER REPAIR",
    value: "31",
    change: "9.1%",
    up: false,
    icon: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
    color: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    label: "DISPOSED",
    value: "13",
    change: "3.8%",
    up: false,
    icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
    color: "bg-red-50",
    iconColor: "text-red-600",
  },
];

const recentActivity = [
  { id: 1, action: "Added", item: "5 Desktop Computers", location: "Computer Lab 1", date: "Jun 15, 2026", type: "add" },
  { id: 2, action: "Repaired", item: "Projector (Epson EB-X51)", location: "Room 201", date: "Jun 14, 2026", type: "repair" },
  { id: 3, action: "Disposed", item: "10 Old Keyboards", location: "Storage Room", date: "Jun 13, 2026", type: "dispose" },
  { id: 4, action: "Added", item: "3 Laptops (Lenovo ThinkPad)", location: "ICT Office", date: "Jun 12, 2026", type: "add" },
  { id: 5, action: "Transferred", item: "2 Monitors", location: "From Admin to Library", date: "Jun 11, 2026", type: "transfer" },
];

const typeColors: Record<string, string> = {
  add: "bg-emerald-100 text-emerald-700",
  repair: "bg-amber-100 text-amber-700",
  dispose: "bg-red-100 text-red-700",
  transfer: "bg-blue-100 text-blue-700",
};

export default function ICTDashboard() {
  const sy = useSchoolYear();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">ICT PORTAL</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage school equipment and technology resources</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <svg className={`w-5 h-5 ${stat.iconColor}`} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>
              <span className={`text-xs font-semibold ${stat.up ? "text-emerald-600" : "text-gray-500"}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-black text-gray-900">{stat.value}</div>
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-800">Recent Activity</h2>
          <a href="/ict/equipment" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
            View All
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Action</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Item</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Location</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((act) => (
                <tr key={act.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${typeColors[act.type]}`}>
                      {act.action}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{act.item}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{act.location}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">{act.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
