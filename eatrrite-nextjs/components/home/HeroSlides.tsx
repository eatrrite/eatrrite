"use client";

import { useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MAX_BLUR_PX = 10;
// Looping needs more slides than the viewport shows, so a short list is repeated.
const MIN_LOOP_SLIDES = 4;

// Blurs each slide by how far it is from the centre, so a slide sharpens as it arrives and
// softens as it leaves. This is embla's loop-aware tween pattern, with blur as the effect.
function blurSlides(embla: EmblaCarouselType) {
  const engine = embla.internalEngine();
  const progress = embla.scrollProgress();
  const snaps = embla.scrollSnapList();
  const nodes = embla.slideNodes();

  snaps.forEach((snap, snapIndex) => {
    engine.slideRegistry[snapIndex].forEach((slideIndex) => {
      let distance = snap - progress;
      // A slide moved to the other end of the loop is measured from its looped position.
      engine.slideLooper.loopPoints.forEach((point) => {
        const target = point.target();
        if (slideIndex !== point.index || target === 0) return;
        distance = target < 0 ? snap - (1 + progress) : snap + (1 - progress);
      });
      const blur = Math.min(1, Math.abs(distance * snaps.length)) * MAX_BLUR_PX;
      nodes[slideIndex].style.filter = `blur(${blur.toFixed(2)}px)`;
    });
  });
}

// Same glass look as the four feature icons (translucent, white border, gold icon), on a teal base
// so they stay readable over the lightest part of the image.
const arrow =
  "flex size-10 cursor-pointer items-center justify-center rounded-xl border border-white/25 bg-primary/55 text-accent shadow-lg backdrop-blur-md transition-colors duration-300 outline-none hover:border-accent/60 hover:bg-primary/80 focus-visible:ring-2 focus-visible:ring-accent";

// Background slides: slide and blur between images, automatically every 5 seconds, with previous
// and next arrows on the right edge. The overlay and the text above it do not move.
export function HeroSlides({ slides }: { slides: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 32 }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const track = slides.length < MIN_LOOP_SLIDES ? [...slides, ...slides] : slides;

  useEffect(() => {
    if (!emblaApi) return;
    blurSlides(emblaApi);
    emblaApi.on("scroll", blurSlides).on("reInit", blurSlides);
    return () => {
      emblaApi.off("scroll", blurSlides).off("reInit", blurSlides);
    };
  }, [emblaApi]);

  // Pressing an arrow restarts the 5 second timer, so the slide it brings in is not replaced at once.
  function go(direction: "prev" | "next") {
    if (!emblaApi) return;
    if (direction === "prev") emblaApi.scrollPrev();
    else emblaApi.scrollNext();
    emblaApi.plugins().autoplay?.reset();
  }

  return (
    <>
      <div ref={emblaRef} className="absolute inset-0 z-1 overflow-hidden">
        <div className="flex h-full">
          {track.map((src, i) => (
            <div key={`${src}-${i}`} className="relative h-full min-w-0 flex-[0_0_100%]">
              <Image src={src} alt="" fill sizes="100vw" quality={90} priority={i === 0} loading={i === 0 ? undefined : "eager"} className="object-cover object-center" />
            </div>
          ))}
        </div>
      </div>
      {/* Only where there is room beside the text. On phones the hero swipes and plays by itself. */}
      <div className="absolute top-1/2 right-4 z-4 hidden -translate-y-1/2 flex-col gap-3 md:flex lg:right-6">
        <button type="button" aria-label="Previous slide" className={arrow} onClick={() => go("prev")}>
          <ChevronLeft className="size-4" strokeWidth={1.75} />
        </button>
        <button type="button" aria-label="Next slide" className={arrow} onClick={() => go("next")}>
          <ChevronRight className="size-4" strokeWidth={1.75} />
        </button>
      </div>
    </>
  );
}
