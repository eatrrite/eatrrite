/** What every booking email and WhatsApp message shows. Dates and times are already formatted for people. */
export type BookingMessageData = {
  appointmentId: string;
  name: string;
  /** Empty when the lead has no email (only possible for leads the admin added). */
  email: string;
  phone: string;
  service: string;
  /** "Tuesday, 10 November 2026" */
  displayDate: string;
  /** "Tue, 10 Nov", for subject lines. */
  shortDate: string;
  /** "11:30 AM" */
  displayTime: string;
  /** Empty until the questionnaire is in. */
  meetLink: string;
  paymentId: string;
  /** The confirmation page, where the questionnaire is filled in. */
  questionnaireUrl: string;
  /** The admin calendar on today's day view. */
  adminTodayUrl: string;
};
