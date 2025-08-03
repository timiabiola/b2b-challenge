import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-brand-cyan text-brand-navy hover:bg-brand-magenta hover:text-white shadow-lg hover:shadow-brand-cyan/25 hover:scale-105",
        primary:
          "bg-[#00F0FF] text-[#0B3142] hover:bg-[#FF2C6D] hover:text-white transition-all duration-300 font-semibold shadow-lg hover:shadow-[#00F0FF]/25 hover:scale-105",
        secondary:
          "bg-[#FF2C6D] text-white hover:bg-[#00F0FF] hover:text-[#0B3142] transition-all duration-300 shadow-lg hover:shadow-[#FF2C6D]/25 hover:scale-105",
        destructive:
          "bg-red-500 text-white hover:bg-red-600",
        outline:
          "border border-[#3EC6FF]/30 bg-transparent text-[#FFF6D6] hover:bg-[#3EC6FF]/10 hover:border-[#00F0FF]",
        ghost:
          "text-[#FFF6D6] hover:bg-[#3EC6FF]/10 hover:text-[#00F0FF]",
        link:
          "text-[#00F0FF] underline-offset-4 hover:underline hover:text-[#FF2C6D]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-md px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
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