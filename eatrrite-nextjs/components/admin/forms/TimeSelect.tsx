"use client";

import { Clock3 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HALF_HOUR_SLOTS, formatTimeLabel } from "@/utils/admin/time";

type TimeSelectProps = {
  value: string;
  onChange: (next: string) => void;
  disabled?: boolean;
  id?: string;
  placeholder?: string;
};

export function TimeSelect({
  value,
  onChange,
  disabled,
  id,
  placeholder = "Select time",
}: TimeSelectProps) {
  return (
    <Select
      value={value || undefined}
      disabled={disabled}
      onValueChange={(next) => {
        if (next) onChange(next);
      }}
    >
      <SelectTrigger id={id} className="w-full">
        <Clock3 className="size-3.5 text-muted-foreground" />
        <SelectValue placeholder={placeholder}>
          {value ? formatTimeLabel(value) : null}
        </SelectValue>
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} align="start">
        {HALF_HOUR_SLOTS.map((slot) => (
          <SelectItem key={slot} value={slot}>
            {formatTimeLabel(slot)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
