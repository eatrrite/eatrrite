import "server-only";
import type { AdminUser, Profile } from "@/features/auth/types";
import { db } from "@/services/database";

type ProfileRow = { id: string; name: string; email: string; mobile: string | null; address: string | null };

const toProfile = (row: ProfileRow): Profile => ({
  id: row.id,
  name: row.name,
  email: row.email,
  mobile: row.mobile ?? undefined,
  address: row.address ?? undefined,
});

// Makes the profile row for a user the first time they sign in, and returns it. Never overwrites
// an existing one. One statement, so one trip to Neon: the new row if it was just made, else the
// existing row.
export async function ensureProfile(user: AdminUser): Promise<Profile> {
  const rows = await db()`
    with made as (
      insert into er_profiles (id, name, email)
      values (${user.id}, ${user.name || user.email}, ${user.email})
      on conflict (id) do nothing
      returning id, name, email, mobile, address
    )
    select * from made
    union all
    select id, name, email, mobile, address from er_profiles
    where id = ${user.id} and not exists (select 1 from made)`;
  return toProfile(rows[0] as ProfileRow);
}

export async function getProfile(id: string): Promise<Profile | null> {
  const rows = await db()`select id, name, email, mobile, address from er_profiles where id = ${id}`;
  return rows[0] ? toProfile(rows[0] as ProfileRow) : null;
}
