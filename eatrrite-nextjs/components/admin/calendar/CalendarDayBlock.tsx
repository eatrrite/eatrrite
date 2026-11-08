"use client";

import { AppointmentStatusBadge } from "@/components/admin/appointments/AppointmentStatusBadge";
import { APPOINTMENT_BLOCK_CLASS } from "@/constants/admin/calendar/blocks";
import type { Appointment } from "@/types/admin/appointment";
import { formatTimeRange } from "@/utils/admin/calendarTime";
import { cn } from "cn";

type CalendarDayBlockProps = {
  appointment: Appointment;
  leadName: string;
  topPx: number;
  heightPx: number;
  onSelect?: () => void;
};

export function CalendarDayBlock({
  appointment,
  leadName,
  topPx,
  heightPx,
  onSelect,
}: CalendarDayBlockProps) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onSelect?.();
      }}
      style={{ top: topPx, height: heightPx }}
      className={cn(
        "absolute inset-x-2 z-[1] flex items-start justify-between gap-3 overflow-hidden rounded-lg border-l-4 px-3 py-2 text-left shadow-xs transition-opacity hover:opacity-90 sm:inset-x-3",
        APPOINTMENT_BLOCK_CLASS[appointment.status],
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-tight">
          {leadName}
        </p>
        <p className="mt-0.5 truncate text-xs opacity-80">{appointment.service}</p>
        <p className="mt-1 truncate text-xs opacity-70">
          {formatTimeRange(appointment.time)}
        </p>
      </div>
      <span className="hidden shrink-0 min-[380px]:inline-flex">
        <AppointmentStatusBadge status={appointment.status} />
      </span>
    </button>
  );
}
