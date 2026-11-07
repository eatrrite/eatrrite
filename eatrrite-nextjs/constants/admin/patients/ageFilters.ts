export type PatientAgeFilter = "all" | "under18" | "18-30" | "31-45" | "46plus";

export const PATIENT_AGE_FILTER_OPTIONS: {
  value: PatientAgeFilter;
  label: string;
}[] = [
  { value: "all", label: "All ages" },
  { value: "under18", label: "Under 18" },
  { value: "18-30", label: "18 – 30" },
  { value: "31-45", label: "31 – 45" },
  { value: "46plus", label: "46+" },
];

export function matchesAgeFilter(
  age: number,
  filter: PatientAgeFilter,
): boolean {
  if (filter === "all") return true;
  if (filter === "under18") return age < 18;
  if (filter === "18-30") return age >= 18 && age <= 30;
  if (filter === "31-45") return age >= 31 && age <= 45;
  return age >= 46;
}
