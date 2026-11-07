"use client";

import {
  DASHBOARD_RANGE_OPTIONS,
  DASHBOARD_STATUS_OPTIONS,
} from "@/constants/admin/dashboard/filters";
import { DateRangePicker } from "@/components/admin/forms/DateRangePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useShowToast } from "@/hooks/admin/useShowToast";
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

type Option<T extends string> = { value: T; label: string };

function FilterSelect<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: readonly Option<T>[];
  onChange: (value: T) => void;
}) {
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? value;

  return (
    <Select
      value={value}
      onValueChange={(next) => {
        if (next) onChange(next as T);
      }}
    >
      <SelectTrigger size="sm" className="w-auto min-w-[8.5rem] shrink-0">
        <SelectValue>{selectedLabel}</SelectValue>
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} align="end">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
