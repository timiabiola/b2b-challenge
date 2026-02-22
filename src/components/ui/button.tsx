import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5b94c]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#120925] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#e5b94c] text-[#120925] hover:shadow-lg hover:shadow-[#e5b94c]/20 font-semibold",
        primary:
          "bg-[#e5b94c] text-[#120925] hover:shadow-lg hover:shadow-[#e5b94c]/25 transition-all duration-400 font-semibold",
        secondary:
          "bg-transparent text-[#e5b94c] border border-[#e5b94c]/40 hover:bg-[#e5b94c] hover:text-[#120925] transition-all duration-400 font-semibold",
        destructive:
          "bg-red-500 text-white hover:bg-red-600",
        outline:
          "border border-[rgba(248,244,233,0.15)] bg-transparent text-[#f8f4e9] hover:bg-[rgba(248,244,233,0.05)] hover:border-[#e5b94c]/40",
        ghost:
          "text-[#f8f4e9] hover:bg-[rgba(248,244,233,0.05)] hover:text-[#e5b94c]",
        link:
          "text-[#e5b94c] underline-offset-4 hover:underline hover:text-[#f8f4e9]",
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
