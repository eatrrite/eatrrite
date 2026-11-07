// App routes, kept in one place.
export const ROUTES = {
  home: "/",
  about: "/about",
  programs: "/programs",
  pricing: "/pricing",
  blog: "/blog",
  contact: "/contact",
  appointment: "/appointment",
  appointmentConfirmed: "/appointment-confirmed",
} as const;

export const programPath = (slug: string) => `${ROUTES.programs}/${slug}`;

export const confirmedPath = (appointmentId: string) =>
  `${ROUTES.appointmentConfirmed}?appointmentId=${appointmentId}`;

export const NAV_LINKS = [
  { label: "Home", href: ROUTES.home },
  { label: "About", href: ROUTES.about },
  { label: "Programs", href: ROUTES.programs },
  { label: "Pricing", href: ROUTES.pricing },
  { label: "Blog", href: ROUTES.blog },
  { label: "Contact", href: ROUTES.contact },
];

export const FOOTER_LINKS = [
  { label: "Home", href: ROUTES.home },
  { label: "About Us", href: ROUTES.about },
  { label: "Programs", href: ROUTES.programs },
  { label: "Pricing", href: ROUTES.pricing },
  { label: "Blog", href: ROUTES.blog },
  { label: "Appointment", href: ROUTES.appointment },
  { label: "Contact", href: ROUTES.contact },
];
