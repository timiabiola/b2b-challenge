'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { ceAnimations } from '@/lib/utils'

export function MarketOpportunitySection() {
  return (
    <Section variant="elevated" id="market-opportunity" watermark="02" watermarkPosition="left">
      <div className="max-w-7xl mx-auto">
        {/* Top: Asymmetric Grid - Header Left, Featured Stat Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* LEFT: Section header - left aligned */}
          <motion.div
            className="lg:col-span-5"
            {...ceAnimations.reveal}
          >
            <span className="ce-label mb-4 block">Market Opportunity</span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-[#f8f4e9] mb-4">
              The Market Is Already Paying for What You Know
            </h2>
            <p className="text-base sm:text-lg text-[#f8f4e9]/70 max-w-lg leading-relaxed">
              Healthcare organizations are paying premium rates for clinical expertise. The only thing missing is your business.
            </p>
          </motion.div>

          {/* RIGHT: Featured stat card */}
          <motion.div
            className="lg:col-span-7"
            {...ceAnimations.slideRight}
          >
            <div className="ce-card rounded-2xl p-8 lg:p-12 relative overflow-hidden">
              <div className="mb-4">
                <span className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light text-[#e5b94c] leading-tight block">
                  Your Clinical Skills Are Worth More Than a Paycheck
                </span>
              </div>
              <p className="text-[#f8f4e9]/60 text-base max-w-md">
                Nurse consultants set their own rates and work on their own terms. The demand is real, and organizations are paying for expertise they can&apos;t find in-house.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Below Featured: Two smaller stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mb-16">
          <motion.div
            {...ceAnimations.reveal}
            transition={{ ...ceAnimations.reveal.transition, delay: 0.2 }}
          >
            <div className="ce-card rounded-2xl p-6 sm:p-8 h-full">
              <span className="ce-label block mb-3">Growing Demand</span>
              <div className="mb-2">
                <span className="font-serif text-5xl lg:text-6xl font-light text-[#e5b94c]">5%</span>
              </div>
              <p className="text-[#f8f4e9]/60 text-sm sm:text-base">
                Demand for nurse consultants is climbing through 2034, per the Bureau of Labor Statistics. The window is open.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...ceAnimations.reveal}
            transition={{ ...ceAnimations.reveal.transition, delay: 0.3 }}
          >
            <div className="ce-card rounded-2xl p-6 sm:p-8 h-full">
              <span className="ce-label block mb-3">Who&apos;s Hiring</span>
              <div className="mb-2">
                <span className="font-serif text-4xl lg:text-5xl font-light text-[#e5b94c]">Everyone</span>
              </div>
              <p className="text-[#f8f4e9]/60 text-sm sm:text-base">
                Hospitals, insurers, law firms, and health tech companies. They need clinical insight they can&apos;t get from anyone but a nurse.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom: Pull quote */}
        <motion.div
          className="relative py-12 lg:py-16"
          {...ceAnimations.reveal}
          transition={{ ...ceAnimations.reveal.transition, delay: 0.4 }}
        >
          {/* Giant decorative quote mark */}
          <div
            className="absolute top-0 left-0 font-serif text-[12rem] leading-none text-[#e5b94c] opacity-[0.08] pointer-events-none select-none"
            aria-hidden="true"
          >
            &ldquo;
          </div>

          <div className="relative max-w-3xl mx-auto lg:mx-0 lg:pl-16">
            <p className="font-serif text-xl lg:text-2xl italic text-[#e5b94c] leading-relaxed mb-8">
              Your years at the bedside gave you something no textbook can teach. It&apos;s time that expertise started paying you what it&apos;s worth.
            </p>
            <a
              href="#lead-form"
              className="inline-flex items-center gap-2 text-[#e5b94c] hover:text-[#f8f4e9] transition-colors duration-400 font-semibold text-base sm:text-lg py-3"
            >
              Join the Waitlist
              <span className="text-xl">&rarr;</span>
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
