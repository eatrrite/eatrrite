import "server-only";
import type { BookingInput } from "@/features/appointment/types/booking";
import type { OccupiedSlot } from "@/features/appointment/types/slots";
import { getBookingSettings, getWeeklyHours } from "@/features/appointment/services/bookingConfig";
import type { SlotSource } from "@/features/appointment/utils/customerSlots";
import { hasSlotConflict } from "@/features/appointment/utils/appointmentSlots";
import { addDays, todayIst } from "@/features/appointment/utils/istTime";
import { db } from "@/services/database";

const formatPhone = (phone: string) => `${phone.slice(0, 5)} ${phone.slice(5)}`;

// Slots taken from today to the end of the booking window: booked appointments
// (not cancelled) and payment holds that have not run out.
async function occupiedSlots(days: number): Promise<OccupiedSlot[]> {
  const from = todayIst();
  const to = addDays(from, days);
  const rows = await db()`
    select to_char(date, 'YYYY-MM-DD') as date, to_char(time, 'HH24:MI') as time
    from er_appointments where status <> 'cancelled' and date between ${from}::date and ${to}::date
    union all
    select to_char(date, 'YYYY-MM-DD') as date, to_char(time, 'HH24:MI') as time
    from er_slot_holds where expires_at > now() and date between ${from}::date and ${to}::date`;
  return rows as OccupiedSlot[];
}

// Everything the customer-side slot rules need, fresh from the database.
export async function slotSource(): Promise<SlotSource> {
  const [weekly, settings] = await Promise.all([getWeeklyHours(), getBookingSettings()]);
  const [occupied, hidden] = await Promise.all([occupiedSlots(settings.bookingDaysAhead), hiddenSlots()]);
  return { weekly, settings, occupied, hidden };
}

// Start times the admin hid, from today on.
async function hiddenSlots(): Promise<OccupiedSlot[]> {
  const rows = await db()`
    select to_char(date, 'YYYY-MM-DD') as date, to_char(time, 'HH24:MI') as time
    from er_hidden_slots where date >= ${todayIst()}::date`;
  return rows as OccupiedSlot[];
}

export async function createHold(date: string, time: string, holdMinutes: number): Promise<string> {
  const [row] = await db()`
    insert into er_slot_holds (date, time, expires_at)
    values (${date}, ${time}, now() + make_interval(mins => ${holdMinutes}))
    returning id`;
  return String(row.id);
}

// Keeps the Razorpay order and the customer's details with the hold, for the webhook.
export async function attachOrder(holdId: string, orderId: string, input: BookingInput) {
  await db()`update er_slot_holds set order_id = ${orderId}, booking = ${JSON.stringify(input)}::jsonb where id = ${holdId}`;
}

// The hold for a Razorpay order, even after it ran out (a payment can finish late).
export async function holdForOrder(orderId: string): Promise<{ id: string; booking: BookingInput } | null> {
  const [row] = await db()`select id, booking from er_slot_holds where order_id = ${orderId} and booking is not null`;
  return row ? { id: String(row.id), booking: row.booking as BookingInput } : null;
}

export async function releaseHold(id: string) {
  await db()`delete from er_slot_holds where id = ${id}`;
}

// An existing lead with the same 10-digit phone, or a new one. Fills a missing email.
async function leadFor(input: BookingInput): Promise<string> {
  const sql = db();
  const [known] = await sql`
    select id from er_leads where right(regexp_replace(phone, '\\D', '', 'g'), 10) = ${input.phone} limit 1`;
  if (known) {
    await sql`update er_leads set email = coalesce(email, ${input.email}) where id = ${known.id}`;
    return String(known.id);
  }
  const [created] = await sql`
    insert into er_leads (name, phone, email) values (${input.name}, ${formatPhone(input.phone)}, ${input.email})
    returning id`;
  return String(created.id);
}

/** `created` is false when this payment was already saved (the page and the webhook both confirm). */
export type ConfirmOutcome = { ok: true; appointmentId: string; created: boolean } | { ok: false; error: string };

// Saves the lead and the appointment after a verified payment, then frees the hold. Safe to
// call twice for the same payment: payment_id is unique, so the second call returns the first.
export async function confirmBooking(input: BookingInput, holdId: string, paymentId: string): Promise<ConfirmOutcome> {
  const sql = db();
  const [existing] = await sql`select id from er_appointments where payment_id = ${paymentId}`;
  if (existing) {
    await releaseHold(holdId);
    return { ok: true, appointmentId: String(existing.id), created: false };
  }

  const { blockMinutes } = await getBookingSettings();
  const sameDay = await sql`
    select id, to_char(date, 'YYYY-MM-DD') as date, to_char(time, 'HH24:MI') as time, status
    from er_appointments where date = ${input.date}::date`;
  if (hasSlotConflict(input.date, input.time, sameDay as { id: string; date: string; time: string; status: "upcoming" }[], blockMinutes)) {
    await releaseHold(holdId);
    return { ok: false, error: `Payment ${paymentId} went through, but this slot was taken. Please contact us to rebook.` };
  }

  const leadId = await leadFor(input);
  const [row] = await sql`
    insert into er_appointments (lead_id, date, time, service, status, payment_id, paid_at)
    values (${leadId}, ${input.date}, ${input.time}, ${input.service}, 'upcoming', ${paymentId}, now())
    on conflict (payment_id) do update set payment_id = excluded.payment_id
    returning id, (xmax = 0) as created`;
  await releaseHold(holdId);
  return { ok: true, appointmentId: String(row.id), created: Boolean(row.created) };
}
