import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faBatteryQuarter, faCalendarXmark, faClipboardList, faComments, faCookieBite, faCreditCard, faDroplet,
  faHandDots, faHeartPulse, faLeaf, faMobileScreen, faMoon, faPeopleGroup, faUserDoctor, faVial, faWeightScale,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

// The Font Awesome names used in constants/cohort/content.json, as on cohort.php.
const ICONS: Record<string, IconDefinition> = {
  "fa-weight-scale": faWeightScale,
  "fa-battery-quarter": faBatteryQuarter,
  "fa-cookie-bite": faCookieBite,
  "fa-hand-dots": faHandDots,
  "fa-moon": faMoon,
  "fa-heart-pulse": faHeartPulse,
  "fa-droplet": faDroplet,
  "fa-calendar-xmark": faCalendarXmark,
  "fa-leaf": faLeaf,
  "fa-mobile-screen": faMobileScreen,
  "fa-instagram": faInstagram,
  "fa-user-doctor": faUserDoctor,
  "fa-comments": faComments,
  "fa-vial": faVial,
  "fa-clipboard-list": faClipboardList,
  "fa-people-group": faPeopleGroup,
  "fa-credit-card": faCreditCard,
};

export const cohortIcon = (name: string) => ICONS[name] ?? faLeaf;
