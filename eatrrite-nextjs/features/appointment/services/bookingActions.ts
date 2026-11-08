"use server";

import { saveQuestionnaire, type QuestionnaireInput } from "@/features/appointment/services/questionnaireDb";
import { attempt, type ActionResult } from "@/utils/actionResult";

// The customer submits the questionnaire on the confirmation page.
export async function submitQuestionnaireAction(appointmentId: string, input: QuestionnaireInput): Promise<ActionResult<{ meetLink: string }>> {
  return attempt(() => saveQuestionnaire(appointmentId, input), "Could not save your answers. Please try again.");
}
