const pad = (value: number) => String(value).padStart(2, "0");

// "HH:mm" to minutes since midnight. Pass times that are already normalized.
export function toMinutes(time: string): number {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

export function toTime(minutes: number): string {
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
}

// Normalizes "9:05", "09:05", "09:05:30" and "9:05 pm" to "HH:mm". Null when it is not a time.
export function parseClock(input: string): string | null {
  const match = /^\s*(\d{1,2}):([0-5]\d)(?::[0-5]\d)?\s*([ap]m)?\s*$/i.exec(input);
  if (!match) return null;
  let hour = Number(match[1]);
  const meridiem = match[3]?.toLowerCase();
  if (meridiem) {
    if (hour < 1 || hour > 12) return null;
    if (meridiem === "pm" && hour < 12) hour += 12;
    if (meridiem === "am" && hour === 12) hour = 0;
  }
  return hour > 23 ? null : toTime(hour * 60 + Number(match[2]));
}
