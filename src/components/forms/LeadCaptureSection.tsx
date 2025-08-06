'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FORM_SUCCESS_MESSAGE } from '@/lib/constants'
import type { LeadFormData } from '@/types'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  phone: z.string()
    .min(10, 'Please enter a valid phone number')
    .regex(/^[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  industry: z.string()
    .min(2, 'Please tell us your industry')
    .max(100, 'Industry name is too long'),
  processToAutomate: z.string()
    .min(20, 'Please provide more details (at least 20 characters)')
    .max(500, 'Please keep your response under 500 characters'),
  decisionAuthority: z.enum(['yes', 'no', 'other']).refine((val) => val, {
    message: 'Please select an option',
  }),
})

export function LeadCaptureSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<LeadFormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          submissionId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      toast.success(FORM_SUCCESS_MESSAGE)
      reset()
      
      // Track conversion in Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', {
          'currency': 'USD',
          'value': 100.0
        })
      }
      
      // Track conversion in Facebook Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
          currency: 'USD',
          value: 100.0,
          content_name: 'Growth Analysis',
          content_category: data.industry
        })
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again or email us directly.')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section variant="gradient" id="lead-form">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Form Card */}
          <div className="relative">
            {/* Gradient shadow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00F0FF] to-[#FF2C6D] rounded-2xl blur-lg opacity-30" />
            
            <div className="relative bg-[#0B3142] rounded-2xl p-8 md:p-10 border border-[#3EC6FF]/20">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#FFF6D6] mb-4">
                Ready to Transform? Let&apos;s Talk.
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Tell me about your biggest challenge, and I&apos;ll show you exactly how to solve it.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#FFF6D6] text-base">
                    Your Best Phone Number*
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="bg-[#0B3142]/50 border-[#3EC6FF]/30 text-white placeholder:text-white/50 focus:border-[#00F0FF] focus:ring-[#00F0FF]/20"
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p className="text-sm text-[#FF2C6D]">{errors.phone.message}</p>
                  )}
                </div>

                {/* Industry */}
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-[#FFF6D6] text-base">
                    Your Industry*
                  </Label>
                  <Input
                    id="industry"
                    type="text"
                    placeholder="e.g., E-commerce, SaaS, Manufacturing, Services, Real Estate"
                    className="bg-[#0B3142]/50 border-[#3EC6FF]/30 text-white placeholder:text-white/50 focus:border-[#00F0FF] focus:ring-[#00F0FF]/20"
                    {...register('industry')}
                  />
                  {errors.industry && (
                    <p className="text-sm text-[#FF2C6D]">{errors.industry.message}</p>
                  )}
                </div>

                {/* Process to Automate */}
                <div className="space-y-2">
                  <Label htmlFor="processToAutomate" className="text-[#FFF6D6] text-base">
                    What&apos;s Eating Up Your Team&apos;s Time?*
                  </Label>
                  <Textarea
                    id="processToAutomate"
                    placeholder="Tell me about the repetitive tasks killing your productivity (e.g., customer onboarding, invoice processing, lead qualification, inventory management, social media posting, report generation)"
                    className="bg-[#0B3142]/50 border-[#3EC6FF]/30 text-white placeholder:text-white/50 focus:border-[#00F0FF] focus:ring-[#00F0FF]/20 min-h-[120px]"
                    {...register('processToAutomate')}
                  />
                  {errors.processToAutomate && (
                    <p className="text-sm text-[#FF2C6D]">{errors.processToAutomate.message}</p>
                  )}
                </div>

                {/* Decision Authority */}
                <div className="space-y-3">
                  <Label className="text-[#FFF6D6] text-base">
                    Can You Make Investment Decisions?*
                  </Label>
                  <RadioGroup {...register('decisionAuthority')}>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#3EC6FF]/10 transition-colors">
                      <RadioGroupItem value="yes" id="yes" className="border-[#3EC6FF] text-[#00F0FF]" />
                      <Label htmlFor="yes" className="text-white cursor-pointer flex-1">
                        Yes, I can make financial decisions for my organization
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#3EC6FF]/10 transition-colors">
                      <RadioGroupItem value="no" id="no" className="border-[#3EC6FF] text-[#00F0FF]" />
                      <Label htmlFor="no" className="text-white cursor-pointer flex-1">
                        No, I need to consult with others first
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#3EC6FF]/10 transition-colors">
                      <RadioGroupItem value="other" id="other" className="border-[#3EC6FF] text-[#00F0FF]" />
                      <Label htmlFor="other" className="text-white cursor-pointer flex-1">
                        It&apos;s complicated (I&apos;ll explain)
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.decisionAuthority && (
                    <p className="text-sm text-[#FF2C6D]">{errors.decisionAuthority.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="button"
                  size="lg"
                  className="w-full text-lg py-6"
                  onClick={async () => {
                    // Validate form first
                    const isValid = await trigger();
                    if (isValid) {
                      // Submit form data in background
                      await handleSubmit(onSubmit)();
                      // Open external assessment
                      window.open('https://timi-ubvro9j7.scoreapp.com/', '_blank');
                    }
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Get My Growth Constraint Assessment →'
                  )}
                </Button>

                {/* Privacy Notice */}
                <p className="text-sm text-white/60 text-center">
                  🔒 Your information is 100% secure. No spam, just solutions.
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}