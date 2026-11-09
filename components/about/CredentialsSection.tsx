import { BlurIn, BlurInItem } from "@/components/motion/BlurIn";
import { CredentialHighlights } from "@/components/shared/media/CredentialHighlights";
import { CredentialLists } from "@/components/shared/media/CredentialLists";
import { ReadCards } from "@/components/shared/media/ReadCards";
import { PageSection } from "@/components/shared/section/PageSection";
import credentials from "@/constants/about/credentials.json";
import { pageFood } from "@/constants/home/floatingFood";

// Credentials & Media (brief §5.2), below the story on About. Left: the heading, subtitle and
// highlight tiles, held in view while the story scrolls. Right: the story as a timeline. Then
// "Featured in" and "Spoken at", and the "Read" cards. All words are the brief's.
export function CredentialsSection() {
  const last = credentials.paragraphs.length - 1;
  return (
    <PageSection id={credentials.id} tone="mint" food={pageFood(2)} className="scroll-mt-24">
      <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <BlurIn>
            <h2 className="m-0 font-heading text-3xl leading-tight font-bold tracking-tight text-ink sm:text-4xl">{credentials.title}</h2>
          </BlurIn>
          <BlurIn delay={0.05}>
            <p className="mt-3 mb-0 font-heading text-lg text-primary italic">{credentials.subtitle}</p>
          </BlurIn>
          <BlurIn delay={0.1}>
            <span aria-hidden className="mt-5 block h-[3px] w-12 rounded-full bg-accent" />
          </BlurIn>
          <CredentialHighlights className="mt-8" />
        </div>

        <ol className="m-0 grid gap-6 border-l border-primary/15 p-0 pl-6 sm:pl-8">
          {credentials.paragraphs.map((paragraph, index) => (
            <BlurInItem key={paragraph} delay={0.05 + index * 0.04} className="relative list-none">
              <span aria-hidden className={index === last ? "absolute top-1.5 -left-[1.95rem] size-3.5 rounded-full border-2 border-white bg-accent shadow-xs sm:-left-[2.45rem]" : "absolute top-1.5 -left-[1.85rem] size-3 rounded-full border-2 border-white bg-primary sm:-left-[2.35rem]"} />
              <p className={index === last ? "m-0 font-heading text-lg leading-relaxed text-primary italic" : "m-0 leading-relaxed text-text"}>{paragraph}</p>
            </BlurInItem>
          ))}
        </ol>
      </div>

      <div className="mt-14">
        <CredentialLists />
      </div>

      <div className="mt-14">
        <BlurIn>
          <h3 className="m-0 type-eyebrow">Read</h3>
        </BlurIn>
        <div className="mt-4">
          <ReadCards />
        </div>
      </div>
    </PageSection>
  );
}
