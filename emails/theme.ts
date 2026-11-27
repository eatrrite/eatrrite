// The site's colours (app/globals.css) and type, written inline because mail apps drop
// stylesheets. Headings use Libre Baskerville and text Merriweather where the mail app loads
// web fonts (Apple Mail, iOS); everywhere else Georgia keeps the same serif look.
export const EMAIL_COLORS = {
  primary: "#014e4e",
  primaryDark: "#003636",
  accent: "#e5b858",
  cream: "#f8f5f0",
  beige: "#f8f2e7",
  ink: "#1c2029",
  text: "#595b62",
  muted: "#819291",
  border: "rgba(1,78,78,0.12)",
};

export const HEADING_FONT = "'Libre Baskerville',Georgia,'Times New Roman',serif";
export const BODY_FONT = "Merriweather,Georgia,'Times New Roman',serif";

// Every value put into an email goes through this, so a name like "<b>" shows as text.
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
