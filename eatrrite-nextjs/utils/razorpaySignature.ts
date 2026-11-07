import { createHmac, timingSafeEqual } from "node:crypto";

function hmacMatches(payload: string, secret: string, signature: string): boolean {
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Checkout success: signature = HMAC_SHA256(order_id + "|" + payment_id, key_secret).
export function isValidPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  return hmacMatches(`${orderId}|${paymentId}`, secret, signature);
}

// Webhook: signature = HMAC_SHA256(raw request body, webhook_secret).
export function isValidWebhookSignature(body: string, signature: string, secret: string): boolean {
  return hmacMatches(body, secret, signature);
}
