"use client";

import { Plus, Search } from "lucide-react";
import {
  PATIENT_AGE_FILTER_OPTIONS,
  type PatientAgeFilter,
} from "@/constants/admin/patients/ageFilters";
import { PATIENT_STATUS_FILTER_OPTIONS } from "@/constants/admin/patients/statuses";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useShowToast } from "@/hooks/admin/useShowToast";
import { notifyFilterApplied } from "@/utils/admin/filterToast";
import type { PatientListFilters } from "@/utils/admin/filterPatients";

type PatientsToolbarProps = {
  filters: PatientListFilters;
  onChange: (next: PatientListFilters) => void;
  onAdd: () => void;
};

export function PatientsToolbar({
  filters,
  onChange,
  onAdd,
}: PatientsToolbarProps) {
  const showToast = useShowToast();
  const statusLabel =
    PATIENT_STATUS_FILTER_OPTIONS.find((o) => o.value === filters.status)
      ?.label ?? "All statuses";
  const ageLabel =
    PATIENT_AGE_FILTER_OPTIONS.find((o) => o.value === filters.age)?.label ??
    "All ages";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <label className="relative min-w-0 flex-1 sm:max-w-64">
          <span className="sr-only">Search patients</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={filters.query}
            onChange={(event) =>
              onChange({ ...filters, query: event.target.value })
            }
            onBlur={() => {
              const query = filters.query.trim();
              if (query) notifyFilterApplied(showToast, "Search applied", query);
            }}
            placeholder="Search patients..."
            className="h-8 w-full rounded-lg border border-input bg-background py-1.5 pr-3 pl-9 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </label>

        <Select
          value={filters.age}
          onValueChange={(value) => {
            if (!value) return;
            const age = value as PatientAgeFilter;
            onChange({ ...filters, age });
            notifyFilterApplied(
              showToast,
              "Age filter applied",
              PATIENT_AGE_FILTER_OPTIONS.find((o) => o.value === age)?.label ??
                age,
            );
          }}
        >
          <SelectTrigger size="sm" className="w-auto min-w-[7.5rem] shrink-0">
            <SelectValue>{ageLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false} align="start">
            {PATIENT_AGE_FILTER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value) => {
            if (!value) return;
            const status = value as PatientListFilters["status"];
            onChange({ ...filters, status });
            notifyFilterApplied(
              showToast,
              "Status filter applied",
              PATIENT_STATUS_FILTER_OPTIONS.find((o) => o.value === status)
                ?.label ?? status,
            );
          }}
        >
          <SelectTrigger size="sm" className="w-auto min-w-[8.5rem] shrink-0">
            <SelectValue>{statusLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false} align="start">
            {PATIENT_STATUS_FILTER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="button" className="gap-1.5 shrink-0" onClick={onAdd}>
        <Plus className="size-4" />
        Add patient
      </Button>
    </div>
  );
}
