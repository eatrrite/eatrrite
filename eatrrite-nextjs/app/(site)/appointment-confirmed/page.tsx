import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingState } from "@/components/shared/LoadingState";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { ConfirmedBooking } from "@/features/appointment/components/confirmed/ConfirmedBooking";
import { getQuestions } from "@/features/appointment/services/bookingConfig";
import { getConfirmedBooking } from "@/features/appointment/services/questionnaireDb";

export const metadata: Metadata = {
  title: "Appointment Confirmed | Eat Rrite",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ appointmentId?: string }> };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Reads the paid booking from the database. An unknown id goes back to the booking form.
async function Confirmed({ searchParams }: Props) {
  const { appointmentId = "" } = await searchParams;
  const booking = UUID.test(appointmentId) ? await getConfirmedBooking(appointmentId) : null;
  if (!booking) redirect(ROUTES.appointment);
  const questions = booking.meetLink ? [] : await getQuestions();
  return <ConfirmedBooking booking={booking} questions={questions} />;
}

// Copies appointment-confirmed.php: summary on the left, questionnaire then Meet link on the right.
export default function AppointmentConfirmedPage(props: Props) {
  return (
    <section className="border-b border-border bg-mint py-20">
      <Suspense fallback={<LoadingState label="Loading your booking…" className="er-container min-h-96" />}>
        <Confirmed {...props} />
      </Suspense>
    </section>
  );
}
