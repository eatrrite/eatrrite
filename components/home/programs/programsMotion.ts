import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The scroll animations of the home Programs section (chapters rise in, pictures ease in as they
// pass, the intro rail follows the chapter on screen). In its own file so GSAP (about 56 KB) is
// only downloaded once the section is near the screen, not with the first load of the page.
// Returns the cleanup that removes everything it added.
export function setupProgramsMotion(
  root: HTMLElement,
  setActive: (index: number) => void,
) {
  let removeListener = () => {};
  const context = gsap.context(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const chapters = Array.from(
      root.querySelectorAll<HTMLElement>("[data-program-chapter]"),
    );

    chapters.forEach((chapter, index) => {
      const media = chapter.querySelector<HTMLElement>("[data-chapter-media]");
      const image = chapter.querySelector<HTMLElement>("[data-chapter-image]");
      const copy = chapter.querySelector<HTMLElement>("[data-chapter-copy]");
      if (!media || !copy) return;

      if (reduced) {
        gsap.set([media, copy], { clearProps: "all" });
      } else {
        gsap.fromTo(
          media,
          { opacity: 0, y: 56 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: chapter,
              start: "top 88%",
              end: "top 40%",
              toggleActions: "play none none none",
              // Catch chapters already past the start (fast scroll / refresh).
              immediateRender: false,
              onRefresh(self) {
                if (self.progress > 0) self.animation?.progress(1);
              },
            },
          },
        );

        gsap.fromTo(
          copy,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.08,
            ease: "power3.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: chapter,
              start: "top 88%",
              end: "top 40%",
              toggleActions: "play none none none",
              immediateRender: false,
              onRefresh(self) {
                if (self.progress > 0) self.animation?.progress(1);
              },
            },
          },
        );

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.12 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: chapter,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            },
          );
        }
      }

      ScrollTrigger.create({
        trigger: chapter,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) setActive(index);
        },
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("load", refresh);
    const imgs = root.querySelectorAll("img");
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", refresh, { once: true });
    });

    removeListener = () => window.removeEventListener("load", refresh);
  }, root);
  return () => {
    removeListener();
    context.revert();
  };
}
