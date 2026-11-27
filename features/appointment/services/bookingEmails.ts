import "server-only";
import { env } from "@/config/env";
import { adminBookingEmail, meetLinkEmail, questionnaireEmail, reminderEmail } from "@/features/appointment/emails/templates";
import { bookingMessageData } from "@/features/appointment/services/bookingMessageData";
import { sendMail } from "@/services/mailer";

// One function per booking email. Each loads the appointment, builds one email and sends it.
// Each returns true when the mail server accepted it, false (with a log line) otherwise.

// Customer, after payment: the questionnaire link.
export async function sendQuestionnaireEmail(appointmentId: string): Promise<boolean> {
  const data = await bookingMessageData(appointmentId);
  if (!data?.email) return false;
  return sendMail({ to: data.email, ...questionnaireEmail(data) });
}

// Customer, while the questionnaire is still empty.
export async function sendReminderEmail(appointmentId: string): Promise<boolean> {
  const data = await bookingMessageData(appointmentId);
  if (!data?.email) return false;
  return sendMail({ to: data.email, ...reminderEmail(data) });
}

// Customer, after the questionnaire: the Meet link.
export async function sendMeetLinkEmail(appointmentId: string): Promise<boolean> {
  const data = await bookingMessageData(appointmentId);
  if (!data?.email) return false;
  if (!data.meetLink) {
    console.warn(`Email skipped (no Meet link): appointment ${appointmentId}`);
    return false;
  }
  return sendMail({ to: data.email, ...meetLinkEmail(data) });
}

// Team, after the questionnaire: the new consultation, to every ADMIN_NOTIFY_EMAIL address.
export async function sendAdminBookingEmail(appointmentId: string): Promise<boolean> {
  const data = await bookingMessageData(appointmentId);
  if (!data) return false;
  if (!data.meetLink) {
    console.warn(`Email skipped (no Meet link): team booking, appointment ${appointmentId}`);
    return false;
  }
  return sendMail({ to: env.adminNotifyEmail(), replyTo: data.email || undefined, ...adminBookingEmail(data) });
}
