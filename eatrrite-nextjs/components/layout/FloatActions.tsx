"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { CalendarDays } from "lucide-react";
import { Icon } from "@/components/shared/Icon";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { whatsappLink, whatsappMessageFor } from "@/constants/whatsapp";

// Brief §4. Phones: a sticky bottom bar with WhatsApp and Book Appointment, in the site's
// button styles. Desktop: one small floating WhatsApp button, bottom right. The WhatsApp
// message names the page it was sent from.
export function FloatActions() {
  const pathname = usePathname();
  const href = whatsappLink(whatsappMessageFor(pathname));

  return (
    <>
      <div aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur lg:hidden">
        <div className="er-container grid grid-cols-2 gap-3 py-3">
          <Button size="lg" variant="outline" className="w-full border-whatsapp text-ink" nativeButton={false} render={<a href={href} target="_blank" rel="noopener" />}>
            <Icon icon={faWhatsapp} className="text-whatsapp" />
            WhatsApp
          </Button>
          <Button size="lg" className="w-full" nativeButton={false} render={<Link href={ROUTES.appointment} />}>
            <CalendarDays />
            Book Appointment
          </Button>
        </div>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="fixed right-5 bottom-5 z-40 hidden size-14 place-items-center rounded-full bg-whatsapp text-[22px] text-white shadow-float transition-[translate,scale,box-shadow] duration-[250ms] hover:-translate-y-[3px] hover:scale-[1.04] hover:shadow-float-hover lg:grid"
      >
        <Icon icon={faWhatsapp} />
      </a>
    </>
  );
}
