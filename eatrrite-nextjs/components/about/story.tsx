import Image from "next/image";
import { SectionPill } from "@/components/site/section-heading";
import about from "@/lib/data/about.json";

// Copies .about-story from pages.css.
export function AboutStory() {
  const { story } = about;
  return (
    <section className="er-section">
      <div className="er-container grid items-center gap-10 min-[900px]:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
          <Image
            src={story.image}
            alt="Mukta Patil"
            fill
            priority
            sizes="(max-width: 899px) 100vw, 580px"
            className="object-cover"
          />
        </div>
        <div>
          <SectionPill>{story.pill}</SectionPill>
          <h2>{story.title}</h2>
          {story.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
