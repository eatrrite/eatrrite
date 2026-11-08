import type {
  ClinicAppointment,
  ClinicAppointmentInput,
} from "@/types/admin/appointment";
import type { Lead } from "@/types/admin/lead";
import { applyLeadToQuestionnaire } from "@/utils/admin/leadQuestionnaire";

const EMPTY: ClinicAppointmentInput = {
  leadId: "",
  date: "",
  time: "10:00",
  service: "",
  status: "upcoming",
  questionnaire: [],
};

export function appointmentToInput(
  appointment: ClinicAppointment | null | undefined,
  leads: Lead[],
  defaults?: Partial<ClinicAppointmentInput>,
): ClinicAppointmentInput {
  if (appointment) {
    const lead = leads.find((item) => item.id === appointment.leadId);
    return {
      leadId: appointment.leadId,
      date: appointment.date,
      time: appointment.time,
      service: appointment.service,
      status: appointment.status,
      notes: appointment.notes,
      meetLink: appointment.meetLink,
      questionnaire: applyLeadToQuestionnaire(appointment.questionnaire, lead),
    };
  }
  const leadId = defaults?.leadId ?? leads[0]?.id ?? "";
  const lead = leads.find((item) => item.id === leadId);
  return {
    ...EMPTY,
    leadId,
    ...defaults,
    questionnaire: applyLeadToQuestionnaire(
      defaults?.questionnaire ?? [],
      lead,
    ),
  };
}
