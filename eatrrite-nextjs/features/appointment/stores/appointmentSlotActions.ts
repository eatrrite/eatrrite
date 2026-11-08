import type { ClinicAppointment, ClinicAppointmentInput } from "@/types/admin/appointment";
import type { DaySchedule } from "@/types/admin/schedule";
import { adminSlotError, adminSlotTimes } from "@/features/appointment/utils/appointmentSlots";

type SlotState = {
  days: DaySchedule[];
  appointments: ClinicAppointment[];
  addAppointment: (input: ClinicAppointmentInput) => ClinicAppointment;
  updateAppointment: (id: string, input: ClinicAppointmentInput) => void;
};

export type SaveAppointmentResult = { ok: true } | { ok: false; error: string };

// Appointment actions that enforce the booking rules: only working-hour times,
// and no two appointments inside the same blocked span.
export function createAppointmentSlotActions(get: () => SlotState) {
  return {
    slotsFor: (date: string, ignoreId?: string) =>
      adminSlotTimes(date, get().days, get().appointments, ignoreId),
    saveAppointment: (input: ClinicAppointmentInput, id?: string): SaveAppointmentResult => {
      const { days, appointments, addAppointment, updateAppointment } = get();
      const original = id ? appointments.find((item) => item.id === id) : undefined;
      const error = adminSlotError(input, days, appointments, original);
      if (error) return { ok: false, error };
      if (id) updateAppointment(id, input);
      else addAppointment(input);
      return { ok: true };
    },
  };
}
