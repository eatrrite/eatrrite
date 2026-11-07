import { SectionHeading } from "@/components/site/section-heading";
import about from "@/lib/data/about.json";

// Copies .about-mission from pages.css.
export function AboutMission() {
  const { mission } = about;
  return (
    <section className="er-section bg-white">
      <div className="er-container">
        <SectionHeading pill={mission.pill} title={mission.title} center={false} split={false} />
        <div className="grid gap-6 min-[800px]:grid-cols-3">
          {mission.cards.map((card) => (
            <article
              key={card.title}
              className="rounded-lg border border-border-hover bg-cream p-6 shadow-card"
            >
              <h3>{card.title}</h3>
              {/* PHP uses nl2br with pre-line, which doubles each line break. */}
              <p className="whitespace-pre-line">{card.text.replaceAll("\n", "\n\n")}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
