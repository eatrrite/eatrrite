import { nowIst } from "@/features/appointment/utils/istTime";

const pad = (value: number) => String(value).padStart(2, "0");

/** "Now" in India as a local date-time string (no offset), for the dashboard and calendar. */
export function adminNow(): string {
  const { date, minutes } = nowIst();
  return `${date}T${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}:00`;
}
