"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  error?: string;
}

export function CustomSelect({
  label,
  options,
  placeholder = "Select an option...",
  value,
  onChange,
  className,
  error,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className={cn("mb-3 relative", className)} ref={ref}>
      <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "font-sans w-full px-3.5 py-2.5 border rounded-lg text-sm outline-none transition-colors bg-white text-left flex items-center justify-between",
          open ? "border-red-800" : "border-gray-200",
          !selected && "text-gray-400"
        )}
      >
        <span className="truncate">{selected?.label ?? placeholder}</span>
        <svg
          className={cn(
            "w-3 h-3 text-gray-400 flex-shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-fade-in">
          <div className="max-h-60 overflow-y-auto">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange?.(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "font-sans w-full px-3.5 py-2.5 text-sm text-left transition-colors hover:bg-red-50",
                  value === opt.value
                    ? "bg-red-50 text-red-800 font-semibold"
                    : "text-gray-700"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="font-sans text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
