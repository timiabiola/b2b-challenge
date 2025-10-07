'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { AnimatedBackground } from './AnimatedBackground'
import { HERO_CONTENT } from '@/lib/constants'
import { trackCTAClick } from '@/lib/analytics'

export function HeroSection() {
  const scrollToForm = () => {
    const formElement = document.getElementById('lead-form')
    formElement?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#FFF6D6] mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {HERO_CONTENT.headline}
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {HERO_CONTENT.subheadline}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="default"
                variant="primary"
                onClick={scrollToForm}
                className="text-base px-8 py-3 font-semibold h-[64px] w-full sm:w-[280px] flex items-center justify-center"
              >
                {HERO_CONTENT.ctaText}
              </Button>
              <Button
                size="default"
                variant="outline"
                onClick={scrollToForm}
                className="text-base px-8 py-3 font-semibold h-[64px] w-full sm:w-[280px] flex items-center justify-center border-2 border-[#3EC6FF] text-[#00F0FF] hover:bg-[#00F0FF]/10 hover:text-[#00F0FF]"
              >
                {HERO_CONTENT.ctaTextSecondary}
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Image/Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] max-w-sm sm:max-w-lg mx-auto">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/20 to-[#FF2C6D]/20 rounded-2xl blur-3xl" />
              
              {/* Professional image placeholder */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#3EC6FF]/30">
                <Image 
                  src="/timi-abiola.jpg" 
                  alt="Timi Abiola - AI & Informatics Expert"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B3142] to-transparent z-10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}