import type {
  Appointment,
  AppointmentInput,
} from "@/types/admin/appointment";
import type { Lead } from "@/types/admin/lead";
import { applyLeadToQuestionnaire } from "@/utils/admin/leadQuestionnaire";

const EMPTY: AppointmentInput = {
  leadId: "",
  date: "",
  time: "",
  service: "",
  status: "upcoming",
  // An appointment added here usually holds a slot before the lead pays.
  paymentDone: false,
  questionnaire: [],
};

export function appointmentToInput(
  appointment: Appointment | null | undefined,
  leads: Lead[],
  defaults?: Partial<AppointmentInput>,
): AppointmentInput {
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
      paymentDone: appointment.paymentDone,
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
