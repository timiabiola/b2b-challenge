'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { ABOUT_CONTENT } from '@/lib/constants'

export function AboutSection() {
  return (
    <Section variant="dark" id="about" className="relative">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233EC6FF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Text Content - Takes up 3 columns */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-[#FFF6D6] mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Let&apos;s Have a Real Conversation About Your Business
            </motion.h2>

            <div className="space-y-6 text-lg text-white/90 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {ABOUT_CONTENT.paragraph1}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {ABOUT_CONTENT.paragraph2}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-semibold text-[#00F0FF]"
              >
                {ABOUT_CONTENT.paragraph3}
              </motion.p>
            </div>

            {/* Credibility indicators */}
            <motion.div 
              className="mt-8 flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#00F0FF] rounded-full" />
                <span className="text-white/80">AI & Informatics Expert</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#FF2C6D] rounded-full" />
                <span className="text-white/80">Implementation Focused</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#3EC6FF] rounded-full" />
                <span className="text-white/80">Results Guaranteed</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Element - Takes up 2 columns */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              {/* Stats Card */}
              <div className="bg-gradient-to-br from-[#00F0FF]/10 to-[#FF2C6D]/10 backdrop-blur-sm rounded-2xl p-8 border border-[#3EC6FF]/30">
                <h3 className="text-2xl font-bold text-[#FFF6D6] mb-6">The Enlightened Difference</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Revenue Multiplier</span>
                    <span className="text-2xl font-bold text-[#00F0FF]">2X</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Implementation Time</span>
                    <span className="text-2xl font-bold text-[#FF2C6D]">90 Days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Hours Saved Weekly</span>
                    <span className="text-2xl font-bold text-[#3EC6FF]">20+</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#3EC6FF]/20">
                  <p className="text-sm text-white/70 italic">
                    &ldquo;We don&apos;t just consult. We implement.&rdquo;
                  </p>
                </div>
              </div>

              {/* Floating accent */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-[#00F0FF]/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}