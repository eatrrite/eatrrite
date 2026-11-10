import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { BlurIn } from "@/components/motion/BlurIn";
import { Icon } from "@/components/shared/Icon";
import { LinkButton } from "@/components/shared/section/LinkButton";
import { PageSection } from "@/components/shared/section/PageSection";
import { Button } from "@/components/ui/button";
import home from "@/constants/home/content.json";
import { pageFood } from "@/constants/home/floatingFood";
import { ROUTES } from "@/constants/routes";
import { whatsappLink, whatsappMessageFor } from "@/constants/whatsapp";

// The same ending for every program page (and later every article): one line from Mukta,
// Book a Consultation and WhatsApp (brief §9). The WhatsApp message names the page.
export function ClosingBlock({ pathname }: { pathname: string }) {
  const { quote, cite } = home.about;
  return (
    <PageSection tone="beige" food={pageFood(6)}>
      <div className="flex flex-col items-center gap-6 rounded-xl border border-accent/40 bg-white px-6 py-12 text-center sm:px-12">
        <BlurIn>
          <p className="m-0 max-w-2xl font-script text-2xl text-primary sm:text-3xl">“{quote}”</p>
          <p className="mt-3 mb-0 text-sm text-text">{cite}</p>
        </BlurIn>
        <BlurIn delay={0.15} className="flex flex-wrap justify-center gap-3">
          <LinkButton href={ROUTES.appointment} size="xl">Book a Consultation</LinkButton>
          <Button size="xl" variant="outline" nativeButton={false} render={<a href={whatsappLink(whatsappMessageFor(pathname))} target="_blank" rel="noopener" />}>
            <Icon icon={faWhatsapp} className="text-whatsapp" />
            WhatsApp
          </Button>
        </BlurIn>
      </div>
    </PageSection>
  );
}
