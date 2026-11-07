"use client";

import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { CalendarAppointmentDialogs } from "@/components/admin/calendar/CalendarAppointmentDialogs";
import { CalendarDayDetails } from "@/components/admin/calendar/CalendarDayDetails";
import { CalendarDayView } from "@/components/admin/calendar/CalendarDayView";
import { CalendarMonthView } from "@/components/admin/calendar/CalendarMonthView";
import { CalendarPanel } from "@/components/admin/calendar/CalendarPanel";
import { CalendarToolbar } from "@/components/admin/calendar/CalendarToolbar";
import { CalendarWeekView } from "@/components/admin/calendar/CalendarWeekView";
import { useCalendarDayActions } from "@/hooks/admin/useCalendarDayActions";
import { useCalendarState } from "@/hooks/admin/useCalendarState";
import { useClinicStore } from "@/stores/adminStore";
import type { Appointment } from "@/types/admin/admin";
import { toDateValue } from "@/utils/admin/date";
import { formatMonthTitle } from "@/utils/admin/calendarMonth";
import { formatWeekTitle } from "@/utils/admin/calendarWeek";

export function CalendarWorkspace() {
  const appointments = useClinicStore((s) => s.appointments);
  const {
    view,
    setView,
    today,
    selectedDate,
    selectedKey,
    cursorDate,
    goPrevious,
    goNext,
    selectDate,
  } = useCalendarState();
  const actions = useCalendarDayActions(selectedKey);

  const title = useMemo(() => {
    if (view === "month") return formatMonthTitle(cursorDate);
    if (view === "week") return formatWeekTitle(cursorDate);
    return format(cursorDate, "EEEE, d MMMM yyyy");
  }, [view, cursorDate]);

  const openAppointment = (item: Appointment) => {
    selectDate(parseISO(item.date));
    actions.setDetail(item);
  };

  const openSlot = (date: Date, time: string) => {
    selectDate(date);
    actions.openCreate({ date: toDateValue(date), time });
  };

  return (
    <div className="grid min-h-0 gap-4 lg:h-[calc(100dvh-13rem)] lg:min-h-[36rem] lg:grid-cols-[minmax(0,1.75fr)_minmax(17.5rem,1fr)]">
      <CalendarPanel className="flex h-[min(38rem,78dvh)] flex-col overflow-hidden lg:h-full lg:min-h-0">
        <CalendarToolbar
          title={title}
          view={view}
          onViewChange={setView}
          onPrevious={goPrevious}
          onNext={goNext}
        />
        {view === "month" ? (
          <CalendarMonthView
            month={cursorDate}
            selected={selectedDate}
            today={today}
            appointments={appointments}
            onSelectDate={selectDate}
          />
        ) : view === "week" ? (
          <CalendarWeekView
            cursor={cursorDate}
            selected={selectedDate}
            today={today}
            appointments={appointments}
            patientName={actions.patientName}
            onSelectDate={selectDate}
            onSelectAppointment={openAppointment}
            onEmptySlot={openSlot}
          />
        ) : (
          <CalendarDayView
            date={cursorDate}
            appointments={appointments}
            patientName={actions.patientName}
            onEmptySlot={(time) => openSlot(cursorDate, time)}
            onSelectAppointment={openAppointment}
          />
        )}
      </CalendarPanel>

      <CalendarPanel className="flex h-[min(28rem,60dvh)] flex-col overflow-hidden lg:h-full lg:min-h-0">
        <CalendarDayDetails
          selectedDate={selectedDate}
          patientName={actions.patientName}
          canAdd={actions.patients.length > 0}
          onAdd={() => actions.openCreate()}
          onOpenAppointment={openAppointment}
        />
      </CalendarPanel>

      <CalendarAppointmentDialogs actions={actions} />
    </div>
  );
}
