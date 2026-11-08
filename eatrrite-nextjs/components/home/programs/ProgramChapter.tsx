import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { programPath } from "@/constants/routes";
import { LinkButton } from "@/components/shared/section/LinkButton";

type Program = {
  slug: string;
  short: string;
  image: string;
  summary: string;
  benefits: string[];
};

// One vertical program chapter for the sticky scroll rail.
export function ProgramChapter({
  program,
  index,
}: {
  program: Program;
  index: number;
}) {
  return (
    <article
      data-program-chapter
      data-index={index}
      className="flex min-h-[min(78vh,44rem)] flex-col justify-center gap-7 py-12 lg:py-16"
    >
      <div
        data-chapter-media
        className="relative aspect-[16/11] overflow-hidden rounded-xl bg-secondary sm:aspect-[5/3]"
      >
        <Image
          data-chapter-image
          src={program.image}
          alt={program.short}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/60 to-transparent px-5 pb-5 pt-16 text-white"
        >
          <p className="m-0 font-heading text-4xl font-bold tabular-nums opacity-85">
            {String(index + 1).padStart(2, "0")}
          </p>
        </div>
      </div>

      <div data-chapter-copy className="min-w-0 max-w-xl">
        <p className="m-0 type-eyebrow">
          Program {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-3 mb-0 font-heading text-2xl leading-tight font-bold text-ink sm:text-3xl">
          {program.short}
        </h3>
        <p className="mt-4 mb-0 text-text">{program.summary}</p>
        <ul className="mt-5 mb-0 grid gap-2.5 p-0">
          {program.benefits.slice(0, 3).map((benefit) => (
            <li key={benefit} className="flex items-start gap-2.5 text-sm text-ink">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              {benefit}
            </li>
          ))}
        </ul>
        <LinkButton href={programPath(program.slug)} className="mt-7 self-start px-5">
          Learn More
          <ArrowRight className="size-4" />
        </LinkButton>
      </div>
    </article>
  );
}
