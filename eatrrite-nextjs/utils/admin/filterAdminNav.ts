import { ADMIN_NAV, type AdminNavItem } from "@/constants/admin/admin";

/** Filter sidebar nav items by a free-text query (label or path). */
export function filterAdminNav(query: string): AdminNavItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return ADMIN_NAV.filter(
    (item) =>
      item.label.toLowerCase().includes(q) ||
      item.href.toLowerCase().includes(q),
  );
}
