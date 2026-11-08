import { APPOINTMENT_SETTINGS } from "@/features/appointment/constants/appointment-settings";
import { EATRRITE_AVAILABLE_TIMES } from "@/features/appointment/constants/eatrrite-available-times";
import type { Block, IstNow, OccupiedSlot, SlotContext, SlotWindow } from "@/features/appointment/types/slots";
import { blockOf, occupiedBlocks, overlapsAny } from "@/features/appointment/utils/blocks";
import { parseClock, toMinutes, toTime } from "@/features/appointment/utils/clock";
import { windowsFor } from "@/features/appointment/utils/hours";
import { nowIst } from "@/features/appointment/utils/istTime";

const { startStepMinutes } = APPOINTMENT_SETTINGS;

// Start times of one window: every step from opening to the latest start,
// where the whole block fits before closing plus prep and clears the taken blocks.
function startsInWindow(window: SlotWindow, taken: Block[]): number[] {
  const starts: number[] = [];
  for (let start = window.start; start <= window.latestStart; start += startStepMinutes) {
    const block = blockOf(toTime(start));
    if (block[1] <= window.capacityEnd && !overlapsAny(block, taken)) starts.push(start);
  }
  return starts;
}

// Every start time the working hours offer on a date, ignoring bookings.
export function offeredTimes(date: string, weekly = EATRRITE_AVAILABLE_TIMES): string[] {
  return availableTimes(date, { weekly, hidePast: false });
}

export const isPastSlot = (date: string, time: string, now: IstNow = nowIst()) =>
  date < now.date || (date === now.date && toMinutes(time) <= now.minutes);

const key = ({ date, time }: OccupiedSlot) => `${date}|${parseClock(time) ?? time}`;

export const isDisabledSlot = (date: string, time: string, disabled: OccupiedSlot[] = []) =>
  disabled.some((slot) => key(slot) === key({ date, time }));

// The times a customer can pick on a date: offered, free, not hidden, not in the past.
export function availableTimes(date: string, context: SlotContext = {}): string[] {
  const { weekly = EATRRITE_AVAILABLE_TIMES, occupied = [], disabled = [], now = nowIst(), hidePast = true } = context;
  const taken = occupiedBlocks(date, occupied);
  const starts = new Set(windowsFor(date, weekly).flatMap((window) => startsInWindow(window, taken)));
  return [...starts]
    .sort((a, b) => a - b)
    .map(toTime)
    .filter((time) => !(hidePast && isPastSlot(date, time, now)) && !isDisabledSlot(date, time, disabled));
}
