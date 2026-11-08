import type { Metadata } from "next";
import { Suspense } from "react";
import { ConfirmedBooking } from "@/features/appointment/components/confirmed/ConfirmedBooking";

export const metadata: Metadata = {
  title: "Appointment Confirmed | Eat Rrite",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ appointmentId?: string }> };

async function Confirmed({ searchParams }: Props) {
  const { appointmentId = "" } = await searchParams;
  return <ConfirmedBooking appointmentId={appointmentId} />;
}

// Copies appointment-confirmed.php: summary on the left, questionnaire then Meet link on the right.
export default function AppointmentConfirmedPage(props: Props) {
  return (
    <section className="border-b border-border bg-mint py-20">
      <Suspense fallback={<div className="er-container min-h-96" />}>
        <Confirmed {...props} />
      </Suspense>
    </section>
  );
}
