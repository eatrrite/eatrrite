import type { ClinicAppointmentStatus } from "@/types/admin/appointment";

/** Pastel block + left accent strip for week/day appointment chips. */
export const APPOINTMENT_BLOCK_CLASS: Record<ClinicAppointmentStatus, string> = {
  completed: "border-l-emerald-500 bg-emerald-50 text-emerald-950",
  upcoming: "border-l-sky-500 bg-sky-50 text-sky-950",
  "not-attended": "border-l-zinc-400 bg-zinc-100 text-zinc-800",
  cancelled: "border-l-red-400 bg-red-50 text-red-950",
};
