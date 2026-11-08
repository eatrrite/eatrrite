"use server";

import { assertAdmin } from "@/features/auth/services/session";
import { db } from "@/services/database";
import { attempt, type ActionResult } from "@/utils/actionResult";

// Bulk changes from the Leads and Appointments lists. Each checks the session, accepts only
// well-formed ids, and runs as one statement, so it all saves or nothing does.
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_IDS = 1000;

function cleanIds(ids: unknown): string[] {
  if (!Array.isArray(ids)) throw new Error("Nothing selected.");
  const unique = [...new Set(ids.filter((id): id is string => typeof id === "string" && UUID.test(id)))];
  if (unique.length === 0) throw new Error("Nothing selected.");
  if (unique.length > MAX_IDS) throw new Error(`Select at most ${MAX_IDS} at a time.`);
  return unique;
}

// The database removes each lead's appointments with it (on delete cascade).
export async function deleteLeadsAction(ids: string[]): Promise<ActionResult> {
  return attempt(async () => {
    await assertAdmin();
    await db()`delete from er_leads where id = any(${cleanIds(ids)}::uuid[])`;
    return {};
  }, "Could not delete the leads.");
}

export async function deleteAppointmentsAction(ids: string[]): Promise<ActionResult> {
  return attempt(async () => {
    await assertAdmin();
    await db()`delete from er_appointments where id = any(${cleanIds(ids)}::uuid[])`;
    return {};
  }, "Could not delete the appointments.");
}

// Cancelled appointments stay cancelled: their slot may already be booked by someone else.
export async function completeAppointmentsAction(ids: string[]): Promise<ActionResult> {
  return attempt(async () => {
    await assertAdmin();
    await db()`
      update er_appointments set status = 'completed'
      where id = any(${cleanIds(ids)}::uuid[]) and status in ('upcoming', 'not-attended')`;
    return {};
  }, "Could not update the appointments.");
}
