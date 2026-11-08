import { saveAppointmentAction } from "@/features/admin/services/adminActions";
import type { BookingSettings } from "@/features/appointment/types/slots";
import { adminSlotError, adminSlotTimes } from "@/features/appointment/utils/appointmentSlots";
import type { Appointment, AppointmentInput } from "@/types/admin/appointment";
import type { DaySchedule } from "@/types/admin/schedule";
import type { ActionResult } from "@/utils/actionResult";

type SlotState = { days: DaySchedule[]; appointments: Appointment[]; settings: BookingSettings };
type SetState = (partial: Partial<SlotState> | ((state: SlotState) => Partial<SlotState>)) => void;

// Appointment actions that enforce the booking rules: only working-hour times, and no two
// appointments inside the same blocked span. The server checks again against the database.
export function createAppointmentSlotActions(set: SetState, get: () => SlotState) {
  return {
    slotsFor: (date: string, ignoreId?: string) => {
      const { days, appointments, settings } = get();
      return adminSlotTimes(date, days, appointments, settings, ignoreId);
    },
    saveAppointment: async (input: AppointmentInput, id?: string): Promise<ActionResult> => {
      const { days, appointments, settings } = get();
      const original = id ? appointments.find((item) => item.id === id) : undefined;
      const problem = adminSlotError(input, days, appointments, settings, original);
      if (problem) return { ok: false, error: problem };

      const result = await saveAppointmentAction(input, id);
      if (!result.ok) return result;
      set((s) => ({
        appointments: id
          ? s.appointments.map((item) => (item.id === id ? result.appointment : item))
          : [result.appointment, ...s.appointments],
      }));
      return { ok: true };
    },
  };
}
