'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Calendar, Clock } from 'lucide-react'

const stats = [
  {
    icon: TrendingUp,
    label: 'Revenue Growth',
    value: '2X',
    description: 'Double your monthly revenue',
    variant: 'cyan' as const,
  },
  {
    icon: Calendar,
    label: 'Time Frame',
    value: '90 Days',
    description: 'After 90 days of working together',
    variant: 'magenta' as const,
  },
  {
    icon: Clock,
    label: 'Time Saved Via Automation',
    value: '10-20 Hours',
    description: 'Streamline lead generation & conversion',
    variant: 'accent' as const,
  },
]

export function StatsSection() {
  return (
    <Section variant="gradient" className="py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">
            Proven Results
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#FFF6D6] mb-4">
            What You Can Expect
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Our clients achieve these results in just 90 days
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/10 to-[#FF2C6D]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative bg-[#0B3142]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#3EC6FF]/20 hover:border-[#3EC6FF]/40 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className="w-8 h-8 text-[#3EC6FF]" />
                    <Badge variant={stat.variant}>
                      {stat.value}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#FFF6D6] mb-2">
                    {stat.label}
                  </h3>
                  
                  <p className="text-white/70">
                    {stat.description}
                  </p>
                  
                  <motion.div
                    className="mt-4 h-1 bg-gradient-to-r from-[#00F0FF] to-[#FF2C6D] rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    style={{ transformOrigin: 'left' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}