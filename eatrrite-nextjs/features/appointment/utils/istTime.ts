import { APPOINTMENT_SETTINGS } from "@/features/appointment/constants/appointment-settings";
import type { IstNow } from "@/features/appointment/types/slots";

const { utcOffset, utcOffsetMinutes } = APPOINTMENT_SETTINGS;
const IST_SHIFT_MS = utcOffsetMinutes * 60 * 1000;

// The current date and minute of day in India.
export function nowIst(): IstNow {
  const now = new Date(Date.now() + IST_SHIFT_MS);
  return { date: now.toISOString().slice(0, 10), minutes: now.getUTCHours() * 60 + now.getUTCMinutes() };
}

// Current date in India as YYYY-MM-DD.
export const todayIst = () => nowIst().date;

// Adds days to a YYYY-MM-DD date.
export function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

// 0 for Sunday.
export function weekdayOf(date: string): number {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

// True for a real calendar date written YYYY-MM-DD (not 2026-02-31).
export function isValidDate(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) === date;
}

// ISO timestamp with the India offset, as the Apps Script expects.
export function slotIso(date: string, time: string): string {
  return `${date}T${time}:00${utcOffset}`;
}

// Same as slotIso, moved forward by some minutes.
export function slotIsoPlus(date: string, time: string, minutes: number): string {
  const end = new Date(new Date(slotIso(date, time)).getTime() + minutes * 60000 + IST_SHIFT_MS);
  return `${end.toISOString().slice(0, 19)}${utcOffset}`;
}

// "Mon, 9 Nov" and "11:30 AM" for display.
export function displayDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function displayTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}
