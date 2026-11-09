import { matchesAgeFilter } from "@/constants/admin/leads/ageFilters";
import type { Lead } from "@/types/admin/lead";
import { parseISO } from "date-fns";
import { adminNow } from "@/constants/admin/dashboard/reference";
import { isInDateRange, matchesDatePreset } from "@/utils/admin/dateRange";
import type { LeadListFilters } from "@/types/admin/lead";

export type { LeadListFilters };

// Newest added first by default, or oldest first.
function sortLeads(items: Lead[], sort: LeadListFilters["sort"]) {
  return [...items].sort((a, b) =>
    sort === "oldest" ? a.createdAt.localeCompare(b.createdAt) : b.createdAt.localeCompare(a.createdAt),
  );
}

export function filterLeads(leads: Lead[], filters: LeadListFilters): Lead[] {
  const query = filters.query.trim().toLowerCase();
  const reference = parseISO(adminNow());

  const shown = leads.filter((lead) => {
    if (!matchesAgeFilter(lead.age, filters.age)) return false;
    if (!matchesDatePreset(lead.createdAt, filters.date, reference)) return false;
    if (!isInDateRange(lead.createdAt, filters.dateRange)) return false;
    if (!query) return true;
    return (
      lead.name.toLowerCase().includes(query) ||
      lead.phone.toLowerCase().includes(query) ||
      (lead.profession?.toLowerCase().includes(query) ?? false)
    );
  });
  return sortLeads(shown, filters.sort);
}
