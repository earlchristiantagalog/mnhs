"use client";

import { useState } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import { sanitizeGeneral } from "@/lib/sanitize";

const initialBooks = [
  { id: "BK-001", title: "Introduction to Mathematics", author: "John Smith", isbn: "978-1234567890", category: "Mathematics", copies: 15, available: 12, status: "available" },
  { id: "BK-002", title: "Science and Technology Today", author: "Maria Garcia", isbn: "978-2345678901", category: "Science", copies: 10, available: 8, status: "available" },
  { id: "BK-003", title: "Philippine History", author: "Pedro Santos", isbn: "978-3456789012", category: "History", copies: 8, available: 0, status: "borrowed" },
  { id: "BK-004", title: "English Communication Arts", author: "Ana Reyes", isbn: "978-4567890123", category: "English", copies: 12, available: 10, status: "available" },
  { id: "BK-005", title: "Filipino Literature", author: "Carlos Cruz", isbn: "978-5678901234", category: "Literature", copies: 7, available: 5, status: "available" },
  { id: "BK-006", title: "World History", author: "Sofia Lim", isbn: "978-6789012345", category: "History", copies: 6, available: 4, status: "available" },
  { id: "BK-007", title: "Computer Fundamentals", author: "Juan Torres", isbn: "978-7890123456", category: "Technology", copies: 20, available: 14, status: "available" },
  { id: "BK-008", title: "Physical Education", author: "Maria Santos", isbn: "978-8901234567", category: "PE", copies: 5, available: 5, status: "available" },
];

const categoryOptions = [
  { label: "All", value: "all" },
  { label: "Mathematics", value: "Mathematics" },
  { label: "Science", value: "Science" },
  { label: "History", value: "History" },
  { label: "English", value: "English" },
  { label: "Literature", value: "Literature" },
  { label: "Technology", value: "Technology" },
  { label: "PE", value: "PE" },
];

const categoryColors: Record<string, string> = {
  Mathematics: "bg-blue-100 text-blue-700",
  Science: "bg-emerald-100 text-emerald-700",
  History: "bg-amber-100 text-amber-700",
  English: "bg-purple-100 text-purple-700",
  Literature: "bg-pink-100 text-pink-700",
  Technology: "bg-cyan-100 text-cyan-700",
  PE: "bg-orange-100 text-orange-700",
};

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  copies: number;
  available: number;
  status: string;
}

interface FormData {
  title: string;
  author: string;
  isbn: string;
  category: string;
  copies: string;
}

const emptyForm: FormData = { title: "", author: "", isbn: "", category: "", copies: "" };

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const set = (field: keyof FormData, value: string) => {
    let sanitized = value;
    if (field === "title" || field === "author") sanitized = sanitizeGeneral(value).slice(0, 200);
    else if (field === "isbn") sanitized = value.replace(/[^0-9\-]/g, "").slice(0, 20);
    else if (field === "copies") sanitized = value.replace(/[^0-9]/g, "").slice(0, 5);
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
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.author.trim()) e.author = "Author is required";
    if (!form.isbn.trim()) e.isbn = "ISBN is required";
    else if (!/^\d[\d\-]*\d$/.test(form.isbn) || form.isbn.replace(/-/g, "").length < 10) e.isbn = "Invalid ISBN format (min 10 digits)";
    if (!form.category) e.category = "Category is required";
    if (!form.copies) e.copies = "Number of copies is required";
    else if (parseInt(form.copies) < 1) e.copies = "Must have at least 1 copy";
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
      const copies = parseInt(form.copies);
      const newId = `BK-${String(books.length + 1).padStart(3, "0")}`;

      setBooks((prev) => [
        { id: newId, title: form.title.trim(), author: form.author.trim(), isbn: form.isbn, category: form.category, copies, available: copies, status: "available" },
        ...prev,
      ]);

      setForm(emptyForm);
      setErrors({});
      setSuccessMsg(`"${form.title.trim()}" added successfully!`);
      setTimeout(() => setSuccessMsg(""), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = books.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()) || b.isbn.includes(search) || b.id.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" || b.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">BOOKS</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage library book inventory</p>
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
              Add Book
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
              <h2 className="text-sm font-bold text-gray-800">Add New Book</h2>
              <p className="text-[11px] text-gray-400">Fill out the book details below</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Book Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  onPaste={(e) => handlePaste("title", e)}
                  onKeyDown={preventHtml}
                  placeholder="e.g. Introduction to Mathematics"
                  autoComplete="off"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.title ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.title && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.title}</p>}
              </div>
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Author *</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => set("author", e.target.value)}
                  onPaste={(e) => handlePaste("author", e)}
                  onKeyDown={preventHtml}
                  placeholder="e.g. John Smith"
                  autoComplete="off"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.author ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.author && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.author}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">ISBN *</label>
                <input
                  type="text"
                  value={form.isbn}
                  onChange={(e) => set("isbn", e.target.value)}
                  onPaste={(e) => handlePaste("isbn", e)}
                  placeholder="978-1234567890"
                  autoComplete="off"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.isbn ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.isbn && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.isbn}</p>}
              </div>
              <CustomSelect
                label="Category *"
                options={categoryOptions.slice(1)}
                placeholder="Select category..."
                value={form.category}
                onChange={(val) => set("category", val)}
                error={errors.category}
              />
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Copies *</label>
                <input
                  type="text"
                  value={form.copies}
                  onChange={(e) => set("copies", e.target.value)}
                  onPaste={(e) => handlePaste("copies", e)}
                  placeholder="e.g. 10"
                  autoComplete="off"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    errors.copies ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                {errors.copies && <p className="font-sans text-[11px] text-red-500 mt-1">{errors.copies}</p>}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="font-sans inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white border-none rounded-lg text-sm font-semibold cursor-pointer hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {submitting ? "Adding..." : "Add Book"}
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
            placeholder="Search by title, author, ISBN, or ID..."
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
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Title</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Author</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">ISBN</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Category</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Copies</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Available</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((book) => (
                <tr key={book.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-500">{book.id}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{book.title}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{book.author}</td>
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-500">{book.isbn}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${categoryColors[book.category] || "bg-gray-100 text-gray-600"}`}>
                      {book.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-700">{book.copies}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-sm font-bold ${book.available === 0 ? "text-red-600" : "text-emerald-600"}`}>
                      {book.available}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="text-emerald-600 hover:text-emerald-700 text-xs font-semibold transition-colors">Edit</button>
                      <button className="text-red-500 hover:text-red-600 text-xs font-semibold transition-colors">Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-400">No books found matching your criteria.</div>
        )}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/50">
          <span className="text-xs text-gray-400">Showing {filtered.length} of {books.length} books</span>
        </div>
      </div>
    </div>
  );
}
