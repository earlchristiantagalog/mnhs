"use client";

import { useState } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import { sanitizeName, sanitizeGeneral, sanitizePhone, validatePhone } from "@/lib/sanitize";

const initialAccounts = [
  { id: "ACC-001", name: "Maria Clara Santos", email: "maria.santos@mnhs.edu", role: "Student", status: "active", dateCreated: "Jun 10, 2026" },
  { id: "ACC-002", name: "Juan Dela Cruz", email: "juan.delacruz@mnhs.edu", role: "Teacher", status: "active", dateCreated: "Jun 8, 2026" },
  { id: "ACC-003", name: "Pedro Garcia", email: "pedro.garcia@mnhs.edu", role: "Employee", status: "active", dateCreated: "Jun 5, 2026" },
  { id: "ACC-004", name: "Sofia Lim", email: "sofia.lim@mnhs.edu", role: "Student", status: "inactive", dateCreated: "May 20, 2026" },
  { id: "ACC-005", name: "Carlos Torres", email: "carlos.torres@mnhs.edu", role: "Teacher", status: "active", dateCreated: "May 15, 2026" },
  { id: "ACC-006", name: "Ana Reyes", email: "ana.reyes@mnhs.edu", role: "Employee", status: "active", dateCreated: "May 10, 2026" },
  { id: "ACC-007", name: "Isabella Cruz", email: "isabella.cruz@mnhs.edu", role: "Student", status: "active", dateCreated: "May 5, 2026" },
  { id: "ACC-008", name: "Miguel Santos", email: "miguel.santos@mnhs.edu", role: "Teacher", status: "inactive", dateCreated: "Apr 30, 2026" },
];

const roleOptions = [
  { label: "All", value: "all" },
  { label: "Teacher", value: "Teacher" },
  { label: "Student", value: "Student" },
  { label: "Employee", value: "Employee" },
];

const roleColors: Record<string, string> = {
  Teacher: "bg-blue-100 text-blue-700",
  Student: "bg-purple-100 text-purple-700",
  Employee: "bg-amber-100 text-amber-700",
};

const statusColors: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  inactive: "bg-gray-100 text-gray-500",
};

interface Account {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  dateCreated: string;
}

interface FormData {
  lname: string;
  fname: string;
  mname: string;
  email: string;
  role: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const emptyForm: FormData = {
  lname: "", fname: "", mname: "", email: "", role: "", phone: "", password: "", confirmPassword: "",
};

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (field: keyof FormData, value: string) => {
    let sanitized = value;
    switch (field) {
      case "lname":
      case "fname":
      case "mname":
        sanitized = sanitizeName(value);
        break;
      case "email":
        sanitized = sanitizeGeneral(value).toLowerCase();
        break;
      case "phone":
        sanitized = sanitizePhone(value);
        break;
      case "password":
      case "confirmPassword":
        sanitized = value.slice(0, 50);
        break;
    }
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
    const nameRegex = /^[A-Za-z\s\-'.]+$/;
    if (!form.fname.trim()) e.fname = "First name is required";
    else if (form.fname.trim().length < 2) e.fname = "First name must be at least 2 characters";
    else if (!nameRegex.test(form.fname)) e.fname = "First name contains invalid characters";
    if (!form.lname.trim()) e.lname = "Last name is required";
    else if (form.lname.trim().length < 2) e.lname = "Last name must be at least 2 characters";
    else if (!nameRegex.test(form.lname)) e.lname = "Last name contains invalid characters";
    if (form.mname && !nameRegex.test(form.mname)) e.mname = "Middle name contains invalid characters";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    if (!form.role) e.role = "Role is required";
    if (form.phone && !validatePhone(form.phone)) e.phone = "Invalid phone format (09XXXXXXXXX)";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    else if (form.password.length > 50) e.password = "Password must not exceed 50 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    setSubmitting(true);

    try {
      const safeFname = sanitizeName(form.fname.trim());
      const safeMname = sanitizeName(form.mname.trim());
      const safeLname = sanitizeName(form.lname.trim());
      const safeEmail = sanitizeGeneral(form.email.trim()).toLowerCase();
      const safePhone = sanitizePhone(form.phone);
      const fullName = `${safeFname}${safeMname ? " " + safeMname : ""} ${safeLname}`;
      const newId = `ACC-${String(accounts.length + 1).padStart(3, "0")}`;

      await new Promise((r) => setTimeout(r, 300));

      setAccounts((prev) => [
        { id: newId, name: fullName, email: safeEmail, role: form.role, status: "active", dateCreated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
        ...prev,
      ]);

      setForm(emptyForm);
      setErrors({});
      setSuccessMsg(`Account for "${fullName}" created successfully!`);
      setTimeout(() => setSuccessMsg(""), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = accounts.filter((acc) => {
    const matchSearch =
      acc.name.toLowerCase().includes(search.toLowerCase()) ||
      acc.email.toLowerCase().includes(search.toLowerCase()) ||
      acc.id.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || acc.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">ACCOUNTS</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage teacher, student, and employee accounts</p>
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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
              Add Account
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
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800">Create New Account</h2>
              <p className="text-[11px] text-gray-400">Fill out the account details below</p>
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
                  onPaste={(e) => handlePaste("lname", e)}
                  onKeyDown={preventHtml}
                  placeholder="e.g. Santos"
                  autoComplete="off"
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
                  onPaste={(e) => handlePaste("fname", e)}
                  onKeyDown={preventHtml}
                  placeholder="e.g. Maria Clara"
                  autoComplete="off"
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
                  onPaste={(e) => handlePaste("mname", e)}
                  onKeyDown={preventHtml}
                  placeholder="e.g. Reyes"
                  autoComplete="off"
                  className="font-sans w-full px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Email + Role + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Email Address *</label>
                <input
                  type="text"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  onPaste={(e) => handlePaste("email", e)}
                  onKeyDown={preventHtml}
                  placeholder="user@mnhs.edu"
                  autoComplete="off"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.email ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.email && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.email}</p>}
              </div>
              <CustomSelect
                label="Role *"
                options={[
                  { label: "Teacher", value: "Teacher" },
                  { label: "Student", value: "Student" },
                  { label: "Employee", value: "Employee" },
                ]}
                placeholder="Select role..."
                value={form.role}
                onChange={(val) => set("role", val)}
                error={errors.role}
              />
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  onPaste={(e) => handlePaste("phone", e)}
                  placeholder="09XXXXXXXXX"
                  maxLength={11}
                  autoComplete="off"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.phone && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => set("password", e.target.value)}
                    onPaste={(e) => handlePaste("password", e)}
                    placeholder="Min. 6 characters"
                    autoComplete="new-password"
                    className={`font-sans w-full px-3.5 pr-10 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                      errors.password ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    )}
                  </button>
                </div>
                {errors.password && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Confirm Password *</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => set("confirmPassword", e.target.value)}
                  onPaste={(e) => handlePaste("confirmPassword", e)}
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.confirmPassword ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.confirmPassword && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="font-sans inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white border-none rounded-lg text-sm font-semibold cursor-pointer hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {submitting ? "Creating..." : "Create Account"}
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
            placeholder="Search by name, email, or ID..."
            className="font-sans w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500 bg-white transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {roleOptions.map((r) => (
            <button
              key={r.value}
              onClick={() => setRoleFilter(r.value)}
              className={`font-sans px-3 py-2 border text-xs font-semibold rounded-lg transition-all ${
                roleFilter === r.value
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600 bg-white"
              }`}
            >
              {r.label}
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
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Email</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Role</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Date Created</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((acc) => (
                <tr key={acc.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-500">{acc.id}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{acc.name}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{acc.email}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${roleColors[acc.role]}`}>
                      {acc.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusColors[acc.status]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${acc.status === "active" ? "bg-emerald-500" : "bg-gray-400"}`} />
                      {acc.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">{acc.dateCreated}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="text-emerald-600 hover:text-emerald-700 text-xs font-semibold transition-colors">
                        Edit
                      </button>
                      <button className="text-red-500 hover:text-red-600 text-xs font-semibold transition-colors">
                        Disable
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-400">
            No accounts found matching your criteria.
          </div>
        )}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/50">
          <span className="text-xs text-gray-400">
            Showing {filtered.length} of {accounts.length} accounts
          </span>
        </div>
      </div>
    </div>
  );
}
