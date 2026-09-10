import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, isValid, parseISO } from "date-fns";

/**
 * Merge Tailwind class names with conflict resolution.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as currency (default USD).
 */
export function formatCurrency(
  amount: number | string,
  currency = "UAH",
  locale = "uk-UA"
): string {
  const value = typeof amount === "string" ? Number(amount) : amount;
  if (Number.isNaN(value)) return "—";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Parse unknown date-like values into a Date, or null if invalid.
 */
function toDate(value: Date | string | number): Date | null {
  if (value instanceof Date) return isValid(value) ? value : null;
  if (typeof value === "number") {
    const d = new Date(value);
    return isValid(d) ? d : null;
  }
  const parsed = parseISO(value);
  if (isValid(parsed)) return parsed;
  const fallback = new Date(value);
  return isValid(fallback) ? fallback : null;
}

/**
 * Format a date for display (e.g. "Mar 15, 2026").
 */
export function formatDate(
  value: Date | string | number,
  pattern = "MMM d, yyyy"
): string {
  const date = toDate(value);
  if (!date) return "—";
  return format(date, pattern);
}

/**
 * Format a date-time for display (e.g. "Mar 15, 2026 · 2:30 PM").
 */
export function formatDateTime(value: Date | string | number): string {
  return formatDate(value, "MMM d, yyyy · h:mm a");
}

/**
 * Relative time string (e.g. "3 days ago").
 */
export function formatRelativeDate(value: Date | string | number): string {
  const date = toDate(value);
  if (!date) return "—";
  return formatDistanceToNow(date, { addSuffix: true });
}

/**
 * Percentage of budget used, clamped to 0–100+ for UI progress bars.
 */
export function budgetProgressPercent(spent: number, amount: number): number {
  if (amount <= 0) return 0;
  return Math.round((spent / amount) * 100);
}
