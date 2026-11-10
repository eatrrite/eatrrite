"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { CalendarDays } from "lucide-react";
import { Icon } from "@/components/shared/Icon";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { whatsappLink, whatsappMessageFor } from "@/constants/whatsapp";

const floatBtn =
  "grid size-14 place-items-center rounded-full text-[22px] shadow-float transition-[translate,scale,box-shadow] duration-[250ms] hover:-translate-y-[3px] hover:scale-[1.04] hover:shadow-float-hover";

// Phones: sticky WhatsApp + Book bar. Desktop: two floating buttons, bottom right.
export function FloatActions() {
  const pathname = usePathname();
  const href = whatsappLink(whatsappMessageFor(pathname));

  return (
    <>
      <div
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur lg:hidden"
      >
        {/* Under 380px two labelled halves no longer fit, so WhatsApp becomes an icon button
            (its label stays for screen readers) and Book Appointment takes the rest. */}
        <div className="er-container grid grid-cols-2 gap-3 py-3 max-[379px]:grid-cols-[auto_1fr] max-[379px]:gap-2">
          <Button
            size="lg"
            variant="outline"
            className="w-full border-whatsapp text-ink max-[379px]:w-11 max-[379px]:px-0"
            nativeButton={false}
            render={<a href={href} target="_blank" rel="noopener" />}
          >
            <Icon icon={faWhatsapp} className="text-whatsapp max-[379px]:text-xl" />
            <span className="max-[379px]:sr-only">WhatsApp</span>
          </Button>
          <Button
            size="lg"
            className="w-full min-w-0"
            nativeButton={false}
            render={<Link prefetch={false} href={ROUTES.appointment} />}
          >
            <CalendarDays />
            Book Appointment
          </Button>
        </div>
      </div>

      <div
        aria-label="Quick contact"
        className="fixed right-5 bottom-5 z-40 hidden flex-col items-center gap-3 lg:flex"
      >
        <Link
          prefetch={false}
          href={ROUTES.appointment}
          aria-label="Book Appointment"
          className={`${floatBtn} bg-primary text-white`}
        >
          <CalendarDays className="size-6" />
        </Link>
        <a
          href={href}
          target="_blank"
          rel="noopener"
          aria-label="Chat on WhatsApp"
          className={`${floatBtn} bg-whatsapp text-white`}
        >
          <Icon icon={faWhatsapp} />
        </a>
      </div>
    </>
  );
}
