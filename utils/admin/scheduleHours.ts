import type { ScheduleTimeSlot } from "@/types/admin/schedule";

// "5h 30m across 3 windows", from the valid windows only.
export function openHours(slots: ScheduleTimeSlot[]) {
  const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
  const valid = slots.filter((slot) => toMin(slot.closeTime) > toMin(slot.openTime));
  const total = valid.reduce((sum, slot) => sum + toMin(slot.closeTime) - toMin(slot.openTime), 0);
  if (!valid.length) return null;
  const time = `${Math.floor(total / 60)}h${total % 60 ? ` ${total % 60}m` : ""}`;
  return `${time} across ${valid.length} ${valid.length === 1 ? "window" : "windows"}`;
}
