import { env } from "@/config/env";
import { findIdByOrder } from "@/features/appointment/services/appointmentReads";
import { confirmPayment } from "@/features/appointment/services/appointmentWrites";
import { fail, ok } from "@/utils/apiResponse";
import { isValidPaymentSignature } from "@/features/appointment/utils/razorpaySignature";

type VerifyBody = {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

// POST /api/payments/verify → checks the checkout signature, then confirms the
// booking. Safe to call twice: a booking already confirmed returns its id.
export async function POST(request: Request) {
  const body: VerifyBody = await request.json().catch(() => ({}));
  const orderId = body.razorpay_order_id ?? "";
  const paymentId = body.razorpay_payment_id ?? "";
  const signature = body.razorpay_signature ?? "";
  if (!orderId || !paymentId || !signature) return fail("Payment details are incomplete.");
  if (!isValidPaymentSignature(orderId, paymentId, signature, env.razorpayKeySecret())) {
    return fail("Payment could not be verified.", 400);
  }
  try {
    const appointmentId = (await confirmPayment(orderId, paymentId)) ?? (await findIdByOrder(orderId));
    if (!appointmentId) return fail("Booking not found for this payment.", 404);
    return ok({ appointmentId });
  } catch (error) {
    console.error("Verify payment failed", error);
    return fail("Payment received, but we could not confirm the booking. Please contact us.", 500);
  }
}
