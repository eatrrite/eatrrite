"use client";

import { Plus, Search } from "lucide-react";
import { APPOINTMENT_DATE_FILTER_OPTIONS } from "@/constants/admin/appointments/dateFilters";
import { APPOINTMENT_STATUS_FILTER_OPTIONS } from "@/constants/admin/appointments/statuses";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useShowToast } from "@/hooks/admin/useShowToast";
import type {
  AppointmentDateFilter,
  AppointmentListFilters,
} from "@/types/admin/appointment";
import { notifyFilterApplied } from "@/utils/admin/filterToast";

type AppointmentsToolbarProps = {
  filters: AppointmentListFilters;
  onChange: (next: AppointmentListFilters) => void;
  onAdd: () => void;
  canAdd: boolean;
};

export function AppointmentsToolbar({
  filters,
  onChange,
  onAdd,
  canAdd,
}: AppointmentsToolbarProps) {
  const showToast = useShowToast();
  const statusLabel =
    APPOINTMENT_STATUS_FILTER_OPTIONS.find((o) => o.value === filters.status)
      ?.label ?? "All statuses";
  const dateLabel =
    APPOINTMENT_DATE_FILTER_OPTIONS.find((o) => o.value === filters.date)
      ?.label ?? "All dates";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <label className="relative min-w-0 flex-1 sm:max-w-64">
          <span className="sr-only">Search appointments</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={filters.query}
            onChange={(e) => onChange({ ...filters, query: e.target.value })}
            onBlur={() => {
              const q = filters.query.trim();
              if (q) notifyFilterApplied(showToast, "Search applied", q);
            }}
            placeholder="Search appointments..."
            className="h-8 w-full rounded-lg border border-input bg-background py-1.5 pr-3 pl-9 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </label>
        <Select
          value={filters.date}
          onValueChange={(value) => {
            if (!value) return;
            const date = value as AppointmentDateFilter;
            onChange({ ...filters, date });
            notifyFilterApplied(
              showToast,
              "Date filter applied",
              APPOINTMENT_DATE_FILTER_OPTIONS.find((o) => o.value === date)
                ?.label ?? date,
            );
          }}
        >
          <SelectTrigger size="sm" className="w-auto min-w-[7.5rem] shrink-0">
            <SelectValue>{dateLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false} align="start">
            {APPOINTMENT_DATE_FILTER_OPTIONS.map((option) => (
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
            const status = value as AppointmentListFilters["status"];
            onChange({ ...filters, status });
            notifyFilterApplied(
              showToast,
              "Status filter applied",
              APPOINTMENT_STATUS_FILTER_OPTIONS.find((o) => o.value === status)
                ?.label ?? status,
            );
          }}
        >
          <SelectTrigger size="sm" className="w-auto min-w-[8.5rem] shrink-0">
            <SelectValue>{statusLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false} align="start">
            {APPOINTMENT_STATUS_FILTER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="button" className="gap-1.5 shrink-0" disabled={!canAdd} onClick={onAdd}>
        <Plus className="size-4" />
        Add appointment
      </Button>
    </div>
  );
}
