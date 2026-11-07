import { faClock, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { site } from "@/lib/data/site";
import { Icon } from "./icon";

// Copies .topbar from the PHP style.css.
export function TopBar() {
  const link = "inline-flex items-center gap-2 whitespace-nowrap text-white/88 transition-colors duration-300 hover:text-accent";
  return (
    <div className="bg-primary py-2.5 text-[13px] text-white/88">
      <div className="er-container flex flex-wrap justify-between gap-4">
        <span className="inline-flex items-center gap-2">
          <Icon icon={faClock} className="text-accent" /> {site.hours}
        </span>
        <span className="inline-flex flex-wrap items-center gap-x-5 gap-y-2">
          <a className={link} href={site.emailHref}>
            <Icon icon={faEnvelope} className="text-accent" /> {site.email}
          </a>
          <a className={link} href={site.phoneHref}>
            <Icon icon={faPhone} className="text-accent" /> {site.phone}
          </a>
        </span>
      </div>
    </div>
  );
}
