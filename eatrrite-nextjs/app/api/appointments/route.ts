import { randomUUID } from "node:crypto";
import { env } from "@/config/env";
import { takenTimes } from "@/services/appointmentReads";
import { createPendingAppointment } from "@/services/appointmentWrites";
import { createOrder } from "@/services/razorpay";
import type { BookingInput } from "@/types/appointment/booking";
import { fail, ok } from "@/utils/apiResponse";
import { availableTimes } from "@/utils/slots";
import { validateBooking } from "@/utils/validateBooking";

async function isSlotOpen(input: BookingInput) {
  return availableTimes(input.date, await takenTimes(input.date)).includes(input.time);
}

// POST /api/appointments → holds the slot and creates a Razorpay order.
// No personal details go into the order notes.
export async function POST(request: Request) {
  const input = validateBooking(await request.json().catch(() => ({})));
  if (typeof input === "string") return fail(input);
  try {
    if (!(await isSlotOpen(input))) return fail("That slot was just booked. Please pick another time.", 409);
    const order = await createOrder(`er_${randomUUID().slice(0, 12)}`, { purpose: "consultation" });
    const appointmentId = await createPendingAppointment(input, order.id);
    return ok({
      appointmentId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: env.razorpayKeyId(),
    });
  } catch (error) {
    console.error("Create appointment failed", error);
    return fail("We could not start the payment. Please try again.", 500);
  }
}
