import type { Appointment, AppointmentInput } from "@/types/admin/appointment";
import type { DaySchedule } from "@/types/admin/schedule";
import { adminSlotError, adminSlotTimes } from "@/features/appointment/utils/appointmentSlots";

type SlotState = {
  days: DaySchedule[];
  appointments: Appointment[];
  addAppointment: (input: AppointmentInput) => Appointment;
  updateAppointment: (id: string, input: AppointmentInput) => void;
};

export type SaveAppointmentResult = { ok: true } | { ok: false; error: string };

// Appointment actions that enforce the booking rules: only working-hour times,
// and no two appointments inside the same blocked span.
export function createAppointmentSlotActions(get: () => SlotState) {
  return {
    slotsFor: (date: string, ignoreId?: string) =>
      adminSlotTimes(date, get().days, get().appointments, ignoreId),
    saveAppointment: (input: AppointmentInput, id?: string): SaveAppointmentResult => {
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
