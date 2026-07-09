"use client";

import { getCurrentSchoolYear } from "@/lib/school-year";

export function SchoolYearBadge({ className = "" }: { className?: string }) {
  return <span className={className}>SY {getCurrentSchoolYear().label}</span>;
}
