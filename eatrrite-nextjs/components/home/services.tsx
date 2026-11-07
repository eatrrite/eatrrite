import Image from "next/image";
import Link from "next/link";
import {
  faArrowRight,
  faDroplet,
  faLeaf,
  faVenus,
  faWheatAwn,
} from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/site/button-link";
import { Icon } from "@/components/site/icon";
import { SectionHeading } from "@/components/site/section-heading";
import { Card } from "@/components/ui/card";
import home from "@/lib/data/home.json";
import programs from "@/lib/data/programs.json";
import { programHref } from "@/lib/data/site";

// Same order as 'icons' in constants/home/services.php.
const icons = [faWheatAwn, faDroplet, faLeaf, faVenus];

// Copies .svc-card--photo from match.css with the .svc-card hover from style.css.
export function Services() {
  const { services } = home;
  return (
    <section id="services" className="er-section bg-white">
      <div className="er-container">
        <SectionHeading pill={services.pill} title={services.title} lead={services.lead} />
        <div className="grid grid-cols-4 items-stretch gap-[22px] er-md:grid-cols-2 er-sm:grid-cols-1">
          {programs.map((p, i) => (
            <Reveal key={p.slug} preset="card" className="group/svc h-full">
              <Card
                lift={false}
                className="relative h-full gap-0 overflow-hidden rounded-xl p-0 shadow-none transition-[transform,translate,scale,rotate,box-shadow,background-color,border-color] duration-[350ms] ease-[ease] group-hover/svc:-translate-y-2 group-hover/svc:border-transparent group-hover/svc:bg-transparent group-hover/svc:shadow-svc-hover"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.short}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-[ease] group-hover/svc:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(1,78,78,0.9),rgba(1,78,78,0.4),transparent)]" />
                  <div className="absolute inset-0 z-2 flex flex-col justify-end gap-2.5 p-5">
                    <div className="grid size-11 shrink-0 place-items-center rounded-full border-[1.5px] border-transparent bg-accent text-lg text-ink transition-[transform,translate,scale,rotate,background-color,border-color,color] duration-300 ease-[ease] group-hover/svc:scale-105 group-hover/svc:border-white/55 group-hover/svc:bg-transparent group-hover/svc:text-white">
                      <Icon icon={icons[i]} />
                    </div>
                    <h3 className="m-0 text-[clamp(18px,1.35vw,20px)] leading-[1.25] font-semibold text-white">
                      {p.short}
                    </h3>
                    <p className="m-0 text-[13px] leading-[1.6] text-white/85 transition-colors duration-300 ease-[ease] group-hover/svc:text-white/88">
                      {p.summary}
                    </p>
                    <Link
                      href={programHref(p.slug)}
                      aria-label={`Learn more about ${p.short}`}
                      className="mt-auto inline-grid size-10 shrink-0 place-items-center rounded-full bg-white/15 text-base text-white transition-[transform,translate,scale,rotate,background-color] duration-[350ms] ease-[ease] hover:translate-x-1 hover:scale-[1.06] hover:bg-accent-hover"
                    >
                      <Icon icon={faArrowRight} />
                    </Link>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <ButtonLink href={services.cta.href}>{services.cta.label}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
