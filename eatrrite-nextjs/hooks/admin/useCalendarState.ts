"use client";

import { useCallback, useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  addWeeks,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { adminNow } from "@/constants/admin/dashboard/reference";
import type { CalendarView } from "@/types/admin/calendar";
import { toDateValue } from "@/utils/admin/date";

/** The admin “today”: the current date and time in India. */
export function getCalendarToday(): Date {
  return parseISO(adminNow());
}

function cursorForView(view: CalendarView, date: Date): Date {
  if (view === "month") return startOfMonth(date);
  if (view === "week") return startOfWeek(date);
  return date;
}

export function useCalendarState() {
  const today = useMemo(() => getCalendarToday(), []);
  const [view, setViewState] = useState<CalendarView>("month");
  const [selectedDate, setSelectedDate] = useState(() => today);
  const [cursorDate, setCursorDate] = useState(() => startOfMonth(today));

  const setView = useCallback(
    (next: CalendarView) => {
      setViewState(next);
      setCursorDate(cursorForView(next, selectedDate));
    },
    [selectedDate],
  );

  const goPrevious = useCallback(() => {
    if (view === "day") {
      setSelectedDate((prev) => {
        const next = addDays(prev, -1);
        setCursorDate(next);
        return next;
      });
      return;
    }
    setCursorDate((prev) =>
      view === "month" ? addMonths(prev, -1) : addWeeks(prev, -1),
    );
  }, [view]);

  const goNext = useCallback(() => {
    if (view === "day") {
      setSelectedDate((prev) => {
        const next = addDays(prev, 1);
        setCursorDate(next);
        return next;
      });
      return;
    }
    setCursorDate((prev) =>
      view === "month" ? addMonths(prev, 1) : addWeeks(prev, 1),
    );
  }, [view]);

  const selectDate = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      setCursorDate(cursorForView(view, date));
    },
    [view],
  );

  return {
    view,
    setView,
    today,
    todayKey: toDateValue(today),
    selectedDate,
    selectedKey: toDateValue(selectedDate),
    cursorDate,
    goPrevious,
    goNext,
    selectDate,
  };
}
