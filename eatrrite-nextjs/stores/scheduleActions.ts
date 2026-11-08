import { saveScheduleAction } from "@/features/admin/services/adminActions";
import { saveOrRevert } from "@/stores/saveOrRevert";
import type { DaySchedule, ScheduleTimeSlot, Weekday } from "@/types/admin/schedule";
import { createId } from "@/utils/admin/id";

type ScheduleSlice = { days: DaySchedule[] };
type SetState = (partial: Partial<ScheduleSlice>) => void;
type GetState = () => ScheduleSlice;

const DEFAULT_SLOT = (): ScheduleTimeSlot => ({ id: createId(), openTime: "09:00", closeTime: "13:00" });

const mapDay = (days: DaySchedule[], day: Weekday, update: (item: DaySchedule) => DaySchedule) =>
  days.map((item) => (item.day === day ? update(item) : item));

// Weekly hours: every change shows at once and the whole week is saved to Neon.
export function createScheduleActions(set: SetState, get: GetState) {
  const change = (update: (days: DaySchedule[]) => DaySchedule[]) => {
    const before = get().days;
    const next = update(before);
    set({ days: next });
    saveOrRevert(saveScheduleAction(next), () => set({ days: before }));
  };

  return {
    setDayOpen: (day: Weekday, isOpen: boolean) =>
      change((days) =>
        mapDay(days, day, (item) => ({ ...item, isOpen, slots: isOpen && item.slots.length === 0 ? [DEFAULT_SLOT()] : item.slots })),
      ),
    addDaySlot: (day: Weekday) => change((days) => mapDay(days, day, (item) => ({ ...item, slots: [...item.slots, DEFAULT_SLOT()] }))),
    updateDaySlot: (day: Weekday, slotId: string, patch: Partial<Omit<ScheduleTimeSlot, "id">>) =>
      change((days) =>
        mapDay(days, day, (item) => ({ ...item, slots: item.slots.map((slot) => (slot.id === slotId ? { ...slot, ...patch } : slot)) })),
      ),
    removeDaySlot: (day: Weekday, slotId: string) =>
      change((days) => mapDay(days, day, (item) => ({ ...item, slots: item.slots.filter((slot) => slot.id !== slotId) }))),
  };
}
