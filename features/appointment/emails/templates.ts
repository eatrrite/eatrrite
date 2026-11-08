import { button, detailsCard, emailLayout, escapeHtml, note } from "@/features/appointment/emails/layout";

/** What every booking email shows. Date and time are already formatted for people. */
export type BookingEmailData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  displayDate: string;
  displayTime: string;
  meetLink?: string;
  paymentId?: string;
  questionnaireUrl: string;
};

const slotRows = (data: BookingEmailData): [string, string][] => [
  ["Service", data.service],
  ["Date", data.displayDate],
  ["Time", `${data.displayTime} IST`],
  ["Length", "30 minutes, on Google Meet"],
];

const RESCHEDULE = "Need a different time? Reply to this email or WhatsApp us on +91 96398 77483.";

// Sent right after payment: the slot is held, the questionnaire unlocks the Meet link.
export const customerQuestionnaireEmail = (data: BookingEmailData) => ({
  subject: "Your Eat Rrite consultation is booked",
  html: emailLayout({
    preheader: "One short questionnaire and your Google Meet link is on its way.",
    eyebrow: "Booking confirmed",
    heading: "Your consultation is booked",
    intro: `Hello ${escapeHtml(data.name)}, thank you for booking with Eat Rrite. Your slot is reserved. Fill in the short questionnaire so Mukta can prepare, and your Google Meet link follows straight away.`,
    body:
      detailsCard(slotRows(data)) +
      button(data.questionnaireUrl, "Complete the questionnaire") +
      note(`It takes about 5 minutes. ${RESCHEDULE}`),
  }),
});

// Sent by the reminder job while the questionnaire is still empty.
export const customerReminderEmail = (data: BookingEmailData) => ({
  subject: "Reminder: your Eat Rrite questionnaire",
  html: emailLayout({
    preheader: "Your slot is reserved. The questionnaire unlocks your Google Meet link.",
    eyebrow: "A gentle reminder",
    heading: "One step left before your consultation",
    intro: `Hello ${escapeHtml(data.name)}, your consultation is reserved. We still need your questionnaire before we can send your Google Meet link.`,
    body:
      detailsCard(slotRows(data)) +
      button(data.questionnaireUrl, "Complete the questionnaire") +
      note("These reminders stop as soon as you submit the questionnaire."),
  }),
});

// Sent after the questionnaire: the Meet link.
export const customerMeetEmail = (data: BookingEmailData) => ({
  subject: "Your Google Meet link for Eat Rrite",
  html: emailLayout({
    preheader: `Join on ${data.displayDate} at ${data.displayTime} IST.`,
    eyebrow: "You're all set",
    heading: "Your Google Meet link is ready",
    intro: `Hello ${escapeHtml(data.name)}, thank you for completing the questionnaire. Mukta will go through your answers before you meet. Here are your details and link.`,
    body:
      detailsCard(slotRows(data)) +
      button(data.meetLink ?? "", "Join Google Meet") +
      note(`Join a couple of minutes early from a quiet place, with any recent reports nearby. ${RESCHEDULE}`),
  }),
});

// Tells the team a client finished the questionnaire. No health answers here: they stay in the admin.
export const adminBookingEmail = (data: BookingEmailData) => ({
  subject: `New consultation: ${data.name} · ${data.displayDate}`,
  html: emailLayout({
    preheader: `${data.name} · ${data.displayDate} at ${data.displayTime} IST`,
    eyebrow: "New paid consultation",
    heading: `${data.name} is ready to meet`,
    intro: "A client has paid and completed the questionnaire. Their answers are in the admin.",
    signOff: false,
    body:
      detailsCard([
        ["Name", data.name],
        ["Email", data.email],
        ["Phone", data.phone],
        ...slotRows(data),
        ...(data.paymentId ? ([["Payment ID", data.paymentId]] as [string, string][]) : []),
      ]) + (data.meetLink ? button(data.meetLink, "Open Google Meet") : ""),
  }),
});
