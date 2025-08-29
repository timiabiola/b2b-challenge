'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Rocket, Cpu } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { GlowCard } from '@/components/features/GlowCard'
import { THREE_PILLARS } from '@/lib/constants'

const iconMap = {
  Brain,
  Rocket,
  Cpu,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export function ThreePillarsSection() {
  return (
    <Section variant="gradient" id="pillars">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-[#FFF6D6] mb-4">
            The Three Pillars of Your Transformation
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Skip the frameworks—here&apos;s your 90-day revenue-doubling roadmap.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {THREE_PILLARS.map((pillar, index) => {
            const Icon = iconMap[pillar.icon as keyof typeof iconMap]
            const iconColors = ['#00F0FF', '#FF2C6D', '#3EC6FF']
            
            return (
              <motion.div key={pillar.id} variants={itemVariants}>
                <GlowCard className="h-full">
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="relative">
                      <div 
                        className="w-16 h-16 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${iconColors[index]}20` }}
                      >
                        <Icon 
                          className="w-8 h-8" 
                          style={{ color: iconColors[index] }}
                        />
                      </div>
                      <motion.div
                        className="absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ 
                          background: `radial-gradient(circle, ${iconColors[index]}40 0%, transparent 70%)` 
                        }}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-[#FFF6D6]">
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/80 leading-relaxed">
                      {pillar.description}
                    </p>

                    {/* Number indicator */}
                    <div className="pt-4">
                      <span 
                        className="text-5xl font-bold opacity-10"
                        style={{ color: iconColors[index] }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-lg text-white/80 mb-6">
            This isn&apos;t theory. This is exactly what we&apos;ll build for your business.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="#lead-form"
              className="inline-flex items-center gap-2 text-[#00F0FF] hover:text-[#FF2C6D] transition-colors duration-200 font-semibold"
            >
              Ready to see how this works for you?
              <span className="text-xl">→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}