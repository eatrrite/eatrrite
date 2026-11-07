import { cn } from "cn";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Card } from "@/components/ui/card";
import packages from "@/constants/programs/packages.json";

type Package = { name: string; blurb: string; featured?: boolean };

// Copies .pricing-grid and .pricing-card. No fees: Mukta keeps them unpublished.
export function PackageGrid({ badge = false }: { badge?: boolean }) {
  return (
    <div className="mt-10 grid grid-cols-3 gap-6 er-md:grid-cols-1">
      {(packages as Package[]).map((pack) => (
        <Reveal key={pack.name} preset="card" className="h-full">
          <Card
            className={cn(
              "relative block h-full text-center",
              pack.featured &&
                "-translate-y-1.5 border-accent shadow-[0_24px_50px_rgba(229,184,88,0.2)]"
            )}
          >
            {badge && pack.featured ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold text-ink">
                Most Popular
              </span>
            ) : null}
            <h3>{pack.name}</h3>
            <p>{pack.blurb}</p>
            <ButtonLink href="/appointment">Get Consultation</ButtonLink>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
