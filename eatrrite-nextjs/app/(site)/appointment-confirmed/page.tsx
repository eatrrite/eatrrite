import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { ConfirmedSummary } from "@/features/appointment/components/confirmed/ConfirmedSummary";
import { MeetStatus } from "@/features/appointment/components/confirmed/MeetStatus";
import { Questionnaire } from "@/features/appointment/components/confirmed/Questionnaire";
import { ROUTES } from "@/constants/routes";
import { findAppointment } from "@/features/appointment/services/appointmentReads";

export const metadata: Metadata = {
  title: "Appointment Confirmed | Eat Rrite",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ appointmentId?: string }> };

const UUID = /^[0-9a-f-]{36}$/i;
const PAID = ["confirmed", "finalizing", "completed", "failed"];

async function loadAppointment(searchParams: Props["searchParams"]) {
  const id = (await searchParams).appointmentId ?? "";
  const appointment = UUID.test(id) ? await findAppointment(id) : null;
  if (!appointment || !PAID.includes(appointment.status)) redirect(ROUTES.appointment);
  return appointment;
}

async function Confirmed({ searchParams }: Props) {
  const appointment = await loadAppointment(searchParams);
  const started = Boolean(appointment.questionnaire);
  return (
    <div className="er-container grid items-start gap-10 lg:grid-cols-[1fr_2fr]">
      <ConfirmedSummary appointment={appointment} />
      <div className="rounded-xl border border-border bg-white p-6 md:p-8">
        {started ? (
          <MeetStatus appointmentId={appointment.id} initialLink={appointment.meetLink} />
        ) : (
          <Questionnaire appointmentId={appointment.id} prefillName={appointment.name} />
        )}
      </div>
    </div>
  );
}

// Copies appointment-confirmed.php: summary on the left, questionnaire on the right.
export default function AppointmentConfirmedPage(props: Props) {
  return (
    <section className="border-b border-border bg-mint py-20">
      <Suspense fallback={<div className="er-container min-h-96" />}>
        <Confirmed {...props} />
      </Suspense>
    </section>
  );
}
