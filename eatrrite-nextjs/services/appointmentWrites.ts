import { db } from "@/services/database";
import type { BookingInput } from "@/types/appointment/booking";
import type { QuestionnaireAnswerMap } from "@/types/appointment/questionnaire";
import { slotIso } from "@/utils/istTime";

// Saves a booking that is waiting for payment. Returns the new id.
export async function createPendingAppointment(input: BookingInput, orderId: string) {
  const rows = await db()`
    insert into appointments (name, email, phone, service, slot_start, razorpay_order_id)
    values (${input.name}, ${input.email}, ${input.phone}, ${input.service},
            ${slotIso(input.date, input.time)}, ${orderId})
    returning id`;
  return String(rows[0].id);
}

// Marks a pending booking as paid. Returns null if it was already confirmed.
export async function confirmPayment(orderId: string, paymentId: string) {
  const rows = await db()`
    update appointments
    set status = 'confirmed', razorpay_payment_id = ${paymentId}
    where razorpay_order_id = ${orderId} and status = 'pending'
    returning id`;
  return rows[0] ? String(rows[0].id) : null;
}

// Stores answers once, only for a paid booking.
export async function saveQuestionnaire(id: string, answers: QuestionnaireAnswerMap) {
  const rows = await db()`
    update appointments
    set questionnaire = ${JSON.stringify(answers)}::jsonb
    where id = ${id} and status = 'confirmed' and questionnaire is null
    returning id`;
  return rows.length > 0;
}

// Claims a booking for Meet link creation, so two requests cannot both run.
export async function claimForMeet(id: string) {
  const rows = await db()`
    update appointments
    set status = 'finalizing'
    where id = ${id} and status in ('confirmed', 'failed') and questionnaire is not null
    returning id`;
  return rows.length > 0;
}

export async function saveMeetLink(id: string, meetLink: string) {
  await db()`update appointments set status = 'completed', meet_link = ${meetLink} where id = ${id}`;
}

export async function markMeetFailed(id: string) {
  await db()`update appointments set status = 'failed' where id = ${id} and status = 'finalizing'`;
}
