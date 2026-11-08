import type { ClinicAppointmentInput } from "@/types/admin/appointment";
import type { Lead } from "@/types/admin/lead";
import { isAdminQuestionnaireComplete } from "@/utils/admin/leadQuestionnaire";

export function hasAppointmentBasics(input: ClinicAppointmentInput): boolean {
  return Boolean(
    input.leadId &&
      input.date &&
      input.time &&
      input.service.trim() &&
      input.status,
  );
}

export function hasMeetLink(input: ClinicAppointmentInput): boolean {
  return Boolean(input.meetLink?.trim());
}

/** Save is allowed only when basics, questionnaire, and Meet link are ready. */
export function canSaveAppointment(
  input: ClinicAppointmentInput,
  lead: Lead | undefined,
): boolean {
  return (
    hasAppointmentBasics(input) &&
    isAdminQuestionnaireComplete(input.questionnaire, lead) &&
    hasMeetLink(input)
  );
}
