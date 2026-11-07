"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "cn";

// main.js changes slide every 5000 ms. style.css fades over 1.5 s.
export function HeroSlides({ slides }: { slides: string[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return slides.map((src, i) => (
    <div
      key={src}
      className={cn(
        "absolute inset-0 z-1 transition-opacity duration-[1500ms] ease-in-out",
        i === current ? "opacity-100" : "opacity-0"
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        quality={90}
        priority={i === 0}
        loading={i === 0 ? undefined : "eager"}
        className="object-cover object-center"
      />
    </div>
  ));
}
