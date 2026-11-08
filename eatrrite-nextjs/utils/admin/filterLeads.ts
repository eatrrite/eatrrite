import { matchesAgeFilter, type PatientAgeFilter } from "@/constants/admin/patients/ageFilters";
import type { Patient, PatientStatus } from "@/types/admin/admin";

export type PatientListFilters = {
  query: string;
  age: PatientAgeFilter;
  status: "all" | PatientStatus;
};

export function filterPatients(
  patients: Patient[],
  filters: PatientListFilters,
): Patient[] {
  const query = filters.query.trim().toLowerCase();

  return patients.filter((patient) => {
    if (!matchesAgeFilter(patient.age, filters.age)) return false;
    if (filters.status !== "all" && patient.status !== filters.status) {
      return false;
    }
    if (!query) return true;
    return (
      patient.name.toLowerCase().includes(query) ||
      patient.phone.toLowerCase().includes(query) ||
      (patient.profession?.toLowerCase().includes(query) ?? false)
    );
  });
}
