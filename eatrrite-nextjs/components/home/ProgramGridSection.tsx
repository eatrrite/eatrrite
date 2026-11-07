import { FLOATING_FOOD } from "@/constants/home/floatingFood";
import { PageSection } from "@/components/shared/section/PageSection";
import { ProgramsScroll } from "./programs/ProgramsScroll";

// Our Programs: sticky editorial rail + scroll-scrubbed chapters.
export function ProgramGridSection() {
  return (
    <PageSection tone="mint" food={FLOATING_FOOD.programGrid} className="py-16 lg:py-24">
      <ProgramsScroll />
    </PageSection>
  );
}
