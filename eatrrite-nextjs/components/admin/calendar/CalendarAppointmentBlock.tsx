"use client";

import type { Appointment } from "@/types/admin/admin";
import { APPOINTMENT_BLOCK_CLASS } from "@/constants/admin/calendar/blocks";
import { formatTimeRange } from "@/utils/admin/calendarTime";
import { cn } from "cn";

type CalendarAppointmentBlockProps = {
  appointment: Appointment;
  patientName: string;
  topPx: number;
  heightPx: number;
  compact?: boolean;
  onSelect?: () => void;
};

export function CalendarAppointmentBlock({
  appointment,
  patientName,
  topPx,
  heightPx,
  compact = false,
  onSelect,
}: CalendarAppointmentBlockProps) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onSelect?.();
      }}
      style={{ top: topPx, height: heightPx }}
      className={cn(
        "absolute inset-x-0.5 z-[1] overflow-hidden rounded-md border-l-4 px-1.5 py-1 text-left shadow-xs transition-opacity hover:opacity-90",
        APPOINTMENT_BLOCK_CLASS[appointment.status],
      )}
    >
      <p className="truncate text-xs font-semibold leading-tight">
        {patientName}
      </p>
      {!compact ? (
        <>
          <p className="mt-0.5 truncate text-[10px] leading-tight opacity-80">
            {formatTimeRange(appointment.time)}
          </p>
          <p className="truncate text-[10px] leading-tight opacity-70">
            {appointment.reason}
          </p>
        </>
      ) : null}
    </button>
  );
}
