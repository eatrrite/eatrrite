import about from "@/constants/about/content.json";
import credentials from "@/constants/about/credentials.json";
import cohort from "@/constants/cohort/content.json";
import contact from "@/constants/contact/content.json";
import home from "@/constants/home/content.json";
import privacy from "@/constants/legal/privacy.json";
import pricing from "@/constants/pricing/content.json";
import programsPage from "@/constants/programs/content.json";
import packages from "@/constants/programs/packages.json";
import programs from "@/constants/programs/programs.json";
import booking from "@/features/appointment/constants/content.json";

// Every piece of site copy that Cosmic manages. The JSON files are three things at once:
// the first import into Cosmic, the shape Cosmic data is read back into, and the fallback the
// site shows when Cosmic cannot be reached.

// One Cosmic object each (a "singleton" object type). The key is the object type slug.
export const CMS_PAGES = {
  "home-page": { title: "Home Page", emoji: "🏠", content: home },
  "about-page": { title: "About Page", emoji: "👩‍⚕️", content: about },
  credentials: { title: "Credentials & Media", emoji: "🏅", content: credentials },
  "programs-page": { title: "Programs Page", emoji: "📋", content: programsPage },
  "pricing-page": { title: "Pricing Page", emoji: "🏷️", content: pricing },
  "cohort-page": { title: "Cohort Page", emoji: "👥", content: cohort },
  "contact-page": { title: "Contact Page", emoji: "✉️", content: contact },
  "booking-page": { title: "Booking Page", emoji: "📅", content: booking },
  "privacy-page": { title: "Privacy Policy", emoji: "🔒", content: privacy },
} as const;

// Many Cosmic objects each, in site order. `titleKey` names the field shown as the object title.
export const CMS_COLLECTIONS = {
  programs: { title: "Programs", singular: "Program", emoji: "🥗", titleKey: "name", items: programs },
  packages: { title: "Packages", singular: "Package", emoji: "📦", titleKey: "name", items: packages },
} as const;

export type CmsPageKey = keyof typeof CMS_PAGES;
export type CmsCollectionKey = keyof typeof CMS_COLLECTIONS;
export type CmsPage<K extends CmsPageKey> = (typeof CMS_PAGES)[K]["content"];
export type CmsItem<K extends CmsCollectionKey> = (typeof CMS_COLLECTIONS)[K]["items"][number];
