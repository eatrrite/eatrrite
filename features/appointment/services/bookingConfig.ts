import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { QuestionnaireQuestion, QuestionnaireQuestionType } from "@/features/appointment/types/questionnaire";
import type { BookingSettings, WeeklyHours } from "@/features/appointment/types/slots";
import { WEEKDAYS } from "@/features/appointment/utils/hours";
import type { DaySchedule, Weekday } from "@/types/admin/schedule";
import { db } from "@/services/database";

// Settings, working hours, services and questions change rarely, so they are cached.
// Every admin change to them calls updateTag(BOOKING_CONFIG_TAG), so the next read is fresh.
export const BOOKING_CONFIG_TAG = "booking-config";

type ScheduleRow = { id: string; weekday: Weekday; start: string; end: string };

export async function getBookingSettings(): Promise<BookingSettings> {
  "use cache";
  cacheTag(BOOKING_CONFIG_TAG);
  cacheLife("hours");
  const [row] = await db()`
    select meeting_minutes, prep_minutes, start_step_minutes, hold_minutes, booking_days_ahead, fee_rupees
    from er_settings where id`;
  return {
    meetingMinutes: row.meeting_minutes,
    prepMinutes: row.prep_minutes,
    blockMinutes: row.meeting_minutes + row.prep_minutes,
    startStepMinutes: row.start_step_minutes,
    holdMinutes: row.hold_minutes,
    bookingDaysAhead: row.booking_days_ahead,
    feeRupees: row.fee_rupees,
  };
}

export async function getScheduleRows(): Promise<ScheduleRow[]> {
  "use cache";
  cacheTag(BOOKING_CONFIG_TAG);
  cacheLife("hours");
  const rows = await db()`
    select id, weekday, to_char(start_time, 'HH24:MI') as start, to_char(end_time, 'HH24:MI') as end
    from er_schedule_slots order by start_time`;
  return rows as ScheduleRow[];
}

// The working hours as the slot rules read them. A weekday with no rows is closed.
export async function getWeeklyHours(): Promise<WeeklyHours> {
  const rows = await getScheduleRows();
  return Object.fromEntries(
    WEEKDAYS.map((day) => [day, rows.filter((row) => row.weekday === day).map(({ start, end }) => ({ start, end }))]),
  ) as WeeklyHours;
}

// The same rows as the admin Schedule page edits them: one card per day, windows with ids.
export async function getScheduleDays(): Promise<DaySchedule[]> {
  const rows = await getScheduleRows();
  return WEEKDAYS.map((day) => {
    const slots = rows.filter((row) => row.weekday === day).map((row) => ({ id: row.id, openTime: row.start, closeTime: row.end }));
    return { day, isOpen: slots.length > 0, slots };
  });
}

export async function getServices(): Promise<string[]> {
  "use cache";
  cacheTag(BOOKING_CONFIG_TAG);
  cacheLife("hours");
  const rows = await db()`select name from er_services order by position, name`;
  return rows.map((row) => String(row.name));
}

type QuestionRow = {
  key: string;
  label: string;
  type: QuestionnaireQuestionType;
  required: boolean;
  options: string[] | null;
  groups: Record<string, string[]> | null;
  min_value: number | null;
  max_value: number | null;
};

export async function getQuestions(): Promise<QuestionnaireQuestion[]> {
  "use cache";
  cacheTag(BOOKING_CONFIG_TAG);
  cacheLife("hours");
  const rows = (await db()`
    select key, label, type, required, options, groups, min_value, max_value
    from er_questions order by position`) as QuestionRow[];
  return rows.map((row) => ({
    key: row.key,
    label: row.label,
    type: row.type,
    required: row.required,
    options: row.options ?? undefined,
    groups: row.groups ?? undefined,
    min: row.min_value ?? undefined,
    max: row.max_value ?? undefined,
  }));
}
