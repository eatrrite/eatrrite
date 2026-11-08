import { env } from "@/config/env";
import { APPOINTMENT_SETTINGS } from "@/features/appointment/constants/appointment-settings";

export type RazorpayOrder = { id: string; amount: number; currency: string };

// Creates an order on Razorpay (server side), as the official guide recommends.
// The amount always comes from the server, never from the browser.
export async function createOrder(receipt: string, notes: Record<string, string>) {
  const auth = Buffer.from(`${env.razorpayKeyId()}:${env.razorpayKeySecret()}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: JSON.stringify({ amount: env.feeRupees() * 100, currency: APPOINTMENT_SETTINGS.currency, receipt, notes }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.description ?? "Razorpay order failed");
  return { id: data.id, amount: data.amount, currency: data.currency } as RazorpayOrder;
}
