import type { DaySchedule, ScheduleTimeSlot, Weekday } from "@/types/admin/schedule";
import { createId } from "@/utils/admin/id";

type ScheduleSlice = {
  days: DaySchedule[];
};

type SetState = (
  partial:
    | Partial<ScheduleSlice>
    | ((state: ScheduleSlice) => Partial<ScheduleSlice>),
) => void;

const DEFAULT_SLOT = (): ScheduleTimeSlot => ({
  id: createId(),
  openTime: "09:00",
  closeTime: "13:00",
});

function mapDay(
  days: DaySchedule[],
  day: Weekday,
  update: (item: DaySchedule) => DaySchedule,
) {
  return days.map((item) => (item.day === day ? update(item) : item));
}

export function createScheduleActions(set: SetState) {
  return {
    setDayOpen: (day: Weekday, isOpen: boolean) => {
      set((s) => ({
        days: mapDay(s.days, day, (item) => ({
          ...item,
          isOpen,
          slots:
            isOpen && item.slots.length === 0
              ? [DEFAULT_SLOT()]
              : item.slots,
        })),
      }));
    },
    addDaySlot: (day: Weekday) => {
      set((s) => ({
        days: mapDay(s.days, day, (item) => ({
          ...item,
          slots: [...item.slots, DEFAULT_SLOT()],
        })),
      }));
    },
    updateDaySlot: (
      day: Weekday,
      slotId: string,
      patch: Partial<Omit<ScheduleTimeSlot, "id">>,
    ) => {
      set((s) => ({
        days: mapDay(s.days, day, (item) => ({
          ...item,
          slots: item.slots.map((slot) =>
            slot.id === slotId ? { ...slot, ...patch } : slot,
          ),
        })),
      }));
    },
    removeDaySlot: (day: Weekday, slotId: string) => {
      set((s) => ({
        days: mapDay(s.days, day, (item) => ({
          ...item,
          slots: item.slots.filter((slot) => slot.id !== slotId),
        })),
      }));
    },
  };
}
