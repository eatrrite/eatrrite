import Image from "next/image";
import { Plus, Star } from "lucide-react";
import { cn } from "cn";
import home from "@/constants/home/content.json";

const PHOTOS = home.testimonials.items.flatMap((item) => (item.image ? [{ src: item.image, name: item.name }] : []));
const LIVES = home.about.stats.find((stat) => stat.label === "Lives Transformed")?.value ?? "500+";

// reference design "Trusted by" badge, using the testimonial photos and the
// "Lives Transformed" stat already on the site.
export function HeroTrustBadge({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-3 rounded-2xl border border-white/60 bg-white/95 px-3 py-2.5 shadow-lg backdrop-blur-sm sm:gap-4 sm:px-4 sm:py-3", className)}>
      <div className="flex items-center">
        {PHOTOS.map((photo, index) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt=""
            width={80}
            height={80}
            className={cn("size-9 rounded-full border-[2.5px] border-white object-cover shadow-xs sm:size-10", index > 0 && "-ml-2.5")}
            style={{ zIndex: PHOTOS.length - index }}
          />
        ))}
        <span aria-hidden className="-ml-2.5 inline-flex size-9 items-center justify-center rounded-full border-[2.5px] border-white bg-beige text-text shadow-xs sm:size-10">
          <Plus className="size-4" strokeWidth={2.25} />
        </span>
      </div>
      <div className="min-w-0">
        <p className="m-0 text-xs font-medium text-ink sm:text-sm">Trusted by {LIVES} happy people</p>
        <div className="mt-1 flex items-center gap-0.5 text-accent" aria-label="5 out of 5 stars">
          {[0, 1, 2, 3, 4].map((n) => <Star key={n} className="size-3.5 fill-current" />)}
        </div>
      </div>
    </div>
  );
}
