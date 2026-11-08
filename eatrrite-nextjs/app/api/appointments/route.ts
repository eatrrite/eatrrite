import { randomUUID } from "node:crypto";
import { env } from "@/config/env";
import { getServices } from "@/features/appointment/services/bookingConfig";
import { createHold, releaseHold, slotSource } from "@/features/appointment/services/bookingDb";
import { createOrder } from "@/features/appointment/services/razorpay";
import { customerSlotError } from "@/features/appointment/utils/customerSlots";
import { validateBooking } from "@/features/appointment/utils/validateBooking";
import { fail, ok } from "@/utils/apiResponse";

// POST /api/appointments → checks the details and the slot, holds the slot, then creates the
// Razorpay order for the fee in er_settings. No personal details go into the order notes.
export async function POST(request: Request) {
  const input = validateBooking(await request.json().catch(() => ({})), await getServices());
  if (typeof input === "string") return fail(input);

  const source = await slotSource();
  const problem = customerSlotError(input.date, input.time, source);
  if (problem) return fail(problem.message, problem.code === "taken" ? 409 : 400);

  const holdId = await createHold(input.date, input.time, source.settings.holdMinutes);
  try {
    const order = await createOrder(source.settings.feeRupees, `er_${randomUUID().slice(0, 12)}`, { purpose: "consultation" });
    return ok({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: env.razorpayKeyId(),
      holdId,
      holdMinutes: source.settings.holdMinutes,
    });
  } catch (error) {
    console.error("Create order failed", error);
    await releaseHold(holdId);
    return fail("We could not start the payment. Please try again.", 500);
  }
}
