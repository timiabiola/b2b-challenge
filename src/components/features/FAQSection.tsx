'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { ceAnimations } from '@/lib/utils'

const faqs = [
  {
    question: "Is this free or paid?",
    answer: "The challenge has a small enrollment fee to ensure committed participants. Join the waitlist to get early-bird pricing when registration opens."
  },
  {
    question: "How much time does it take each day?",
    answer: "Plan for 1-2 focused hours of work each day. The challenge is designed to fit around your schedule, whether you're working shifts or have the days off."
  },
  {
    question: "Is the challenge live or self-paced?",
    answer: "It's a live virtual experience with real-time guidance, group accountability, and direct access to support. You'll work alongside other nurses making the same leap."
  },
  {
    question: "What if I can't make all 3 days?",
    answer: "All sessions are recorded, so you can catch up if you miss a day. But the live experience (the energy, the accountability, the real-time feedback) is what makes this challenge work."
  },
  {
    question: "Do I need business experience?",
    answer: "No. The challenge is built specifically for nurses with zero business background. If you can manage a patient load, you can follow this framework."
  },
  {
    question: "What do I actually walk away with?",
    answer: "A live website, a legally incorporated business, defined consulting packages with pricing, a marketing strategy, and a step-by-step plan to land your first clients. Not theory. Real, tangible deliverables."
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section variant="elevated" id="faq" watermark="07" watermarkPosition="left">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* LEFT column: Sticky header */}
          <motion.div
            className="lg:col-span-4"
            {...ceAnimations.reveal}
          >
            <div className="lg:sticky lg:top-32 relative">
              {/* Decorative Q&A text */}
              <div
                className="absolute -top-4 -left-2 font-serif text-[6rem] leading-none text-[#f8f4e9] opacity-[0.03] pointer-events-none select-none"
                aria-hidden="true"
              >
                Q&amp;A
              </div>

              <div className="relative z-10">
                <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-[#f8f4e9] mb-4">
                  Common Questions
                </h2>

                {/* Gold accent line */}
                <motion.div
                  className="ce-accent-line w-20 mb-6"
                  {...ceAnimations.lineGrow}
                />

                <p className="text-base text-[#f8f4e9]/60">
                  Everything you need to know before joining the waitlist.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT column: Accordion questions */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  {...ceAnimations.reveal}
                  transition={{ ...ceAnimations.reveal.transition, delay: index * 0.05 }}
                >
                  {/* Editorial rule between questions */}
                  {index > 0 && (
                    <div className="ce-editorial-rule" />
                  )}

                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full text-left py-6 group"
                  >
                    <div className="flex items-start gap-6">
                      {/* Question number */}
                      <span className="font-serif text-lg text-[#e5b94c]/30 flex-shrink-0 mt-0.5 w-8">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Question text */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-base sm:text-lg font-semibold text-[#f8f4e9] group-hover:text-[#e5b94c] transition-colors duration-400">
                            {faq.question}
                          </span>

                          {/* Plus/minus toggle */}
                          <motion.span
                            className="font-serif text-2xl text-[#e5b94c] flex-shrink-0 leading-none"
                            animate={{ rotate: openIndex === index ? 45 : 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          >
                            +
                          </motion.span>
                        </div>

                        {/* Answer - indented past number column */}
                        <AnimatePresence>
                          {openIndex === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm sm:text-base text-[#f8f4e9]/60 mt-4 leading-relaxed pr-8">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}

              {/* Final editorial rule */}
              <div className="ce-editorial-rule" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
