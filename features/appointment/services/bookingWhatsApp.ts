import "server-only";
import { bookingMessageData } from "@/features/appointment/services/bookingMessageData";
import {
  adminNewBookingMessage, bookingConfirmedMessage, meetCode, meetLinkReadyMessage, questionnaireReminderMessage,
} from "@/features/appointment/whatsapp/templates";
import { sendWhatsAppMessage, sendWhatsAppToTeam } from "@/services/whatsapp";

// One function per booking WhatsApp message, beside the matching email (bookingEmails.ts).
// Each loads the appointment, builds one message and sends it. Each returns true when Meta
// accepted it, false (with a log line) otherwise, and never throws.

// Customer, after payment: booked, fill in the questionnaire.
export async function sendBookingConfirmedWhatsApp(appointmentId: string): Promise<boolean> {
  const data = await bookingMessageData(appointmentId);
  if (!data) return false;
  return sendWhatsAppMessage(data.phone, bookingConfirmedMessage(data));
}

// Customer, while the questionnaire is still empty.
export async function sendReminderWhatsApp(appointmentId: string): Promise<boolean> {
  const data = await bookingMessageData(appointmentId);
  if (!data) return false;
  return sendWhatsAppMessage(data.phone, questionnaireReminderMessage(data));
}

// Customer, after the questionnaire: the Meet link as a button.
export async function sendMeetLinkWhatsApp(appointmentId: string): Promise<boolean> {
  const data = await bookingMessageData(appointmentId);
  if (!data) return false;
  const code = meetCode(data.meetLink);
  if (!code) {
    console.warn(`WhatsApp skipped (no Google Meet link): meet_link_ready, appointment ${appointmentId}`);
    return false;
  }
  return sendWhatsAppMessage(data.phone, meetLinkReadyMessage(data, code));
}

// Team, after the questionnaire: the new consultation, to every WHATSAPP_ADMIN_NUMBERS number.
export async function sendAdminBookingWhatsApp(appointmentId: string): Promise<boolean> {
  const data = await bookingMessageData(appointmentId);
  if (!data) return false;
  const code = meetCode(data.meetLink);
  if (!code) {
    console.warn(`WhatsApp skipped (no Google Meet link): admin_new_booking, appointment ${appointmentId}`);
    return false;
  }
  return sendWhatsAppToTeam(adminNewBookingMessage(data, code));
}
