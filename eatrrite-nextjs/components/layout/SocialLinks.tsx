import { faInstagram, faLinkedinIn, faMedium } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { Icon } from "@/components/shared/Icon";
import { BRAND } from "@/constants/brand";

const LINKS: { href: string; label: string; icon: IconDefinition }[] = [
  { href: BRAND.socials.instagramMukta, label: "Instagram @muktapatil01", icon: faInstagram },
  { href: BRAND.socials.instagram, label: "Instagram @eatrrite", icon: faInstagram },
  { href: BRAND.socials.linkedin, label: "LinkedIn: Mukta Patil", icon: faLinkedinIn },
  { href: BRAND.socials.medium, label: "Medium: Mukta Patil", icon: faMedium },
];

// Round social icons for the footer (brief §4), in the site's mint and primary colours.
export function SocialLinks() {
  return (
    <ul aria-label="Eat Rrite on social media" className="m-0 flex flex-wrap gap-2.5 p-0">
      {LINKS.map((link) => (
        <li key={link.href} className="list-none">
          <a
            href={link.href}
            target="_blank"
            rel="noopener"
            aria-label={link.label}
            title={link.label}
            className="grid size-10 place-items-center rounded-full bg-mint text-base text-primary transition-colors hover:bg-primary hover:text-white"
          >
            <Icon icon={link.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
