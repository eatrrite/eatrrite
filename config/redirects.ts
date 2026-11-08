import type { Redirect } from "next/dist/lib/load-custom-routes";

// Every old address 301-redirects to its new page (brief §3 and §6.3). Internal links use the
// new addresses directly; these only catch old links, bookmarks and Google results.

// Old program slugs (PHP program.php?slug=… and the first Next.js build) → clean addresses.
const PROGRAM_SLUGS: [string, string][] = [
  ["weight-lifestyle-management", "weight-loss-indian-food"],
  ["diabetes-management", "diabetes-diet-plan"],
  ["gut-health", "gut-health-diet"],
  ["female-hormone-health", "female-hormone-health"],
];

// Old PHP pages → new pages.
const PAGES: [string, string][] = [
  ["/index.php", "/"],
  ["/about.php", "/about"],
  ["/founder-profile.php", "/about"],
  ["/programs.php", "/programs"],
  ["/pricing.php", "/pricing"],
  ["/blog.php", "/blog"],
  ["/contact.php", "/contact"],
  ["/appointment.php", "/book"],
  ["/appointment", "/book"],
  ["/cohort.php", "/cohort"],
  ["/appointment-thank-you.php", "/book"],
  ["/appointment-confirmed.php", "/appointment-confirmed"],
  // Old site pages found in Google (brief §3). More are added once Search Console lists them.
  ["/nutricare-for-mom-to-be.php", "/programs/female-hormone-health"],
];

export function siteRedirects(): Redirect[] {
  const programQuery = PROGRAM_SLUGS.map(([from, to]) => ({
    source: "/program.php",
    has: [{ type: "query" as const, key: "slug", value: from }],
    destination: `/programs/${to}`,
    statusCode: 301 as const,
  }));
  const programPaths = PROGRAM_SLUGS.filter(([from, to]) => from !== to).map(([from, to]) => ({
    source: `/programs/${from}`,
    destination: `/programs/${to}`,
    statusCode: 301 as const,
  }));
  return [
    // One domain version: eatrrite.com → www.eatrrite.com, site-wide (brief §3).
    {
      source: "/:path*",
      has: [{ type: "host" as const, value: "eatrrite.com" }],
      destination: "https://www.eatrrite.com/:path*",
      statusCode: 301 as const,
    },
    ...programQuery,
    { source: "/program.php", destination: "/programs", statusCode: 301 },
    ...programPaths,
    { source: "/admin", destination: "/admin/dashboard", permanent: false },
    ...PAGES.map(([source, destination]) => ({ source, destination, statusCode: 301 as const })),
  ];
}
