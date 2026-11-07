import type { Metadata } from "next";
import { BookingForm } from "@/components/appointment/BookingForm";
import { PageBanner } from "@/components/layout/PageBanner";
import { BlurIn } from "@/components/motion/BlurIn";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import { env } from "@/config/env";
import copy from "@/constants/appointment/content.json";
import { pageFood } from "@/constants/home/floatingFood";

export const metadata: Metadata = {
  title: "Book Appointment",
  description:
    "Book a consultation with Eat Rrite. Confirm your slot with a small fee, complete the questionnaire, then receive your Google Meet link.",
};

// Copies appointment.php, in the Deccan Dentics contact-form layout.
export default function AppointmentPage() {
  const fee = env.feeRupees();
  return (
    <>
      <PageBanner title="Book Appointment" />
      <PageSection tone="white" food={pageFood(8)}>
        <div className="grid items-start gap-10 lg:grid-cols-[2fr_3fr] lg:gap-12">
          <SectionIntro eyebrow={copy.pill} title={copy.title} lead={copy.text.replace("{amount}", String(fee))} count={fee} />
          <BlurIn delay={0.1} className="min-w-0">
            <div className="rounded-xl border border-border bg-mint p-6 md:p-8">
              <p className="m-0 font-script text-2xl text-primary sm:text-3xl">Reserve your slot</p>
              <h3 className="mt-2 mb-6 font-heading text-xl font-bold text-ink">Consultation booking</h3>
              <BookingForm feeRupees={fee} />
            </div>
          </BlurIn>
        </div>
      </PageSection>
    </>
  );
}
