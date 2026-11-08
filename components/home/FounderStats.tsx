import Link from "next/link";
import home from "@/constants/home/content.json";

type Stat = { value: string; label: string; href?: string };

// Timeline of stats with numbered rows, as in the reference design AboutStats.
export function FounderStats() {
  return (
    <ol className="mt-8 mb-0 grid gap-1 border-l border-border pl-5">
      {(home.about.stats as Stat[]).map((stat, index) => {
        const row = (
          <div className="flex items-baseline justify-between gap-4 rounded-md px-3 py-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-secondary/80">
            <div>
              <p className="m-0 font-heading text-2xl font-bold text-ink transition-colors duration-300 group-hover:text-primary sm:text-3xl">{stat.value}</p>
              <p className="m-0 mt-0.5 text-sm text-text">{stat.label}</p>
            </div>
            <span className="text-xs text-muted-foreground/60 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          </div>
        );
        return (
          <li key={stat.label} className="group relative">
            <span aria-hidden className="absolute top-1/2 -left-[1.53rem] size-2.5 -translate-y-1/2 rounded-full border-2 border-white bg-primary transition-all duration-300 group-hover:scale-125" />
            {stat.href ? <Link href={stat.href}>{row}</Link> : row}
          </li>
        );
      })}
    </ol>
  );
}
