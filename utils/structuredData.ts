import { BRAND } from "@/constants/brand";

// JSON-LD builders (brief §6.4, §5.2). Review / AggregateRating is left out until real Google
// reviews are on the site: never fake or self-written.
const absolute = (path: string) => new URL(path, BRAND.url).toString();
const SAME_AS = Object.values(BRAND.socials).filter(Boolean);
const ORG_ID = `${BRAND.url}/#organization`;
const PERSON_ID = `${BRAND.url}/#mukta-patil`;
// Other ways people type the name, so "eatrrite" and "eat rrite" match the brand (Google site names).
const ALTERNATE_NAMES = ["Eatrrite", "EatRrite", "Eat Rrite Nutrition"];
// Online, across India and abroad: no city limits the service.
const AREA_SERVED = [{ "@type": "Country", name: "India" }, { "@type": "Place", name: "Worldwide (online)" }];
// Where Eat Rrite began (Hyderabad, Dehradun, Mumbai): brand history for Google, not a service area.
const FOUNDING_LOCATIONS = BRAND.origins.map((name) => ({ "@type": "Place", name: `${name}, India` }));
// Business addresses, primary (Sainikpuri, Secunderabad) first, matching the Google Business Profile.
const ADDRESSES = BRAND.addresses.map(({ street, locality, region }) => ({
  "@type": "PostalAddress",
  streetAddress: street,
  addressLocality: locality,
  addressRegion: region,
  addressCountry: "IN",
}));

export const organizationData = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: BRAND.name,
  alternateName: ALTERNATE_NAMES,
  url: BRAND.url,
  logo: absolute(BRAND.logo),
  image: absolute(BRAND.shareImage),
  telephone: "+919639877483",
  email: BRAND.email,
  founder: { "@id": PERSON_ID },
  foundingDate: "2018",
  foundingLocation: FOUNDING_LOCATIONS,
  address: ADDRESSES,
  areaServed: AREA_SERVED,
  sameAs: SAME_AS,
});

// The site's name for Google's search results (home page only).
export const websiteData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND.name,
  alternateName: ALTERNATE_NAMES,
  url: `${BRAND.url}/`,
  publisher: { "@id": ORG_ID },
});

// `articles`: Mukta's columns and interviews (Cosmic "credentials").
export const personData = (articles: readonly { title: string; href: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Mukta Patil",
  jobTitle: "Nutritionist, Yoga Teacher & Life Coach",
  image: absolute("/images/about/mukta-patil-nutritionist.jpg"),
  url: absolute("/about"),
  worksFor: { "@id": ORG_ID },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Indira Gandhi National Open University (IGNOU)" },
  hasCredential: [
    "Diploma in Nutrition and Health Education, IGNOU",
    "Certification, INFS Pune",
    "Coursework, Harvard University",
    "Coursework, Stanford University",
    "Coursework, Ludwig Maximilian University of Munich",
    "Coursework, University of Colorado",
    "Yoga Alliance certified yoga teacher (RYT-200)",
    "NLP Practitioner, NLP Academy",
    "Certified life coach",
  ].map((name) => ({ "@type": "EducationalOccupationalCredential", name })),
  award: "Global Sustainability Award 2024 (SDG-3, Good Health and Well-being)",
  sameAs: SAME_AS,
  subjectOf: articles.map((article) => ({ "@type": "Article", headline: article.title, url: article.href })),
});

export const faqData = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
});

export const serviceData = (name: string, description: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: absolute(path),
  provider: { "@id": ORG_ID },
  areaServed: AREA_SERVED,
});

export type Crumb = { name: string; path: string };

export const breadcrumbData = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absolute(crumb.path),
  })),
});
