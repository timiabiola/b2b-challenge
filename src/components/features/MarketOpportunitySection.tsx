'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, DollarSign, Users } from 'lucide-react'

export function MarketOpportunitySection() {
  return (
    <Section variant="dark" id="market-opportunity" className="relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, #00F0FF 0%, transparent 50%), radial-gradient(circle at 75% 75%, #FF2C6D 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge variant="cyan" className="mb-4">
            Market Opportunity
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#FFF6D6] mb-3 sm:mb-4">
            Seize the Market Opportunity
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto">
            The demand for nurse professionals is projected to grow significantly, creating a robust market for expert consulting services.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Stat 1: Market Growth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00F0FF] to-[#3EC6FF] rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative bg-gradient-to-br from-[#0B3142]/90 to-[#2B174C]/90 rounded-2xl p-6 sm:p-8 border border-[#3EC6FF]/20 backdrop-blur-sm h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#00F0FF]/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-[#00F0FF]" />
                </div>
              </div>
              <div className="mb-2">
                <span className="text-4xl sm:text-5xl font-bold text-[#00F0FF]">5%</span>
              </div>
              <p className="text-white/80 text-sm sm:text-base">
                Projected growth in demand for nurse professionals through 2034
              </p>
            </div>
          </motion.div>

          {/* Stat 2: Earning Potential */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF2C6D] to-[#00F0FF] rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative bg-gradient-to-br from-[#0B3142]/90 to-[#2B174C]/90 rounded-2xl p-6 sm:p-8 border border-[#3EC6FF]/20 backdrop-blur-sm h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#FF2C6D]/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-[#FF2C6D]" />
                </div>
              </div>
              <div className="mb-2">
                <span className="text-3xl sm:text-4xl font-bold text-[#FF2C6D]">$85-$250</span>
                <span className="text-white/60 text-sm ml-1">/hour</span>
              </div>
              <p className="text-white/80 text-sm sm:text-base">
                Typical hourly rate range for experienced nurse consultants
              </p>
            </div>
          </motion.div>

          {/* Stat 3: Market Demand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#3EC6FF] to-[#FF2C6D] rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative bg-gradient-to-br from-[#0B3142]/90 to-[#2B174C]/90 rounded-2xl p-6 sm:p-8 border border-[#3EC6FF]/20 backdrop-blur-sm h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#3EC6FF]/20 flex items-center justify-center">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 text-[#3EC6FF]" />
                </div>
              </div>
              <div className="mb-2">
                <span className="text-2xl sm:text-3xl font-bold text-[#3EC6FF]">High Demand</span>
              </div>
              <p className="text-white/80 text-sm sm:text-base">
                Hospitals, insurance providers, and healthcare organizations are actively seeking specialized nursing insights
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-base sm:text-lg text-white/80 mb-6">
            Your clinical experience is more valuable than you think. It&apos;s time to turn it into a thriving consulting business.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#lead-form"
              className="inline-flex items-center gap-2 text-[#00F0FF] hover:text-[#FF2C6D] transition-colors duration-200 font-semibold text-base sm:text-lg"
            >
              Get Your Free Blueprint Now
              <span className="text-xl">→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}
