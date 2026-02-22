'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Rocket, Cpu } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { THREE_PILLARS } from '@/lib/constants'
import { ceAnimations } from '@/lib/utils'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Rocket,
  Cpu,
}

export function ThreePillarsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = useCallback((index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveIndex(index)
    }, 300)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
  }, [])

  const activePillar = THREE_PILLARS[activeIndex]
  const ActiveIcon = iconMap[activePillar.icon]

  return (
    <Section variant="default" id="pillars" watermark="05">
      <div className="max-w-7xl mx-auto">
        {/* Section header - LEFT aligned */}
        <motion.div
          {...ceAnimations.reveal}
          className="mb-12 lg:mb-16"
        >
          <span className="ce-label mb-4 block">The Three Pillars</span>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-[#f8f4e9] mb-4">
            What You&apos;ll Achieve in 3 Days
          </h2>
          <p className="text-base sm:text-lg text-[#f8f4e9]/70 max-w-2xl">
            Three days. Three milestones. One fully launched consulting business.
          </p>
        </motion.div>

        {/* Interactive Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: Featured pillar detail panel */}
          <motion.div
            className="lg:col-span-7"
            {...ceAnimations.slideLeft}
          >
            <div className="ce-card rounded-2xl p-8 lg:p-12 relative overflow-hidden min-h-[400px] flex flex-col justify-end">
              {/* Oversized number watermark */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`watermark-${activeIndex}`}
                  className="absolute top-4 right-6 font-serif text-[10rem] leading-none text-[#f8f4e9] opacity-[0.03] pointer-events-none select-none"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 0.03, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden="true"
                >
                  {String(activeIndex + 1).padStart(2, '0')}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10"
                >
                  {/* Icon */}
                  <ActiveIcon className="w-12 h-12 text-[#e5b94c] mb-6" />

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#f8f4e9] mb-4 leading-tight">
                    {activePillar.title}
                  </h3>

                  {/* Gold accent line */}
                  <div className="ce-accent-line w-20 mb-6" />

                  {/* Description */}
                  <p className="text-[#f8f4e9]/70 text-base sm:text-lg leading-relaxed max-w-lg">
                    {activePillar.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* RIGHT: Stacked pillar selector cards - stretch to match left panel height */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-between gap-4 lg:gap-0"
            {...ceAnimations.slideRight}
          >
            {THREE_PILLARS.map((pillar, index) => {
              const isActive = index === activeIndex
              const PillarIcon = iconMap[pillar.icon]

              return (
                <motion.button
                  key={pillar.id}
                  className={`text-left p-5 lg:p-6 rounded-xl transition-all duration-400 border-l-2 flex-1 flex items-center ${
                    isActive
                      ? 'border-l-[#e5b94c] bg-[rgba(229,185,76,0.05)]'
                      : 'border-l-transparent bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)]'
                  }`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setActiveIndex(index)}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-4 w-full">
                    <span className={`font-serif text-2xl ${isActive ? 'text-[#e5b94c]' : 'text-[#f8f4e9]/20'} transition-colors duration-400`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <h4 className={`font-serif text-lg ${isActive ? 'text-[#f8f4e9]' : 'text-[#f8f4e9]/60'} transition-colors duration-400`}>
                        {pillar.title}
                      </h4>
                    </div>
                    <PillarIcon className={`w-5 h-5 ${isActive ? 'text-[#e5b94c]' : 'text-[#f8f4e9]/20'} transition-colors duration-400 flex-shrink-0`} />
                  </div>
                </motion.button>
              )
            })}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 lg:mt-16"
          {...ceAnimations.reveal}
          transition={{ ...ceAnimations.reveal.transition, delay: 0.5 }}
        >
          <p className="text-lg text-[#f8f4e9]/70 mb-6 max-w-2xl">
            This isn&apos;t theory. Every nurse in the challenge walks out with a real, operating business. Not a stack of worksheets.
          </p>
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 text-[#e5b94c] hover:text-[#f8f4e9] transition-colors duration-400 font-semibold py-3"
          >
            Join the Waitlist
            <span className="text-xl">&rarr;</span>
          </a>
        </motion.div>
      </div>
    </Section>
  )
}
