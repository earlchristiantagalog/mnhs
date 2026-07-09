"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CustomDatePickerProps {
  label: string;
  value?: string; // YYYY-MM-DD
  onChange?: (value: string) => void;
  error?: string;
  placeholder?: string;
  className?: string;
  maxYear?: number;
  minYear?: number;
}

const months = [
  { val: "01", label: "January" }, { val: "02", label: "February" },
  { val: "03", label: "March" }, { val: "04", label: "April" },
  { val: "05", label: "May" }, { val: "06", label: "June" },
  { val: "07", label: "July" }, { val: "08", label: "August" },
  { val: "09", label: "September" }, { val: "10", label: "October" },
  { val: "11", label: "November" }, { val: "12", label: "December" },
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function parseValue(val?: string) {
  if (!val) return { year: "", month: "", day: "" };
  const [y, m, d] = val.split("-");
  return { year: y || "", month: m || "", day: d || "" };
}

function buildValue(year: string, month: string, day: string): string {
  if (!year || !month || !day) return "";
  return `${year}-${month}-${day}`;
}

export function CustomDatePicker({
  label,
  value,
  onChange,
  error,
  placeholder = "Select date...",
  className,
  maxYear,
  minYear,
}: CustomDatePickerProps) {
  const now = new Date();
  const maxY = maxYear ?? now.getFullYear();
  const minY = minYear ?? 1950;

  const parsed = parseValue(value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const years = Array.from({ length: maxY - minY + 1 }, (_, i) => maxY - i);
  const daysInMonth = parsed.month && parsed.year
    ? getDaysInMonth(Number(parsed.year), Number(parsed.month))
    : 31;
  const days = Array.from({ length: daysInMonth }, (_, i) => String(i + 1).padStart(2, "0"));

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const displayText = value
    ? `${months.find((m) => m.val === parsed.month)?.label ?? ""} ${parsed.day}, ${parsed.year}`
    : placeholder;

  const handleMonth = (m: string) => {
    const newDays = getDaysInMonth(Number(parsed.year || now.getFullYear()), Number(m));
    const newDay = parsed.day && Number(parsed.day) > newDays ? String(newDays) : parsed.day;
    const y = parsed.year || String(maxY);
    onChange?.(buildValue(y, m, newDay));
  };

  const handleYear = (y: string) => {
    const newDays = parsed.month ? getDaysInMonth(Number(y), Number(parsed.month)) : 31;
    const newDay = parsed.day && Number(parsed.day) > newDays ? String(newDays) : parsed.day;
    onChange?.(buildValue(y, parsed.month, newDay));
  };

  const handleDay = (d: string) => {
    onChange?.(buildValue(parsed.year || String(maxY), parsed.month, d));
  };

  const selectClass = "font-sans w-full px-2 py-1.5 border border-gray-200 rounded-md text-sm bg-white appearance-none cursor-pointer outline-none focus:border-red-800 transition-colors";

  return (
    <div className={cn("mb-0 relative", className)} ref={ref}>
      <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "font-sans w-full px-3.5 py-2.5 border rounded-lg text-sm outline-none transition-colors bg-white text-left flex items-center justify-between",
          open ? "border-red-800" : error ? "border-red-400 bg-red-50/30" : "border-gray-200",
          !value && "text-gray-400"
        )}
      >
        <span className="truncate">{displayText}</span>
        <svg className={cn("w-3 h-3 text-gray-400 flex-shrink-0 transition-transform duration-200", open && "rotate-180")} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-3 animate-fade-in">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block font-sans text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">Month</label>
              <select value={parsed.month} onChange={(e) => handleMonth(e.target.value)} className={selectClass}>
                <option value="">Mon</option>
                {months.map((m) => <option key={m.val} value={m.val}>{m.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-sans text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">Day</label>
              <select value={parsed.day} onChange={(e) => handleDay(e.target.value)} className={selectClass}>
                <option value="">Day</option>
                {days.map((d) => <option key={d} value={d}>{Number(d)}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-sans text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">Year</label>
              <select value={parsed.year} onChange={(e) => handleYear(e.target.value)} className={selectClass}>
                <option value="">Year</option>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
            <button type="button" onClick={() => { onChange?.(""); setOpen(false); }} className="font-sans text-xs text-gray-400 hover:text-gray-600">Clear</button>
            <button type="button" onClick={() => setOpen(false)} className="font-sans text-xs text-red-800 font-semibold hover:underline">Done</button>
          </div>
        </div>
      )}

      {error && (
        <p className="font-sans text-[11px] text-red-500 mt-1 flex items-center gap-1">
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
          {error}
        </p>
      )}
    </div>
  );
}
