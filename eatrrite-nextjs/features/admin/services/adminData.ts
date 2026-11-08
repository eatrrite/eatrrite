import "server-only";
import type { AdminData } from "@/features/admin/types";
import { getPreferences, listAppointments, listLeads, listTodos } from "@/features/admin/services/adminQueries";
import { getBookingSettings, getQuestions, getScheduleDays, getServices } from "@/features/appointment/services/bookingConfig";
import type { AdminUser } from "@/features/auth/types";
import { ensureProfile } from "@/features/auth/services/profiles";

// Everything the admin pages need, read from Neon in parallel.
export async function loadAdminData(admin: AdminUser): Promise<AdminData> {
  const [profile, leads, appointments, days, todos, preferences, settings, services, questions] = await Promise.all([
    ensureProfile(admin),
    listLeads(),
    listAppointments(),
    getScheduleDays(),
    listTodos(),
    getPreferences(),
    getBookingSettings(),
    getServices(),
    getQuestions(),
  ]);
  return { profile, leads, appointments, days, todos, preferences, settings, services, questions };
}
