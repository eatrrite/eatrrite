"use server";

import { assertAdmin } from "@/features/auth/services/session";
import { neonAuth } from "@/features/auth/services/neonAuth";
import { toProfile, type ProfileRow } from "@/features/auth/services/profiles";
import type { Profile } from "@/features/auth/types";
import { db } from "@/services/database";
import { attempt, type ActionResult } from "@/utils/actionResult";

export type ProfileInput = { name: string; mobile?: string; address?: string };

const optionalText = (value: string | undefined, max: number) => {
  const text = (value ?? "").trim();
  if (text.length > max) throw new Error(`Keep it under ${max} characters.`);
  return text || null;
};

// Saves the admin's own name, mobile and address. The email is the login and is not changed here
// (it is also the ADMIN_EMAILS key); see docs/requirements.md, Admin profile.
export async function updateProfileAction(input: ProfileInput): Promise<ActionResult<{ profile: Profile }>> {
  return attempt(async () => {
    const admin = await assertAdmin();
    const name = (input.name ?? "").trim();
    if (name.length < 2 || name.length > 80) throw new Error("Enter your full name.");
    const mobile = optionalText(input.mobile, 20);
    if (mobile && !/^\+?[\d\s()-]{7,20}$/.test(mobile)) throw new Error("Enter a valid mobile number.");
    const address = optionalText(input.address, 200);

    const [row] = await db()`
      update er_profiles set name = ${name}, mobile = ${mobile}, address = ${address}
      where id = ${admin.id}
      returning id, name, email, mobile, address`;
    if (!row) throw new Error("Your profile was not found. Sign in again.");
    // Keep the sign-in account's name in step; the profile row stays the source if this fails.
    await neonAuth().updateUser({ name }).catch(() => null);
    return { profile: toProfile(row as ProfileRow) };
  }, "Could not save your profile.");
}
