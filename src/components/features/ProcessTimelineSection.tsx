'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CHALLENGE_DAYS } from '@/lib/constants'
import { CheckCircle, Target } from 'lucide-react'

export function ProcessTimelineSection() {
  return (
    <Section variant="dark" id="process" className="relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, #00F0FF 0%, transparent 50%), radial-gradient(circle at 75% 75%, #FF2C6D 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#FFF6D6] mb-3 sm:mb-4">
            Your 3-Day Challenge Breakdown
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/80">
            From nurse to consultant in 3 intensive days. Focused. Transformative. Results-driven.
          </p>
        </motion.div>

        {/* Mobile and Tablet View (Cards) */}
        <div className="block lg:hidden">
          <div className="space-y-4 sm:space-y-6">
            {CHALLENGE_DAYS.map((day, index) => (
              <motion.div
                key={day.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden bg-gradient-to-br from-[#0B3142]/90 to-[#2B174C]/90 border-[#3EC6FF]/20 backdrop-blur-sm hover:border-[#00F0FF]/40 transition-all duration-300">
                  {/* Day Badge */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                    <Badge className="bg-gradient-to-br from-[#00F0FF] to-[#FF2C6D] text-white font-bold px-3 py-1">
                      {day.day}
                    </Badge>
                  </div>

                  {/* Day Number Circle */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                    <div className="relative">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#FF2C6D] flex items-center justify-center">
                        <span className="text-white font-bold text-lg sm:text-xl">
                          {index + 1}
                        </span>
                      </div>
                      {/* Pulse effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[#00F0FF]/20"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      />
                    </div>
                  </div>

                  <CardContent className="pt-4 pb-5 pl-20 pr-4 sm:pt-6 sm:pb-6 sm:pl-24 sm:pr-6">
                    {/* Header with Title */}
                    <div className="mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#FFF6D6] leading-tight text-center sm:text-left">
                        {day.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-white/80 mb-4 leading-relaxed text-center sm:text-left">
                      {day.description}
                    </p>

                    {/* Goals List */}
                    <div className="space-y-2 mb-4">
                      {day.goals.map((goal, goalIndex) => (
                        <div key={goalIndex} className="flex items-start gap-2">
                          <Target className="w-4 h-4 text-[#00F0FF] flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-white/70">{goal}</span>
                        </div>
                      ))}
                    </div>

                    {/* Day Indicator */}
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <CheckCircle className="w-4 h-4 text-[#3EC6FF]" />
                      <span className="text-xs sm:text-sm text-[#3EC6FF]">
                        Day {index + 1} of 3
                      </span>
                    </div>
                  </CardContent>

                  {/* Progress Bar at Bottom */}
                  <div className="h-1 bg-[#0B3142]">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#00F0FF] to-[#3EC6FF]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${((index + 1) / CHALLENGE_DAYS.length) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop View (Original Timeline) */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00F0FF] via-[#3EC6FF] to-[#FF2C6D]" />

            {/* Timeline items */}
            <div className="space-y-12">
              {CHALLENGE_DAYS.map((day, index) => (
                <motion.div
                  key={day.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex items-start gap-6"
                >
                  {/* Day indicator */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#FF2C6D] flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-white font-bold text-lg">
                        {index + 1}
                      </span>
                    </motion.div>

                    {/* Pulse effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#00F0FF]/20"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <motion.div
                      className={`bg-gradient-to-br from-[#0B3142] to-[#2B174C] rounded-xl p-6 border border-[#3EC6FF]/20 ${
                        index % 2 === 0 ? 'lg:ml-0' : 'lg:ml-12'
                      }`}
                      whileHover={{
                        borderColor: 'rgba(0, 240, 255, 0.5)',
                        boxShadow: '0 10px 30px -10px rgba(0, 240, 255, 0.3)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-[#FFF6D6]">
                          {day.title}
                        </h3>
                        <Badge className="bg-gradient-to-br from-[#00F0FF] to-[#FF2C6D] text-white font-bold">
                          {day.day}
                        </Badge>
                      </div>

                      <p className="text-white/80 mb-4">
                        {day.description}
                      </p>

                      {/* Goals List */}
                      <div className="space-y-2 mb-4">
                        {day.goals.map((goal, goalIndex) => (
                          <div key={goalIndex} className="flex items-start gap-2">
                            <Target className="w-4 h-4 text-[#00F0FF] flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-white/70">{goal}</span>
                          </div>
                        ))}
                      </div>

                      {/* Progress indicators */}
                      <div className="flex items-center gap-2 text-sm text-[#3EC6FF]">
                        <CheckCircle className="w-4 h-4" />
                        <span>Day {index + 1} of 3</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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
            Stop second-guessing your potential. Join the waitlist and be the first to know when the next challenge launches.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#lead-form"
              className="inline-flex items-center gap-2 text-[#00F0FF] hover:text-[#FF2C6D] transition-colors duration-200 font-semibold text-base sm:text-lg"
            >
              Join the Waitlist
              <span className="text-xl">→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}