"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SEED_APPOINTMENTS } from "@/constants/admin/appointments/seed";
import { SEED_LEADS } from "@/constants/admin/leads/seed";
import { SEED_SCHEDULE } from "@/constants/admin/schedule/seed";
import { DEFAULT_ADMIN_SETTINGS } from "@/constants/admin/settings";
import { SEED_TODOS } from "@/constants/admin/todos/seed";
import { createEntityActions } from "@/stores/adminEntityActions";
import { createBookingActions, type ConfirmResult, type HoldResult, type QuestionnaireInput } from "@/features/appointment/stores/bookingActions";
import { createAppointmentSlotActions, type SaveAppointmentResult } from "@/features/appointment/stores/appointmentSlotActions";
import { createScheduleActions } from "@/stores/scheduleActions";
import type {
  Appointment,
  AppointmentInput,
} from "@/types/admin/appointment";
import type { BookingInput, BookingSlot, SlotHold } from "@/features/appointment/types/booking";
import type { Lead, LeadInput } from "@/types/admin/lead";
import type { DaySchedule, ScheduleTimeSlot, Weekday } from "@/types/admin/schedule";
import type { AdminSettings, AdminSettingsKey } from "@/types/admin/settings";
import type { Todo, TodoInput } from "@/types/admin/todo";

const STORE_NAME = "eatrrite-admin-store-v4";

type AdminState = AdminSettings & {
  leads: Lead[];
  appointments: Appointment[];
  days: DaySchedule[];
  holds: SlotHold[];
  todos: Todo[];
  getLead: (id: string) => Lead | undefined;
  addLead: (input: LeadInput) => Lead;
  updateLead: (id: string, input: LeadInput) => void;
  deleteLead: (id: string) => void;
  addAppointment: (input: AppointmentInput) => Appointment;
  updateAppointment: (id: string, input: AppointmentInput) => void;
  deleteAppointment: (id: string) => void;
  holdSlot: (slot: BookingSlot) => HoldResult;
  releaseHold: (holdId: string) => void;
  confirmBooking: (input: BookingInput, holdId: string, paymentId: string) => ConfirmResult;
  submitQuestionnaire: (appointmentId: string, input: QuestionnaireInput) => ConfirmResult;
  slotsFor: (date: string, ignoreId?: string) => string[];
  saveAppointment: (input: AppointmentInput, id?: string) => SaveAppointmentResult;
  setDayOpen: (day: Weekday, isOpen: boolean) => void;
  addDaySlot: (day: Weekday) => void;
  updateDaySlot: (
    day: Weekday,
    slotId: string,
    patch: Partial<Omit<ScheduleTimeSlot, "id">>,
  ) => void;
  removeDaySlot: (day: Weekday, slotId: string) => void;
  addTodo: (input: TodoInput) => Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setSetting: (key: AdminSettingsKey, value: boolean) => void;
};

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_ADMIN_SETTINGS,
      leads: SEED_LEADS,
      appointments: SEED_APPOINTMENTS,
      days: SEED_SCHEDULE,
      holds: [],
      todos: SEED_TODOS,
      ...createEntityActions(set, get),
      ...createAppointmentSlotActions(get),
      ...createBookingActions(set, get),
      ...createScheduleActions(set),
      setSetting: (key, value) => set({ [key]: value }),
    }),
    { name: STORE_NAME },
  ),
);

// Another tab may have booked a slot: pick up its changes.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === STORE_NAME) void useAdminStore.persist.rehydrate();
  });
}
