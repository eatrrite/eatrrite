import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { cn } from "cn";
import { BRAND } from "@/constants/brand";
import { Icon } from "@/components/shared/Icon";

const action =
  "grid size-14 place-items-center rounded-full text-[22px] shadow-float transition-[transform,translate,scale,rotate,box-shadow] duration-[250ms] ease-[ease] hover:-translate-y-[3px] hover:scale-[1.04] hover:shadow-float-hover er-sm:size-[50px] er-sm:text-xl";

// Copies .float-actions from the PHP style.css.
export function FloatActions() {
  return (
    <div
      aria-label="Quick contact"
      className="fixed right-5 bottom-5 z-40 flex flex-col items-center gap-3 er-sm:right-3.5 er-sm:bottom-3.5 er-sm:gap-2.5"
    >
      <a className={cn(action, "bg-accent text-ink")} href={BRAND.phoneHref} aria-label={`Call ${BRAND.phone}`}>
        <Icon icon={faPhone} />
      </a>
      <a
        className={cn(action, "bg-whatsapp text-white")}
        href={BRAND.whatsapp}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
      >
        <Icon icon={faWhatsapp} />
      </a>
    </div>
  );
}
