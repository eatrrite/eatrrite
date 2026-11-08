"use client";

import { useAdminStore } from "@/stores/useAdminStore";
import { useMemo } from "react";
import type { Appointment } from "@/types/admin/appointment";
import { CalendarDayBlock } from "@/components/admin/calendar/CalendarDayBlock";
import { CalendarDayEmptySlots } from "@/components/admin/calendar/CalendarDayEmptySlots";
import { CalendarHourLines } from "@/components/admin/calendar/CalendarHourLines";
import { CalendarTimeGutter } from "@/components/admin/calendar/CalendarTimeGutter";
import { CALENDAR_TIMELINE_EDGE_PAD_PX } from "@/constants/admin/calendar/layout";
import {
  appointmentsOnDate,
  groupAppointmentsByDate,
} from "@/utils/admin/calendarAppointments";
import {
  appointmentBlockLayout,
  calendarGridHeightPx,
  calendarTimelineOuterHeightPx,
} from "@/utils/admin/calendarTime";
import { layoutOverlaps } from "@/utils/admin/calendarOverlap";
import { toDateValue } from "@/utils/admin/date";

type CalendarDayViewProps = {
  date: Date;
  appointments: Appointment[];
  leadName: (leadId: string) => string;
  onEmptySlot?: (time: string) => void;
  onSelectAppointment?: (appointment: Appointment) => void;
};

export function CalendarDayView({
  date,
  appointments,
  leadName,
  onEmptySlot,
  onSelectAppointment,
}: CalendarDayViewProps) {
  const { blockMinutes } = useAdminStore((s) => s.settings);
  const dateKey = toDateValue(date);
  const byDate = useMemo(
    () => groupAppointmentsByDate(appointments),
    [appointments],
  );
  const dayItems = appointmentsOnDate(byDate, dateKey);
  const placed = useMemo(() => {
    const blocks = dayItems.flatMap((item) => {
      const layout = appointmentBlockLayout(item.time, blockMinutes);
      return layout ? [{ item, layout }] : [];
    });
    const slots = layoutOverlaps(blocks.map(({ item, layout }) => ({ id: item.id, ...layout })));
    return blocks.map((block) => ({ ...block, slot: slots.get(block.item.id) }));
  }, [dayItems, blockMinutes]);
  const gridHeight = calendarGridHeightPx();
  const outerHeight = calendarTimelineOuterHeightPx();

  return (
    <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-x-auto overflow-y-auto">
        <div className="flex" style={{ height: outerHeight }}>
          <CalendarTimeGutter />
          <div
            className="relative min-w-0 flex-1"
            style={{
              marginTop: CALENDAR_TIMELINE_EDGE_PAD_PX,
              marginBottom: CALENDAR_TIMELINE_EDGE_PAD_PX,
              height: gridHeight,
            }}
          >
            <CalendarHourLines />
            <CalendarDayEmptySlots onEmptySlot={onEmptySlot} />
            {placed.map(({ item, layout, slot }) => (
              <CalendarDayBlock
                key={item.id}
                appointment={item}
                leadName={leadName(item.leadId)}
                topPx={layout.topPx}
                heightPx={layout.heightPx}
                slot={slot}
                onSelect={() => onSelectAppointment?.(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
