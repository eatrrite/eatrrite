import "server-only";
import { env } from "@/config/env";
import { confirmedPath } from "@/constants/routes";
import {
  adminBookingEmail, customerMeetEmail, customerQuestionnaireEmail, customerReminderEmail, type BookingEmailData,
} from "@/features/appointment/emails/templates";
import { db } from "@/services/database";
import { sendMail } from "@/services/mailer";
import { formatTimeLabel } from "@/utils/admin/time";

const displayDate = (date: string) =>
  new Date(`${date}T00:00:00+05:30`).toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata",
  });

// "Tue, 10 Nov", short enough for a subject line.
const shortDate = (date: string) =>
  new Date(`${date}T00:00:00+05:30`).toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Kolkata",
  });

// Everything an email about this appointment needs, or null when it has no email address.
export async function bookingEmailData(appointmentId: string): Promise<BookingEmailData | null> {
  const [row] = await db()`
    select l.name, l.email, l.phone, a.service, a.meet_link, a.payment_id,
      to_char(a.date, 'YYYY-MM-DD') as date, to_char(a.time, 'HH24:MI') as time
    from er_appointments a join er_leads l on l.id = a.lead_id where a.id = ${appointmentId}`;
  if (!row?.email) return null;
  return {
    name: row.name,
    email: row.email,
    phone: row.phone,
    service: row.service,
    displayDate: displayDate(row.date),
    shortDate: shortDate(row.date),
    displayTime: formatTimeLabel(row.time),
    meetLink: row.meet_link ?? undefined,
    paymentId: row.payment_id ?? undefined,
    questionnaireUrl: `${env.siteUrl()}${confirmedPath(appointmentId)}`,
  };
}

// After payment: the customer gets the questionnaire link.
export async function sendQuestionnaireEmail(appointmentId: string) {
  const data = await bookingEmailData(appointmentId);
  if (data) await sendMail({ to: data.email, ...customerQuestionnaireEmail(data) });
}

// Reminder while the questionnaire is still empty.
export async function sendReminderEmail(appointmentId: string): Promise<boolean> {
  const data = await bookingEmailData(appointmentId);
  return data ? sendMail({ to: data.email, ...customerReminderEmail(data) }) : false;
}

// After the questionnaire: the Meet link to the customer and the booking to the team.
export async function sendMeetEmails(appointmentId: string) {
  const data = await bookingEmailData(appointmentId);
  if (!data) return;
  await sendMail({ to: data.email, ...customerMeetEmail(data) });
  await sendMail({ to: env.adminNotifyEmail(), replyTo: data.email, ...adminBookingEmail(data) });
}
