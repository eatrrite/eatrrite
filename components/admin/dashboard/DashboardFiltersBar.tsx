"use client";

import {
  DASHBOARD_RANGE_OPTIONS,
  DASHBOARD_STATUS_OPTIONS,
} from "@/constants/admin/dashboard/filters";
import { DateRangePicker } from "@/components/shared/DateRangePicker";
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
    <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:max-w-full sm:shrink-0 sm:items-center">
      <FilterSelect
        value={filters.status}
        options={DASHBOARD_STATUS_OPTIONS}
        className="w-full min-w-0 sm:w-auto sm:min-w-[8.5rem]"
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
        className="w-full min-w-0 sm:w-auto sm:min-w-[8.5rem]"
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
        className="col-span-2 sm:col-span-1"
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
