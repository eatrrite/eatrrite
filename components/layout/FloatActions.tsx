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
        <div className="er-container grid grid-cols-2 gap-3 py-3">
          <Button
            size="lg"
            variant="outline"
            className="w-full border-whatsapp text-ink"
            nativeButton={false}
            render={<a href={href} target="_blank" rel="noopener" />}
          >
            <Icon icon={faWhatsapp} className="text-whatsapp" />
            WhatsApp
          </Button>
          <Button
            size="lg"
            className="w-full"
            nativeButton={false}
            render={<Link href={ROUTES.appointment} />}
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
