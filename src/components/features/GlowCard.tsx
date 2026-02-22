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
      "ce-card relative overflow-hidden",
      "group",
      className
    )}>
      {title && (
        <CardHeader className="relative z-10">
          <CardTitle className="text-[#f8f4e9] text-xl font-bold font-serif">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="relative z-10 text-[#f8f4e9]/90 p-6 lg:p-8">
        {children}
      </CardContent>
    </Card>
  )
}
