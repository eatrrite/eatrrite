"use client";

import { useLayoutEffect, useRef } from "react";
import type { ConfirmedBooking as Booking } from "@/features/appointment/services/questionnaireDb";
import type { QuestionnaireQuestion } from "@/features/appointment/types/questionnaire";
import { ConfirmedSummary } from "./ConfirmedSummary";
import { MeetStatus } from "./MeetStatus";
import { QuestionnaireForm } from "./QuestionnaireForm";

// The questionnaire comes first; once it is saved the page refreshes and shows the Meet link.
export function ConfirmedBooking({ booking, questions }: { booking: Booking; questions: QuestionnaireQuestion[] }) {
  const done = Boolean(booking.meetLink);

  // Submitting swaps a very tall form for a short panel, so the page shrinks under the reader and
  // the browser leaves them at the bottom, far from the new content. Before the next paint, bring
  // the confirmation into view and give it focus, as for any step change. A page that loads
  // already confirmed has nothing to move.
  const panel = useRef<HTMLDivElement>(null);
  const wasDone = useRef(done);
  useLayoutEffect(() => {
    if (done && !wasDone.current) {
      panel.current?.scrollIntoView({ block: "start" });
      panel.current?.focus({ preventScroll: true });
    }
    wasDone.current = done;
  }, [done]);

  return (
    <div className="er-container grid items-start gap-10 lg:grid-cols-[1fr_2fr]">
      <ConfirmedSummary done={done} paid={booking.paid} details={{ name: booking.name, service: booking.service, date: booking.date, time: booking.time }} />
      <div ref={panel} tabIndex={-1} className="scroll-mt-32 rounded-xl border border-border bg-beige-light p-6 outline-none md:p-8">
        {done ? <MeetStatus link={booking.meetLink ?? ""} /> : <QuestionnaireForm booking={booking} questions={questions} />}
      </div>
    </div>
  );
}
