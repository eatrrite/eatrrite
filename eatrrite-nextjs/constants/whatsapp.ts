import programs from "@/constants/programs/programs.json";

const NUMBER = "919639877483";
const DEFAULT_MESSAGE = "Hi, I'd like to book a consultation.";

// A WhatsApp chat link with the message already typed in.
export const whatsappLink = (message = DEFAULT_MESSAGE) => `https://wa.me/${NUMBER}?text=${encodeURIComponent(message)}`;

// The pre-filled message for each page, so every enquiry shows where it came from (brief §4).
// Program names only, never a person's health details.
const PAGE_MESSAGES: Record<string, string> = {
  "/": "Hi, I'd like to know more about Eat Rrite.",
  "/about": "Hi, I'd like to know more about working with Mukta.",
  "/programs": "Hi, I'd like to know about your programs.",
  "/pricing": "Hi, I'd like to know about the program plans.",
  "/book": "Hi, I'd like help booking a consultation.",
  "/contact": "Hi, I'd like to know more about Eat Rrite.",
  "/blog": "Hi, I read your blog and have a question.",
  "/media": "Hi, I saw Mukta in the media and would like to know more.",
  "/cohort": "Hi, I'd like to know about the cohort.",
};

export function whatsappMessageFor(pathname: string): string {
  const program = programs.find((item) => pathname === `/programs/${item.slug}`);
  if (program) return `Hi, I'd like to know about the ${program.short} program.`;
  return PAGE_MESSAGES[pathname] ?? DEFAULT_MESSAGE;
}
