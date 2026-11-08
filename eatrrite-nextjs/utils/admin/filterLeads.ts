import { matchesAgeFilter } from "@/constants/admin/leads/ageFilters";
import type { Lead } from "@/types/admin/lead";
import type { LeadListFilters } from "@/types/admin/lead";

export type { LeadListFilters };

export function filterLeads(leads: Lead[], filters: LeadListFilters): Lead[] {
  const query = filters.query.trim().toLowerCase();

  return leads.filter((lead) => {
    if (!matchesAgeFilter(lead.age, filters.age)) return false;
    if (!query) return true;
    return (
      lead.name.toLowerCase().includes(query) ||
      lead.phone.toLowerCase().includes(query) ||
      (lead.profession?.toLowerCase().includes(query) ?? false)
    );
  });
}
