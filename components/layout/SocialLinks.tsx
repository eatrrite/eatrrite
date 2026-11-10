import { faFacebookF, faInstagram, faMedium, faYoutube } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { Icon } from "@/components/shared/Icon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BRAND } from "@/constants/brand";

// Footer order: Instagram @eatrrite, YouTube, Facebook, Medium. One icon set
// (Font Awesome brands), so every icon has the same weight. An icon shows only once its link is set.
const LINKS: { href: string; label: string; icon: IconDefinition }[] = [
  // Hidden for now: Mukta's personal Instagram. Uncomment to show it again.
  // { href: BRAND.socials.instagramMukta, label: "Instagram @muktapatil01", icon: faInstagram },
  { href: BRAND.socials.instagram, label: "Instagram @eatrrite", icon: faInstagram },
  { href: BRAND.socials.youtube, label: "YouTube: Eat Rrite", icon: faYoutube },
  { href: BRAND.socials.facebook, label: "Facebook: Eat Rrite", icon: faFacebookF },
  { href: BRAND.socials.medium, label: "Medium: Mukta Patil's articles", icon: faMedium },
].filter((link) => link.href);

// Round social icons for the footer (brief §4), white on the beige footer, gold on hover, each
// with a shadcn tooltip naming the account.
export function SocialLinks() {
  return (
    <TooltipProvider delay={150}>
      <ul aria-label="Eat Rrite on social media" className="m-0 flex flex-wrap gap-2.5 p-0">
        {LINKS.map((link) => (
          <li key={link.href} className="list-none">
            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={link.label}
                    className="grid size-10 place-items-center rounded-full bg-white text-base text-primary shadow-xs transition-colors hover:bg-accent hover:text-ink"
                  />
                }
              >
                <Icon icon={link.icon} />
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={8}>{link.label}</TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </TooltipProvider>
  );
}
