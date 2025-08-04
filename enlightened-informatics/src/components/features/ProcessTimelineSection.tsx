'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { PROCESS_STEPS } from '@/lib/constants'
import { CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

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
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-[#FFF6D6] mb-4">
            Your Journey to 2X Revenue
          </h2>
          <p className="text-xl text-white/80">
            Simple. Strategic. And it starts today.
          </p>
          
          {/* Animated badges */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Badge variant="cyan" className="text-lg px-4 py-2">
                2X Revenue ↑
              </Badge>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              <Badge variant="magenta" className="text-lg px-4 py-2">
                90 Days
              </Badge>
            </motion.div>
          </div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00F0FF] via-[#3EC6FF] to-[#FF2C6D] hidden md:block" />

          {/* Timeline items */}
          <div className="space-y-12">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex items-start gap-6"
              >
                {/* Step indicator */}
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
                      index % 2 === 0 ? 'md:ml-0' : 'md:ml-12'
                    }`}
                    whileHover={{ 
                      borderColor: 'rgba(0, 240, 255, 0.5)',
                      boxShadow: '0 10px 30px -10px rgba(0, 240, 255, 0.3)'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-bold text-[#FFF6D6]">
                        {step.title}
                      </h3>
                      <span className="text-sm text-[#00F0FF] font-semibold bg-[#00F0FF]/10 px-3 py-1 rounded-full">
                        {step.duration}
                      </span>
                    </div>
                    
                    <p className="text-white/80 mb-4">
                      {step.description}
                    </p>

                    {/* Progress indicators */}
                    <div className="flex items-center gap-2 text-sm text-[#3EC6FF]">
                      <CheckCircle className="w-4 h-4" />
                      <span>Milestone {index + 1} of 4</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-white/80 mb-6">
            Stop overthinking. Start transforming. Your competition won&apos;t wait.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="#lead-form"
              className="inline-flex items-center gap-2 text-[#00F0FF] hover:text-[#FF2C6D] transition-colors duration-200 font-semibold text-lg"
            >
              Start Your 90-Day Transformation
              <span className="text-xl">→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}