import type { AppointmentInput } from "@/types/admin/appointment";
import type { QuestionnaireQuestion } from "@/features/appointment/types/questionnaire";
import type { Lead } from "@/types/admin/lead";
import { isAdminQuestionnaireComplete } from "@/utils/admin/leadQuestionnaire";

export function hasAppointmentBasics(input: AppointmentInput): boolean {
  return Boolean(
    input.leadId &&
      input.date &&
      input.time &&
      input.service.trim() &&
      input.status,
  );
}

export function hasMeetLink(input: AppointmentInput): boolean {
  return Boolean(input.meetLink?.trim());
}

/**
 * A new appointment saves once the booking details are in. The questionnaire is optional (the
 * lead fills it from the link, which also creates the Meet link); a finished one needs the Meet
 * link too, since nothing else would make it.
 */
export function canSaveAppointment(
  input: AppointmentInput,
  lead: Lead | undefined,
  questions: QuestionnaireQuestion[],
): boolean {
  return (
    hasAppointmentBasics(input) &&
    (hasMeetLink(input) || !isAdminQuestionnaireComplete(input.questionnaire, lead, questions))
  );
}

/** Names of the booking fields still empty, for the "what's missing" hint. */
export function missingBasics(input: AppointmentInput): string[] {
  const missing: string[] = [];
  if (!input.leadId) missing.push("lead");
  if (!input.date) missing.push("date");
  if (!input.time) missing.push("time");
  if (!input.service.trim()) missing.push("service");
  return missing;
}
