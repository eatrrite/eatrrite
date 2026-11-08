"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SEED_APPOINTMENTS } from "@/constants/admin/appointments/seed";
import { SEED_LEADS } from "@/constants/admin/leads/seed";
import { SEED_SCHEDULE } from "@/constants/admin/schedule/seed";
import { DEFAULT_ADMIN_SETTINGS } from "@/constants/admin/settings";
import { SEED_TODOS } from "@/constants/admin/todos/seed";
import { createClinicEntityActions } from "@/stores/adminEntityActions";
import { createScheduleActions } from "@/stores/scheduleActions";
import type {
  ClinicAppointment,
  ClinicAppointmentInput,
} from "@/types/admin/appointment";
import type { Lead, LeadInput } from "@/types/admin/lead";
import type { DaySchedule, ScheduleTimeSlot, Weekday } from "@/types/admin/schedule";
import type { AdminSettings, AdminSettingsKey } from "@/types/admin/settings";
import type { ClinicTodo, TodoInput } from "@/types/admin/todo";

type ClinicState = AdminSettings & {
  leads: Lead[];
  appointments: ClinicAppointment[];
  days: DaySchedule[];
  todos: ClinicTodo[];
  getLead: (id: string) => Lead | undefined;
  addLead: (input: LeadInput) => Lead;
  updateLead: (id: string, input: LeadInput) => void;
  deleteLead: (id: string) => void;
  addAppointment: (input: ClinicAppointmentInput) => ClinicAppointment;
  updateAppointment: (id: string, input: ClinicAppointmentInput) => void;
  deleteAppointment: (id: string) => void;
  setDayOpen: (day: Weekday, isOpen: boolean) => void;
  addDaySlot: (day: Weekday) => void;
  updateDaySlot: (
    day: Weekday,
    slotId: string,
    patch: Partial<Omit<ScheduleTimeSlot, "id">>,
  ) => void;
  removeDaySlot: (day: Weekday, slotId: string) => void;
  addTodo: (input: TodoInput) => ClinicTodo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setSetting: (key: AdminSettingsKey, value: boolean) => void;
};

export const useClinicStore = create<ClinicState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_ADMIN_SETTINGS,
      leads: SEED_LEADS,
      appointments: SEED_APPOINTMENTS,
      days: SEED_SCHEDULE,
      todos: SEED_TODOS,
      ...createClinicEntityActions(set, get),
      ...createScheduleActions(set),
      setSetting: (key, value) => set({ [key]: value }),
    }),
    { name: "eatrrite-admin-store-v4" },
  ),
);
