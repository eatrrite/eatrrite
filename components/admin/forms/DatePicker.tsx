"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  formatDateLabel,
  parseDateValue,
  toDateValue,
} from "@/utils/admin/date";
import { cn } from "cn";

type DatePickerProps = {
  value: string;
  onChange: (next: string) => void;
  disabled?: boolean;
  id?: string;
};

export function DatePicker({
  value,
  onChange,
  disabled,
  id,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const selected = parseDateValue(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        id={id}
        className={cn(
          "flex h-10 w-full cursor-pointer items-center justify-between gap-1.5 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !value && "text-muted-foreground",
        )}
      >
        <span className="truncate">{formatDateLabel(value)}</span>
        <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-2">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(date) => {
            if (!date) return;
            onChange(toDateValue(date));
            setOpen(false);
          }}
          className="rounded-lg bg-transparent p-0"
        />
      </PopoverContent>
    </Popover>
  );
}
