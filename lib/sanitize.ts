export function sanitizeName(value: string): string {
  return value
    .replace(/[<>]/g, "")
    .replace(/[^a-zA-Z\s.\-]/g, "")
    .slice(0, 100)
    .trim();
}

export function sanitizeLrn(value: string): string {
  return value.replace(/\D/g, "").slice(0, 12);
}

export function sanitizePhone(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11);
}

export function sanitizeGeneral(value: string): string {
  return value
    .replace(/[<>]/g, "")
    .replace(/["']/g, "")
    .slice(0, 200)
    .trim();
}

export function sanitizeAddress(value: string): string {
  return value
    .replace(/[<>]/g, "")
    .replace(/["']/g, "")
    .slice(0, 200)
    .trim();
}

export function validateLrn(value: string): boolean {
  return /^\d{12}$/.test(value);
}

export function validatePhone(value: string): boolean {
  if (!value) return true;
  return /^09\d{9}$/.test(value);
}

export function validateName(value: string): boolean {
  return value.length >= 1 && value.length <= 100;
}
