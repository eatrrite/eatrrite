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

/** Save is allowed only when basics, questionnaire, and Meet link are ready. */
export function canSaveAppointment(
  input: AppointmentInput,
  lead: Lead | undefined,
  questions: QuestionnaireQuestion[],
): boolean {
  return (
    hasAppointmentBasics(input) &&
    isAdminQuestionnaireComplete(input.questionnaire, lead, questions) &&
    hasMeetLink(input)
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
