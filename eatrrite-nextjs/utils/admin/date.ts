import { format, parseISO, isValid } from "date-fns";

export function parseDateValue(value: string): Date | undefined {
  if (!value) return undefined;
  const parsed = parseISO(value);
  return isValid(parsed) ? parsed : undefined;
}

export function toDateValue(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function formatDateLabel(value: string): string {
  const date = parseDateValue(value);
  if (!date) return "Pick a date";
  return format(date, "MMMM do yyyy");
}
