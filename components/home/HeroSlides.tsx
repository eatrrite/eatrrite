"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHeroSlide } from "@/components/home/hero/HeroSlideContext";
import { cn } from "cn";

const SWIPE_PX = 40;

// Round glass buttons in one frosted pill on the right edge, with the slide count between them.
// White chevrons; on hover the button fills gold with dark text, like the gold Get Consultation.
const arrow =
  "flex size-11 cursor-pointer items-center justify-center rounded-full text-white transition-[background-color,color,scale] duration-300 outline-none hover:bg-accent hover:text-ink active:scale-95 focus-visible:ring-2 focus-visible:ring-accent";

// Background slides, stacked: the current one fades in and sharpens while the last one fades
// out and blurs. Previous and next arrows on the right edge and a swipe on phones. The slide
// clock lives in HeroSlideProvider, so the headline changes with the picture.
export function HeroSlides({ images }: { images: string[] }) {
  const { active, go } = useHeroSlide();
  const touchX = useRef<number | null>(null);

  const onTouchEnd = (x: number) => {
    if (touchX.current === null) return;
    const moved = x - touchX.current;
    touchX.current = null;
    if (Math.abs(moved) >= SWIPE_PX) go(moved < 0 ? 1 : -1);
  };

  return (
    <>
      <div
        className="absolute inset-0 z-1 overflow-hidden"
        onTouchStart={(event) => (touchX.current = event.touches[0].clientX)}
        onTouchEnd={(event) => onTouchEnd(event.changedTouches[0].clientX)}
      >
        {images.map((src, i) => (
          <div
            key={src}
            aria-hidden={i !== active}
            className={cn(
              "absolute inset-0 transition-[opacity,filter] duration-1000 ease-out motion-reduce:transition-none",
              i === active ? "opacity-100 blur-0" : "opacity-0 blur-md",
            )}
          >
            <Image src={src} alt="" fill sizes="100vw" quality={90} priority={i === 0} loading={i === 0 ? undefined : "eager"} className="object-cover object-center" />
          </div>
        ))}
      </div>
      {/* Only where there is room beside the text. On phones the hero swipes and plays by itself. */}
      <div className="absolute top-1/2 right-4 z-4 hidden -translate-y-1/2 flex-col items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1.5 shadow-lg backdrop-blur-md md:flex lg:right-6">
        <button type="button" aria-label="Previous slide" className={arrow} onClick={() => go(-1)}>
          <ChevronLeft className="size-5" strokeWidth={2} />
        </button>
        <span aria-live="polite" className="py-1 font-heading text-xs text-white/85 tabular-nums">
          <span className="font-bold text-accent">{String(active + 1).padStart(2, "0")}</span>
          <span className="mx-0.5 text-white/40">/</span>
          {String(images.length).padStart(2, "0")}
        </span>
        <button type="button" aria-label="Next slide" className={arrow} onClick={() => go(1)}>
          <ChevronRight className="size-5" strokeWidth={2} />
        </button>
      </div>
    </>
  );
}
