import * as React from "react"
import { cn } from "cn"

// Copies .card from the PHP style.css: 32px padding, 24px radius, soft shadow.
// `lift` is the .card:hover rise. Hover sits on a wrapper that does not move, so
// the card cannot rise off the pointer and flicker. Turn it off for form cards.
function Card({
  className,
  lift = true,
  ...props
}: React.ComponentProps<"div"> & { lift?: boolean }) {
  const card = (
    <div
      data-slot="card"
      className={cn(
        "group/card flex flex-col gap-4 rounded-lg border border-border bg-card p-8 text-card-foreground shadow-card transition-all duration-[350ms] ease-[ease]",
        lift &&
          "group-hover/card:-translate-y-2 group-hover/card:border-border-hover group-hover/card:shadow-card-hover",
        className
      )}
      {...props}
    />
  )
  return lift ? <div className="group/card h-full">{card}</div> : card
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("grid auto-rows-min items-start gap-3", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("type-card mb-0 text-primary", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("mb-0 text-sm text-text", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={className} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("mt-auto flex items-center", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
