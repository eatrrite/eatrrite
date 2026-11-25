import { FLOATING_FOOD } from "@/constants/home/floatingFood";
import { PageSection } from "@/components/shared/section/PageSection";
import { getCollection, getPage } from "@/features/cms/services/cmsContent";
import { ProgramsScroll } from "./programs/ProgramsScroll";

// Our Programs: sticky editorial rail + scroll-scrubbed chapters.
export async function ProgramGridSection() {
  const [home, programs] = await Promise.all([getPage("home-page"), getCollection("programs")]);
  return (
    <PageSection tone="beige" food={FLOATING_FOOD.programGrid} className="py-16 lg:py-24">
      <ProgramsScroll block={home.programs} programs={programs} />
    </PageSection>
  );
}
