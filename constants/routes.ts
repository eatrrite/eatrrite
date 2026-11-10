// App routes, kept in one place.
export const ROUTES = {
  home: "/",
  about: "/about",
  doctors: "/about/doctors",
  programs: "/programs",
  pricing: "/pricing",
  blog: "/blog",
  contact: "/contact",
  appointment: "/book",
  media: "/media",
  privacy: "/privacy-policy",
  appointmentConfirmed: "/appointment-confirmed",
  cohort: "/cohort",
} as const;

export const programPath = (slug: string) => `${ROUTES.programs}/${slug}`;


export const confirmedPath = (appointmentId: string) =>
  `${ROUTES.appointmentConfirmed}?appointmentId=${appointmentId}`;

type NavLink = { label: string; href: string; children?: { label: string; href: string }[] };

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: ROUTES.home },
  {
    label: "About",
    href: ROUTES.about,
    children: [
      { label: "Founder's Story", href: ROUTES.about },
      { label: "Doctors on Board", href: ROUTES.doctors },
    ],
  },
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
