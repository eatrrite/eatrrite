"use server";

import { after } from "next/server";
import { sendAdminBookingEmail, sendMeetLinkEmail } from "@/features/appointment/services/bookingEmails";
import { sendAdminBookingWhatsApp, sendMeetLinkWhatsApp } from "@/features/appointment/services/bookingWhatsApp";
import { saveQuestionnaire, type QuestionnaireInput } from "@/features/appointment/services/questionnaireDb";
import { attempt, type ActionResult } from "@/utils/actionResult";

// The customer submits the questionnaire on the confirmation page. On the first save, the Meet
// link goes to the customer and the booking to the team, by email and WhatsApp, after the page
// has its answer. Each message has its own line, so one failing never stops another.
export async function submitQuestionnaireAction(appointmentId: string, input: QuestionnaireInput): Promise<ActionResult<{ meetLink: string }>> {
  const result = await attempt(() => saveQuestionnaire(appointmentId, input), "Could not save your answers. Please try again.");
  if (!result.ok) return result;
  if (!result.firstSubmit) return { ok: true, meetLink: result.meetLink };
  after(() => sendMeetLinkEmail(appointmentId));
  after(() => sendMeetLinkWhatsApp(appointmentId));
  after(() => sendAdminBookingEmail(appointmentId));
  after(() => sendAdminBookingWhatsApp(appointmentId));
  return { ok: true, meetLink: result.meetLink };
}
