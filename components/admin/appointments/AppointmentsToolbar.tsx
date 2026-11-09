"use client";

import { Search } from "lucide-react";
import { APPOINTMENT_DATE_FILTER_OPTIONS } from "@/constants/admin/appointments/dateFilters";
import { APPOINTMENT_PAYMENT_FILTER_OPTIONS, APPOINTMENT_SORT_OPTIONS, APPOINTMENT_STATUS_FILTER_OPTIONS } from "@/constants/admin/appointments/statuses";
import { FilterSelect } from "@/components/admin/forms/FilterSelect";
import { DateFilter } from "@/components/shared/DateFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useShowToast } from "@/hooks/useShowToast";
import type { AppointmentListFilters } from "@/types/admin/appointment";
import { notifyFilterApplied } from "@/utils/admin/filterToast";

type AppointmentsToolbarProps = {
  filters: AppointmentListFilters;
  onChange: (next: AppointmentListFilters) => void;
};

export function AppointmentsToolbar({
  filters,
  onChange,
}: AppointmentsToolbarProps) {
  const showToast = useShowToast();
  const statusLabel =
    APPOINTMENT_STATUS_FILTER_OPTIONS.find((o) => o.value === filters.status)
      ?.label ?? "All statuses";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <label className="relative w-full min-w-0 sm:mr-auto sm:w-auto sm:min-w-52 sm:flex-1 sm:max-w-96">
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
            className="h-9 w-full rounded-full sm:h-8 border border-border bg-card py-1.5 pr-4 pl-9 text-sm shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </label>
        <DateFilter
          label="Appointment date"
          presets={APPOINTMENT_DATE_FILTER_OPTIONS}
          preset={filters.date}
          range={filters.dateRange}
          onPreset={(date) => {
            onChange({ ...filters, date, dateRange: undefined });
            notifyFilterApplied(showToast, "Date filter applied", APPOINTMENT_DATE_FILTER_OPTIONS.find((o) => o.value === date)?.label ?? date);
          }}
          onRange={(dateRange) => {
            onChange({ ...filters, date: "all", dateRange });
            showToast({ title: "Date range applied", description: "Showing appointments on these dates.", type: "success" });
          }}
        />
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
          <SelectTrigger size="sm" className="flex-1 sm:w-auto sm:flex-none min-w-[8.5rem] shrink-0">
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
        <FilterSelect
          label="Payment"
          value={filters.payment}
          options={APPOINTMENT_PAYMENT_FILTER_OPTIONS}
          className="flex-1 sm:w-auto sm:flex-none"
          onChange={(payment) => {
            onChange({ ...filters, payment });
            notifyFilterApplied(showToast, "Payment filter applied", APPOINTMENT_PAYMENT_FILTER_OPTIONS.find((o) => o.value === payment)?.label ?? payment);
          }}
        />
        <FilterSelect
          label="Sort"
          value={filters.sort}
          options={APPOINTMENT_SORT_OPTIONS}
          className="flex-1 sm:w-auto sm:flex-none"
          onChange={(sort) => onChange({ ...filters, sort })}
        />
      </div>
    </div>
  );
}
