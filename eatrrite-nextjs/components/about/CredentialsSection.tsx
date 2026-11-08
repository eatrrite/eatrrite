import { BlurIn } from "@/components/motion/BlurIn";
import { CredentialRows } from "@/components/shared/media/CredentialRows";
import { ReadCards } from "@/components/shared/media/ReadCards";
import { PageSection } from "@/components/shared/section/PageSection";
import credentials from "@/constants/about/credentials.json";
import { pageFood } from "@/constants/home/floatingFood";

// Credentials & Media (brief §5.2), below the story on About. The story runs as normal text,
// then the three rows and the "Read" cards, in the site's existing type and card styles.
export function CredentialsSection() {
  return (
    <PageSection id={credentials.id} tone="mint" food={pageFood(2)} className="scroll-mt-24">
      <div className="max-w-3xl">
        <BlurIn>
          <h2 className="m-0 font-heading text-3xl leading-tight font-bold tracking-tight text-ink sm:text-4xl">{credentials.title}</h2>
        </BlurIn>
        <BlurIn delay={0.05}>
          <p className="mt-3 mb-0 font-heading text-lg text-primary italic">{credentials.subtitle}</p>
        </BlurIn>
        {credentials.paragraphs.map((paragraph, index) => (
          <BlurIn key={paragraph} delay={0.1 + index * 0.03}>
            <p className="mt-4 mb-0 text-text">{paragraph}</p>
          </BlurIn>
        ))}
      </div>
      <div className="mt-10">
        <CredentialRows />
      </div>
      <div className="mt-10">
        <ReadCards />
      </div>
    </PageSection>
  );
}
