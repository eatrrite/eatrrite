import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "cn";

type Testimonial = { image?: string; name: string; role: string; quote: string };

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

// Copies ReviewCard from reference design, with the client photo as the avatar,
// or their initials when there is no photo.
export function TestimonialCard({ item, index, focused }: { item: Testimonial; index: number; focused: boolean }) {
  return (
    <article
      className={cn(
        "relative h-full overflow-hidden rounded-lg border border-border bg-white p-6 transition-all duration-500 ease-out",
        focused ? "z-10 scale-100 opacity-100 shadow-md lg:scale-[1.04]" : "scale-[0.97] opacity-70 lg:scale-[0.95]"
      )}
    >
      <span aria-hidden className="pointer-events-none absolute -top-3 -right-1 font-heading text-7xl leading-none font-bold text-accent/30">”</span>
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {item.image ? (
            <Image src={item.image} alt={item.name} width={96} height={96} className="size-12 rounded-full border-2 border-accent object-cover" />
          ) : (
            <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-accent bg-beige font-heading text-sm font-bold text-primary">
              {initials(item.name)}
            </span>
          )}
          <div>
            <p className="m-0 font-heading text-base font-bold text-ink">{item.name}</p>
            <p className="m-0 text-xs text-muted-foreground">{item.role}</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground/60 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="relative mt-3 flex gap-0.5 text-accent">
        {[0, 1, 2, 3, 4].map((n) => (
          <Star key={n} className="size-4 fill-current" />
        ))}
      </div>
      <p className="relative mt-4 mb-0 text-sm leading-relaxed text-text">“{item.quote}”</p>
    </article>
  );
}
