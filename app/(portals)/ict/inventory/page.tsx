"use client";

import { useState } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import { sanitizeGeneral } from "@/lib/sanitize";

const inventory = [
  { id: "INV-001", item: "Printer Paper (A4)", category: "Supplies", quantity: 500, unit: "reams", minStock: 100, location: "Storage Room", status: "in_stock" },
  { id: "INV-002", item: "Ink Cartridge (Black)", category: "Consumables", quantity: 24, unit: "pcs", minStock: 10, location: "ICT Office", status: "in_stock" },
  { id: "INV-003", item: "Ink Cartridge (Color)", category: "Consumables", quantity: 8, unit: "pcs", minStock: 10, location: "ICT Office", status: "low_stock" },
  { id: "INV-004", item: "USB Flash Drive 16GB", category: "Accessories", quantity: 30, unit: "pcs", minStock: 15, location: "ICT Office", status: "in_stock" },
  { id: "INV-005", item: "Ethernet Cable (50m)", category: "Cables", quantity: 5, unit: "rolls", minStock: 3, location: "Storage Room", status: "in_stock" },
  { id: "INV-006", item: "Mouse Pad", category: "Accessories", quantity: 2, unit: "pcs", minStock: 10, location: "ICT Office", status: "low_stock" },
  { id: "INV-007", item: "Power Strip", category: "Accessories", quantity: 15, unit: "pcs", minStock: 5, location: "Storage Room", status: "in_stock" },
  { id: "INV-008", item: "HDMI Cable (2m)", category: "Cables", quantity: 0, unit: "pcs", minStock: 5, location: "ICT Office", status: "out_of_stock" },
];

const categoryOptions = [
  { label: "All", value: "all" },
  { label: "Supplies", value: "Supplies" },
  { label: "Consumables", value: "Consumables" },
  { label: "Accessories", value: "Accessories" },
  { label: "Cables", value: "Cables" },
];

const statusColors: Record<string, string> = {
  in_stock: "bg-emerald-100 text-emerald-700",
  low_stock: "bg-amber-100 text-amber-700",
  out_of_stock: "bg-red-100 text-red-700",
};

interface InventoryItem {
  id: string;
  item: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  location: string;
  status: string;
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(inventory);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    item: "", category: "Supplies", quantity: "", unit: "pcs", minStock: "", location: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState("");

  const set = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.item.trim()) e.item = "Item name is required";
    if (!form.quantity || Number(form.quantity) < 0) e.quantity = "Valid quantity required";
    if (!form.minStock || Number(form.minStock) < 0) e.minStock = "Min stock required";
    if (!form.location.trim()) e.location = "Location is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const qty = Number(form.quantity);
    const min = Number(form.minStock);
    const status = qty === 0 ? "out_of_stock" : qty <= min ? "low_stock" : "in_stock";
    const newId = `INV-${String(items.length + 1).padStart(3, "0")}`;

    setItems((prev) => [
      { id: newId, item: sanitizeGeneral(form.item), category: form.category, quantity: qty, unit: form.unit, minStock: min, location: sanitizeGeneral(form.location), status },
      ...prev,
    ]);

    setForm({ item: "", category: "Supplies", quantity: "", unit: "pcs", minStock: "", location: "" });
    setErrors({});
    setSuccessMsg(`Inventory item "${form.item}" added successfully!`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const filtered = items.filter((item) => {
    const matchSearch =
      item.item.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">INVENTORY</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage ICT supplies and consumables</p>
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
              Add Item
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
              <h2 className="text-sm font-bold text-gray-800">Add Inventory Item</h2>
              <p className="text-[11px] text-gray-400">Fill out the item details below</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Item Name *</label>
                <input
                  type="text"
                  value={form.item}
                  onChange={(e) => set("item", sanitizeGeneral(e.target.value))}
                  placeholder="e.g. Printer Paper (A4)"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.item ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.item && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.item}</p>}
              </div>
              <CustomSelect
                label="Category *"
                options={[
                  { label: "Supplies", value: "Supplies" },
                  { label: "Consumables", value: "Consumables" },
                  { label: "Accessories", value: "Accessories" },
                  { label: "Cables", value: "Cables" },
                ]}
                placeholder="Select category..."
                value={form.category}
                onChange={(val) => set("category", val)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Quantity *</label>
                <input
                  type="number"
                  value={form.quantity}
                  onChange={(e) => set("quantity", e.target.value)}
                  placeholder="0"
                  min="0"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.quantity ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.quantity && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.quantity}</p>}
              </div>
              <CustomSelect
                label="Unit"
                options={[
                  { label: "pcs", value: "pcs" },
                  { label: "reams", value: "reams" },
                  { label: "rolls", value: "rolls" },
                  { label: "boxes", value: "boxes" },
                  { label: "sets", value: "sets" },
                ]}
                placeholder="Select unit..."
                value={form.unit}
                onChange={(val) => set("unit", val)}
              />
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Min Stock *</label>
                <input
                  type="number"
                  value={form.minStock}
                  onChange={(e) => set("minStock", e.target.value)}
                  placeholder="0"
                  min="0"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.minStock ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.minStock && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.minStock}</p>}
              </div>
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Location *</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => set("location", sanitizeGeneral(e.target.value))}
                  placeholder="e.g. ICT Office"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.location ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.location && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.location}</p>}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="font-sans inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white border-none rounded-lg text-sm font-semibold cursor-pointer hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Save Item
              </button>
              <button
                type="button"
                onClick={() => { setForm({ item: "", category: "Supplies", quantity: "", unit: "pcs", minStock: "", location: "" }); setErrors({}); }}
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
            placeholder="Search by item, category, or location..."
            className="font-sans w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500 bg-white transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategoryFilter(c.value)}
              className={`font-sans px-3 py-2 border text-xs font-semibold rounded-lg transition-all ${
                categoryFilter === c.value
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600 bg-white"
              }`}
            >
              {c.label}
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
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Item</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Category</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Qty</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Min</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Location</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-500">{item.id}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{item.item}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{item.quantity} <span className="text-gray-400 font-normal">{item.unit}</span></td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{item.minStock}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{item.location}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusColors[item.status]}`}>
                      {item.status.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-400">
            No inventory items found matching your criteria.
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
