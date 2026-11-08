import { timingSafeEqual } from "node:crypto";
import { env } from "@/config/env";
import { runQuestionnaireReminders } from "@/features/appointment/services/questionnaireReminders";
import { fail, ok } from "@/utils/apiResponse";

const matches = (given: string, expected: string) =>
  given.length === expected.length && timingSafeEqual(Buffer.from(given), Buffer.from(expected));

// GET /api/cron/questionnaire-reminders, called every 15 minutes by the host's scheduler with
// "Authorization: Bearer <CRON_SECRET>". Replaces appointment-form/cron/questionnaire-reminders.php.
export async function GET(request: Request) {
  const secret = env.cronSecret();
  const given = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!secret || !matches(given, secret)) return fail("Forbidden", 403);
  try {
    return ok(await runQuestionnaireReminders());
  } catch (error) {
    console.error("Questionnaire reminders failed", error);
    return fail("Reminders failed.", 500);
  }
}
