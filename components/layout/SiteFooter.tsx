import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { BlurIn } from "@/components/motion/BlurIn";
import { footerViewport } from "@/constants/motion";
import { BRAND } from "@/constants/brand";
import programs from "@/constants/programs/programs.json";
import { FOOTER_LINKS, programPath } from "@/constants/routes";

const link = "text-sm text-text transition-colors hover:text-primary";

// Cached because Cache Components does not allow a bare new Date() during prerender.
async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

function FooterTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="m-0 font-heading text-base font-bold text-ink">{children}</h3>;
}

// Light footer in the reference design layout, on the deeper brand beige (so it still stands
// apart after a beige section) with gold icons. Copy and
// links match the PHP footer.
export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer className="border-t border-beige-deep bg-beige">
      <div className="er-container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <BlurIn viewport={footerViewport} className="flex flex-col gap-4">
          <Image src={BRAND.logo} alt={BRAND.name} width={1162} height={332} className="h-12 w-auto self-start object-contain" />
          <p className="m-0 max-w-xs text-sm leading-relaxed text-text">
            Science-backed, culturally-rooted nutrition coaching — so you learn how to Eat Rrite for life, without crash diets.
          </p>
          <SocialLinks />
        </BlurIn>
        <BlurIn viewport={footerViewport} delay={0.06}>
          <FooterTitle>Quick Links</FooterTitle>
          <ul className="mt-4 mb-0 grid gap-2.5 p-0">
            {FOOTER_LINKS.map(({ label, href }) => (
              <li key={href}><Link className={link} href={href}>{label}</Link></li>
            ))}
          </ul>
        </BlurIn>
        <BlurIn viewport={footerViewport} delay={0.12}>
          <FooterTitle>Programs</FooterTitle>
          <ul className="mt-4 mb-0 grid gap-2.5 p-0">
            {programs.map((p) => (
              <li key={p.slug}><Link className={link} href={programPath(p.slug)}>{p.short}</Link></li>
            ))}
          </ul>
        </BlurIn>
        <BlurIn viewport={footerViewport} delay={0.18}>
          <FooterTitle>Get In Touch</FooterTitle>
          <ul className="mt-4 mb-0 grid gap-3 p-0 text-sm text-text">
            <li className="flex items-center gap-2.5"><Mail className="size-4 shrink-0 text-accent-deep" /><a className={link} href={BRAND.emailHref}>{BRAND.email}</a></li>
            <li className="flex items-center gap-2.5"><Phone className="size-4 shrink-0 text-accent-deep" /><a className={link} href={BRAND.phoneHref}>{BRAND.phone}</a></li>
            <li className="flex items-center gap-2.5"><Clock3 className="size-4 shrink-0 text-accent-deep" />{BRAND.hoursLine}</li>
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent-deep" />
              <span>{BRAND.address1} &amp; {BRAND.address2}<br /><span className="text-xs text-muted-foreground">{BRAND.locationsNote}</span></span>
            </li>
          </ul>
        </BlurIn>
      </div>
      <div className="border-t border-accent/20">
        <div className="er-container flex flex-col gap-2 py-5 text-xs text-text sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">&copy; {year} {BRAND.name}. All rights reserved.</p>
          <p className="m-0">{BRAND.disclaimer}</p>
          <p className="m-0">Learn to Eat Rrite.</p>
        </div>
      </div>
    </footer>
  );
}
