import { BlurIn } from "@/components/motion/BlurIn";
import { LinkButton } from "@/components/shared/section/LinkButton";
import { cn } from "cn";
import packages from "@/constants/programs/packages.json";
import { ROUTES } from "@/constants/routes";

type Package = { name: string; blurb: string; featured?: boolean };

// Program lengths as reference-style cards. No fees: Mukta keeps them unpublished.
export function PackageCards({ badge = false }: { badge?: boolean }) {
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {(packages as Package[]).map((pack, index) => (
        <BlurIn key={pack.name} delay={0.1 + index * 0.08} className="h-full">
          <article
            className={cn(
              "group relative flex h-full flex-col gap-3 rounded-xl border bg-white p-6 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-primary hover:shadow-card-hover md:p-8",
              pack.featured ? "border-primary/40 shadow-card" : "border-border",
            )}
          >
            {/* A teal line draws across the top on hover. It sits in its own clipped layer inside the
                border, so it follows the card's rounded corners while the "Most Popular" tag, which
                sticks out above the card, is never cut. */}
            <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </span>
            {badge && pack.featured ? (
              <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ink">Most Popular</span>
            ) : null}
            <span className="font-heading text-3xl font-bold text-accent/45 tabular-nums transition-colors duration-300 group-hover:text-accent-deep">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="m-0 font-heading text-xl font-bold text-ink transition-colors duration-300 group-hover:text-primary">{pack.name}</h3>
            <p className="m-0 flex-1 text-sm leading-relaxed text-text">{pack.blurb}</p>
            {/* The outline buttons turn into the primary button while their card is hovered. */}
            <LinkButton
              href={ROUTES.appointment}
              variant={pack.featured ? "default" : "outline"}
              className={cn("mt-3 self-start px-5", !pack.featured && "group-hover:btn-primary")}
            >
              Get Consultation
            </LinkButton>
          </article>
        </BlurIn>
      ))}
    </div>
  );
}
