import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbData, type Crumb } from "@/utils/structuredData";

// Copies .page-banner--photo from pages.css. Timings are from main.js.
// `path` adds BreadcrumbList data for Google; `parent` is the level between Home and this page.
export function PageBanner({ title, crumb, path, parent }: { title: string; crumb?: string; path: string; parent?: Crumb }) {
  return (
    <section className="relative overflow-hidden py-20 text-center text-white">
      <JsonLd data={breadcrumbData([...(parent ? [parent] : []), { name: title, path }])} />
      <Image
        src="/images/hero/healthy-plate.jpg"
        alt="A balanced plate of Indian food"
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
