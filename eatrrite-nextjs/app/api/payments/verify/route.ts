import { env } from "@/config/env";
import { isValidPaymentSignature } from "@/features/appointment/utils/razorpaySignature";
import { fail, ok } from "@/utils/apiResponse";

type VerifyBody = {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

// POST /api/payments/verify → checks the Razorpay checkout signature with the secret key.
// The browser confirms the booking only after this succeeds.
export async function POST(request: Request) {
  const body: VerifyBody = await request.json().catch(() => ({}));
  const orderId = body.razorpay_order_id ?? "";
  const paymentId = body.razorpay_payment_id ?? "";
  const signature = body.razorpay_signature ?? "";
  if (!orderId || !paymentId || !signature) return fail("Payment details are incomplete.");
  if (!isValidPaymentSignature(orderId, paymentId, signature, env.razorpayKeySecret())) {
    return fail("Payment could not be verified.", 400);
  }
  return ok({ verified: true });
}
