import { faClock, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { BRAND } from "@/constants/brand";
import { WorkingHours } from "@/components/layout/WorkingHours";
import { Icon } from "@/components/shared/Icon";

// Copies .topbar from the PHP style.css.
export function TopBar() {
  const link = "inline-flex items-center gap-2 whitespace-nowrap text-white/88 transition-colors duration-300 hover:text-accent";
  return (
    <div className="bg-primary py-2.5 text-[13px] text-white/88">
      <div className="er-container flex flex-wrap justify-between gap-4">
        <span className="inline-flex items-center gap-2">
          <Icon icon={faClock} className="text-accent" /> <WorkingHours />
        </span>
        <span className="inline-flex flex-wrap items-center gap-x-5 gap-y-2">
          <a className={link} href={BRAND.emailHref}>
            <Icon icon={faEnvelope} className="text-accent" /> {BRAND.email}
          </a>
          <a className={link} href={BRAND.phoneHref}>
            <Icon icon={faPhone} className="text-accent" /> {BRAND.phone}
          </a>
        </span>
      </div>
    </div>
  );
}
