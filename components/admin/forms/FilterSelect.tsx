"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "cn";

export type FilterOption<T extends string> = { value: T; label: string };

// A small dropdown for list filters (dashboard, to-dos). Shows the chosen option's label.
export function FilterSelect<T extends string>({
  value,
  options,
  onChange,
  label,
  className,
}: {
  value: T;
  options: readonly FilterOption<T>[];
  onChange: (value: T) => void;
  /** Accessible name, since the trigger only shows the value. */
  label?: string;
  className?: string;
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
      <SelectTrigger size="sm" aria-label={label} className={cn("w-auto min-w-[8.5rem] shrink-0", className)}>
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
