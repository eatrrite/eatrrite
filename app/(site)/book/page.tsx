import type { Metadata } from "next";
import { pageMetadata } from "@/utils/seo";
import { ROUTES } from "@/constants/routes";
import { BookingForm } from "@/features/appointment/components/BookingForm";
import { PageBanner } from "@/components/layout/PageBanner";
import { BlurIn } from "@/components/motion/BlurIn";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import { Suspense } from "react";
import { LoadingState } from "@/components/shared/LoadingState";
import { connection } from "next/server";
import { getBookingSettings, getServices, getWeeklyHours } from "@/features/appointment/services/bookingConfig";
import { hoursNote } from "@/features/appointment/utils/hours";
import copy from "@/features/appointment/constants/content.json";
import { pageFood } from "@/constants/home/floatingFood";

export const metadata: Metadata = pageMetadata({
  title: "Book an Online Nutrition Consultation | Eat Rrite",
  description: "Book a consultation with Eat Rrite. Confirm your slot with a small fee, complete the questionnaire, then receive your Google Meet link.",
  path: ROUTES.appointment,
});

// The fee, call length, hours and services come from the database, read per request.
async function BookingSection() {
  await connection();
  const [settings, services, weekly] = await Promise.all([getBookingSettings(), getServices(), getWeeklyHours()]);
  const fee = settings.feeRupees;
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[2fr_3fr] lg:gap-12">
      <SectionIntro eyebrow={copy.pill} title={copy.title} lead={copy.text.replace("{amount}", String(fee))} count={fee} />
      <BlurIn delay={0.1} className="min-w-0">
        <div className="rounded-xl border border-accent/30 bg-beige p-6 md:p-8">
          <p className="m-0 type-eyebrow text-accent-deep">Reserve your slot</p>
          <h3 className="mt-2 mb-6 font-heading text-xl font-bold text-ink">Consultation booking</h3>
          <BookingForm feeRupees={fee} meetingMinutes={settings.meetingMinutes} hours={hoursNote(weekly)} services={services} />
        </div>
      </BlurIn>
    </div>
  );
}

// Copies appointment.php, in the reference design contact-form layout.
export default function AppointmentPage() {
  return (
    <>
      <PageBanner title="Book Appointment" path={ROUTES.appointment} />
      <PageSection tone="white" food={pageFood(8)}>
        <Suspense fallback={<LoadingState label="Loading booking details…" className="min-h-96" />}>
          <BookingSection />
        </Suspense>
      </PageSection>
    </>
  );
}
