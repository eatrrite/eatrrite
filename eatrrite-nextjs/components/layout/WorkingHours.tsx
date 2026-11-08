"use client";

import { hoursNote } from "@/features/appointment/utils/hours";
import { scheduleToWeekly } from "@/features/appointment/utils/scheduleWeekly";
import { useAdminStore } from "@/stores/useAdminStore";

// The consultation hours as a sentence, read from the store: when the admin changes the Schedule
// page, the top bar, footer and contact page change with it.
export function WorkingHours() {
  const days = useAdminStore((s) => s.days);
  return <>{hoursNote(scheduleToWeekly(days))}</>;
}
