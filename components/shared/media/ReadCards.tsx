import { ArrowUpRight, BookOpen, Flame, Grape, HeartHandshake, Newspaper, PersonStanding, type LucideIcon } from "lucide-react";
import { BlurInItem } from "@/components/motion/BlurIn";
import credentials from "@/constants/about/credentials.json";

// Circular icon beside each article title — professional cue without copying publisher art.
const ICONS: [string, LucideIcon][] = [
  ["Paint Your Plate", Grape],
  ["Spicy", Flame],
  ["Strong Women", HeartHandshake],
  ["Science of Yoga", PersonStanding],
  ["Listen", BookOpen],
];
const iconFor = (title: string) => ICONS.find(([key]) => title.includes(key))?.[1] ?? Newspaper;

// "Read" cards for Mukta's articles and interviews. Each opens the publisher's page in a new
// tab: we link to their sites and never copy their text (brief §5.2, §5.3). The source line
// ("The New Indian Express, 8 Apr 2021") shows as a publisher tag and a date.
export function ReadCards() {
  return (
    <ul className="m-0 grid gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {credentials.articles.map((article, index) => {
        const [publisher, ...rest] = article.source.split(", ");
        const date = rest.join(", ");
        const Icon = iconFor(article.title);
        return (
          <BlurInItem key={article.href} delay={0.05 + index * 0.05} className="list-none">
            <a
              href={article.href}
              target="_blank"
              rel="noopener"
              className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-hover hover:shadow-card"
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              <span className="flex items-start justify-between gap-3">
                <span className="rounded-full bg-mint px-3 py-1 text-xs font-semibold text-primary">{publisher}</span>
                <span aria-hidden className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                  <ArrowUpRight className="size-4" />
                </span>
              </span>
              <span className="mt-4 flex items-start gap-3">
                <span aria-hidden className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/20 text-primary ring-1 ring-accent/50">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <span className="font-heading text-lg leading-snug font-bold text-ink">{article.title}</span>
              </span>
              <span className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4 text-sm">
                <span className="text-muted-foreground">{date}</span>
                <span className="font-semibold text-primary">Read<span className="sr-only"> (opens in a new tab)</span></span>
              </span>
            </a>
          </BlurInItem>
        );
      })}
    </ul>
  );
}
