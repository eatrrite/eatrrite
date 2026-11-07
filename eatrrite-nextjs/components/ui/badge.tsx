import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// `default` copies .pill-label, `hero` copies .pill-label--hero,
// `on-dark` copies .pill-label--on-dark, `tag` copies .program-tag from the PHP style.css.
const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-full whitespace-nowrap transition-all focus-visible:ring-[3px] focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default: "bg-pill px-[18px] py-2 text-sm font-medium text-ink",
        hero: "border border-white/18 bg-white/14 px-[18px] py-2 text-sm font-medium text-white backdrop-blur-[6px]",
        "on-dark":
          "border border-white/14 bg-white/12 px-[18px] py-2 text-sm font-medium text-white",
        tag: "bg-accent px-3 py-1.5 text-xs font-bold text-ink",
        outline: "border border-border px-3 py-1.5 text-xs font-medium text-primary",
        destructive: "bg-alert-bg px-3 py-1.5 text-xs font-medium text-alert-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
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
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

// .pill-dot
function BadgeDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("size-2 shrink-0 rounded-full bg-accent", className)}
    />
  )
}

export { Badge, BadgeDot, badgeVariants }
