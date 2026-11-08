"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useHydrated } from "@/hooks/useHydrated";
import { useAdminStore } from "@/stores/useAdminStore";
import { ConfirmedSummary } from "./ConfirmedSummary";
import { MeetStatus } from "./MeetStatus";
import { QuestionnaireForm } from "./QuestionnaireForm";

// Reads the confirmed appointment from the store. Without a valid id it goes back to the booking form.
// The id comes in as a prop: reading it in the browser is empty during the first render.
export function ConfirmedBooking({ appointmentId }: { appointmentId: string }) {
  const router = useRouter();
  const appointment = useAdminStore((s) => s.appointments.find((item) => item.id === appointmentId));
  const lead = useAdminStore((s) => s.leads.find((item) => item.id === appointment?.leadId));
  const hydrated = useHydrated();
  const missing = hydrated && !(appointment && lead);

  useEffect(() => {
    if (missing) router.replace(ROUTES.appointment);
  }, [missing, router]);

  // The questionnaire comes first; the Meet link appears once it is saved.
  const done = Boolean(appointment && appointment.questionnaire.length > 0 && appointment.meetLink);

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

  if (!appointment || !lead) return <div className="er-container min-h-96" />;
  return (
    <div className="er-container grid items-start gap-10 lg:grid-cols-[1fr_2fr]">
      <ConfirmedSummary done={done} details={{ name: lead.name, service: appointment.service, date: appointment.date, time: appointment.time }} />
      <div ref={panel} tabIndex={-1} className="scroll-mt-32 rounded-xl border border-border bg-white p-6 outline-none md:p-8">
        {done ? <MeetStatus link={appointment.meetLink ?? ""} /> : <QuestionnaireForm appointmentId={appointment.id} lead={lead} />}
      </div>
    </div>
  );
}
