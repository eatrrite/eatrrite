import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import programs from "@/lib/data/programs.json";
import { footerLinks, programHref, site } from "@/lib/data/site";

const link = "transition-colors duration-300 ease-[ease] hover:text-accent";

function FooterTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="relative mb-6 pb-3 text-[20px] font-semibold text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-accent">
      {children}
    </h3>
  );
}

// Cached because Cache Components does not allow a bare new Date() during prerender.
async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

// Copies .site-footer and .footer-grid from the PHP style.css.
export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer className="bg-footer pt-20 text-[15px] text-footer-text">
      <div className="er-container grid grid-cols-[1.2fr_1fr_1fr_1.1fr] gap-10 er-lg:grid-cols-2 er-md:grid-cols-1">
        <Reveal preset="footer">
          <Image
            src="/images/logo/logo-horizontal-light.png"
            alt="Eat Rrite"
            width={1162}
            height={332}
            className="mb-4 block h-[52px] w-auto"
          />
          <p>
            Science-backed, culturally-rooted nutrition coaching — so you learn how to Eat Rrite
            for life, without crash diets.
          </p>
          <p className="mt-3.5 text-sm">
            {site.address1} &amp; {site.address2}
            <br />
            <small className="text-muted-foreground">{site.locationsNote}</small>
          </p>
        </Reveal>
        <Reveal preset="footer">
          <FooterTitle>Quick Links</FooterTitle>
          <ul className="grid gap-3">
            {footerLinks.map(({ label, href }) => (
              <li key={href}>
                <Link className={link} href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal preset="footer">
          <FooterTitle>Programs</FooterTitle>
          <ul className="grid gap-3">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link className={link} href={programHref(p.slug)}>{p.short}</Link>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal preset="footer">
          <FooterTitle>Get In Touch</FooterTitle>
          <p><a className={link} href={site.emailHref}>{site.email}</a></p>
          <p><a className={link} href={site.phoneHref}>{site.phone}</a></p>
          <p>{site.hours}</p>
        </Reveal>
      </div>
      <div className="er-container mt-[60px] flex flex-wrap justify-between gap-4 border-t border-white/6 py-6 text-sm text-white/40">
        <span>&copy; {year} Eat Rrite. All rights reserved.</span>
        <span>Learn to Eat Rrite.</span>
      </div>
    </footer>
  );
}
