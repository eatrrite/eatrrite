import { BRAND } from "@/constants/brand";
import type { AdminNavItem } from "@/types/admin/nav";
import { getInitials } from "@/utils/admin/initials";

// Frontend-only gate for the admin preview. Anyone can read this value in the
// browser bundle, so it is replaced by Neon Auth when the database is wired.
export const ADMIN_PASSWORD = "eatrrite@1234";
export const ADMIN_SESSION_KEY = "eatrrite-admin-authorized";

export const ADMIN_USER_PROFILE = {
  name: "Mukta Patil",
  displayName: "Mukta Patil",
  role: "Founder & nutritionist",
  email: BRAND.email,
  phone: BRAND.phone,
  location: "Hyderabad & Dehradun",
  initials: getInitials("Mukta Patil"),
} as const;

export const ADMIN_NAV: AdminNavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", exact: true },
  { href: "/admin/schedule", label: "Schedule" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/appointments", label: "Appointments" },
  { href: "/admin/calendar", label: "Calendar" },
  { href: "/admin/account", label: "Account" },
  { href: "/admin/settings", label: "Settings" },
];
