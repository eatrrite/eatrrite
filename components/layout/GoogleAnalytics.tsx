import Script from "next/script";
import { env } from "@/config/env";

// A GA4 measurement ID looks like G-ABC123XYZ. Anything else is ignored, so a typo never
// injects text into the inline script.
const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]{4,20}$/;

// GA4 on every public page, once GA_MEASUREMENT_ID is set. Page views only: no health details
// or personal data are sent (CLAUDE.md). Loads after the page is interactive, so it never slows
// the first screen.
export function GoogleAnalytics() {
  const measurementId = env.gaMeasurementId();
  if (!MEASUREMENT_ID_PATTERN.test(measurementId)) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","${measurementId}");`}
      </Script>
    </>
  );
}
