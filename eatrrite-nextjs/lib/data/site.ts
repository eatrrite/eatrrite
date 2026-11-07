// Public site details, from includes/config.php on the PHP site.
export const site = {
  name: "Eat Rrite",
  phone: "+91 96398 77483",
  phoneHref: "tel:+919639877483",
  whatsapp:
    "https://api.whatsapp.com/send?phone=9639877483&text=Hi%20team.%20I%20would%20like%20to%20book%20a%20consultation.",
  email: "info@eatrrite.com",
  emailHref: "mailto:info@eatrrite.com",
  hours: "Mon – Sun : 10:00 am – 7:00 pm",
  address1: "Hyderabad, Telangana",
  address2: "Dehradun, Uttarakhand",
  locationsNote: "Consultations conducted online — join from anywhere",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Appointment", href: "/appointment" },
  { label: "Contact", href: "/contact" },
];

export const programHref = (slug: string) => `/programs/${slug}`;
