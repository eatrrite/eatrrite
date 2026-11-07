"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import home from "@/constants/home/content.json";
import { TestimonialCard } from "./TestimonialCard";

const ITEMS = home.testimonials.items;

// Copies ReviewsCarousel from Deccan Dentics: looping, autoplay, focused centre card.
export function TestimonialsCarousel() {
  const [selected, setSelected] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [Autoplay({ delay: 4500, stopOnInteraction: true })]);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden px-2" ref={emblaRef}>
        <div className="flex touch-pan-y items-stretch py-10 sm:py-12">
          {ITEMS.map((item, index) => (
            <div key={item.name} className="min-w-0 shrink-0 grow-0 basis-full px-2 sm:basis-1/2 lg:basis-1/3">
              <TestimonialCard item={item} index={index} focused={index === selected} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-center gap-3">
        <Button type="button" variant="outline" size="icon" aria-label="Previous testimonial" onClick={() => emblaApi?.scrollPrev()}>
          <ChevronLeft className="size-4" />
        </Button>
        <div className="flex gap-1.5">
          {ITEMS.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Go to testimonial ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn("size-2 cursor-pointer rounded-full transition-all", index === selected ? "w-5 bg-primary" : "bg-border hover:bg-muted-foreground/40")}
            />
          ))}
        </div>
        <Button type="button" variant="outline" size="icon" aria-label="Next testimonial" onClick={() => emblaApi?.scrollNext()}>
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
