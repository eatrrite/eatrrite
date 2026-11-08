"use server";

import { assertAdmin } from "@/features/auth/services/session";
import { db } from "@/services/database";
import { attempt, type ActionResult } from "@/utils/actionResult";

// Hides or shows one start time on the website (PHP admin toggle-slot.php).
export async function setSlotHiddenAction(date: string, time: string, hidden: boolean): Promise<ActionResult> {
  return attempt(async () => {
    await assertAdmin();
    if (hidden) await db()`insert into er_hidden_slots (date, time) values (${date}::date, ${time}::time) on conflict do nothing`;
    else await db()`delete from er_hidden_slots where date = ${date}::date and time = ${time}::time`;
    return {};
  }, "Could not change the slot.");
}
