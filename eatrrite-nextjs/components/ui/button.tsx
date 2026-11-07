import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Base and variants copy .btn, .btn-primary, .btn-light, .btn-outline,
// .btn-outline-light and .btn-accent from the PHP style.css.
const lift = "hover:-translate-y-0.5"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border-0 font-heading text-base leading-[1.7] font-semibold tracking-[0.01em] whitespace-nowrap transition-all duration-300 ease-er outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: `bg-primary text-primary-foreground hover:bg-primary-dark hover:shadow-btn-primary ${lift}`,
        light: `bg-white text-primary hover:bg-mint hover:shadow-btn-light ${lift}`,
        outline: `border border-primary bg-transparent text-primary hover:bg-primary hover:text-white ${lift}`,
        "outline-light": `border border-white/30 bg-transparent text-white hover:bg-white hover:text-primary ${lift}`,
        accent: `bg-accent text-ink hover:bg-accent-hover hover:shadow-btn-accent ${lift}`,
        secondary: `bg-secondary text-secondary-foreground hover:bg-soft ${lift}`,
        ghost: "text-primary hover:bg-mint",
        destructive:
          "bg-alert-bg text-alert-text hover:bg-alert-bg/70 focus-visible:ring-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
        // .er-submit on the appointment form. Live site renders it in the browser font.
        submit:
          "h-[54px] w-full rounded-xs bg-accent [font-family:Arial,sans-serif]! leading-normal tracking-normal text-ink transition-[transform,translate,scale,rotate,background-color] duration-150 ease-[ease] hover:bg-accent-hover",
      },
      size: {
        default: "px-7 py-3",
        sm: "px-5 py-2 text-sm",
        lg: "px-9 py-4",
        icon: "size-11",
        "icon-sm": "size-9",
        "icon-lg": "size-13",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
