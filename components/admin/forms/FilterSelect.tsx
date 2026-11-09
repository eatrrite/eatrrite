"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "cn";

/** `short` is what the closed button shows when the full label is too long for it. */
export type FilterOption<T extends string> = { value: T; label: string; short?: string };

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
  const selected = options.find((option) => option.value === value);
  const selectedLabel = selected?.short ?? selected?.label ?? value;

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
      {/* At least as wide as the button, wider when an option needs it (never under the check). */}
      <SelectContent alignItemWithTrigger={false} align="end" className="w-auto min-w-(--anchor-width)">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
