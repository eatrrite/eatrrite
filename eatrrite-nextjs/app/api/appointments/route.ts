import { randomUUID } from "node:crypto";
import { env } from "@/config/env";
import { createOrder } from "@/features/appointment/services/razorpay";
import { validateBooking } from "@/features/appointment/utils/validateBooking";
import { fail, ok } from "@/utils/apiResponse";

// POST /api/appointments → checks the details and creates a Razorpay test order.
// The slot itself is held in the browser store. No personal details go into the order notes.
export async function POST(request: Request) {
  const input = validateBooking(await request.json().catch(() => ({})));
  if (typeof input === "string") return fail(input);
  try {
    const order = await createOrder(`er_${randomUUID().slice(0, 12)}`, { purpose: "consultation" });
    return ok({ orderId: order.id, amount: order.amount, currency: order.currency, keyId: env.razorpayKeyId() });
  } catch (error) {
    console.error("Create order failed", error);
    return fail("We could not start the payment. Please try again.", 500);
  }
}
