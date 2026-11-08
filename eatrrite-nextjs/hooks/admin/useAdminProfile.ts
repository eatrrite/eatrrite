"use client";

import { useAdminStore } from "@/stores/useAdminStore";
import { getInitials } from "@/utils/admin/initials";

// The signed-in admin's profile (er_profiles), with initials for the avatar.
export function useAdminProfile() {
  const profile = useAdminStore((s) => s.profile);
  const name = profile?.name ?? "Admin";
  return { name, email: profile?.email ?? "", mobile: profile?.mobile, address: profile?.address, initials: getInitials(name) };
}
