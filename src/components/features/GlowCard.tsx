import React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface GlowCardProps {
  children: React.ReactNode
  title?: string
  className?: string
}

export function GlowCard({ children, title, className }: GlowCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden bg-[#0B3142] border border-[#3EC6FF]/20",
      "hover:border-[#00F0FF]/50 transition-all duration-300",
      "hover:translate-y-[-2px] hover:shadow-xl hover:shadow-[#00F0FF]/20",
      "group",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/10 to-[#FF2C6D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {title && (
        <CardHeader className="relative z-10">
          <CardTitle className="text-[#FFF6D6] text-xl font-bold">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="relative z-10 text-white/90 p-4 sm:p-6">
        {children}
      </CardContent>
    </Card>
  )
}