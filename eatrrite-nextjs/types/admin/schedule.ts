export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type ScheduleTimeSlot = {
  id: string;
  openTime: string;
  closeTime: string;
};

export type DaySchedule = {
  day: Weekday;
  isOpen: boolean;
  slots: ScheduleTimeSlot[];
};
