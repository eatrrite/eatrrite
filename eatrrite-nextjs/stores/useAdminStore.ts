"use client";

import { create } from "zustand";
import { savePreferencesAction } from "@/features/admin/services/adminActions";
import type { AdminData } from "@/features/admin/types";
import { createAppointmentSlotActions } from "@/features/appointment/stores/appointmentSlotActions";
import { DEFAULT_BOOKING_SETTINGS } from "@/features/appointment/constants/appointment-settings";
import type { QuestionnaireQuestion } from "@/features/appointment/types/questionnaire";
import type { BookingSettings } from "@/features/appointment/types/slots";
import type { Profile } from "@/features/auth/types";
import { DEFAULT_ADMIN_SETTINGS } from "@/constants/admin/settings";
import { createEntityActions } from "@/stores/adminEntityActions";
import { saveOrRevert } from "@/stores/saveOrRevert";
import { createScheduleActions } from "@/stores/scheduleActions";
import type { Appointment, AppointmentInput } from "@/types/admin/appointment";
import type { Lead, LeadInput } from "@/types/admin/lead";
import type { DaySchedule, ScheduleTimeSlot, Weekday } from "@/types/admin/schedule";
import type { AdminSettings, AdminSettingsKey } from "@/types/admin/settings";
import type { Todo, TodoInput } from "@/types/admin/todo";
import type { ActionResult } from "@/utils/actionResult";

// The admin's in-memory copy of the Neon data. The admin layout fills it on every page load
// (hydrate); each action updates it and saves to Neon. Nothing is kept in the browser.
type AdminState = AdminSettings & {
  profile: Profile | null;
  leads: Lead[];
  appointments: Appointment[];
  days: DaySchedule[];
  todos: Todo[];
  settings: BookingSettings;
  services: string[];
  questions: QuestionnaireQuestion[];
  hydrate: (data: AdminData) => void;
  getLead: (id: string) => Lead | undefined;
  addLead: (input: LeadInput) => Lead;
  updateLead: (id: string, input: LeadInput) => void;
  deleteLead: (id: string) => void;
  deleteAppointment: (id: string) => void;
  slotsFor: (date: string, ignoreId?: string) => string[];
  saveAppointment: (input: AppointmentInput, id?: string) => Promise<ActionResult>;
  setDayOpen: (day: Weekday, isOpen: boolean) => void;
  addDaySlot: (day: Weekday) => void;
  updateDaySlot: (day: Weekday, slotId: string, patch: Partial<Omit<ScheduleTimeSlot, "id">>) => void;
  removeDaySlot: (day: Weekday, slotId: string) => void;
  addTodo: (input: TodoInput) => Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setSetting: (key: AdminSettingsKey, value: boolean) => void;
};

const preferencesOf = (state: AdminSettings): AdminSettings => ({
  emailReminders: state.emailReminders,
  smsReminders: state.smsReminders,
  appointmentEmails: state.appointmentEmails,
  marketingEmails: state.marketingEmails,
  desktopNotifications: state.desktopNotifications,
  weeklyDigest: state.weeklyDigest,
});

export const useAdminStore = create<AdminState>()((set, get) => ({
  ...DEFAULT_ADMIN_SETTINGS,
  profile: null,
  leads: [],
  appointments: [],
  days: [],
  todos: [],
  settings: DEFAULT_BOOKING_SETTINGS,
  services: [],
  questions: [],
  hydrate: ({ preferences, ...data }) => set({ ...preferences, ...data }),
  ...createEntityActions(set, get),
  ...createAppointmentSlotActions(set, get),
  ...createScheduleActions(set, get),
  setSetting: (key, value) => {
    const before = preferencesOf(get());
    const next = { ...before, [key]: value };
    set(next);
    saveOrRevert(savePreferencesAction(next), () => set(before));
  },
}));
