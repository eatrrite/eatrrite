"use client";

import { Plus, Search } from "lucide-react";
import { LEAD_AGE_FILTER_OPTIONS } from "@/constants/admin/leads/ageFilters";
import { Button } from "@/components/ui/button";
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
  onAdd: () => void;
};

export function LeadsToolbar({ filters, onChange, onAdd }: LeadsToolbarProps) {
  const showToast = useShowToast();
  const ageLabel =
    LEAD_AGE_FILTER_OPTIONS.find((o) => o.value === filters.age)?.label ??
    "All ages";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <label className="relative w-full min-w-0 sm:w-auto sm:flex-1 sm:max-w-64">
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
            className="h-9 w-full rounded-lg sm:h-8 border border-input bg-background py-1.5 pr-3 pl-9 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
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
      </div>

      <Button type="button" className="gap-1.5 shrink-0" onClick={onAdd}>
        <Plus className="size-4" />
        Add lead
      </Button>
    </div>
  );
}
