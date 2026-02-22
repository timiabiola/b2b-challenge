'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { ceAnimations } from '@/lib/utils'

const stats = [
  {
    number: '3',
    label: 'Days',
    description: 'From nurse to business owner in one intensive weekend',
  },
  {
    number: '15',
    label: 'Models',
    description: 'Ready-made consulting packages with pricing built in',
  },
  {
    number: '$5K',
    label: 'Target',
    description: 'Your action plan to your first $5,000 in consulting revenue',
  },
]

export function StatsSection() {
  return (
    <Section variant="elevated" watermark="04" padding="none" className="py-20 lg:py-28">
      {/* Top gold rule */}
      <div className="border-t border-[#e5b94c]/10" />

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT: Label + headline + description */}
          <motion.div
            className="lg:col-span-4"
            {...ceAnimations.reveal}
          >
            <span className="ce-label mb-4 block">The Challenge Promise</span>
            <h2 className="font-serif text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] text-[#f8f4e9] mb-3">
              What You&apos;ll Walk Away With
            </h2>
            <p className="text-base text-[#f8f4e9]/60">
              Everything you need to launch your consulting business, built in 3 days
            </p>
          </motion.div>

          {/* RIGHT: Three stats as pure typography with vertical dividers */}
          <div className="lg:col-span-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 sm:gap-0">
              {stats.map((stat, index) => (
                <React.Fragment key={stat.label}>
                  {/* Vertical gold divider (not before first) */}
                  {index > 0 && (
                    <div className="hidden sm:block w-px h-24 bg-[#e5b94c]/20 flex-shrink-0" />
                  )}
                  {/* Horizontal divider on mobile */}
                  {index > 0 && (
                    <div className="sm:hidden w-full ce-editorial-rule" />
                  )}
                  <motion.div
                    className="flex-1 text-center px-4"
                    {...ceAnimations.reveal}
                    transition={{ ...ceAnimations.reveal.transition, delay: index * 0.15 }}
                  >
                    <span className="font-serif text-[5rem] lg:text-[7rem] font-light text-[#e5b94c] leading-none block">
                      {stat.number}
                    </span>
                    <span className="ce-label block mt-2 text-[#f8f4e9]/50" style={{ fontVariant: 'all-small-caps', letterSpacing: '0.2em' }}>
                      {stat.label}
                    </span>
                  </motion.div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gold rule */}
      <div className="border-b border-[#e5b94c]/10" />
    </Section>
  )
}
