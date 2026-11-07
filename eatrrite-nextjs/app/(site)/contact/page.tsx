import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/site/button-link";
import { PageBanner } from "@/components/site/page-banner";
import { SectionPill } from "@/components/site/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import inner from "@/lib/data/inner.json";
import programs from "@/lib/data/programs.json";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact Eat Rrite",
  description: "Get in touch with Eat Rrite to book your nutrition consultation.",
};

// Copies contact.php and .contact-grid.
export default function ContactPage() {
  const copy = inner.contact;
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
                <a href={site.phoneHref}>{site.phone}</a>
              </p>
              <p>
                <strong>Email</strong>
                <br />
                <a href={site.emailHref}>{site.email}</a>
              </p>
              <p>
                <strong>Based in</strong>
                <br />
                {site.address1} &amp; {site.address2}
                <br />
                <span className="text-sm text-muted-foreground">{site.locationsNote}</span>
              </p>
              <p>
                <strong>Hours</strong>
                <br />
                {site.hours}
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
                  href={site.whatsapp}
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

const buttonClass = buttonVariants();
