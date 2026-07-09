"use client";

import { useState, useEffect } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import { sanitizeGeneral, sanitizeName } from "@/lib/sanitize";

const equipment = [
  { id: "EQ-001", name: "Desktop Computer", brand: "Dell OptiPlex 7090", serial: "DLL-2024-001", location: "Computer Lab 1", status: "functional", dateAcquired: "Jan 15, 2024" },
  { id: "EQ-002", name: "Projector", brand: "Epson EB-X51", serial: "EPS-2024-015", location: "Room 201", status: "under_repair", dateAcquired: "Mar 20, 2024" },
  { id: "EQ-003", name: "Laptop", brand: "Lenovo ThinkPad T14", serial: "LNV-2025-003", location: "ICT Office", status: "functional", dateAcquired: "Feb 10, 2025" },
  { id: "EQ-004", name: "Printer", brand: "HP LaserJet Pro M404", serial: "HP-2024-008", location: "Faculty Room", status: "functional", dateAcquired: "Apr 5, 2024" },
  { id: "EQ-005", name: "Monitor", brand: "LG 24MK430", serial: "LG-2023-022", location: "Library", status: "disposed", dateAcquired: "Sep 12, 2023" },
  { id: "EQ-006", name: "Keyboard", brand: "Logitech K120", serial: "LOG-2024-045", location: "Computer Lab 2", status: "functional", dateAcquired: "Jan 8, 2024" },
  { id: "EQ-007", name: "Mouse", brand: "Logitech M100", serial: "LOG-2024-046", location: "Computer Lab 2", status: "functional", dateAcquired: "Jan 8, 2024" },
  { id: "EQ-008", name: "Projector Screen", brand: "Kensington 84\"", serial: "KNG-2024-002", location: "Audio-Visual Room", status: "functional", dateAcquired: "May 15, 2024" },
];

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Functional", value: "functional" },
  { label: "Under Repair", value: "under_repair" },
  { label: "Disposed", value: "disposed" },
];

const statusColors: Record<string, string> = {
  functional: "bg-emerald-100 text-emerald-700",
  under_repair: "bg-amber-100 text-amber-700",
  disposed: "bg-red-100 text-red-700",
};

interface Equipment {
  id: string;
  name: string;
  brand: string;
  serial: string;
  location: string;
  status: string;
  dateAcquired: string;
}

interface FormData {
  name: string;
  brand: string;
  serial: string;
  location: string;
  status: string;
  dateAcquired: string;
}

const emptyForm: FormData = {
  name: "", brand: "", serial: "", location: "", status: "functional", dateAcquired: "",
};

export default function EquipmentPage() {
  const [items, setItems] = useState<Equipment[]>(equipment);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState("");

  const set = (field: keyof FormData, value: string) => {
    let sanitized = value;
    switch (field) {
      case "name":
      case "brand":
      case "serial":
      case "location":
        sanitized = sanitizeGeneral(value);
        break;
    }
    setForm((prev) => ({ ...prev, [field]: sanitized }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Equipment name is required";
    if (!form.brand.trim()) e.brand = "Brand/model is required";
    if (!form.serial.trim()) e.serial = "Serial number is required";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.dateAcquired) e.dateAcquired = "Date acquired is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newId = `EQ-${String(items.length + 1).padStart(3, "0")}`;
    setItems((prev) => [
      { id: newId, name: sanitizeName(form.name), brand: sanitizeName(form.brand), serial: sanitizeGeneral(form.serial), location: sanitizeGeneral(form.location), status: form.status, dateAcquired: form.dateAcquired },
      ...prev,
    ]);

    setForm(emptyForm);
    setErrors({});
    setSuccessMsg(`Equipment "${form.name}" added successfully!`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const filtered = items.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.brand.toLowerCase().includes(search.toLowerCase()) ||
      item.serial.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">EQUIPMENT TRACKING</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track and manage all school equipment</p>
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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Add Equipment
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
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800">Add New Equipment</h2>
              <p className="text-[11px] text-gray-400">Fill out the equipment details below</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Equipment Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="e.g. Desktop Computer"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.name ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.name && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Brand/Model *</label>
                <input
                  type="text"
                  value={form.brand}
                  onChange={(e) => set("brand", e.target.value)}
                  placeholder="e.g. Dell OptiPlex 7090"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.brand ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.brand && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.brand}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Serial Number *</label>
                <input
                  type="text"
                  value={form.serial}
                  onChange={(e) => set("serial", e.target.value)}
                  placeholder="e.g. DLL-2024-001"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.serial ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.serial && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.serial}</p>}
              </div>
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Location *</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  placeholder="e.g. Computer Lab 1"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.location ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.location && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.location}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomSelect
                label="Status *"
                options={[
                  { label: "Functional", value: "functional" },
                  { label: "Under Repair", value: "under_repair" },
                  { label: "Disposed", value: "disposed" },
                ]}
                placeholder="Select status..."
                value={form.status}
                onChange={(val) => set("status", val)}
                error={errors.status}
              />
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Date Acquired *</label>
                <input
                  type="date"
                  value={form.dateAcquired}
                  onChange={(e) => set("dateAcquired", e.target.value)}
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.dateAcquired ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.dateAcquired && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.dateAcquired}</p>}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="font-sans inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white border-none rounded-lg text-sm font-semibold cursor-pointer hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Save Equipment
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
            placeholder="Search by name, brand, serial, or location..."
            className="font-sans w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500 bg-white transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`font-sans px-3 py-2 border text-xs font-semibold rounded-lg transition-all ${
                statusFilter === f.value
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
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Brand</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Serial</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Location</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-500">{item.id}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{item.name}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{item.brand}</td>
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-400">{item.serial}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{item.location}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusColors[item.status]}`}>
                      {item.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="font-sans text-emerald-600 hover:text-emerald-700 text-xs font-semibold transition-colors">
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
            No equipment found matching your criteria.
          </div>
        )}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/50">
          <span className="text-xs text-gray-400">
            Showing {filtered.length} of {items.length} items
          </span>
        </div>
      </div>
    </div>
  );
}
