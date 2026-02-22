import React from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'accent'
  id?: string
  watermark?: string
  watermarkPosition?: 'left' | 'right'
  withVignette?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'normal' | 'generous'
}

export function Section({
  children,
  className,
  variant = 'default',
  id,
  watermark,
  watermarkPosition = 'right',
  withVignette,
  maxWidth = 'xl',
  padding = 'normal',
}: SectionProps) {
  const paddingClasses = {
    none: '',
    normal: 'py-24 lg:py-32 xl:py-40',
    generous: 'py-32 lg:py-40 xl:py-48',
  }

  const baseClasses = cn('relative overflow-hidden', paddingClasses[padding])

  const variantClasses = {
    default: 'bg-[#120925]',
    elevated: 'bg-[#1a0f32]',
    accent: 'bg-[#2a1340]',
  }

  const maxWidthClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  }

  const watermarkClass = watermarkPosition === 'left' ? 'ce-watermark-left' : 'ce-watermark'

  return (
    <section id={id} className={cn(baseClasses, variantClasses[variant], className)}>
      {watermark && (
        <div className={watermarkClass} aria-hidden="true">
          {watermark}
        </div>
      )}
      {withVignette && (
        <div className="ce-vignette" aria-hidden="true" />
      )}
      <div className={cn('relative z-10 container mx-auto px-6', maxWidthClasses[maxWidth])}>
        {children}
      </div>
    </section>
  )
}
