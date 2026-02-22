'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { CHALLENGE_DAYS } from '@/lib/constants'
import { ceAnimations } from '@/lib/utils'

const panelBgs = ['bg-[#120925]', 'bg-[#1a0f32]', 'bg-[#120925]']

export function ProcessTimelineSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [tappedIndex, setTappedIndex] = useState<number | null>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Detect touch device on mount
  React.useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const handleMouseEnter = useCallback((index: number) => {
    if (isTouchDevice) return
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(index)
    }, 200)
  }, [isTouchDevice])

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setHoveredIndex(null)
  }, [isTouchDevice])

  const handleTap = useCallback((index: number) => {
    if (!isTouchDevice) return
    setTappedIndex(prev => prev === index ? null : index)
  }, [isTouchDevice])

  return (
    <Section variant="default" id="process" watermark="06" padding="normal">
      <div className="max-w-7xl mx-auto">
        {/* Section header - left aligned */}
        <motion.div
          {...ceAnimations.reveal}
          className="mb-12 lg:mb-16"
        >
          <span className="ce-label mb-4 block">The 3-Day Breakdown</span>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-[#f8f4e9] mb-4">
            Your 3-Day Challenge Breakdown
          </h2>
          <p className="text-base sm:text-lg text-[#f8f4e9]/70 max-w-2xl">
            Here&apos;s exactly what happens each day, so you know what to expect and can hit the ground running.
          </p>
        </motion.div>

        {/* Horizontal Triptych with hover reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 rounded-2xl overflow-hidden border border-[rgba(248,244,233,0.06)]">
          {CHALLENGE_DAYS.map((day, index) => {
            const isHovered = isTouchDevice ? tappedIndex === index : hoveredIndex === index

            return (
              <motion.div
                key={day.id}
                className={`relative min-h-[320px] lg:min-h-[460px] flex flex-col p-6 lg:p-8 cursor-default transition-colors duration-500 ${
                  isHovered ? 'bg-[#1a0f32]' : panelBgs[index]
                }`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleTap(index)}
                {...ceAnimations.reveal}
                transition={{ ...ceAnimations.reveal.transition, delay: index * 0.15 }}
              >
                {/* Giant day number watermark - top right */}
                <div
                  className="absolute top-4 right-4 font-serif text-[8rem] lg:text-[12rem] leading-none text-[#f8f4e9] opacity-[0.02] pointer-events-none select-none"
                  aria-hidden="true"
                >
                  {index + 1}
                </div>

                {/* Vertical gold divider between panels on desktop */}
                {index > 0 && (
                  <div className="hidden lg:block absolute left-0 top-[10%] bottom-[10%] w-px bg-[#e5b94c]/15" />
                )}

                {/* Horizontal rule between panels on mobile */}
                {index > 0 && (
                  <div className="lg:hidden absolute top-0 left-[10%] right-[10%] h-px bg-[#e5b94c]/15" />
                )}

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Top: Day label + Title (always visible) */}
                  <div>
                    <span className="ce-label block mb-3">{day.day}</span>

                    <h3 className="font-serif text-xl sm:text-2xl text-[#f8f4e9] mb-3 leading-tight">
                      {day.title}
                    </h3>

                    {/* Gold accent line - subtle breathing pulse when not hovered */}
                    <motion.div
                      className="ce-accent-line w-16 mb-4"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.0, delay: 0.3 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: 'left' }}
                    />

                    {/* Editorial hover cue - fades out when hovered */}
                    <AnimatePresence>
                      {!isHovered && (
                        <motion.div
                          className="flex items-center gap-2 mt-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <motion.span
                            className="text-[0.7rem] tracking-[0.2em] uppercase text-[#e5b94c]/60 font-serif hidden lg:inline"
                            animate={{ opacity: [0.6, 0.9, 0.6] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            Hover to explore
                          </motion.span>
                          <motion.span
                            className="text-[0.7rem] tracking-[0.2em] uppercase text-[#e5b94c]/60 font-serif lg:hidden"
                            animate={{ opacity: [0.6, 0.9, 0.6] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            Tap to explore
                          </motion.span>
                          <motion.span
                            className="text-[#e5b94c]/50 text-xs"
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            &rarr;
                          </motion.span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Middle: Swap between description (default) and goals (hover) */}
                  <div className="flex-1 flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                      {!isHovered ? (
                        /* Default state: description blurb */
                        <motion.div
                          key={`desc-${day.id}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <p className="text-sm sm:text-base text-[#f8f4e9]/60 leading-relaxed">
                            {day.description}
                          </p>
                        </motion.div>
                      ) : (
                        /* Hovered state: goals revealed with stagger */
                        <motion.div
                          key={`goals-${day.id}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="space-y-3"
                        >
                          <span className="text-xs text-[#e5b94c]/60 tracking-[0.15em] uppercase block mb-2">
                            What you&apos;ll complete
                          </span>
                          {day.goals.map((goal, goalIndex) => (
                            <motion.div
                              key={goalIndex}
                              className="flex items-start gap-3"
                              initial={{ opacity: 0, x: -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: goalIndex * 0.08,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#e5b94c]/60 flex-shrink-0 mt-[0.35rem]" />
                              <span className="text-sm leading-[1.25rem] text-[#f8f4e9]/70">{goal}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Bottom: Folio */}
                  <div className="mt-auto pt-4">
                    <span className="ce-folio">
                      Day {index + 1} of 3
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 lg:mt-16"
          {...ceAnimations.reveal}
          transition={{ ...ceAnimations.reveal.transition, delay: 0.5 }}
        >
          <p className="text-base sm:text-lg text-[#f8f4e9]/70 mb-6 max-w-3xl">
            You&apos;ve already proven you can handle 12-hour shifts, complex patients, and high-pressure decisions. Launching a business? You&apos;ve got this. Join the waitlist and we&apos;ll save your spot.
          </p>
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 text-[#e5b94c] hover:text-[#f8f4e9] transition-colors duration-400 font-semibold text-base sm:text-lg py-3"
          >
            Join the Waitlist
            <span className="text-xl">&rarr;</span>
          </a>
        </motion.div>
      </div>
    </Section>
  )
}
