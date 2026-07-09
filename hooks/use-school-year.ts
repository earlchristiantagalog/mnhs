"use client";

import { useState, useEffect } from "react";

function getSecondMonday(month: number, year: number): Date {
  const d = new Date(year, month, 1);
  const day = d.getDay();
  const daysUntilMonday = day === 0 ? 1 : day <= 1 ? 9 - day : 8 - day;
  d.setDate(d.getDate() + daysUntilMonday);
  return d;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

interface SchoolYearData {
  syStart: number;
  syEnd: number;
  syLabel: string;
  enrollmentOpen: Date;
  enrollmentClose: Date;
  enrollmentOpenStr: string;
  enrollmentCloseStr: string;
  schoolStart: Date;
  isEnrollmentOpen: boolean;
  recentYears: string[];
}

function computeDates(): SchoolYearData {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const syStart = month >= 5 ? year : year - 1;
  const syEnd = syStart + 1;

  const enrollYear = month >= 5 ? year + 1 : year;
  const enrollmentOpen = getSecondMonday(4, enrollYear);
  const enrollmentClose = new Date(enrollmentOpen);
  enrollmentClose.setDate(enrollmentClose.getDate() + 46);

  const schoolStartYear = month >= 5 ? year : year - 1;
  const schoolStart = getSecondMonday(5, schoolStartYear);

  const recentYears = Array.from({ length: 3 }, (_, i) => {
    const s = syStart - i;
    return `${s}-${s + 1}`;
  });

  return {
    syStart,
    syEnd,
    syLabel: `${syStart}–${syEnd}`,
    enrollmentOpen,
    enrollmentClose,
    enrollmentOpenStr: formatDate(enrollmentOpen),
    enrollmentCloseStr: formatDate(enrollmentClose),
    schoolStart,
    isEnrollmentOpen: now >= enrollmentOpen && now <= enrollmentClose,
    recentYears,
  };
}

export function useSchoolYear() {
  const [data, setData] = useState<SchoolYearData | null>(null);

  useEffect(() => {
    setData(computeDates());
  }, []);

  return data;
}
