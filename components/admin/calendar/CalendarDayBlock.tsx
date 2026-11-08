"use client";

import { useAdminStore } from "@/stores/useAdminStore";
import { AppointmentStatusBadge } from "@/components/admin/appointments/AppointmentStatusBadge";
import { APPOINTMENT_BLOCK_CLASS } from "@/constants/admin/calendar/blocks";
import type { Appointment } from "@/types/admin/appointment";
import { columnStyle, type OverlapSlot } from "@/utils/admin/calendarOverlap";
import { formatTimeRange } from "@/utils/admin/calendarTime";
import { cn } from "cn";

type CalendarDayBlockProps = {
  appointment: Appointment;
  leadName: string;
  topPx: number;
  heightPx: number;
  slot?: OverlapSlot;
  onSelect?: () => void;
};

export function CalendarDayBlock({
  appointment,
  leadName,
  topPx,
  heightPx,
  slot,
  onSelect,
}: CalendarDayBlockProps) {
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
      title={`${leadName} · ${timeRange} · ${appointment.service}`}
      style={{ top: topPx, height: heightPx, ...columnStyle(slot, 8) }}
      className={cn(
        "absolute z-[1] flex items-center justify-between gap-3 overflow-hidden rounded-lg border-l-4 px-3 py-1.5 text-left shadow-xs transition-opacity hover:z-[2] hover:opacity-90",
        APPOINTMENT_BLOCK_CLASS[appointment.status],
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-tight">
          {leadName}
        </p>
        <p className="mt-0.5 truncate text-xs leading-tight opacity-80">
          {timeRange} · {appointment.service}
        </p>
      </div>
      <span className={cn("hidden shrink-0", !shared && "min-[380px]:inline-flex")}>
        <AppointmentStatusBadge status={appointment.status} />
      </span>
    </button>
  );
}
