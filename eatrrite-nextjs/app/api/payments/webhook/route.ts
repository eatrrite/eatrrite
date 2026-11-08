import { after } from "next/server";
import { env } from "@/config/env";
import { sendQuestionnaireEmail } from "@/features/appointment/services/bookingEmails";
import { confirmBooking, holdForOrder } from "@/features/appointment/services/bookingDb";
import { isValidWebhookSignature } from "@/features/appointment/utils/razorpaySignature";
import { fail, ok } from "@/utils/apiResponse";

type PaymentEvent = { event?: string; payload?: { payment?: { entity?: { id?: string; order_id?: string } } } };

// POST /api/payments/webhook ← Razorpay (events payment.captured and order.paid).
// Records a paid booking even when the customer closed the tab before the page confirmed it.
// Safe to receive more than once, and after the page already confirmed: payment_id is unique.
export async function POST(request: Request) {
  const secret = env.razorpayWebhookSecret();
  if (!secret) return fail("Webhook is not set up.", 503);
  const body = await request.text();
  if (!isValidWebhookSignature(body, request.headers.get("x-razorpay-signature") ?? "", secret)) {
    return fail("Invalid signature.", 400);
  }

  const event = JSON.parse(body) as PaymentEvent;
  const payment = event.payload?.payment?.entity;
  if (!payment?.id || !payment.order_id) return ok({ ignored: event.event ?? "unknown" });

  const hold = await holdForOrder(payment.order_id);
  // No hold left: the page already confirmed this payment and removed it.
  if (!hold) return ok({ ignored: "no-hold" });

  const outcome = await confirmBooking(hold.booking, hold.id, payment.id);
  if (!outcome.ok) {
    console.error("Webhook could not confirm booking", payment.id, outcome.error);
    return ok({ saved: false });
  }
  if (outcome.created) after(() => sendQuestionnaireEmail(outcome.appointmentId));
  return ok({ saved: true });
}
