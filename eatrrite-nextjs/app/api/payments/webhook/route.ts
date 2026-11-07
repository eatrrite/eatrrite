import { env } from "@/config/env";
import { confirmPayment } from "@/services/appointmentWrites";
import { fail, ok } from "@/utils/apiResponse";
import { isValidWebhookSignature } from "@/utils/razorpaySignature";

// POST /api/payments/webhook → Razorpay "payment.captured" event.
// Confirms the booking even if the customer closed the browser before the
// checkout handler ran. Add the URL and secret in the Razorpay dashboard.
export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";
  if (!isValidWebhookSignature(body, signature, env.razorpayWebhookSecret())) {
    return fail("Invalid signature.", 401);
  }
  const event = JSON.parse(body);
  if (event.event !== "payment.captured") return ok({ ignored: true });
  const payment = event.payload.payment.entity;
  await confirmPayment(payment.order_id, payment.id);
  return ok({ received: true });
}
