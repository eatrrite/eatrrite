import type { Metadata } from "next";
import { BookingForm } from "@/components/appointment/BookingForm";
import { Reveal } from "@/components/motion/Reveal";
import { PageBanner } from "@/components/layout/PageBanner";
import { SectionPill } from "@/components/shared/SectionHeading";
import copy from "@/constants/appointment/content.json";
import { env } from "@/config/env";

export const metadata: Metadata = {
  title: "Book Appointment",
  description:
    "Book a consultation with Eat Rrite. Confirm your slot with a small fee, complete the questionnaire, then receive your Google Meet link.",
};

// Copies appointment.php, .appointment-layout--next and .appointment-form-card--next.
export default function AppointmentPage() {
  const fee = env.feeRupees();
  return (
    <>
      <PageBanner title="Book Appointment" />
      <section className="er-section bg-cream">
        <div className="er-container grid grid-cols-[0.85fr_1.15fr] items-start gap-12 er-md:gap-8 er-900:grid-cols-1">
          <Reveal preset="grid" className="min-w-0">
            <SectionPill>{copy.pill}</SectionPill>
            <h2 className="type-section mb-5 max-w-[520px]">{copy.title}</h2>
            <p className="max-w-[520px] text-[17px] text-text">{copy.text.replace("{amount}", String(fee))}</p>
          </Reveal>
          <Reveal preset="grid" className="min-w-0">
            <div className="rounded-md border border-border bg-primary/8 p-6 shadow-card max-[360px]:p-4">
              <BookingForm feeRupees={fee} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
