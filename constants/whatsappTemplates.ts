// WhatsApp message templates, named exactly as created in WhatsApp Manager. Wording, buttons and
// variables: docs/messages.md. A name or language that differs from Meta gives error 132001.
export const WHATSAPP_TEMPLATES = {
  /** Customer, right after payment: booked, fill in the questionnaire. */
  bookingConfirmed: "booking_confirmed",
  /** Customer, while the questionnaire is still empty. */
  questionnaireReminder: "questionnaire_reminder",
  /** Customer, after the questionnaire: the Google Meet link. */
  meetLinkReady: "consultation_meet_link",
  /** Team, after the questionnaire: a new consultation. */
  adminNewBooking: "admin_booking_alert",
  /** Customer, after the contact form. */
  enquiryReceived: "enquiry_received",
  /** Team, after the contact form. */
  adminNewEnquiry: "admin_new_enquiry",
} as const;

/** Every template is created in English, which Meta stores as "en". */
export const WHATSAPP_LANGUAGE = "en";

/** The Graph API version shown on the app's WhatsApp → API Setup page. */
export const WHATSAPP_GRAPH_VERSION = "v25.0";

/** Questionnaire reminder hours (of REMINDER_HOURS) that also go out on WhatsApp; the rest are email only. */
export const WHATSAPP_REMINDER_HOURS = [3, 24];
