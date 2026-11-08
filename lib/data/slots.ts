// Weekly hours from constants/schedule.php, in IST. Index 0 is Sunday.
// Phase 3 preview only: every slot shows as open. Phase 4 loads real availability.
const weekday = [
  ["11:30", "14:00"],
  ["15:30", "17:30"],
  ["20:30", "21:30"],
];

const weeklyHours: string[][][] = [
  [["11:30", "13:00"]],
  weekday,
  weekday,
  weekday,
  weekday,
  [],
  [["11:30", "14:30"]],
];

const meetingMinutes = 30;
const intervalMinutes = 15;

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export function slotsFor(date: Date) {
  const times: string[] = [];
  for (const [start, end] of weeklyHours[date.getDay()]) {
    for (let t = toMinutes(start); t + meetingMinutes <= toMinutes(end); t += intervalMinutes) {
      const h = Math.floor(t / 60);
      const label = `${h % 12 || 12}:${String(t % 60).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
      times.push(label);
    }
  }
  return times;
}
