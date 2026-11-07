import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cn } from "cn"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { Icon } from "@/components/site/icon"

// Copies .faq-item, .faq-question, .faq-chevron and .faq-answer from the PHP
// style.css, including the gold open state.
function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col gap-3.5", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "group/faq overflow-hidden rounded-sm border border-border bg-white transition-[background-color,box-shadow,border-color] duration-[350ms] data-open:border-transparent data-open:bg-accent data-open:shadow-faq-open",
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="m-0 flex font-[inherit]">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "type-faq flex flex-1 cursor-pointer leading-[normal] items-center justify-between gap-4 bg-transparent px-[22px] py-5 text-left text-ink outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset aria-disabled:pointer-events-none aria-disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <span
          data-slot="accordion-trigger-icon"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-chevron text-primary transition-[transform,translate,scale,rotate,background-color] duration-[350ms] group-data-open/faq:rotate-180 group-data-open/faq:bg-primary/12"
        >
          <Icon icon={faChevronDown} className="pointer-events-none text-xs" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-[400ms] ease-er data-ending-style:h-0 data-starting-style:h-0"
      {...props}
    >
      <div
        className={cn(
          "px-[22px] pb-5 text-[15px] leading-[1.7] text-text group-data-open/faq:text-ink",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
