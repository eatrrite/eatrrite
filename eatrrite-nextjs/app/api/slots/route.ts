import type { NextRequest } from "next/server";
import { takenSlots } from "@/features/appointment/services/appointmentReads";
import { fail, ok } from "@/utils/apiResponse";
import { APPOINTMENT_SETTINGS } from "@/features/appointment/constants/appointment-settings";
import { isBookableDate } from "@/features/appointment/utils/bookable";
import { availableTimes } from "@/features/appointment/utils/slots";

// GET /api/slots?date=YYYY-MM-DD → open start times for that day (India time).
export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date") ?? "";
  if (!isBookableDate(date)) {
    return fail(`Please choose a date within the next ${APPOINTMENT_SETTINGS.bookingDaysAhead} days.`);
  }
  try {
    return ok({ times: availableTimes(date, { occupied: await takenSlots(date) }) });
  } catch (error) {
    console.error("Slots failed", error);
    return fail("Unable to load available slots.", 500);
  }
}
