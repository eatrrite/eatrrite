import { setSlotHiddenAction } from "@/features/admin/services/hiddenSlotActions";
import type { OccupiedSlot } from "@/features/appointment/types/slots";
import { saveOrRevert } from "@/stores/saveOrRevert";
import { formatTimeLabel } from "@/utils/admin/time";

type HiddenSlice = { hiddenSlots: OccupiedSlot[] };
type SetState = (partial: Partial<HiddenSlice>) => void;
type GetState = () => HiddenSlice;

const same = (slot: OccupiedSlot, date: string, time: string) => slot.date === date && slot.time === time;

// Start times the admin hides from the website: shown at once, saved to Neon, undone if saving fails.
export function createHiddenSlotActions(set: SetState, get: GetState) {
  return {
    isSlotHidden: (date: string, time: string) => get().hiddenSlots.some((slot) => same(slot, date, time)),
    toggleSlotHidden: (date: string, time: string) => {
      const before = get().hiddenSlots;
      const hidden = !before.some((slot) => same(slot, date, time));
      set({ hiddenSlots: hidden ? [...before, { date, time }] : before.filter((slot) => !same(slot, date, time)) });
      saveOrRevert(setSlotHiddenAction(date, time, hidden), () => set({ hiddenSlots: before }), {
        title: hidden ? "Slot hidden" : "Slot shown",
        description: `${formatTimeLabel(time)} on ${date} ${hidden ? "can no longer" : "can now"} be booked on the website.`,
      });
    },
  };
}
