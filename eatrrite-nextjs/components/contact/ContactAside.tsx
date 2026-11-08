import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { WorkingHours } from "@/components/layout/WorkingHours";
import { LinkButton } from "@/components/shared/section/LinkButton";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/constants/brand";
import { whatsappLink, whatsappMessageFor } from "@/constants/whatsapp";
import programs from "@/constants/programs/programs.json";
import { ROUTES } from "@/constants/routes";

const DETAILS = [
  { icon: Phone, label: "Phone / WhatsApp", body: BRAND.phone, href: BRAND.phoneHref },
  { icon: Mail, label: "Email", body: BRAND.email, href: BRAND.emailHref },
  { icon: MapPin, label: "Based in", body: `${BRAND.address1} & ${BRAND.address2}`, note: BRAND.locationsNote },
  { icon: Clock3, label: "Hours", body: <WorkingHours /> },
];

// "Reach us" timeline, actions and programs, as in the reference ContactAside.
export function ContactAside() {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-white p-6 md:p-7">
        <p className="m-0 type-eyebrow">Reach us</p>
        <ol className="mt-5 mb-0 grid gap-1 border-l border-border pl-5">
          {DETAILS.map((item) => (
            <li key={item.label} className="relative py-3">
              <span aria-hidden className="absolute top-5 -left-[1.53rem] size-2.5 rounded-full border-2 border-white bg-primary" />
              <div className="flex gap-3">
                <item.icon className="mt-0.5 size-4 shrink-0 text-primary" />
                <div className="min-w-0 text-sm">
                  <p className="m-0 text-xs font-medium tracking-wide text-muted-foreground uppercase">{item.label}</p>
                  {item.href ? <a href={item.href} className="mt-1 block text-ink hover:text-primary">{item.body}</a> : <p className="mt-1 mb-0 leading-relaxed text-ink">{item.body}</p>}
                  {item.note ? <p className="mt-1 mb-0 text-xs text-muted-foreground">{item.note}</p> : null}
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex flex-wrap gap-3">
          <LinkButton href={ROUTES.appointment}>Get Consultation</LinkButton>
          <Button variant="outline" size="lg" nativeButton={false} render={<a href={whatsappLink(whatsappMessageFor("/contact"))} target="_blank" rel="noopener" />}>Message on WhatsApp</Button>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-white p-6 md:p-7">
        <p className="m-0 type-eyebrow">Programs</p>
        <ul className="mt-4 mb-0 grid gap-2 p-0 text-sm text-ink">
          {programs.map((p) => <li key={p.slug}>✓ {p.short}</li>)}
        </ul>
      </div>
    </div>
  );
}
