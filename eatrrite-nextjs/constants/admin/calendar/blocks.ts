import type { ClinicAppointmentStatus } from "@/types/admin/appointment";

/** Soft block + left accent strip for week/day appointment chips. */
export const APPOINTMENT_BLOCK_CLASS: Record<ClinicAppointmentStatus, string> = {
  completed: "border-l-accent-green bg-accent-green/10 text-ink",
  upcoming: "border-l-accent bg-accent/15 text-ink",
  "not-attended": "border-l-slot-muted bg-pill text-muted-foreground",
  cancelled: "border-l-alert-text bg-alert-bg text-alert-text",
};
