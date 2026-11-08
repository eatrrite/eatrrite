"use server";

import { after } from "next/server";
import { sendMeetEmails } from "@/features/appointment/services/bookingEmails";
import { saveQuestionnaire, type QuestionnaireInput } from "@/features/appointment/services/questionnaireDb";
import { attempt, type ActionResult } from "@/utils/actionResult";

// The customer submits the questionnaire on the confirmation page. Once saved, the Meet link
// goes to the customer and the booking to the team (after the page has its answer).
export async function submitQuestionnaireAction(appointmentId: string, input: QuestionnaireInput): Promise<ActionResult<{ meetLink: string }>> {
  const result = await attempt(() => saveQuestionnaire(appointmentId, input), "Could not save your answers. Please try again.");
  if (result.ok) after(() => sendMeetEmails(appointmentId));
  return result;
}
