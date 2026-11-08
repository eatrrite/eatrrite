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

/** Booking rules, from the er_settings row. */
export type BookingSettings = {
  /** Length of the customer's call. The last start of a window is this long before it closes. */
  meetingMinutes: number;
  /** Consultant buffer after each call. */
  prepMinutes: number;
  /** Time one booking occupies: the call plus the buffer. No two bookings may overlap it. */
  blockMinutes: number;
  /** Start times are offered on this grid inside each working window. */
  startStepMinutes: number;
  /** A payment in progress holds its slot for this long. */
  holdMinutes: number;
  /** Customers can book from today up to and including this many days ahead. */
  bookingDaysAhead: number;
  /** The booking fee, charged through Razorpay. */
  feeRupees: number;
};

export type SlotContext = {
  settings?: BookingSettings;
  weekly?: WeeklyHours;
  occupied?: OccupiedSlot[];
  /** Slots hidden by the admin. */
  disabled?: OccupiedSlot[];
  now?: IstNow;
  hidePast?: boolean;
};

export type BookingErrorCode = "invalid-date" | "not-offered" | "out-of-window" | "past" | "taken";
export type BookingError = { code: BookingErrorCode; message: string };
