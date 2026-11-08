import { ArrowUpRight } from "lucide-react";
import { BlurInItem } from "@/components/motion/BlurIn";
import credentials from "@/constants/about/credentials.json";

// "Read" cards for Mukta's articles and interviews. Each opens the publisher's page in a new
// tab: we link to their sites and never copy their text (brief §5.2, §5.3).
export function ReadCards() {
  return (
    <ul className="m-0 grid gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {credentials.articles.map((article, index) => (
        <BlurInItem key={article.href} delay={0.05 + index * 0.05} className="list-none">
          <a
            href={article.href}
            target="_blank"
            rel="noopener"
            className="group flex h-full flex-col rounded-lg border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:bg-mint"
          >
            <span className="text-xs text-muted-foreground">{article.source}</span>
            <span className="mt-2 font-heading text-lg leading-snug font-bold text-ink">{article.title}</span>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-primary">
              Read <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </span>
          </a>
        </BlurInItem>
      ))}
    </ul>
  );
}
