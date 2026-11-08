import type { Profile } from "@/features/auth/types";
import type { QuestionnaireQuestion } from "@/features/appointment/types/questionnaire";
import type { BookingSettings, OccupiedSlot } from "@/features/appointment/types/slots";
import type { Appointment } from "@/types/admin/appointment";
import type { Lead } from "@/types/admin/lead";
import type { DaySchedule } from "@/types/admin/schedule";
import type { AdminSettings } from "@/types/admin/settings";
import type { Todo } from "@/types/admin/todo";

/** Everything the admin pages show, loaded from Neon once per page load. */
export type AdminData = {
  profile: Profile;
  leads: Lead[];
  appointments: Appointment[];
  days: DaySchedule[];
  todos: Todo[];
  preferences: AdminSettings;
  settings: BookingSettings;
  services: string[];
  questions: QuestionnaireQuestion[];
  /** Start times hidden from the website, today on. */
  hiddenSlots: OccupiedSlot[];
};
