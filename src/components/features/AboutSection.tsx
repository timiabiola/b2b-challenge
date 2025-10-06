'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { ABOUT_CONTENT } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'

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
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFF6D6] mb-6 sm:mb-8 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Your Nursing Experience Is Worth More Than You Realize
            </motion.h2>

            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-white/90 leading-relaxed text-center lg:text-left">
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
                <span className="text-white/80">Nurse-Specific Framework</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#FF2C6D] rounded-full" />
                <span className="text-white/80">90-Day Action Plan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#3EC6FF] rounded-full" />
                <span className="text-white/80">Proven Results</span>
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
                <h3 className="text-2xl font-bold text-[#FFF6D6] mb-6">The Blueprint Advantage</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Badge className="h-8 w-8 rounded-full bg-[#00F0FF] text-[#0B3142] hover:bg-[#00F0FF] flex items-center justify-center font-bold text-sm">
                      1
                    </Badge>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white">Quick Niche Assessment</h4>
                      <p className="text-sm text-white/70 mt-1">Identify your ideal consulting specialty in 20 minutes</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge className="h-8 w-8 rounded-full bg-[#FF2C6D] text-white hover:bg-[#FF2C6D] flex items-center justify-center font-bold text-sm">
                      2
                    </Badge>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white">15 Service Models</h4>
                      <p className="text-sm text-white/70 mt-1">Ready-made offers with proven pricing strategies</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge className="h-8 w-8 rounded-full bg-[#3EC6FF] text-[#0B3142] hover:bg-[#3EC6FF] flex items-center justify-center font-bold text-sm">
                      3
                    </Badge>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white">90-Day Action Plan</h4>
                      <p className="text-sm text-white/70 mt-1">Week-by-week roadmap to your first $5,000</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#3EC6FF]/20">
                  <p className="text-sm text-white/70 italic text-center">
                    From Bedside to Business: Your Complete Launch Guide
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