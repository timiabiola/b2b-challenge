'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { HERO_CONTENT } from '@/lib/constants'

export function HeroSection() {
  const scrollToForm = () => {
    const formElement = document.getElementById('lead-form')
    formElement?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-[#120925]">
      {/* Atmospheric radial gradient - replaces orbs */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 80%, rgba(42,19,64,0.5), transparent 60%)',
        }}
      />

      {/* Secondary atmospheric glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(229,185,76,0.03), transparent 50%)',
        }}
      />

      {/* Vignette */}
      <div className="ce-vignette" aria-hidden="true" />

      {/* Watermark */}
      <div className="ce-watermark" aria-hidden="true">01</div>

      {/* Content anchored to bottom-left */}
      <div className="relative z-10 container mx-auto px-6 pb-20 lg:pb-28 xl:pb-32 max-w-7xl">
        <div className="max-w-4xl">
          {/* Folio line */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <span className="ce-folio">Issue 01 &middot; Bedside to Business</span>
          </motion.div>

          {/* Editorial label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4"
          >
            <span className="ce-label">3-day intensive challenge</span>
          </motion.div>

          {/* Massive headline with "Stuck" in gold italic */}
          <motion.h1
            className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] text-[#f8f4e9] mb-8 tracking-tight"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            You Didn&apos;t Spend Years at the Bedside to Stay{' '}
            <em className="text-[#e5b94c] italic">Stuck</em>{' '}
            There
          </motion.h1>

          {/* Gold accent line */}
          <motion.div
            className="ce-accent-line w-32 mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left' }}
          />

          {/* Subheadline - narrower column */}
          <motion.p
            className="text-lg lg:text-xl text-[#f8f4e9]/75 mb-12 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {HERO_CONTENT.subheadline}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button
              size="xl"
              variant="primary"
              onClick={scrollToForm}
              className="text-base px-10 py-4 font-semibold"
            >
              {HERO_CONTENT.ctaTextSecondary}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
