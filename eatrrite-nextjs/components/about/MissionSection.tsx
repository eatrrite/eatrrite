import { BlurInItem } from "@/components/motion/BlurIn";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import about from "@/constants/about/content.json";
import { pageFood } from "@/constants/home/floatingFood";

// Mission, vision and approach as numbered cards.
export function MissionSection() {
  const { mission } = about;
  return (
    <PageSection tone="white" food={pageFood(3)}>
      <SectionIntro eyebrow={mission.pill} title={mission.title} count={mission.cards.length} />
      <ol className="mt-10 mb-0 grid gap-5 p-0 md:grid-cols-3">
        {mission.cards.map((card, index) => (
          <BlurInItem key={card.title} delay={0.1 + index * 0.08} className="group rounded-lg border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:bg-mint">
            <span className="font-heading text-3xl font-bold text-primary/20 tabular-nums transition-colors group-hover:text-primary/40">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 mb-0 font-heading text-xl font-bold text-ink">{card.title}</h3>
            {/* PHP uses nl2br with pre-line, which doubles each line break. */}
            <p className="mt-2 mb-0 text-sm leading-relaxed whitespace-pre-line text-text">{card.text.replaceAll("\n", "\n\n")}</p>
          </BlurInItem>
        ))}
      </ol>
    </PageSection>
  );
}
