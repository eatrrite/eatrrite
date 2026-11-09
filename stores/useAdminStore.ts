"use client";

import { create } from "zustand";
import { savePreferencesAction } from "@/features/admin/services/adminActions";
import { updateProfileAction, type ProfileInput } from "@/features/admin/services/profileActions";
import type { AdminData } from "@/features/admin/types";
import { createAppointmentSlotActions } from "@/features/appointment/stores/appointmentSlotActions";
import { DEFAULT_BOOKING_SETTINGS } from "@/features/appointment/constants/appointment-settings";
import type { QuestionnaireQuestion } from "@/features/appointment/types/questionnaire";
import type { BookingSettings, OccupiedSlot } from "@/features/appointment/types/slots";
import type { Profile } from "@/features/auth/types";
import { DEFAULT_ADMIN_SETTINGS } from "@/constants/admin/settings";
import { createEntityActions } from "@/stores/adminEntityActions";
import { createHiddenSlotActions } from "@/stores/hiddenSlotActions";
import { createTodoActions } from "@/stores/todoActions";
import { saveOrRevert, type SaveNotice } from "@/stores/saveOrRevert";
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
  hiddenSlots: OccupiedSlot[];
  hydrate: (data: AdminData) => void;
  getLead: (id: string) => Lead | undefined;
  addLead: (input: LeadInput, notice: SaveNotice) => Lead;
  updateLead: (id: string, input: LeadInput, notice: SaveNotice) => void;
  deleteLead: (id: string, notice: SaveNotice) => void;
  deleteAppointment: (id: string, notice: SaveNotice) => void;
  deleteLeads: (ids: string[], notice: SaveNotice) => void;
  deleteAppointments: (ids: string[], notice: SaveNotice) => void;
  completeAppointments: (ids: string[], notice: SaveNotice) => void;
  slotsFor: (date: string, ignoreId?: string) => string[];
  saveAppointment: (input: AppointmentInput, id?: string) => Promise<ActionResult>;
  setDayOpen: (day: Weekday, isOpen: boolean) => void;
  addDaySlot: (day: Weekday) => void;
  updateDaySlot: (day: Weekday, slotId: string, patch: Partial<Omit<ScheduleTimeSlot, "id">>) => void;
  removeDaySlot: (day: Weekday, slotId: string) => void;
  addTodo: (input: TodoInput) => Todo;
  updateTodo: (id: string, input: TodoInput) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setSetting: (key: AdminSettingsKey, value: boolean, notice: SaveNotice) => void;
  /** Saves the admin's name, mobile and address; the profile updates once Neon confirms. */
  saveProfile: (input: ProfileInput) => Promise<ActionResult>;
  isSlotHidden: (date: string, time: string) => boolean;
  toggleSlotHidden: (date: string, time: string) => void;
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
  hiddenSlots: [],
  hydrate: ({ preferences, ...data }) => set({ ...preferences, ...data }),
  ...createEntityActions(set, get),
  ...createAppointmentSlotActions(set, get),
  ...createScheduleActions(set, get),
  ...createTodoActions(set, get),
  ...createHiddenSlotActions(set, get),
  saveProfile: async (input) => {
    const result = await updateProfileAction(input);
    if (result.ok) set({ profile: result.profile });
    return result;
  },
  setSetting: (key, value, notice) => {
    const before = preferencesOf(get());
    const next = { ...before, [key]: value };
    set(next);
    saveOrRevert(savePreferencesAction(next), () => set(before), notice);
  },
}));
