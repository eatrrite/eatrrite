import { BRAND } from "@/constants/brand";
import { emailLayout } from "@/emails/layout";
import { button, detailsCard, note, secondaryButton, sectionTitle, type DetailRow } from "@/emails/parts";
import { escapeHtml } from "@/emails/theme";
import type { BookingMessageData } from "@/features/appointment/types/bookingMessage";
import { firstName } from "@/utils/name";

// Booking emails. Each one has a WhatsApp twin with the same news (docs/messages.md).

const slotRows = (data: BookingMessageData): DetailRow[] => [
  ["Program", data.service],
  ["Date", data.displayDate],
  ["Time", `${data.displayTime} IST`],
  ["Duration", "30 minutes"],
  ["Where", "Online, on Google Meet"],
];

const when = (data: BookingMessageData) => `${data.shortDate}, ${data.displayTime} IST`;
const greeting = (data: BookingMessageData) => `Hi ${escapeHtml(firstName(data.name) || "there")}`;
const RESCHEDULE = `Need a different time? Reply to this email or WhatsApp us on ${BRAND.phone}.`;

// 1. Customer, right after payment. The one job: fill in the questionnaire, which unlocks the Meet link.
export const questionnaireEmail = (data: BookingMessageData) => ({
  subject: `Booking confirmed for ${when(data)}: one step left`,
  html: emailLayout({
    preheader: "Fill in a 5-minute questionnaire to receive your Google Meet link.",
    eyebrow: "Payment received",
    heading: "Your consultation is booked",
    intro: `${greeting(data)}, thank you for booking with ${BRAND.name}. Your slot is reserved. <strong>One step is left:</strong> fill in a short questionnaire so ${BRAND.founder} can prepare for your call. Your Google Meet link is sent by email and WhatsApp as soon as you submit it.`,
    body:
      button(data.questionnaireUrl, "Fill in the questionnaire") +
      sectionTitle("Your booking") +
      detailsCard(slotRows(data)) +
      note(`The questionnaire takes about 5 minutes. ${RESCHEDULE}`),
  }),
});

// 2. Customer, from the reminder job while the questionnaire is still empty.
export const reminderEmail = (data: BookingMessageData) => ({
  subject: `Reminder: your questionnaire for ${when(data)}`,
  html: emailLayout({
    preheader: "Your slot is reserved. Submit the questionnaire to get your Google Meet link.",
    eyebrow: "Friendly reminder",
    heading: "Your questionnaire is still pending",
    intro: `${greeting(data)}, your consultation is reserved, but we have not received your questionnaire yet. Once you submit it, your Google Meet link is sent by email and WhatsApp straight away.`,
    body:
      button(data.questionnaireUrl, "Fill in the questionnaire") +
      sectionTitle("Your booking") +
      detailsCard(slotRows(data)) +
      note("These reminders stop as soon as you submit the questionnaire."),
  }),
});

// 3. Customer, after the questionnaire: the Meet link first, then the booking.
export const meetLinkEmail = (data: BookingMessageData) => ({
  subject: `Your Google Meet link for ${when(data)}`,
  html: emailLayout({
    preheader: `Join on ${data.displayDate} at ${data.displayTime} IST. Keep this email handy.`,
    eyebrow: "Questionnaire received",
    heading: "Your Google Meet link is ready",
    intro: `${greeting(data)}, thank you for completing the questionnaire. ${BRAND.founder} will go through your answers before you meet. Use the button below to join at your booked time.`,
    body:
      button(data.meetLink, "Join Google Meet") +
      sectionTitle("Your consultation") +
      detailsCard(slotRows(data)) +
      note(`Join a couple of minutes early from a quiet place, with any recent reports nearby. ${RESCHEDULE}`),
  }),
});

// 4. Team, after the questionnaire. No health answers here: they stay in the admin.
export const adminBookingEmail = (data: BookingMessageData) => {
  const paymentRow: DetailRow[] = data.paymentId ? [["Payment ID", data.paymentId]] : [];
  return {
    subject: `New consultation: ${data.name}, ${when(data)}`,
    html: emailLayout({
      preheader: `${data.name} · ${data.displayDate} at ${data.displayTime} IST`,
      eyebrow: "New paid consultation",
      heading: `${data.name} is ready to meet`,
      intro: "A client has paid and completed the questionnaire. Their answers are in the admin.",
      signOff: false,
      footerNote: "Sent to the team from the website booking flow.",
      body:
        button(data.meetLink, "Join Google Meet") +
        secondaryButton(data.adminTodayUrl, "Today's appointments") +
        sectionTitle("Booking") +
        detailsCard([["Name", data.name], ["Email", data.email || "Not given"], ["Mobile", data.phone], ...slotRows(data), ...paymentRow]),
    }),
  };
};
