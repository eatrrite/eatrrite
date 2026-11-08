"use client";

import { useMemo } from "react";
import { useAdminStore } from "@/stores/useAdminStore";
import type { Appointment } from "@/types/admin/appointment";
import { CalendarAppointmentBlock } from "@/components/admin/calendar/CalendarAppointmentBlock";
import { CalendarDayEmptySlots } from "@/components/admin/calendar/CalendarDayEmptySlots";
import { layoutOverlaps } from "@/utils/admin/calendarOverlap";
import { appointmentBlockLayout } from "@/utils/admin/calendarTime";
import { cn } from "cn";

type CalendarWeekDayColumnProps = {
  isSelected: boolean;
  appointments: Appointment[];
  leadName: (leadId: string) => string;
  onSelectDate: () => void;
  onSelectAppointment: (appointment: Appointment) => void;
  onEmptySlot?: (time: string) => void;
};

export function CalendarWeekDayColumn({
  isSelected,
  appointments,
  leadName,
  onSelectDate,
  onSelectAppointment,
  onEmptySlot,
}: CalendarWeekDayColumnProps) {
  const { blockMinutes } = useAdminStore((s) => s.settings);
  const placed = useMemo(() => {
    const blocks = appointments.flatMap((item) => {
      const layout = appointmentBlockLayout(item.time, blockMinutes);
      return layout ? [{ item, layout }] : [];
    });
    const slots = layoutOverlaps(blocks.map(({ item, layout }) => ({ id: item.id, ...layout })));
    return blocks.map((block) => ({ ...block, slot: slots.get(block.item.id) }));
  }, [appointments, blockMinutes]);
  return (
    <div
      role="presentation"
      onClick={onSelectDate}
      className={cn(
        "relative min-h-0 cursor-pointer border-l border-border/60 first:border-l-0",
        isSelected && "bg-primary/[0.04]",
      )}
    >
      {onEmptySlot ? (
        <CalendarDayEmptySlots
          onEmptySlot={(time) => {
            onSelectDate();
            onEmptySlot(time);
          }}
        />
      ) : null}
      {placed.map(({ item, layout, slot }) => (
        <CalendarAppointmentBlock
          key={item.id}
          appointment={item}
          leadName={leadName(item.leadId)}
          topPx={layout.topPx}
          heightPx={layout.heightPx}
          slot={slot}
          onSelect={() => onSelectAppointment(item)}
        />
      ))}
    </div>
  );
}
