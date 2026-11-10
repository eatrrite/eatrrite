import Link from "next/link";
import { ArrowRight } from "lucide-react";
import credentials from "@/constants/about/credentials.json";
import { ROUTES } from "@/constants/routes";

// One-line strip under the hero that links to Credentials & Media on About (brief §5.2).
export function CredentialsStrip() {
  return (
    <div className="border-b border-accent/25 bg-beige">
      <div className="er-container py-4">
        <Link
          href={`${ROUTES.about}#${credentials.id}`}
          className="group flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm font-semibold text-primary"
        >
          <span>{credentials.homeStrip}</span>
          <ArrowRight aria-hidden className="size-4 text-accent-deep transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
