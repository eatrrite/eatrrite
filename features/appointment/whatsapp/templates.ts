import { WHATSAPP_TEMPLATES } from "@/constants/whatsappTemplates";
import type { BookingMessageData } from "@/features/appointment/types/bookingMessage";
import type { WhatsAppMessage } from "@/services/whatsapp";
import { firstName } from "@/utils/name";

// Booking WhatsApp messages. Each builds the variables for one Meta template, in the order the
// template's {{1}}, {{2}}… appear (wording and buttons: docs/messages.md). Each email has the same news.

const MEET_PREFIX = "https://meet.google.com/";

// "https://meet.google.com/abc-defg-hij" → "abc-defg-hij", the end of the Meet button's address.
// Null for anything else, so a message never goes out with a broken button.
export function meetCode(link: string): string | null {
  if (!link.startsWith(MEET_PREFIX)) return null;
  const code = link.slice(MEET_PREFIX.length).split(/[?#]/)[0];
  if (!/^[a-z0-9-]+$/i.test(code)) return null;
  return code;
}

const greetingName = (data: BookingMessageData) => firstName(data.name) || "there";

// booking_confirmed: {{1}} first name, {{2}} date, {{3}} time. Button 0 ends in the appointment id.
export function bookingConfirmedMessage(data: BookingMessageData): WhatsAppMessage {
  return {
    template: WHATSAPP_TEMPLATES.bookingConfirmed,
    bodyParams: [greetingName(data), data.displayDate, data.displayTime],
    buttons: [{ index: 0, text: data.appointmentId }],
  };
}

// questionnaire_reminder: same variables and button as booking_confirmed.
export function questionnaireReminderMessage(data: BookingMessageData): WhatsAppMessage {
  return {
    template: WHATSAPP_TEMPLATES.questionnaireReminder,
    bodyParams: [greetingName(data), data.displayDate, data.displayTime],
    buttons: [{ index: 0, text: data.appointmentId }],
  };
}

// consultation_meet_link: {{1}} first name, {{2}} date, {{3}} time. Button 0 ends in the Meet code.
export function meetLinkReadyMessage(data: BookingMessageData, code: string): WhatsAppMessage {
  return {
    template: WHATSAPP_TEMPLATES.meetLinkReady,
    bodyParams: [greetingName(data), data.displayDate, data.displayTime],
    buttons: [{ index: 0, text: code }],
  };
}

// admin_booking_alert: {{1}} name, {{2}} program, {{3}} date, {{4}} time, {{5}} mobile.
// Button 0 ends in the Meet code; button 1 (Today's appointments) is fixed in the template.
export function adminNewBookingMessage(data: BookingMessageData, code: string): WhatsAppMessage {
  return {
    template: WHATSAPP_TEMPLATES.adminNewBooking,
    bodyParams: [data.name, data.service, data.displayDate, data.displayTime, data.phone],
    buttons: [{ index: 0, text: code }],
  };
}
