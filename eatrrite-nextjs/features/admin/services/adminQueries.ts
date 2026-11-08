import "server-only";
import { db } from "@/services/database";
import type { AdminSettings } from "@/types/admin/settings";
import { toAppointment, toLead, toTodo, type AppointmentRow, type LeadRow, type TodoRow } from "@/features/admin/services/adminRows";

export async function listLeads() {
  const rows = await db()`select * from er_leads order by updated_at desc`;
  return (rows as LeadRow[]).map(toLead);
}

export async function listAppointments() {
  const rows = await db()`
    select id, lead_id, to_char(date, 'YYYY-MM-DD') as date, to_char(time, 'HH24:MI') as time,
      service, status, notes, meet_link, payment_id, questionnaire, created_at, updated_at
    from er_appointments order by date desc, time desc`;
  return (rows as AppointmentRow[]).map(toAppointment);
}

export async function listTodos() {
  const rows = await db()`select id, label, done from er_todos order by created_at desc`;
  return (rows as TodoRow[]).map(toTodo);
}

export async function getPreferences(): Promise<AdminSettings> {
  const [row] = await db()`
    select email_reminders, sms_reminders, appointment_emails, marketing_emails, desktop_notifications, weekly_digest
    from er_settings where id`;
  return {
    emailReminders: row.email_reminders,
    smsReminders: row.sms_reminders,
    appointmentEmails: row.appointment_emails,
    marketingEmails: row.marketing_emails,
    desktopNotifications: row.desktop_notifications,
    weeklyDigest: row.weekly_digest,
  };
}
