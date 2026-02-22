'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { ABOUT_CONTENT } from '@/lib/constants'
import { ceAnimations } from '@/lib/utils'

export function AboutSection() {
  return (
    <Section variant="default" id="about" watermark="03">
      <div className="max-w-7xl mx-auto">
        {/* Full-width headline */}
        <motion.h2
          className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-[#f8f4e9] mb-6"
          {...ceAnimations.reveal}
        >
          Your Nursing Experience Is Worth More Than You Realize
        </motion.h2>

        {/* Gold accent line */}
        <motion.div
          className="ce-accent-line w-32 mb-12 lg:mb-16"
          {...ceAnimations.lineGrow}
        />

        {/* Two-column layout: article body + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Article body - cols 1-7 */}
          <motion.div
            className="lg:col-span-7"
            {...ceAnimations.slideLeft}
          >
            <div className="space-y-6 text-base sm:text-lg text-[#f8f4e9]/80 leading-relaxed">
              {/* First paragraph with drop cap */}
              <motion.p
                className="ce-drop-cap"
                {...ceAnimations.reveal}
                transition={{ ...ceAnimations.reveal.transition, delay: 0.1 }}
              >
                {ABOUT_CONTENT.paragraph1}
              </motion.p>

              <motion.p
                {...ceAnimations.reveal}
                transition={{ ...ceAnimations.reveal.transition, delay: 0.2 }}
              >
                {ABOUT_CONTENT.paragraph2}
              </motion.p>

              {/* Third paragraph as pull quote */}
              <motion.p
                {...ceAnimations.reveal}
                transition={{ ...ceAnimations.reveal.transition, delay: 0.3 }}
                className="ce-pull-quote"
              >
                {ABOUT_CONTENT.paragraph3}
              </motion.p>
            </div>

            {/* Credibility indicators */}
            <motion.div
              className="mt-10 flex flex-wrap gap-6"
              {...ceAnimations.reveal}
              transition={{ ...ceAnimations.reveal.transition, delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-[2px] bg-[#e5b94c]" />
                <span className="text-[#f8f4e9]/70">Nurse-Specific Framework</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-[2px] bg-[#e5b94c]" />
                <span className="text-[#f8f4e9]/70">90-Day Action Plan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-[2px] bg-[#e5b94c]" />
                <span className="text-[#f8f4e9]/70">Proven Results</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar - cols 8-12 */}
          <motion.div
            className="lg:col-span-5"
            {...ceAnimations.scaleReveal}
          >
            <div className="lg:sticky lg:top-32">
              <div className="border-l-2 border-[#e5b94c]/20 pl-8 py-2">
                <h3 className="text-2xl font-bold text-[#f8f4e9] font-serif mb-8">
                  The Blueprint Advantage
                </h3>

                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <span className="font-serif text-4xl text-[#e5b94c]/40 leading-none flex-shrink-0 mt-1">
                      1
                    </span>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#f8f4e9]">Quick Niche Assessment</h4>
                      <p className="text-sm text-[#f8f4e9]/60 mt-1">Identify your ideal consulting specialty in 20 minutes</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <span className="font-serif text-4xl text-[#e5b94c]/40 leading-none flex-shrink-0 mt-1">
                      2
                    </span>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#f8f4e9]">15 Service Models</h4>
                      <p className="text-sm text-[#f8f4e9]/60 mt-1">Ready-made offers with proven pricing strategies</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <span className="font-serif text-4xl text-[#e5b94c]/40 leading-none flex-shrink-0 mt-1">
                      3
                    </span>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#f8f4e9]">90-Day Action Plan</h4>
                      <p className="text-sm text-[#f8f4e9]/60 mt-1">Week-by-week roadmap to your first $5,000</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[rgba(248,244,233,0.08)]">
                  <p className="text-sm text-[#f8f4e9]/60 italic font-serif text-center">
                    From Bedside to Business: Your Complete Launch Guide
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
