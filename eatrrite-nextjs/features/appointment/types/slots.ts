import type { Weekday } from "@/types/admin/schedule";

/** A working window as "HH:mm" strings. */
export type TimeWindow = { start: string; end: string };

export type WeeklyHours = Record<Weekday, TimeWindow[]>;

/** A start time already taken by a booking or a payment hold. */
export type OccupiedSlot = { date: string; time: string };

/** Minutes since midnight, [start, end). */
export type Block = [start: number, end: number];

/** A working window in minutes, with the limits that follow from the rules. */
export type SlotWindow = {
  start: number;
  end: number;
  /** Latest start: the call must finish by closing time. */
  latestStart: number;
  /** A block may run this far: closing time plus the prep buffer. */
  capacityEnd: number;
};

export type IstNow = { date: string; minutes: number };

export type SlotContext = {
  weekly?: WeeklyHours;
  occupied?: OccupiedSlot[];
  /** Slots hidden by the admin. */
  disabled?: OccupiedSlot[];
  now?: IstNow;
  hidePast?: boolean;
};

export type BookingErrorCode = "invalid-date" | "not-offered" | "out-of-window" | "past" | "taken";
export type BookingError = { code: BookingErrorCode; message: string };
