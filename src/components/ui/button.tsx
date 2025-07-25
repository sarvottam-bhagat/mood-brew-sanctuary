import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow hover:scale-105",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-border bg-background/50 backdrop-blur-sm shadow-mood hover:bg-accent/10 hover:border-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        premium: "bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-[0_0_50px_hsl(var(--accent)/0.8)] hover:scale-105 font-medium",
        mood: "bg-gradient-to-r from-accent/20 to-primary/20 text-foreground border border-accent/30 hover:from-accent/30 hover:to-primary/30 hover:scale-105",
        calm: "bg-gradient-calm text-white shadow-mood hover:shadow-glow",
        energized: "bg-gradient-energized text-white shadow-mood hover:shadow-glow",
        focused: "bg-gradient-focused text-white shadow-mood hover:shadow-glow",
        creative: "bg-gradient-creative text-white shadow-mood hover:shadow-glow",
        romantic: "bg-gradient-romantic text-white shadow-mood hover:shadow-glow",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-14 rounded-xl px-10 text-base font-medium",
        icon: "h-11 w-11",
        xl: "h-16 rounded-2xl px-12 text-lg font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
