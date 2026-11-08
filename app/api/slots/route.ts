import { connection } from "next/server";
import { slotSource } from "@/features/appointment/services/bookingDb";
import { customerAvailability } from "@/features/appointment/utils/customerSlots";
import { fail, ok } from "@/utils/apiResponse";

// GET /api/slots → open start times for every bookable day (India time), from the database.
export async function GET() {
  await connection();
  try {
    return ok({ days: customerAvailability(await slotSource()) });
  } catch (error) {
    console.error("Slots failed", error);
    return fail("Unable to load available slots.", 500);
  }
}
