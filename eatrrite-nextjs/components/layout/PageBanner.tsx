import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

// Copies .page-banner--photo from pages.css. Timings are from main.js.
export function PageBanner({ title, crumb }: { title: string; crumb?: string }) {
  return (
    <section className="relative overflow-hidden py-20 text-center text-white">
      <Image
        src="/images/hero/healthy-plate.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-primary/80" />
      <div className="er-container relative z-2">
        <Reveal preset="banner" immediate>
          <nav
            aria-label="Breadcrumb"
            className="mb-3 flex justify-center gap-2 text-[13px] tracking-[0.12em] text-white/75 uppercase"
          >
            <Link href="/" className="hover:text-accent">Home</Link>
            <span aria-hidden>/</span>
            <span>{crumb ?? title}</span>
          </nav>
        </Reveal>
        <Reveal preset="banner" immediate delay={0.1}>
          <h1 className="type-banner mb-3 text-white">{title}</h1>
        </Reveal>
      </div>
    </section>
  );
}
