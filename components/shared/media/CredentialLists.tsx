import { Mic, Newspaper, Sparkles, type LucideIcon } from "lucide-react";
import { BlurInItem } from "@/components/motion/BlurIn";
import credentials from "@/constants/about/credentials.json";

// "Featured in" and "Spoken at" (brief §5.2) as two cards of name chips. Publication names are
// plain text, never newspaper logos.
const ICONS: Record<string, LucideIcon> = { "Featured in": Newspaper, "Spoken at": Mic };

export function CredentialLists() {
  return (
    <ul className="m-0 grid gap-4 p-0 md:grid-cols-2">
      {credentials.rows.slice(1).map((row, index) => {
        const Icon = ICONS[row.label] ?? Sparkles;
        return (
          <BlurInItem key={row.label} delay={0.05 + index * 0.08} className="h-full list-none">
            <div className="relative h-full overflow-hidden rounded-lg border border-border bg-white p-6">
              <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-primary/70 to-accent" />
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-white">
                  <Icon aria-hidden className="size-[18px]" />
                </span>
                <h3 className="m-0 type-eyebrow text-2xl">{row.label}</h3>
              </div>
              <ul className="mt-4 mb-0 flex flex-wrap gap-2 p-0">
                {row.text.split(" · ").map((name) => (
                  <li key={name} className="list-none rounded-full border border-border bg-mint px-3.5 py-1.5 text-sm font-medium text-ink">{name}</li>
                ))}
              </ul>
            </div>
          </BlurInItem>
        );
      })}
    </ul>
  );
}
