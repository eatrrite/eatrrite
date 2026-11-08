import { after } from "next/server";
import { env } from "@/config/env";
import { sendQuestionnaireEmail } from "@/features/appointment/services/bookingEmails";
import { getServices } from "@/features/appointment/services/bookingConfig";
import { confirmBooking } from "@/features/appointment/services/bookingDb";
import { isValidPaymentSignature } from "@/features/appointment/utils/razorpaySignature";
import { validateBooking } from "@/features/appointment/utils/validateBooking";
import { fail, ok } from "@/utils/apiResponse";

type VerifyBody = {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  holdId?: string;
  booking?: Record<string, unknown>;
};

// POST /api/payments/verify → checks the Razorpay signature with the secret key, then saves the
// lead and the appointment. Calling it twice for one payment returns the same appointment.
export async function POST(request: Request) {
  const body: VerifyBody = await request.json().catch(() => ({}));
  const orderId = body.razorpay_order_id ?? "";
  const paymentId = body.razorpay_payment_id ?? "";
  const signature = body.razorpay_signature ?? "";
  if (!orderId || !paymentId || !signature || !body.holdId) return fail("Payment details are incomplete.");
  if (!isValidPaymentSignature(orderId, paymentId, signature, env.razorpayKeySecret())) {
    return fail("Payment could not be verified.", 400);
  }
  const input = validateBooking(body.booking ?? {}, await getServices());
  if (typeof input === "string") return fail(input);
  try {
    const outcome = await confirmBooking(input, body.holdId, paymentId);
    if (!outcome.ok) return fail(outcome.error, 409);
    if (outcome.created) after(() => sendQuestionnaireEmail(outcome.appointmentId));
    return ok({ appointmentId: outcome.appointmentId });
  } catch (error) {
    console.error("Confirm booking failed", error);
    return fail(`Payment ${paymentId} was received, but we could not save the booking. Please contact us.`, 500);
  }
}
