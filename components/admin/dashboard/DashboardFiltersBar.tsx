"use client";

import {
  DASHBOARD_RANGE_OPTIONS,
  DASHBOARD_STATUS_OPTIONS,
} from "@/constants/admin/dashboard/filters";
import { DateRangePicker } from "@/components/admin/forms/DateRangePicker";
import { FilterSelect } from "@/components/admin/forms/FilterSelect";
import { useShowToast } from "@/hooks/useShowToast";
import type { DashboardFilters } from "@/types/admin/dashboard";
import { notifyFilterApplied } from "@/utils/admin/filterToast";

type DashboardFiltersBarProps = {
  filters: DashboardFilters;
  onChange: (next: DashboardFilters) => void;
};

export function DashboardFiltersBar({
  filters,
  onChange,
}: DashboardFiltersBarProps) {
  const showToast = useShowToast();

  return (
    <div className="flex max-w-full shrink-0 items-center gap-2 overflow-x-auto">
      <FilterSelect
        value={filters.status}
        options={DASHBOARD_STATUS_OPTIONS}
        onChange={(status) => {
          onChange({ ...filters, status });
          notifyFilterApplied(
            showToast,
            "Status filter applied",
            DASHBOARD_STATUS_OPTIONS.find((o) => o.value === status)?.label ??
              status,
          );
        }}
      />
      <FilterSelect
        value={filters.range}
        options={DASHBOARD_RANGE_OPTIONS}
        onChange={(range) => {
          onChange({ ...filters, range, dateRange: undefined });
          notifyFilterApplied(
            showToast,
            "Time filter applied",
            DASHBOARD_RANGE_OPTIONS.find((o) => o.value === range)?.label ??
              range,
          );
        }}
      />
      <DateRangePicker
        value={filters.dateRange}
        onChange={(dateRange) => {
          onChange({ ...filters, dateRange });
          showToast({
            title: dateRange?.from ? "Date range applied" : "Date range cleared",
            description: dateRange?.from
              ? "Dashboard stats now use the selected dates."
              : "Dashboard stats use the time filter again.",
            type: "success",
          });
        }}
      />
    </div>
  );
}
