import type { Appointment, AppointmentInput, Patient } from "@/types/admin/admin";

const EMPTY: AppointmentInput = {
  patientId: "",
  date: "",
  time: "10:00",
  reason: "",
  status: "upcoming",
};

export function appointmentToInput(
  appointment: Appointment | null | undefined,
  patients: Patient[],
  defaults?: Partial<AppointmentInput>,
): AppointmentInput {
  if (appointment) {
    return {
      patientId: appointment.patientId,
      date: appointment.date,
      time: appointment.time,
      reason: appointment.reason,
      status: appointment.status,
      notes: appointment.notes,
    };
  }
  return {
    ...EMPTY,
    patientId: patients[0]?.id ?? "",
    ...defaults,
  };
}
