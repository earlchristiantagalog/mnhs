"use client";

import Link from "next/link";
import { useSchoolYear } from "@/hooks/use-school-year";

const stats = [
  { label: "Total Books", value: "2,450", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", color: "emerald" },
  { label: "Available", value: "2,180", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "blue" },
  { label: "Borrowed", value: "187", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", color: "amber" },
  { label: "Overdue", value: "12", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "red" },
];

const recentTransactions = [
  { borrower: "Maria Clara Santos", book: "Introduction to Mathematics", action: "Borrowed", date: "Jul 8, 2026", status: "active" },
  { borrower: "Juan Dela Cruz", book: "Science and Technology Today", action: "Returned", date: "Jul 7, 2026", status: "returned" },
  { borrower: "Pedro Garcia", book: "Philippine History", action: "Borrowed", date: "Jul 7, 2026", status: "active" },
  { borrower: "Sofia Lim", book: "English Communication Arts", action: "Overdue", date: "Jun 28, 2026", status: "overdue" },
  { borrower: "Carlos Torres", book: "Filipino Literature", action: "Returned", date: "Jul 6, 2026", status: "returned" },
];

const statusColors: Record<string, string> = {
  active: "bg-blue-100 text-blue-700",
  returned: "bg-emerald-100 text-emerald-700",
  overdue: "bg-red-100 text-red-700",
};

const colorMap: Record<string, { bg: string; icon: string; ring: string }> = {
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", ring: "ring-emerald-500/10" },
  blue: { bg: "bg-blue-50", icon: "text-blue-600", ring: "ring-blue-500/10" },
  amber: { bg: "bg-amber-50", icon: "text-amber-600", ring: "ring-amber-500/10" },
  red: { bg: "bg-red-50", icon: "text-red-600", ring: "ring-red-500/10" },
};

export default function LibraryDashboard() {
  const sy = useSchoolYear();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">LIBRARY DASHBOARD</h1>
        <p className="text-sm text-gray-500 mt-0.5">Overview of library resources and transactions</p>
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/library/books"
          className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-emerald-300 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-gray-800">Manage Books</div>
              <div className="text-xs text-gray-400">Add, edit, remove books</div>
            </div>
          </div>
        </Link>
        <Link
          href="/library/borrowers"
          className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-gray-800">Borrowers</div>
              <div className="text-xs text-gray-400">Track borrowed books</div>
            </div>
          </div>
        </Link>
        <Link
          href="/library/books"
          className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-amber-300 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-gray-800">Overdue Alerts</div>
              <div className="text-xs text-gray-400">12 books overdue</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-800">Recent Transactions</h2>
          <Link href="/library/borrowers" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Borrower</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Book</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Action</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Date</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{tx.borrower}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{tx.book}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{tx.action}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">{tx.date}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusColors[tx.status]}`}>
                      {tx.status}
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
