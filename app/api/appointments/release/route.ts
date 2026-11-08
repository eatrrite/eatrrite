import { releaseHold } from "@/features/appointment/services/bookingDb";
import { fail, ok } from "@/utils/apiResponse";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// POST /api/appointments/release → frees a held slot when the customer closes or fails the payment.
export async function POST(request: Request) {
  const { holdId } = await request.json().catch(() => ({}));
  if (typeof holdId !== "string" || !UUID.test(holdId)) return fail("Unknown hold.");
  await releaseHold(holdId);
  return ok({ released: true });
}
