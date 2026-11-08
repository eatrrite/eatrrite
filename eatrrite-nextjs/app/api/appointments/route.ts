import { randomUUID } from "node:crypto";
import { env } from "@/config/env";
import { takenSlots } from "@/features/appointment/services/appointmentReads";
import { createPendingAppointment } from "@/features/appointment/services/appointmentWrites";
import { createOrder } from "@/features/appointment/services/razorpay";
import type { BookingInput } from "@/features/appointment/types/booking";
import { fail, ok } from "@/utils/apiResponse";
import { bookingError } from "@/features/appointment/utils/bookable";
import { validateBooking } from "@/features/appointment/utils/validateBooking";

async function slotError(input: BookingInput) {
  return bookingError(input.date, input.time, { occupied: await takenSlots(input.date) });
}

// POST /api/appointments → holds the slot and creates a Razorpay order.
// No personal details go into the order notes.
export async function POST(request: Request) {
  const input = validateBooking(await request.json().catch(() => ({})));
  if (typeof input === "string") return fail(input);
  try {
    const problem = await slotError(input);
    if (problem) return fail(problem.message, problem.code === "taken" ? 409 : 400);
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
