import { button, detailsBox, emailLayout, escapeHtml, heading, paragraph } from "@/features/appointment/emails/layout";

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
];

// email/templates/customer-questionnaire.php: sent right after payment.
export const customerQuestionnaireEmail = (data: BookingEmailData) => ({
  subject: "Complete your Eat Rrite questionnaire",
  html: emailLayout(
    heading("Your appointment is confirmed") +
      paragraph(`Hello ${escapeHtml(data.name)}, thank you for booking with Eat Rrite. Your consultation slot is reserved. Complete the questionnaire to receive your Google Meet link.`) +
      detailsBox(slotRows(data)) +
      paragraph("Please complete your questionnaire to get the Google Meet link for your appointment.", "26px 0 14px") +
      button(data.questionnaireUrl, "Complete questionnaire") +
      paragraph("If you need to reschedule, reply to this email or contact us at +91 96398 77483.", "26px 0 0"),
  ),
});

// email/templates/customer-questionnaire-reminder.php: sent by the reminder job until answered.
export const customerReminderEmail = (data: BookingEmailData) => ({
  subject: "Reminder: complete your Eat Rrite questionnaire",
  html: emailLayout(
    heading("Reminder: complete your questionnaire") +
      paragraph(`Hello ${escapeHtml(data.name)}, your Eat Rrite consultation is reserved. We still need your questionnaire before we can send the Google Meet link.`) +
      detailsBox(slotRows(data)) +
      paragraph("Complete the questionnaire to get your Google Meet link. This reminder stops as soon as you submit the form.", "26px 0 14px") +
      button(data.questionnaireUrl, "Complete questionnaire"),
  ),
});

// email/templates/customer-booking.php: the Meet link, after the questionnaire.
export const customerMeetEmail = (data: BookingEmailData) => ({
  subject: "Your Eat Rrite Google Meet link is ready",
  html: emailLayout(
    heading("Your Google Meet link is ready") +
      paragraph(`Hello ${escapeHtml(data.name)}, thank you for completing the questionnaire. Your consultation details and Google Meet link are below.`) +
      detailsBox(slotRows(data)) +
      paragraph("Please join your consultation using the Google Meet link below at the scheduled time.", "26px 0 14px") +
      button(data.meetLink ?? "", "Join Google Meet") +
      paragraph("If you need to reschedule, reply to this email or contact us at +91 96398 77483. We look forward to supporting your wellness journey.", "26px 0 0"),
  ),
});

// email/templates/admin-booking.php: tells the team a client finished the questionnaire.
export const adminBookingEmail = (data: BookingEmailData) => ({
  subject: `New paid appointment: ${data.name} · ${data.displayDate}`,
  html: emailLayout(
    heading("New paid appointment booked") +
      paragraph("A client has completed the questionnaire. Their consultation and Google Meet link are ready.", "0 0 24px") +
      detailsBox([
        ["Name", data.name],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Service", data.service],
        ["Date", data.displayDate],
        ["Time", data.displayTime],
        ...(data.paymentId ? ([["Payment ID", data.paymentId]] as [string, string][]) : []),
      ]) +
      (data.meetLink ? paragraph("<strong>Google Meet link</strong>", "26px 0 12px") + button(data.meetLink, "Open Google Meet") : ""),
  ),
});
