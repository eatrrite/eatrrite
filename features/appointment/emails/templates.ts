import { button, detailsCard, emailLayout, escapeHtml, note, sectionTitle } from "@/features/appointment/emails/layout";

/** What every booking email shows. Date and time are already formatted for people. */
export type BookingEmailData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  /** "Tuesday, 10 November 2026" */
  displayDate: string;
  /** "Tue, 10 Nov", for subject lines. */
  shortDate: string;
  displayTime: string;
  meetLink?: string;
  paymentId?: string;
  questionnaireUrl: string;
};

const slotRows = (data: BookingEmailData): [string, string][] => [
  ["Service", data.service],
  ["Date", data.displayDate],
  ["Time", `${data.displayTime} IST`],
  ["Duration", "30 minutes"],
  ["Where", "Online, on Google Meet"],
];

const when = (data: BookingEmailData) => `${data.shortDate}, ${data.displayTime} IST`;
const firstName = (name: string) => escapeHtml(name.trim().split(/\s+/)[0] || name);
const RESCHEDULE = "Need a different time? Reply to this email or WhatsApp us on +91 96398 77483.";

// 1. Right after payment. The one job: fill in the questionnaire, which unlocks the Meet link.
export const customerQuestionnaireEmail = (data: BookingEmailData) => ({
  subject: `Booking confirmed for ${when(data)}: one step left`,
  html: emailLayout({
    preheader: "Fill in a 5-minute questionnaire to receive your Google Meet link.",
    eyebrow: "Payment received",
    heading: "Your consultation is booked",
    intro: `Hi ${firstName(data.name)}, thank you for booking with Eat Rrite. Your slot is reserved. <strong>One step is left:</strong> fill in a short questionnaire so Mukta can prepare for your call. Your Google Meet link is emailed to you as soon as you submit it.`,
    body:
      button(data.questionnaireUrl, "Fill in the questionnaire") +
      sectionTitle("Your booking") +
      detailsCard(slotRows(data)) +
      note(`The questionnaire takes about 5 minutes. ${RESCHEDULE}`),
  }),
});

// 2. Sent by the reminder job while the questionnaire is still empty.
export const customerReminderEmail = (data: BookingEmailData) => ({
  subject: `Reminder: your questionnaire for ${when(data)}`,
  html: emailLayout({
    preheader: "Your slot is reserved. Submit the questionnaire to get your Google Meet link.",
    eyebrow: "Friendly reminder",
    heading: "Your questionnaire is still pending",
    intro: `Hi ${firstName(data.name)}, your consultation is reserved, but we have not received your questionnaire yet. Once you submit it, your Google Meet link is emailed to you straight away.`,
    body:
      button(data.questionnaireUrl, "Fill in the questionnaire") +
      sectionTitle("Your booking") +
      detailsCard(slotRows(data)) +
      note("These reminders stop as soon as you submit the questionnaire."),
  }),
});

// 3. After the questionnaire: the Meet link, first, then the booking.
export const customerMeetEmail = (data: BookingEmailData) => ({
  subject: `Your Google Meet link for ${when(data)}`,
  html: emailLayout({
    preheader: `Join on ${data.displayDate} at ${data.displayTime} IST. Keep this email handy.`,
    eyebrow: "Questionnaire received",
    heading: "Your Google Meet link is ready",
    intro: `Hi ${firstName(data.name)}, thank you for completing the questionnaire. Mukta will go through your answers before you meet. Use the button below to join at your booked time.`,
    body:
      button(data.meetLink ?? "", "Join Google Meet") +
      sectionTitle("Your consultation") +
      detailsCard(slotRows(data)) +
      note(`Join a couple of minutes early from a quiet place, with any recent reports nearby. ${RESCHEDULE}`),
  }),
});

// Tells the team a client finished the questionnaire. No health answers here: they stay in the admin.
export const adminBookingEmail = (data: BookingEmailData) => ({
  subject: `New consultation: ${data.name}, ${when(data)}`,
  html: emailLayout({
    preheader: `${data.name} · ${data.displayDate} at ${data.displayTime} IST`,
    eyebrow: "New paid consultation",
    heading: `${data.name} is ready to meet`,
    intro: "A client has paid and completed the questionnaire. Their answers are in the admin.",
    signOff: false,
    body:
      (data.meetLink ? button(data.meetLink, "Open Google Meet") : "") +
      sectionTitle("Booking") +
      detailsCard([
        ["Name", data.name],
        ["Email", data.email],
        ["Phone", data.phone],
        ...slotRows(data),
        ...(data.paymentId ? ([["Payment ID", data.paymentId]] as [string, string][]) : []),
      ]),
  }),
});
