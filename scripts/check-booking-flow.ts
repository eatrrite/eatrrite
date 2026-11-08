// Checks the website booking rules the server runs (slots, holds, settings, validation,
// questionnaire). The database calls themselves need Neon; these are the pure rules they use.
// Run: bun run check:booking
import assert from "node:assert/strict";
import { DEFAULT_BOOKING_SETTINGS, DEFAULT_SERVICES } from "@/features/appointment/constants/appointment-settings";
import { EATRRITE_AVAILABLE_TIMES } from "@/features/appointment/constants/eatrrite-available-times";
import { QUESTIONNAIRE_QUESTIONS } from "@/features/appointment/constants/questionnaire-questions";
import type { QuestionnaireAnswers } from "@/features/appointment/types/questionnaire";
import type { OccupiedSlot } from "@/features/appointment/types/slots";
import { customerAvailability, customerSlotError, customerTimes, type SlotSource } from "@/features/appointment/utils/customerSlots";
import { weekdayName } from "@/features/appointment/utils/hours";
import { addDays, todayIst } from "@/features/appointment/utils/istTime";
import { validateBooking } from "@/features/appointment/utils/validateBooking";
import { applyLeadToQuestionnaire, isAdminQuestionnaireComplete, unansweredRequiredCount } from "@/utils/admin/leadQuestionnaire";
import type { Lead } from "@/types/admin/lead";

const today = todayIst();
const nextDay = (day: string) => Array.from({ length: 20 }, (_, i) => addDays(today, i + 2)).find((d) => weekdayName(d) === day)!;
const tuesday = nextDay("tuesday");
const friday = nextDay("friday");
const source = (occupied: OccupiedSlot[] = [], settings = DEFAULT_BOOKING_SETTINGS): SlotSource => ({ weekly: EATRRITE_AVAILABLE_TIMES, settings, occupied });

let passed = 0;
const check = (name: string, run: () => void) => {
  run();
  passed += 1;
  console.log(`ok  ${name}`);
};

check("availability covers today to the end of the window and skips closed days", () => {
  const days = customerAvailability(source());
  assert.ok(Object.keys(days).every((date) => date >= today && date <= addDays(today, DEFAULT_BOOKING_SETTINGS.bookingDaysAhead)));
  assert.ok(days[tuesday]?.length);
  assert.equal(days[friday], undefined);
});

check("a booked slot or a live hold takes its 45-minute block", () => {
  const times = customerTimes(tuesday, source([{ date: tuesday, time: "12:00" }]));
  for (const t of ["11:30", "11:45", "12:00", "12:15", "12:30"]) assert.ok(!times.includes(t), t);
  assert.ok(times.includes("12:45"));
});

check("the server refuses a taken, closed or unoffered slot", () => {
  assert.equal(customerSlotError(tuesday, "12:15", source([{ date: tuesday, time: "12:00" }]))?.code, "taken");
  assert.equal(customerSlotError(friday, "12:00", source())?.code, "not-offered");
  assert.equal(customerSlotError(tuesday, "12:10", source())?.code, "not-offered");
  assert.equal(customerSlotError(tuesday, "12:00", source()), null);
});

check("settings from the database change the slots", () => {
  const longer = { ...DEFAULT_BOOKING_SETTINGS, meetingMinutes: 60, blockMinutes: 75 };
  const times = customerTimes(tuesday, source([], longer));
  assert.ok(times.includes("13:00") && !times.includes("13:15"));
  const shortWindow = { ...DEFAULT_BOOKING_SETTINGS, bookingDaysAhead: 1 };
  assert.deepEqual(customerTimes(tuesday, source([], shortWindow)), []);
});

check("booking details are checked against the database's services", () => {
  const ok = { name: "Asha Rao", email: "A@B.com", phone: "+91 98123 45670", service: DEFAULT_SERVICES[2], date: tuesday, time: "12:00" };
  assert.deepEqual(validateBooking(ok, DEFAULT_SERVICES), { ...ok, email: "a@b.com", phone: "9812345670" });
  assert.equal(validateBooking(ok, ["Another service"]), "Please select a service.");
  assert.equal(validateBooking({ ...ok, phone: "12345" }, DEFAULT_SERVICES), "Please enter a valid 10-digit mobile number.");
});

const answers = (): QuestionnaireAnswers =>
  QUESTIONNAIRE_QUESTIONS.filter((q) => !["name", "age", "gender"].includes(q.key)).map((q) => ({
    key: q.key,
    answer: q.type === "checkbox-groups" ? [Object.values(q.groups ?? {})[0][0]] : q.type === "checkbox" ? [q.options![0]] : q.type === "radio" ? q.options![0] : "x",
  }));
const lead = { id: "l", name: "Asha Rao", phone: "98123 45670", age: 34, gender: "Female", createdAt: "", updatedAt: "" } as Lead;

check("questionnaire: complete answers pass, missing ones are counted", () => {
  const full = applyLeadToQuestionnaire(answers(), lead);
  assert.ok(isAdminQuestionnaireComplete(full, lead, QUESTIONNAIRE_QUESTIONS));
  assert.equal(unansweredRequiredCount(answers().slice(1), QUESTIONNAIRE_QUESTIONS), 1);
  assert.ok(!isAdminQuestionnaireComplete(full, { ...lead, age: undefined }, QUESTIONNAIRE_QUESTIONS));
});

check("questionnaire: an untouched one stays empty when saved", () => {
  assert.deepEqual(applyLeadToQuestionnaire([], lead), []);
  const keys = applyLeadToQuestionnaire(answers(), lead).map((a) => a.key);
  for (const key of ["name", "age", "gender", "primary_goal"]) assert.ok(keys.includes(key), key);
});

console.log(`\n${passed} checks passed`);
