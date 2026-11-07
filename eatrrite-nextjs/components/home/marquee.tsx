import home from "@/constants/home/content.json";

// Copies .marquee from style.css. The track holds two copies and slides by half.
export function Marquee() {
  return (
    <div aria-hidden className="group/marquee relative overflow-hidden bg-primary py-6 whitespace-nowrap text-white">
      <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center font-heading text-[28px] leading-[1.4] font-medium er-md:text-[22px]"
          >
            {home.marquee.map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-9 after:ml-18 after:text-[18px] after:text-accent after:content-['✦']"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
