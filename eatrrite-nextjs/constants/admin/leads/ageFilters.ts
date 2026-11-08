import type { LeadAgeFilter } from "@/types/admin/lead";

export const LEAD_AGE_FILTER_OPTIONS: {
  value: LeadAgeFilter;
  label: string;
}[] = [
  { value: "all", label: "All ages" },
  { value: "under18", label: "Under 18" },
  { value: "18-30", label: "18 – 30" },
  { value: "31-45", label: "31 – 45" },
  { value: "46plus", label: "46+" },
];

// A lead with no age (website bookings) only shows under "All ages".
export function matchesAgeFilter(age: number | undefined, filter: LeadAgeFilter): boolean {
  if (filter === "all") return true;
  if (age === undefined) return false;
  if (filter === "under18") return age < 18;
  if (filter === "18-30") return age >= 18 && age <= 30;
  if (filter === "31-45") return age >= 31 && age <= 45;
  return age >= 46;
}
