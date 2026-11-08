import { LinkButton } from "@/components/shared/section/LinkButton";
import copy from "@/constants/cohort/content.json";
import { ROUTES } from "@/constants/routes";

// cohort-sticky.php: the bar at the bottom of the page with the spots note and the booking button.
// Desktop only: on phones the site-wide WhatsApp / Book bar takes its place.
export function CohortSticky() {
  const { sticky } = copy;
  return (
    <div className="sticky bottom-0 z-30 hidden border-t border-border bg-white/95 backdrop-blur lg:block">
      <div className="er-container flex flex-wrap items-center justify-between gap-3 py-3 pr-20">
        <p className="m-0 text-sm font-bold text-ink">{sticky.text}</p>
        <LinkButton href={ROUTES.appointment}>{sticky.cta}</LinkButton>
      </div>
    </div>
  );
}
