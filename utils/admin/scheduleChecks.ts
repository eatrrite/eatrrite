import type { DaySchedule, ScheduleTimeSlot } from "@/types/admin/schedule";

// Checks for the weekly hours on the Schedule page. The store saves the week only when every
// open day passes, and the server refuses a week that does not, so a half-edited window is
// never dropped: it stays on screen with its message until it is fixed.

const toMin = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
const toClock = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

/** The last start the time lists offer (23:30), so a moved end never runs past midnight. */
const LAST_MINUTE = 23 * 60 + 30;

/** Each window's problem, by slot id: an end not after its start, or an overlap with another. */
export function slotProblems(slots: ScheduleTimeSlot[]): Record<string, string> {
  const problems: Record<string, string> = {};
  for (const slot of slots) {
    if (toMin(slot.closeTime) <= toMin(slot.openTime)) problems[slot.id] = "The end time must be after the start time.";
  }
  const valid = slots.filter((slot) => !problems[slot.id]).sort((a, b) => toMin(a.openTime) - toMin(b.openTime));
  for (let i = 1; i < valid.length; i++) {
    if (toMin(valid[i].openTime) < toMin(valid[i - 1].closeTime)) {
      problems[valid[i].id] = "This window overlaps the one before it.";
    }
  }
  return problems;
}

/** True when any open day has a window to fix. */
export const weekHasProblems = (days: DaySchedule[]) =>
  days.some((day) => day.isOpen && Object.keys(slotProblems(day.slots)).length > 0);

/**
 * Applies a change to one window. Moving the start to or past the end carries the end along to
 * an hour after the new start, so the window stays valid while the admin picks the end.
 */
export function patchSlot(slot: ScheduleTimeSlot, patch: Partial<Omit<ScheduleTimeSlot, "id">>): ScheduleTimeSlot {
  const next = { ...slot, ...patch };
  if (patch.openTime && !patch.closeTime && toMin(next.closeTime) <= toMin(next.openTime)) {
    next.closeTime = toClock(Math.min(toMin(next.openTime) + 60, LAST_MINUTE));
  }
  return next;
}
