import "server-only";
import { sendReminderEmail } from "@/features/appointment/services/bookingEmails";
import { db } from "@/services/database";

// Same timings as the PHP site (constants/questionnaire-reminders.php): hours after payment.
export const REMINDER_HOURS = [1, 3, 6, 12, 24, 30, 36];
const STOP_AFTER_HOURS = 48;

type Pending = { id: string; hours_since: number; reminders_sent: number[] };

// The first reminder hour that has passed and was not sent yet, or null.
export const nextReminder = (hoursSince: number, sent: number[]) =>
  REMINDER_HOURS.find((hour) => hoursSince >= hour && !sent.includes(hour)) ?? null;

// Paid, upcoming appointments whose questionnaire is still empty, paid in the last 48 hours.
async function pendingAppointments(): Promise<Pending[]> {
  const rows = await db()`
    select a.id, extract(epoch from now() - a.paid_at) / 3600 as hours_since, a.reminders_sent
    from er_appointments a join er_leads l on l.id = a.lead_id
    where a.payment_id is not null and a.status = 'upcoming' and jsonb_array_length(a.questionnaire) = 0
      and l.email is not null and a.paid_at > now() - make_interval(hours => ${STOP_AFTER_HOURS})`;
  return rows as Pending[];
}

// Sends at most one reminder per appointment per run and records it, so a reminder is never sent twice.
export async function runQuestionnaireReminders(): Promise<{ checked: number; sent: number }> {
  const rows = await pendingAppointments();
  let sent = 0;
  for (const row of rows) {
    const hour = nextReminder(Number(row.hours_since), row.reminders_sent ?? []);
    if (hour === null) continue;
    if (!(await sendReminderEmail(row.id))) continue;
    await db()`update er_appointments set reminders_sent = array_append(reminders_sent, ${hour}::int) where id = ${row.id}`;
    sent += 1;
  }
  return { checked: rows.length, sent };
}
