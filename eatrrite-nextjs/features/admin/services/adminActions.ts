"use server";

import { updateTag } from "next/cache";
import { listAppointments } from "@/features/admin/services/adminQueries";
import { toAppointment, toLead, type AppointmentRow, type LeadRow } from "@/features/admin/services/adminRows";
import { BOOKING_CONFIG_TAG, getBookingSettings, getScheduleDays } from "@/features/appointment/services/bookingConfig";
import { adminSlotError } from "@/features/appointment/utils/appointmentSlots";
import { isValidWindow } from "@/features/appointment/utils/hours";
import { assertAdmin } from "@/features/auth/services/session";
import { db } from "@/services/database";
import type { Appointment, AppointmentInput } from "@/types/admin/appointment";
import type { Lead } from "@/types/admin/lead";
import type { DaySchedule } from "@/types/admin/schedule";
import type { AdminSettings } from "@/types/admin/settings";
import type { Todo } from "@/types/admin/todo";
import { attempt, type ActionResult } from "@/utils/actionResult";

// Every admin change goes through here. Each action checks the session first.
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function saveLeadAction(lead: Lead): Promise<ActionResult<{ lead: Lead }>> {
  return attempt(async () => {
    await assertAdmin();
    const [row] = await db()`
      insert into er_leads (id, name, phone, email, age, gender, profession, address)
      values (${lead.id}, ${lead.name}, ${lead.phone}, ${lead.email ?? null}, ${lead.age ?? null},
              ${lead.gender ?? null}, ${lead.profession ?? null}, ${lead.address ?? null})
      on conflict (id) do update set
        name = excluded.name, phone = excluded.phone, email = excluded.email, age = excluded.age,
        gender = excluded.gender, profession = excluded.profession, address = excluded.address
      returning *`;
    return { lead: toLead(row as LeadRow) };
  }, "Could not save the lead.");
}

export async function deleteLeadAction(id: string): Promise<ActionResult> {
  return attempt(async () => {
    await assertAdmin();
    await db()`delete from er_leads where id = ${id}`;
    return {};
  }, "Could not delete the lead.");
}

// Checks the booking rules against the database, not the browser's copy, then saves.
export async function saveAppointmentAction(input: AppointmentInput, id?: string): Promise<ActionResult<{ appointment: Appointment }>> {
  return attempt(async () => {
    await assertAdmin();
    const [days, settings, appointments] = await Promise.all([getScheduleDays(), getBookingSettings(), listAppointments()]);
    const original = id ? appointments.find((item) => item.id === id) : null;
    const problem = adminSlotError(input, days, appointments, settings, original);
    if (problem) throw new Error(problem);

    const answers = JSON.stringify(input.questionnaire);
    const [row] = await db()`
      insert into er_appointments (id, lead_id, date, time, service, status, notes, meet_link, payment_id, questionnaire)
      values (${id ?? crypto.randomUUID()}, ${input.leadId}, ${input.date}, ${input.time}, ${input.service}, ${input.status},
              ${input.notes ?? null}, ${input.meetLink ?? null}, ${input.paymentId ?? null}, ${answers}::jsonb)
      on conflict (id) do update set
        lead_id = excluded.lead_id, date = excluded.date, time = excluded.time, service = excluded.service,
        status = excluded.status, notes = excluded.notes, meet_link = excluded.meet_link, questionnaire = excluded.questionnaire
      returning id, lead_id, to_char(date, 'YYYY-MM-DD') as date, to_char(time, 'HH24:MI') as time,
        service, status, notes, meet_link, payment_id, questionnaire, created_at, updated_at`;
    return { appointment: toAppointment(row as AppointmentRow) };
  }, "Could not save the appointment.");
}

export async function deleteAppointmentAction(id: string): Promise<ActionResult> {
  return attempt(async () => {
    await assertAdmin();
    await db()`delete from er_appointments where id = ${id}`;
    return {};
  }, "Could not delete the appointment.");
}

// Replaces the weekly hours with what the Schedule page shows. A window that ends before it
// starts is skipped until it is fixed. Closed days have no rows.
export async function saveScheduleAction(days: DaySchedule[]): Promise<ActionResult> {
  return attempt(async () => {
    await assertAdmin();
    const sql = db();
    const inserts = days
      .filter((day) => day.isOpen)
      .flatMap((day) =>
        day.slots
          .filter((slot) => isValidWindow({ start: slot.openTime, end: slot.closeTime }))
          .map((slot) => sql`
            insert into er_schedule_slots (id, weekday, start_time, end_time)
            values (${UUID.test(slot.id) ? slot.id : crypto.randomUUID()}, ${day.day}, ${slot.openTime}, ${slot.closeTime})`),
      );
    await sql.transaction([sql`delete from er_schedule_slots`, ...inserts]);
    updateTag(BOOKING_CONFIG_TAG);
    return {};
  }, "Could not save the schedule.");
}

export async function savePreferencesAction(preferences: AdminSettings): Promise<ActionResult> {
  return attempt(async () => {
    await assertAdmin();
    await db()`
      update er_settings set
        email_reminders = ${preferences.emailReminders}, sms_reminders = ${preferences.smsReminders},
        appointment_emails = ${preferences.appointmentEmails}, marketing_emails = ${preferences.marketingEmails},
        desktop_notifications = ${preferences.desktopNotifications}, weekly_digest = ${preferences.weeklyDigest}
      where id`;
    return {};
  }, "Could not save the setting.");
}

export async function addTodoAction(todo: Todo): Promise<ActionResult> {
  return attempt(async () => {
    await assertAdmin();
    await db()`insert into er_todos (id, label, done) values (${todo.id}, ${todo.label}, ${todo.done})`;
    return {};
  }, "Could not add the to-do.");
}

export async function setTodoDoneAction(id: string, done: boolean): Promise<ActionResult> {
  return attempt(async () => {
    await assertAdmin();
    await db()`update er_todos set done = ${done} where id = ${id}`;
    return {};
  }, "Could not update the to-do.");
}

export async function deleteTodoAction(id: string): Promise<ActionResult> {
  return attempt(async () => {
    await assertAdmin();
    await db()`delete from er_todos where id = ${id}`;
    return {};
  }, "Could not delete the to-do.");
}
