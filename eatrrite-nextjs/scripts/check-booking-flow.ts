// Checks the website booking logic in the store. Run: bun run check:booking
import assert from "node:assert/strict";
import { QUESTIONNAIRE_QUESTIONS } from "@/features/appointment/constants/questionnaire-questions";
import type { QuestionnaireAnswers } from "@/features/appointment/types/questionnaire";
import { customerTimes } from "@/features/appointment/utils/customerSlots";
import { weekdayName } from "@/features/appointment/utils/hours";
import { validateBooking } from "@/features/appointment/utils/validateBooking";
import { addDays, todayIst } from "@/features/appointment/utils/istTime";
import type { BookingInput } from "@/features/appointment/types/booking";

// The store saves through window.localStorage; Bun has no window, so give it a small in-memory one.
const memory = new Map<string, string>();
const localStorage = {
  getItem: (key: string) => memory.get(key) ?? null,
  setItem: (key: string, value: string) => void memory.set(key, value),
  removeItem: (key: string) => void memory.delete(key),
};
Object.defineProperty(globalThis, "window", { configurable: true, value: { localStorage, addEventListener: () => undefined } });
const { useAdminStore } = await import("@/stores/useAdminStore");

// The first open Tuesday inside the booking window, well after today.
const tuesday = Array.from({ length: 20 }, (_, i) => addDays(todayIst(), i + 2)).find((d) => weekdayName(d) === "tuesday")!;
const friday = Array.from({ length: 20 }, (_, i) => addDays(todayIst(), i + 2)).find((d) => weekdayName(d) === "friday")!;

const store = useAdminStore;
const times = (date = tuesday) => customerTimes(date, store.getState());
const booking = (time: string, phone = "9812345670"): BookingInput => ({
  name: "Test Customer", email: "test@example.com", phone, service: "Nutrition for Gut Health", date: tuesday, time,
});
const hold = (time: string) => store.getState().holdSlot({ date: tuesday, time });

// A full set of answers for the questions the customer fills in (everything but name, age, gender).
const fullAnswers = (): QuestionnaireAnswers =>
  QUESTIONNAIRE_QUESTIONS.filter((q) => !["name", "age", "gender"].includes(q.key)).map((q) => ({
    key: q.key,
    answer: q.type === "checkbox-groups" ? [Object.values(q.groups ?? {})[0][0]] : q.type === "checkbox" ? [q.options![0]] : q.type === "radio" ? q.options![0] : "x",
  }));
const bookOne = () => {
  const held = hold("12:00");
  assert.ok(held.ok);
  const confirmed = held.ok ? store.getState().confirmBooking(booking("12:00"), held.holdId, "pay_q") : null;
  assert.ok(confirmed?.ok);
  return confirmed!.ok ? confirmed.appointment : (undefined as never);
};

let passed = 0;
const check = (name: string, run: () => void) => {
  store.setState(store.getInitialState(), true);
  run();
  passed += 1;
  console.log(`ok  ${name}`);
};

check("slots come from the admin schedule; Friday is closed", () => {
  assert.ok(times().length > 0);
  assert.deepEqual(times(friday), []);
});

check("a hold takes its slot and the 45-minute block around it", () => {
  const result = hold("12:00");
  assert.ok(result.ok);
  for (const t of ["11:30", "11:45", "12:00", "12:15", "12:30"]) assert.ok(!times().includes(t), t);
  assert.ok(times().includes("12:45"));
});

check("a second hold on a taken or overlapping slot is refused", () => {
  assert.ok(hold("12:00").ok);
  const clash = hold("12:15");
  assert.equal(clash.ok, false);
  assert.ok(!clash.ok && clash.error.includes("just booked"));
});

check("releasing a hold gives the slot back", () => {
  const result = hold("12:00");
  assert.ok(result.ok);
  if (result.ok) store.getState().releaseHold(result.holdId);
  assert.ok(times().includes("12:00"));
  assert.equal(store.getState().holds.length, 0);
});

check("an expired hold no longer blocks", () => {
  assert.ok(hold("12:00").ok);
  store.setState((s) => ({ holds: s.holds.map((h) => ({ ...h, expiresAt: Date.now() - 1 })) }));
  assert.ok(times().includes("12:00"));
});

check("confirming saves one lead and one appointment, frees the hold, keeps the slot taken", () => {
  const before = store.getState();
  const result = hold("12:00");
  assert.ok(result.ok);
  if (!result.ok) return;
  const confirmed = store.getState().confirmBooking(booking("12:00"), result.holdId, "pay_1");
  assert.ok(confirmed.ok);
  const after = store.getState();
  assert.equal(after.leads.length, before.leads.length + 1);
  assert.equal(after.appointments.length, before.appointments.length + 1);
  assert.equal(after.holds.length, 0);
  const lead = after.leads[0];
  assert.equal(lead.phone, "98123 45670");
  assert.equal(lead.email, "test@example.com");
  const appointment = after.appointments[0];
  assert.equal(appointment.status, "upcoming");
  assert.equal(appointment.leadId, lead.id);
  assert.equal(appointment.paymentId, "pay_1");
  assert.deepEqual([appointment.date, appointment.time, appointment.service], [tuesday, "12:00", "Nutrition for Gut Health"]);
  assert.equal(appointment.meetLink, undefined);
  assert.deepEqual(appointment.questionnaire, []);
  assert.ok(!times().includes("12:00"));
  assert.equal(hold("12:15").ok, false);
});

check("the same payment confirmed twice makes one appointment", () => {
  const result = hold("12:00");
  assert.ok(result.ok);
  if (!result.ok) return;
  const first = store.getState().confirmBooking(booking("12:00"), result.holdId, "pay_2");
  const count = store.getState().appointments.length;
  const second = store.getState().confirmBooking(booking("12:00"), result.holdId, "pay_2");
  assert.ok(first.ok && second.ok);
  assert.equal(store.getState().appointments.length, count);
  assert.equal(first.ok && second.ok && first.appointment.id, second.ok && second.appointment.id);
});

check("a returning customer (same phone) reuses their lead", () => {
  const a = hold("12:00");
  assert.ok(a.ok);
  if (a.ok) store.getState().confirmBooking(booking("12:00"), a.holdId, "pay_3");
  const leads = store.getState().leads.length;
  const appointments = store.getState().appointments.length;
  const b = hold("15:30");
  assert.ok(b.ok);
  if (b.ok) store.getState().confirmBooking(booking("15:30"), b.holdId, "pay_4");
  assert.equal(store.getState().leads.length, leads);
  assert.equal(store.getState().appointments.length, appointments + 1);
  const other = hold("17:00");
  assert.ok(other.ok);
  if (other.ok) store.getState().confirmBooking(booking("17:00", "9876500000"), other.holdId, "pay_5");
  assert.equal(store.getState().leads.length, leads + 1);
});

check("a paid booking whose slot was taken meanwhile is refused, not doubled", () => {
  const mine = hold("12:00");
  assert.ok(mine.ok);
  store.setState((s) => ({ appointments: [{ ...s.appointments[0], id: "other", date: tuesday, time: "12:15", status: "upcoming" as const }, ...s.appointments] }));
  const count = store.getState().appointments.length;
  const result = mine.ok ? store.getState().confirmBooking(booking("12:00"), mine.holdId, "pay_6") : null;
  assert.equal(result?.ok, false);
  assert.equal(store.getState().appointments.length, count);
});

check("questionnaire: saves answers once, adds age and gender to the lead, then creates the Meet link", () => {
  const appointment = bookOne();
  const result = store.getState().submitQuestionnaire(appointment.id, { name: "Test Customer", age: 34, gender: "Female", answers: fullAnswers() });
  assert.ok(result.ok);
  const saved = store.getState().appointments.find((a) => a.id === appointment.id)!;
  const keys = saved.questionnaire.map((a) => a.key);
  for (const key of ["name", "age", "gender", "primary_goal", "current_symptoms", "readiness_level"]) assert.ok(keys.includes(key), key);
  assert.equal(saved.questionnaire.find((a) => a.key === "age")?.answer, "34");
  assert.match(saved.meetLink ?? "", /^https:\/\/meet\.google\.com\/[a-z0-9]+-[a-z0-9]+-[a-z0-9]+$/);
  const lead = store.getState().leads.find((l) => l.id === saved.leadId)!;
  assert.equal(lead.age, 34);
  assert.equal(lead.gender, "Female");
});

check("questionnaire: a second submit never overwrites the first", () => {
  const appointment = bookOne();
  store.getState().submitQuestionnaire(appointment.id, { name: "Test Customer", age: 34, gender: "Female", answers: fullAnswers() });
  const first = store.getState().appointments.find((a) => a.id === appointment.id)!;
  const again = store.getState().submitQuestionnaire(appointment.id, { name: "Other Name", age: 50, gender: "Male", answers: [] });
  assert.ok(again.ok);
  const after = store.getState().appointments.find((a) => a.id === appointment.id)!;
  assert.deepEqual(after.questionnaire, first.questionnaire);
  assert.equal(after.meetLink, first.meetLink);
  assert.equal(store.getState().leads.find((l) => l.id === after.leadId)?.age, 34);
});

check("questionnaire: missing answers, a bad age or an unknown booking save nothing", () => {
  const appointment = bookOne();
  const incomplete = store.getState().submitQuestionnaire(appointment.id, { name: "Test Customer", age: 34, gender: "Female", answers: fullAnswers().slice(1) });
  assert.equal(incomplete.ok, false);
  const badAge = store.getState().submitQuestionnaire(appointment.id, { name: "Test Customer", age: 5, gender: "Female", answers: fullAnswers() });
  assert.equal(badAge.ok, false);
  assert.equal(store.getState().submitQuestionnaire("nope", { name: "Test Customer", age: 34, gender: "Female", answers: fullAnswers() }).ok, false);
  const untouched = store.getState().appointments.find((a) => a.id === appointment.id)!;
  assert.deepEqual(untouched.questionnaire, []);
  assert.equal(untouched.meetLink, undefined);
});

check("closing a day in the schedule removes its slots", () => {
  store.getState().setDayOpen("tuesday", false);
  assert.deepEqual(times(), []);
  assert.equal(hold("12:00").ok, false);
});

check("a cancelled appointment frees its slot for customers", () => {
  const result = hold("12:00");
  assert.ok(result.ok);
  if (!result.ok) return;
  const confirmed = store.getState().confirmBooking(booking("12:00"), result.holdId, "pay_7");
  assert.ok(confirmed.ok);
  if (!confirmed.ok) return;
  store.getState().updateAppointment(confirmed.appointment.id, { ...confirmed.appointment, status: "cancelled" });
  assert.ok(times().includes("12:00"));
});

check("hold refuses past, out-of-window, closed and unoffered slots", () => {
  const s = store.getState();
  assert.equal(s.holdSlot({ date: todayIst(), time: "00:00" }).ok, false);
  assert.equal(s.holdSlot({ date: addDays(todayIst(), 60), time: "12:00" }).ok, false);
  assert.equal(s.holdSlot({ date: friday, time: "12:00" }).ok, false);
  assert.equal(s.holdSlot({ date: tuesday, time: "12:10" }).ok, false);
  assert.equal(s.holds.length, 0);
});

check("form validation messages", () => {
  const ok = { name: "Asha Rao", email: "A@B.com", phone: "+91 98123 45670", service: "Nutrition for Gut Health", date: tuesday, time: "12:00" };
  assert.deepEqual(validateBooking(ok), { ...ok, email: "a@b.com", phone: "9812345670" });
  assert.equal(validateBooking({ ...ok, service: "" }), "Please select a service.");
  assert.equal(validateBooking({ ...ok, name: "A" }), "Please enter your full name.");
  assert.equal(validateBooking({ ...ok, email: "nope" }), "Please enter a valid email address.");
  assert.equal(validateBooking({ ...ok, phone: "12345" }), "Please enter a valid 10-digit mobile number.");
  assert.equal(validateBooking({ ...ok, date: "", time: "" }), "Select an available date and time to continue.");
});

console.log(`\n${passed} checks passed`);
