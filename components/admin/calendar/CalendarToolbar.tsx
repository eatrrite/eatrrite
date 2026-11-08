"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CALENDAR_VIEWS } from "@/constants/admin/calendar/views";
import type { CalendarView } from "@/types/admin/calendar";

type CalendarToolbarProps = {
  title: string;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function CalendarToolbar({
  title,
  view,
  onViewChange,
  onPrevious,
  onNext,
}: CalendarToolbarProps) {
  return (
    <div className="grid shrink-0 grid-cols-[1fr_auto] items-center gap-x-2 gap-y-3 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
      <div className="col-start-1 row-start-2 flex items-center gap-1 sm:row-start-1">
        <Button
          type="button"
          variant="secondary"
          size="icon"
          aria-label="Previous"
          onClick={onPrevious}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          aria-label="Next"
          onClick={onNext}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <h3 className="col-span-2 truncate text-center font-heading text-base font-bold tracking-tight text-foreground sm:col-span-1 sm:col-start-2 sm:text-lg lg:text-xl">
        {title}
      </h3>

      <div className="col-start-2 row-start-2 inline-flex justify-self-end rounded-lg border border-border bg-muted/40 p-0.5 sm:col-start-3 sm:row-start-1">
        {CALENDAR_VIEWS.map((item) => (
          <Button
            key={item.value}
            type="button"
            size="sm"
            variant={view === item.value ? "default" : "ghost"}
            onClick={() => onViewChange(item.value)}
            className="px-2.5 sm:px-3"
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
