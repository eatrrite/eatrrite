/** Half-hour slots as `HH:mm` (24h), used by TimeSelect and stores. */
export function buildHalfHourSlots(
  startHour = 0,
  endHour = 23,
): string[] {
  const slots: string[] = [];
  for (let hour = startHour; hour <= endHour; hour += 1) {
    for (const minute of [0, 30] as const) {
      slots.push(
        `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
      );
    }
  }
  return slots;
}

export function formatTimeLabel(value: string): string {
  const [hourRaw, minuteRaw] = value.split(":");
  const hour = Number(hourRaw);
  const minute = Number(minuteRaw);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return value;
  const period = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 || 12;
  return `${display}:${String(minute).padStart(2, "0")} ${period}`;
}

export const HALF_HOUR_SLOTS = buildHalfHourSlots(0, 23);
