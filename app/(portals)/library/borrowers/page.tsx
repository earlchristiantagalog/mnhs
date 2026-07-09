"use client";

import { useState } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import { sanitizeGeneral } from "@/lib/sanitize";

const initialTransactions = [
  { id: "TR-001", borrower: "Maria Clara Santos", role: "Student", book: "Introduction to Mathematics", borrowDate: "Jul 1, 2026", dueDate: "Jul 15, 2026", status: "active" },
  { id: "TR-002", borrower: "Juan Dela Cruz", role: "Student", book: "Science and Technology Today", borrowDate: "Jun 28, 2026", dueDate: "Jul 12, 2026", status: "returned" },
  { id: "TR-003", borrower: "Pedro Garcia", role: "Student", book: "Philippine History", borrowDate: "Jul 3, 2026", dueDate: "Jul 17, 2026", status: "active" },
  { id: "TR-004", borrower: "Sofia Lim", role: "Student", book: "English Communication Arts", borrowDate: "Jun 20, 2026", dueDate: "Jul 4, 2026", status: "overdue" },
  { id: "TR-005", borrower: "Carlos Torres", role: "Teacher", book: "Filipino Literature", borrowDate: "Jun 25, 2026", dueDate: "Jul 9, 2026", status: "returned" },
  { id: "TR-006", borrower: "Ana Reyes", role: "Employee", book: "World History", borrowDate: "Jul 5, 2026", dueDate: "Jul 19, 2026", status: "active" },
  { id: "TR-007", borrower: "Isabella Cruz", role: "Student", book: "Computer Fundamentals", borrowDate: "Jun 15, 2026", dueDate: "Jun 29, 2026", status: "overdue" },
  { id: "TR-008", borrower: "Miguel Santos", role: "Teacher", book: "Physical Education", borrowDate: "Jul 2, 2026", dueDate: "Jul 16, 2026", status: "active" },
];

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Returned", value: "returned" },
  { label: "Overdue", value: "overdue" },
];

const statusColors: Record<string, string> = {
  active: "bg-blue-100 text-blue-700",
  returned: "bg-emerald-100 text-emerald-700",
  overdue: "bg-red-100 text-red-700",
};

const roleColors: Record<string, string> = {
  Student: "bg-purple-100 text-purple-700",
  Teacher: "bg-blue-100 text-blue-700",
  Employee: "bg-amber-100 text-amber-700",
};

interface Transaction {
  id: string;
  borrower: string;
  role: string;
  book: string;
  borrowDate: string;
  dueDate: string;
  status: string;
}

interface FormData {
  borrower: string;
  role: string;
  book: string;
  borrowDate: string;
  dueDate: string;
}

const emptyForm: FormData = { borrower: "", role: "", book: "", borrowDate: "", dueDate: "" };

export default function BorrowersPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const set = (field: keyof FormData, value: string) => {
    let sanitized = value;
    if (field === "borrower") sanitized = sanitizeGeneral(value).slice(0, 100);
    setForm((prev) => ({ ...prev, [field]: sanitized }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handlePaste = (field: keyof FormData, e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    set(field, text);
  };

  const preventHtml = (e: React.KeyboardEvent) => {
    if (e.key === "<" || e.key === ">") e.preventDefault();
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.borrower.trim()) e.borrower = "Borrower name is required";
    if (!form.role) e.role = "Role is required";
    if (!form.book.trim()) e.book = "Book title is required";
    if (!form.borrowDate) e.borrowDate = "Borrow date is required";
    if (!form.dueDate) e.dueDate = "Due date is required";
    if (form.borrowDate && form.dueDate && new Date(form.dueDate) <= new Date(form.borrowDate)) e.dueDate = "Due date must be after borrow date";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    setSubmitting(true);

    try {
      await new Promise((r) => setTimeout(r, 300));
      const newId = `TR-${String(transactions.length + 1).padStart(3, "0")}`;

      setTransactions((prev) => [
        { id: newId, borrower: form.borrower.trim(), role: form.role, book: form.book.trim(), borrowDate: new Date(form.borrowDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), dueDate: new Date(form.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), status: "active" },
        ...prev,
      ]);

      setForm(emptyForm);
      setErrors({});
      setSuccessMsg(`Book borrowed by "${form.borrower.trim()}" successfully!`);
      setTimeout(() => setSuccessMsg(""), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = transactions.filter((t) => {
    const matchSearch = t.borrower.toLowerCase().includes(search.toLowerCase()) || t.book.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">BORROWERS</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track borrowed and returned books</p>
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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              New Borrow
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

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-[fadeUp_0.3s_ease_both]">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800">New Borrow Transaction</h2>
              <p className="text-[11px] text-gray-400">Record a book borrowing transaction</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Borrower Name *</label>
                <input
                  type="text"
                  value={form.borrower}
                  onChange={(e) => set("borrower", e.target.value)}
                  onPaste={(e) => handlePaste("borrower", e)}
                  onKeyDown={preventHtml}
                  placeholder="e.g. Maria Clara Santos"
                  autoComplete="off"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.borrower ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.borrower && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.borrower}</p>}
              </div>
              <CustomSelect
                label="Role *"
                options={[
                  { label: "Student", value: "Student" },
                  { label: "Teacher", value: "Teacher" },
                  { label: "Employee", value: "Employee" },
                ]}
                placeholder="Select role..."
                value={form.role}
                onChange={(val) => set("role", val)}
                error={errors.role}
              />
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Book Title *</label>
                <input
                  type="text"
                  value={form.book}
                  onChange={(e) => set("book", e.target.value)}
                  onPaste={(e) => handlePaste("book", e)}
                  onKeyDown={preventHtml}
                  placeholder="e.g. Introduction to Mathematics"
                  autoComplete="off"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.book ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.book && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.book}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Borrow Date *</label>
                <input
                  type="date"
                  value={form.borrowDate}
                  onChange={(e) => set("borrowDate", e.target.value)}
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.borrowDate ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.borrowDate && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.borrowDate}</p>}
              </div>
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Due Date *</label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => set("dueDate", e.target.value)}
                  min={form.borrowDate || undefined}
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.dueDate ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.dueDate && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.dueDate}</p>}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="font-sans inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white border-none rounded-lg text-sm font-semibold cursor-pointer hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {submitting ? "Saving..." : "Save Transaction"}
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
            placeholder="Search by borrower, book, or ID..."
            className="font-sans w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500 bg-white transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((s) => (
            <button
              key={s.value}
              onClick={() => setStatusFilter(s.value)}
              className={`font-sans px-3 py-2 border text-xs font-semibold rounded-lg transition-all ${
                statusFilter === s.value
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600 bg-white"
              }`}
            >
              {s.label}
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
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Borrower</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Role</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Book</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Borrow Date</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Due Date</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-500">{tx.id}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{tx.borrower}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${roleColors[tx.role] || "bg-gray-100 text-gray-600"}`}>
                      {tx.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{tx.book}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">{tx.borrowDate}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">{tx.dueDate}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusColors[tx.status]}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      {tx.status === "active" && (
                        <button className="text-emerald-600 hover:text-emerald-700 text-xs font-semibold transition-colors">Return</button>
                      )}
                      {tx.status === "overdue" && (
                        <button className="text-red-600 hover:text-red-700 text-xs font-semibold transition-colors">Return</button>
                      )}
                      <button className="text-gray-400 hover:text-gray-600 text-xs font-semibold transition-colors">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-400">No transactions found matching your criteria.</div>
        )}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/50">
          <span className="text-xs text-gray-400">Showing {filtered.length} of {transactions.length} transactions</span>
        </div>
      </div>
    </div>
  );
}
