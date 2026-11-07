import { BlurIn } from "@/components/motion/BlurIn";
import { LinkButton } from "@/components/shared/section/LinkButton";
import { cn } from "cn";
import packages from "@/constants/programs/packages.json";
import { ROUTES } from "@/constants/routes";

type Package = { name: string; blurb: string; featured?: boolean };

// Program lengths as Deccan-style cards. No fees: Mukta keeps them unpublished.
export function PackageCards({ badge = false }: { badge?: boolean }) {
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {(packages as Package[]).map((pack, index) => (
        <BlurIn key={pack.name} delay={0.1 + index * 0.08} className="h-full">
          <article
            className={cn(
              "relative flex h-full flex-col gap-3 rounded-xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card md:p-8",
              pack.featured ? "border-primary/40 shadow-card" : "border-border"
            )}
          >
            {badge && pack.featured ? (
              <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">Most Popular</span>
            ) : null}
            <span className="font-heading text-3xl font-bold text-primary/20 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="m-0 font-heading text-xl font-bold text-ink">{pack.name}</h3>
            <p className="m-0 flex-1 text-sm leading-relaxed text-text">{pack.blurb}</p>
            <LinkButton href={ROUTES.appointment} variant={pack.featured ? "default" : "outline"} className="mt-3 self-start px-5">
              Get Consultation
            </LinkButton>
          </article>
        </BlurIn>
      ))}
    </div>
  );
}
