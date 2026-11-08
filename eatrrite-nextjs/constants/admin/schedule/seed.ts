import type { DaySchedule } from "@/types/admin/schedule";

// Weekly consultation hours from constants/appointment/schedule.ts.
export const SEED_SCHEDULE: DaySchedule[] = [
  { day: "monday", isOpen: true, slots: [{ id: "mon_1", openTime: "11:30", closeTime: "14:00" }, { id: "mon_2", openTime: "15:30", closeTime: "17:30" }, { id: "mon_3", openTime: "20:30", closeTime: "21:30" }] },
  { day: "tuesday", isOpen: true, slots: [{ id: "tue_1", openTime: "11:30", closeTime: "14:00" }, { id: "tue_2", openTime: "15:30", closeTime: "17:30" }, { id: "tue_3", openTime: "20:30", closeTime: "21:30" }] },
  { day: "wednesday", isOpen: true, slots: [{ id: "wed_1", openTime: "11:30", closeTime: "14:00" }, { id: "wed_2", openTime: "15:30", closeTime: "17:30" }, { id: "wed_3", openTime: "20:30", closeTime: "21:30" }] },
  { day: "thursday", isOpen: true, slots: [{ id: "thu_1", openTime: "11:30", closeTime: "14:00" }, { id: "thu_2", openTime: "15:30", closeTime: "17:30" }, { id: "thu_3", openTime: "20:30", closeTime: "21:30" }] },
  { day: "friday", isOpen: false, slots: [] },
  { day: "saturday", isOpen: true, slots: [{ id: "sat_1", openTime: "11:30", closeTime: "14:30" }] },
  { day: "sunday", isOpen: true, slots: [{ id: "sun_1", openTime: "11:30", closeTime: "13:00" }] },
];
