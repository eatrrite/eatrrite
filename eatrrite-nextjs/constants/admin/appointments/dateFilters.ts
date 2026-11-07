export type AppointmentDateFilter =
  | "all"
  | "today"
  | "this-week"
  | "this-month";

export const APPOINTMENT_DATE_FILTER_OPTIONS: {
  value: AppointmentDateFilter;
  label: string;
}[] = [
  { value: "all", label: "All dates" },
  { value: "today", label: "Today" },
  { value: "this-week", label: "This week" },
  { value: "this-month", label: "This month" },
];
