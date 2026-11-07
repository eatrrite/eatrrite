import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Pill labels from the PHP .pill-label rules.
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-pill text-ink",
        hero: "border border-white/18 bg-white/14 text-white backdrop-blur-[6px]",
        "on-dark": "border border-white/14 bg-white/12 text-white",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">({ className: cn(badgeVariants({ variant }), className) }, props),
    render,
    state: { slot: "badge", variant },
  })
}

// .pill-dot
function BadgeDot({ className }: { className?: string }) {
  return <span aria-hidden className={cn("size-2 shrink-0 rounded-full bg-accent", className)} />
}

export { Badge, BadgeDot }
