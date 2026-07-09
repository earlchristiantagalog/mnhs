"use client";

import { useState } from "react";
import { sanitizeGeneral } from "@/lib/sanitize";

const applicants = [
  { id: "APP-001", name: "Maria Clara Santos", lrn: "123456789012", grade: "Grade 7", method: "Online", status: "pending", date: "Jun 15, 2026" },
  { id: "APP-002", name: "Juan Dela Cruz", lrn: "123456789013", grade: "Grade 11 - STEM", method: "Walk-in", status: "enrolled", date: "Jun 14, 2026" },
  { id: "APP-003", name: "Ana Reyes", lrn: "123456789014", grade: "Grade 7", method: "Online", status: "pending", date: "Jun 14, 2026" },
  { id: "APP-004", name: "Pedro Garcia", lrn: "123456789015", grade: "Grade 11 - ABM", method: "Online", status: "enrolled", date: "Jun 13, 2026" },
  { id: "APP-005", name: "Sofia Lim", lrn: "123456789016", grade: "Grade 7", method: "Walk-in", status: "rejected", date: "Jun 12, 2026" },
  { id: "APP-006", name: "Carlos Torres", lrn: "123456789017", grade: "Grade 11 - HUMSS", method: "Online", status: "pending", date: "Jun 12, 2026" },
  { id: "APP-007", name: "Isabella Cruz", lrn: "123456789018", grade: "Grade 7", method: "Online", status: "enrolled", date: "Jun 11, 2026" },
  { id: "APP-008", name: "Miguel Santos", lrn: "123456789019", grade: "Grade 11 - TVL", method: "Walk-in", status: "pending", date: "Jun 11, 2026" },
  { id: "APP-009", name: "Camille Ramos", lrn: "123456789020", grade: "Grade 7", method: "Online", status: "enrolled", date: "Jun 10, 2026" },
  { id: "APP-010", name: "Andres Mendoza", lrn: "123456789021", grade: "Grade 11 - STEM", method: "Online", status: "pending", date: "Jun 10, 2026" },
  { id: "APP-011", name: "Rina Aquino", lrn: "123456789022", grade: "Grade 7", method: "Walk-in", status: "enrolled", date: "Jun 9, 2026" },
  { id: "APP-012", name: "Mark Villanueva", lrn: "123456789023", grade: "Grade 11 - ABM", method: "Online", status: "rejected", date: "Jun 9, 2026" },
];

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  enrolled: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

const statusFilters = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "enrolled", label: "Enrolled" },
  { key: "rejected", label: "Rejected" },
];

export default function ApplicantsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = applicants.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.lrn.includes(search);
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">APPLICANTS</h1>
        <p className="text-sm text-gray-500 mt-0.5">View and manage all enrollment applicants</p>
      </div>

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
            placeholder="Search by name, ID, or LRN..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500 bg-white transition-colors font-sans"
          />
        </div>
        <div className="flex gap-2">
          {statusFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              className={`px-3.5 py-2 border text-xs font-semibold rounded-lg transition-all ${
                statusFilter === f.key
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600 bg-white"
              }`}
            >
              {f.label}
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
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Grade Level</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Method</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Date</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-500">{app.id}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{app.name}</td>
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-400">{app.lrn}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{app.grade}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      app.method === "Online" ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-600"
                    }`}>
                      {app.method}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusColors[app.status]}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">{app.date}</td>
                  <td className="px-5 py-3.5">
                    <button className="text-emerald-600 hover:text-emerald-700 text-xs font-semibold transition-colors">
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
            No applicants found matching your criteria.
          </div>
        )}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/50">
          <span className="text-xs text-gray-400">
            Showing {filtered.length} of {applicants.length} applicants
          </span>
        </div>
      </div>
    </div>
  );
}
