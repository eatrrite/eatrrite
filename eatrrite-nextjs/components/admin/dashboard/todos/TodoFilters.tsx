"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { FilterSelect } from "@/components/admin/forms/FilterSelect";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDateLabel, parseDateValue, toDateValue } from "@/utils/admin/date";
import { TODO_DAY_OPTIONS, TODO_STATUS_OPTIONS, type TodoFilters as Filters } from "@/utils/admin/filterTodos";

type TodoFiltersProps = { filters: Filters; onChange: (next: Filters) => void };

// Day (today, yesterday, a picked date or all) and status (pending or completed).
// "Pick a date…" opens a single-date calendar; the chosen date stays on a button to change it.
export function TodoFilters({ filters, onChange }: TodoFiltersProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterSelect
        label="Day"
        value={filters.day}
        options={TODO_DAY_OPTIONS}
        onChange={(day) => {
          onChange({ ...filters, day });
          if (day === "date") setCalendarOpen(true);
        }}
      />
      {filters.day === "date" ? (
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-input bg-background px-2.5 text-sm text-foreground">
            <CalendarDays className="size-3.5 text-muted-foreground" />
            {formatDateLabel(filters.date)}
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-2">
            <Calendar
              mode="single"
              selected={parseDateValue(filters.date)}
              onSelect={(date) => {
                if (!date) return;
                onChange({ ...filters, date: toDateValue(date) });
                setCalendarOpen(false);
              }}
              className="rounded-lg bg-transparent p-0"
            />
          </PopoverContent>
        </Popover>
      ) : null}
      <FilterSelect
        label="Status"
        value={filters.status}
        options={TODO_STATUS_OPTIONS}
        onChange={(status) => onChange({ ...filters, status })}
      />
    </div>
  );
}
