"use client";

import { Search } from "lucide-react";
import { FilterSelect } from "@/components/admin/forms/FilterSelect";
import { APPOINTMENT_DATE_FILTER_OPTIONS } from "@/constants/admin/appointments/dateFilters";
import { LEAD_AGE_FILTER_OPTIONS } from "@/constants/admin/leads/ageFilters";
import { LEAD_SORT_OPTIONS } from "@/constants/admin/leads/sortOptions";
import { DateFilter } from "@/components/shared/DateFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useShowToast } from "@/hooks/useShowToast";
import type { LeadAgeFilter, LeadListFilters } from "@/types/admin/lead";
import { notifyFilterApplied } from "@/utils/admin/filterToast";

type LeadsToolbarProps = {
  filters: LeadListFilters;
  onChange: (next: LeadListFilters) => void;
};

// Search and filters for the Leads list. "Add lead" sits in the page header.
export function LeadsToolbar({ filters, onChange }: LeadsToolbarProps) {
  const showToast = useShowToast();
  const ageLabel =
    LEAD_AGE_FILTER_OPTIONS.find((o) => o.value === filters.age)?.label ??
    "All ages";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <label className="relative w-full min-w-0 sm:mr-auto sm:w-auto sm:min-w-52 sm:flex-1 sm:max-w-96">
          <span className="sr-only">Search leads</span>
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
            placeholder="Search leads..."
            className="h-9 w-full rounded-full sm:h-8 border border-border bg-card py-1.5 pr-4 pl-9 text-sm shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </label>

        <Select
          value={filters.age}
          onValueChange={(value) => {
            if (!value) return;
            const age = value as LeadAgeFilter;
            onChange({ ...filters, age });
            notifyFilterApplied(
              showToast,
              "Age filter applied",
              LEAD_AGE_FILTER_OPTIONS.find((o) => o.value === age)?.label ?? age,
            );
          }}
        >
          <SelectTrigger size="sm" className="flex-1 sm:w-auto sm:flex-none min-w-[7.5rem] shrink-0">
            <SelectValue>{ageLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false} align="start">
            {LEAD_AGE_FILTER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DateFilter
          label="Date added"
          presets={APPOINTMENT_DATE_FILTER_OPTIONS}
          preset={filters.date}
          range={filters.dateRange}
          onPreset={(date) => {
            onChange({ ...filters, date, dateRange: undefined });
            notifyFilterApplied(showToast, "Date filter applied", APPOINTMENT_DATE_FILTER_OPTIONS.find((o) => o.value === date)?.label ?? date);
          }}
          onRange={(dateRange) => {
            onChange({ ...filters, date: "all", dateRange });
            showToast({ title: "Date range applied", description: "Showing leads added on these dates.", type: "success" });
          }}
        />
        <FilterSelect
          label="Sort"
          value={filters.sort}
          options={LEAD_SORT_OPTIONS}
          className="flex-1 sm:w-auto sm:flex-none"
          onChange={(sort) => onChange({ ...filters, sort })}
        />
      </div>
    </div>
  );
}
