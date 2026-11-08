"use client";

import { ConfirmationModal } from "@/components/admin/ConfirmationModal";
import { ScheduleDayCard } from "@/components/admin/schedule/ScheduleDayCard";
import { AdminMotion } from "@/components/admin/AdminPage";
import { useConfirmDialog } from "@/hooks/admin/useConfirmDialog";
import { useAdminStore } from "@/stores/useAdminStore";
import { WEEKDAY_LABELS } from "@/constants/admin/schedule/weekdays";
import type { Weekday } from "@/types/admin/schedule";

export function ScheduleEditor() {
  const days = useAdminStore((s) => s.days);
  const setDayOpen = useAdminStore((s) => s.setDayOpen);
  const addDaySlot = useAdminStore((s) => s.addDaySlot);
  const updateDaySlot = useAdminStore((s) => s.updateDaySlot);
  const removeDaySlot = useAdminStore((s) => s.removeDaySlot);
  const { ask, props: confirmProps } = useConfirmDialog();

  const requestRemoveSlot = (day: Weekday, slotId: string) => {
    ask({
      title: "Remove time slot?",
      description: `This removes one working window from ${WEEKDAY_LABELS[day]}.`,
      confirmLabel: "Remove slot",
      onConfirm: () => removeDaySlot(day, slotId),
    });
  };

  const requestToggle = (day: Weekday, isOpen: boolean) => {
    if (isOpen) {
      setDayOpen(day, true);
      return;
    }
    ask({
      title: `Mark ${WEEKDAY_LABELS[day]} as closed?`,
      description:
        "Leads will not be able to book consultations on this day while it stays closed.",
      confirmLabel: "Close day",
      onConfirm: () => setDayOpen(day, false),
    });
  };

  return (
    <>
      <div className="space-y-3">
        {days.map((day, index) => (
          <AdminMotion key={day.day} delay={0.35 + index * 0.05}>
            <ScheduleDayCard
              day={day}
              onToggle={(isOpen) => requestToggle(day.day, isOpen)}
              onAddSlot={() => addDaySlot(day.day)}
              onChangeSlot={(slotId, patch) =>
                updateDaySlot(day.day, slotId, patch)
              }
              onRemoveSlot={(slotId) => requestRemoveSlot(day.day, slotId)}
            />
          </AdminMotion>
        ))}
      </div>
      {confirmProps ? <ConfirmationModal {...confirmProps} /> : null}
    </>
  );
}
