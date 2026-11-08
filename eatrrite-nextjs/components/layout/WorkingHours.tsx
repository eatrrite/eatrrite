import { Suspense } from "react";
import { connection } from "next/server";
import { EATRRITE_AVAILABLE_TIMES } from "@/features/appointment/constants/eatrrite-available-times";
import { getWeeklyHours } from "@/features/appointment/services/bookingConfig";
import { hoursNote } from "@/features/appointment/utils/hours";

// The PHP hours, the same as the starting rows in er_schedule_slots. Shown while the database is read.
const STARTING_HOURS = hoursNote(EATRRITE_AVAILABLE_TIMES);

// Read per request (the schedule itself is cached), so a change on the admin Schedule page shows here.
async function HoursFromDatabase() {
  await connection();
  try {
    return hoursNote(await getWeeklyHours());
  } catch (error) {
    console.error("Working hours could not be read", error);
    return STARTING_HOURS;
  }
}

// The consultation hours as a sentence, for the top bar, footer and contact page.
export function WorkingHours() {
  return (
    <Suspense fallback={STARTING_HOURS}>
      <HoursFromDatabase />
    </Suspense>
  );
}
