import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { PageBanner } from "@/components/layout/PageBanner";
import { SectionPill } from "@/components/shared/SectionHeading";
import { pillVariants } from "@/components/shared/PillButton";
import { Card } from "@/components/ui/card";
import copy from "@/constants/contact/content.json";
import programs from "@/constants/programs/programs.json";
import { BRAND } from "@/constants/brand";

export const metadata: Metadata = {
  title: "Contact Eat Rrite",
  description: "Get in touch with Eat Rrite to book your nutrition consultation.",
};

// Copies contact.php and .contact-grid.
export default function ContactPage() {
  return (
    <>
      <PageBanner title="Contact Us" />
      <section className="er-section">
        <div className="er-container grid grid-cols-[0.95fr_1.05fr] gap-12 er-md:grid-cols-1">
          <Reveal preset="grid" className="h-full min-w-0">
            <Card className="block h-full">
              <SectionPill>{copy.pill}</SectionPill>
              <h2 className="type-section mb-5 max-w-[760px]">{copy.title}</h2>
              <p>{copy.text}</p>
              <p>
                <strong>Phone / WhatsApp</strong>
                <br />
                <a href={BRAND.phoneHref}>{BRAND.phone}</a>
              </p>
              <p>
                <strong>Email</strong>
                <br />
                <a href={BRAND.emailHref}>{BRAND.email}</a>
              </p>
              <p>
                <strong>Based in</strong>
                <br />
                {BRAND.address1} &amp; {BRAND.address2}
                <br />
                <span className="text-sm text-muted-foreground">{BRAND.locationsNote}</span>
              </p>
              <p>
                <strong>Hours</strong>
                <br />
                {BRAND.hours}
              </p>
            </Card>
          </Reveal>
          <Reveal preset="grid" className="h-full min-w-0">
            <Card className="block h-full">
              <h3>{copy.enquireTitle}</h3>
              <p>{copy.enquireText}</p>
              <div className="mt-5 mb-6 grid gap-3">
                <ButtonLink variant="accent" href="/appointment">Get Consultation</ButtonLink>
                <a
                  className={buttonClass}
                  href={BRAND.whatsapp}
                  target="_blank"
                  rel="noopener"
                >
                  Message on WhatsApp
                </a>
              </div>
              <ul className="mt-2">
                {programs.map((p) => (
                  <li key={p.slug}>✓ {p.short}</li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </section>
    </>
  );
}

const buttonClass = pillVariants();
