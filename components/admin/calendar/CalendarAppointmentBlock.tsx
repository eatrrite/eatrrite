"use client";

import { useAdminStore } from "@/stores/useAdminStore";
import type { Appointment } from "@/types/admin/appointment";
import { APPOINTMENT_BLOCK_CLASS } from "@/constants/admin/calendar/blocks";
import { formatTimeRange } from "@/utils/admin/calendarTime";
import { columnStyle, type OverlapSlot } from "@/utils/admin/calendarOverlap";
import { cn } from "cn";

type CalendarAppointmentBlockProps = {
  appointment: Appointment;
  leadName: string;
  topPx: number;
  heightPx: number;
  compact?: boolean;
  slot?: OverlapSlot;
  onSelect?: () => void;
};

export function CalendarAppointmentBlock({
  appointment,
  leadName,
  topPx,
  heightPx,
  compact = false,
  slot,
  onSelect,
}: CalendarAppointmentBlockProps) {
  const { meetingMinutes } = useAdminStore((s) => s.settings);
  const shared = (slot?.cols ?? 1) > 1;
  const timeRange = formatTimeRange(appointment.time, meetingMinutes);
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onSelect?.();
      }}
      title={`${leadName} · ${timeRange}`}
      style={{ top: topPx, height: heightPx, ...columnStyle(slot, 2) }}
      className={cn(
        "absolute z-[1] overflow-hidden rounded-md border-l-4 px-1.5 py-1 text-left shadow-xs transition-opacity hover:z-[2] hover:opacity-90",
        shared && "px-1",
        APPOINTMENT_BLOCK_CLASS[appointment.status],
      )}
    >
      <p className="truncate text-xs font-semibold leading-tight">
        {leadName}
      </p>
      {!compact && !shared ? (
        <>
          <p className="mt-0.5 truncate text-[10px] leading-tight opacity-80">
            {timeRange}
          </p>
        </>
      ) : null}
    </button>
  );
}
