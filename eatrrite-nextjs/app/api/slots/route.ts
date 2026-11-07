import type { NextRequest } from "next/server";
import { takenTimes } from "@/services/appointmentReads";
import { fail, ok } from "@/utils/apiResponse";
import { availableTimes, isBookableDate } from "@/utils/slots";

// GET /api/slots?date=YYYY-MM-DD → open start times for that day (India time).
export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date") ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !isBookableDate(date)) {
    return fail("Please choose a date within the next 30 days.");
  }
  try {
    return ok({ times: availableTimes(date, await takenTimes(date)) });
  } catch (error) {
    console.error("Slots failed", error);
    return fail("Unable to load available slots.", 500);
  }
}
