/**
 * Auto-calculated School Year utilities.
 *
 * Rules:
 *  - School year runs June → May (e.g. SY 2026–2027 = Jun 2026 → May 2027).
 *  - Enrollment opens: Second Monday of May (current year).
 *  - Other school events: Second Monday of June (current year).
 *  - Last school year options are derived from the current SY.
 */

function getSecondMonday(month: number, year: number): Date {
  const d = new Date(year, month, 1);
  const day = d.getDay();
  const daysUntilMonday = day === 0 ? 1 : day <= 1 ? 9 - day : 8 - day;
  d.setDate(d.getDate() + daysUntilMonday);
  return d;
}

export function getCurrentSchoolYear(): { start: number; end: number; label: string } {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed
  const year = now.getFullYear();

  // If we're in June–December, current SY is year → year+1
  // If we're in January–May, current SY is year-1 → year
  const syStart = month >= 5 ? year : year - 1;
  const syEnd = syStart + 1;

  return { start: syStart, end: syEnd, label: `${syStart}–${syEnd}` };
}

export function getEnrollmentOpenDate(): Date {
  const now = new Date();
  const year = now.getMonth() >= 5 ? now.getFullYear() + 1 : now.getFullYear();
  return getSecondMonday(4, year); // May = 4 (0-indexed)
}

export function getEnrollmentCloseDate(): Date {
  const open = getEnrollmentOpenDate();
  const close = new Date(open);
  close.setDate(close.getDate() + 46); // ~6.5 weeks after open
  return close;
}

export function getSchoolStartDate(): Date {
  const now = new Date();
  const year = now.getMonth() >= 5 ? now.getFullYear() : now.getFullYear() - 1;
  return getSecondMonday(5, year); // June = 5 (0-indexed)
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function getRecentSchoolYears(count: number = 3): string[] {
  const { start } = getCurrentSchoolYear();
  const years: string[] = [];
  for (let i = 0; i < count; i++) {
    const s = start - i;
    years.push(`${s}-${s + 1}`);
  }
  return years;
}

export function isEnrollmentOpen(): boolean {
  const now = new Date();
  const open = getEnrollmentOpenDate();
  const close = getEnrollmentCloseDate();
  return now >= open && now <= close;
}
