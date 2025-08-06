import React from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  variant?: 'gradient' | 'dark' | 'light'
  id?: string
}

export function Section({ children, className, variant = 'gradient', id }: SectionProps) {
  const baseClasses = 'relative py-20 overflow-hidden'
  
  const variantClasses = {
    gradient: 'bg-gradient-to-br from-[#2B174C] to-[#0B3142]',
    dark: 'bg-[#0B3142]',
    light: 'bg-[#FFF6D6]/5',
  }

  return (
    <section id={id} className={cn(baseClasses, variantClasses[variant], className)}>
      {variant === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#2B174C] to-[#0B3142]" />
      )}
      <div className="relative z-10 container mx-auto px-6">
        {children}
      </div>
    </section>
  )
}