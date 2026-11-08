// Checks the appointment rules against the PHP behaviour. Run: bun run check:rules
import assert from "node:assert/strict";
import { EATRRITE_AVAILABLE_TIMES } from "@/features/appointment/constants/eatrrite-available-times";
import type { ClinicAppointment } from "@/types/admin/appointment";
import { adminSlotError, adminSlotTimes, occupiedFrom } from "@/features/appointment/utils/appointmentSlots";
import { scheduleToWeekly, weeklyToSchedule } from "@/features/appointment/utils/scheduleWeekly";
import { mergeBlocks, timesOverlap } from "@/features/appointment/utils/blocks";
import { bookingError, isBookableDate } from "@/features/appointment/utils/bookable";
import { parseClock } from "@/features/appointment/utils/clock";
import { hoursNote } from "@/features/appointment/utils/hours";
import { availableTimes, offeredTimes } from "@/features/appointment/utils/slots";

const MON = "2026-11-09";
const FRI = "2026-11-13";
const SAT = "2026-11-14";
const SUN = "2026-11-15";
const morning = { date: MON, minutes: 10 * 60 };
const at = (date: string, time: string) => ({ date, time });

let passed = 0;
const check = (name: string, run: () => void) => {
  run();
  passed += 1;
  console.log(`ok  ${name}`);
};

check("Monday offers 15-minute starts, last start 30 minutes before closing", () => {
  const times = offeredTimes(MON);
  assert.equal(times[0], "11:30");
  assert.ok(times.includes("13:30") && !times.includes("13:45"));
  assert.ok(times.includes("17:00") && !times.includes("17:15"));
  assert.ok(times.includes("21:00") && !times.includes("21:15"));
  assert.equal(times.length, 9 + 7 + 3);
});

check("Friday is closed; Saturday and Sunday use their own hours", () => {
  assert.deepEqual(offeredTimes(FRI), []);
  assert.equal(offeredTimes(SAT).at(-1), "14:00");
  assert.equal(offeredTimes(SUN).at(-1), "12:30");
});

check("a booking blocks 45 minutes: later starts touching the end stay free", () => {
  const free = availableTimes(MON, { occupied: [at(MON, "12:00")], now: morning });
  for (const t of ["11:30", "11:45", "12:00", "12:15", "12:30"]) assert.ok(!free.includes(t), t);
  assert.ok(free.includes("12:45"));
  assert.ok(free.includes("13:00"));
});

check("a booking on another date does not block", () => {
  assert.ok(availableTimes(MON, { occupied: [at(SAT, "12:00")], now: morning }).includes("12:00"));
});

check("adjacent bookings merge and unreadable rows are ignored", () => {
  assert.deepEqual(mergeBlocks([[0, 45], [45, 90], [200, 245]]), [[0, 90], [200, 245]]);
  assert.ok(availableTimes(MON, { occupied: [at(MON, "nonsense")], now: morning }).includes("12:00"));
});

check("timesOverlap matches the block rule", () => {
  assert.ok(timesOverlap("12:00", "12:30"));
  assert.ok(!timesOverlap("12:00", "12:45"));
});

check("past times are hidden, past dates offer nothing", () => {
  const noon = { date: MON, minutes: 12 * 60 };
  const times = availableTimes(MON, { now: noon });
  assert.ok(!times.includes("12:00") && times.includes("12:15"));
  assert.deepEqual(availableTimes(MON, { now: { date: "2026-11-10", minutes: 0 } }), []);
});

check("disabled slots are hidden", () => {
  assert.ok(!availableTimes(MON, { disabled: [at(MON, "13:00")], now: morning }).includes("13:00"));
});

check("booking window is today through 30 days ahead", () => {
  assert.ok(isBookableDate("2026-12-09", MON));
  assert.ok(!isBookableDate("2026-12-10", MON));
  assert.ok(!isBookableDate("2026-11-08", MON));
  assert.ok(!isBookableDate("2026-02-31", MON));
});

check("bookingError follows the PHP order and messages", () => {
  const ctx = { now: morning };
  assert.equal(bookingError(MON, "12:00", ctx), null);
  assert.equal(bookingError(MON, "12:15 PM", ctx), null);
  assert.equal(bookingError("2026-02-31", "12:00", ctx)?.code, "invalid-date");
  assert.equal(bookingError(MON, "11:40", ctx)?.code, "not-offered");
  assert.equal(bookingError(FRI, "12:00", ctx)?.code, "not-offered");
  assert.equal(bookingError(MON, "11:30", { now: { date: MON, minutes: 12 * 60 } })?.code, "past");
  assert.equal(bookingError(MON, "12:15", { ...ctx, occupied: [at(MON, "12:00")] })?.code, "taken");
  assert.equal(bookingError(MON, "12:00", { ...ctx, disabled: [at(MON, "12:00")] })?.code, "not-offered");
});

check("a day beyond the window is out-of-window once it is an offered weekday", () => {
  // 2026-12-10 is a Thursday, so it is offered; only the window rule rejects it.
  assert.equal(bookingError("2026-12-10", "12:00", { now: morning })?.code, "out-of-window");
});

check("clock parsing", () => {
  assert.equal(parseClock("9:05"), "09:05");
  assert.equal(parseClock("12:00 AM"), "00:00");
  assert.equal(parseClock("12:00 PM"), "12:00");
  assert.equal(parseClock("1:30 pm"), "13:30");
  assert.equal(parseClock("24:00"), null);
  assert.equal(parseClock("13:00 PM"), null);
  assert.equal(parseClock("noon"), null);
});

check("public hours note matches the PHP wording", () => {
  assert.equal(
    hoursNote(),
    "Mon–Thu 11:30 AM–2:00 PM, 3:30 PM–5:30 PM, 8:30 PM–9:30 PM · Fri unavailable · Sat 11:30 AM–2:30 PM · Sun 11:30 AM–1:00 PM",
  );
});

check("admin schedule round-trips the real working hours", () => {
  const days = weeklyToSchedule(EATRRITE_AVAILABLE_TIMES);
  assert.equal(days.find((d) => d.day === "friday")?.isOpen, false);
  assert.deepEqual(scheduleToWeekly(days), EATRRITE_AVAILABLE_TIMES);
  const broken = weeklyToSchedule(EATRRITE_AVAILABLE_TIMES);
  broken[0].slots[0] = { ...broken[0].slots[0], closeTime: "10:00" };
  assert.equal(scheduleToWeekly(broken).monday.length, 2);
});

const appointment = (id: string, date: string, time: string, status: ClinicAppointment["status"] = "upcoming"): ClinicAppointment => ({
  id, leadId: "l", date, time, service: "s", status, questionnaire: [], createdAt: "", updatedAt: "",
});
const days = weeklyToSchedule(EATRRITE_AVAILABLE_TIMES);
const input = (date: string, time: string) => ({ leadId: "l", date, time, service: "s", status: "upcoming" as const, questionnaire: [] });

check("admin: no overlap, cancelled frees the slot, own slot stays editable", () => {
  const taken = [appointment("a", MON, "12:00"), appointment("b", MON, "15:30", "cancelled")];
  assert.equal(occupiedFrom(taken).length, 1);
  assert.ok(adminSlotError(input(MON, "12:30"), days, taken, null));
  assert.equal(adminSlotError(input(MON, "12:45"), days, taken, null), null);
  assert.equal(adminSlotError(input(MON, "15:30"), days, taken, null), null);
  assert.equal(adminSlotError(input(MON, "12:00"), days, taken, taken[0]), null);
  assert.ok(!adminSlotTimes(MON, days, taken).includes("12:30"));
  assert.ok(adminSlotTimes(MON, days, taken, "a").includes("12:30"));
  assert.ok(adminSlotError(input(MON, "10:00"), days, taken, null)?.includes("working hours"));
  assert.ok(adminSlotError(input(FRI, "12:00"), days, taken, null));
});

console.log(`\n${passed} checks passed`);
