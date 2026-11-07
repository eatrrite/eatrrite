import { IST_OFFSET } from "@/constants/appointment/schedule";

const IST_SHIFT_MS = 330 * 60 * 1000;

// Current date in India as YYYY-MM-DD.
export function todayIst(): string {
  return new Date(Date.now() + IST_SHIFT_MS).toISOString().slice(0, 10);
}

// Minutes since midnight in India right now.
export function minutesNowIst(): number {
  const now = new Date(Date.now() + IST_SHIFT_MS);
  return now.getUTCHours() * 60 + now.getUTCMinutes();
}

// Adds days to a YYYY-MM-DD date.
export function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

// 0 for Sunday, matching WEEKLY_HOURS.
export function weekdayOf(date: string): number {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

// ISO timestamp with the India offset, as the Apps Script expects.
export function slotIso(date: string, time: string): string {
  return `${date}T${time}:00${IST_OFFSET}`;
}

// Same as slotIso, moved forward by some minutes.
export function slotIsoPlus(date: string, time: string, minutes: number): string {
  const end = new Date(new Date(slotIso(date, time)).getTime() + minutes * 60000 + IST_SHIFT_MS);
  return `${end.toISOString().slice(0, 19)}${IST_OFFSET}`;
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
