// Brand manifest: one source for the name, contact details, links and colours.
// Used by the header, footer, SEO metadata and the web app manifest.
export const BRAND = {
  name: "Eat Rrite",
  // An online, worldwide brand: no city names and no "coaching" in titles or descriptions.
  tagline: "Holistic Nutrition and Wellbeing",
  description:
    "Eat Rrite is a nutrition and holistic wellness platform offering personalised diet programs, yoga, and lifestyle guidance.",
  url: "https://www.eatrrite.com",
  locale: "en_IN",
  founder: "Mukta Patil",
  phone: "+91 96398 77483",
  phoneHref: "tel:+919639877483",
  email: "info@eatrrite.com",
  emailHref: "mailto:info@eatrrite.com",
  whatsapp: "https://wa.me/919639877483?text=Hi%2C%20I%27d%20like%20to%20book%20a%20consultation.",
  address1: "Hyderabad, Telangana",
  address2: "Dehradun, Uttarakhand",
  // Header and footer hours line (brief §5.1); the exact slots stay on the booking page.
  hoursLine: "Consultations by appointment · Mon–Sun",
  locationsNote: "Consultations conducted online — join from anywhere",
  // Profiles from the brief (handles). YouTube and Facebook are added once Mukta shares the links.
  socials: {
    instagramMukta: "https://www.instagram.com/muktapatil01",
    instagram: "https://www.instagram.com/eatrrite",
    linkedin: "https://www.linkedin.com/in/19muktapatil",
    medium: "https://medium.com/@19mukta",
    youtube: "https://www.youtube.com/@eatrritebymuktapatil",
    facebook: "https://www.facebook.com/eatrrite",
  },
  // Footer line needed before ads (brief §4).
  disclaimer: "General guidance, not medical advice. With a medical condition, follow your doctor.",
  logo: "/images/logo/logo-horizontal.png",
  // Link preview card (WhatsApp, Facebook, LinkedIn, X, Slack, iMessage): the logo on brand colours.
  shareImage: "/images/og/eatrrite-share.jpg",
  shareImageAlt: "Eat Rrite logo: Holistic Nutrition and Wellbeing",
  themeColor: "#014e4e",
  backgroundColor: "#f8f5f0",
} as const;
