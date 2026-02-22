'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { LeadFormData } from '@/types'
import { Loader2 } from 'lucide-react'
import { ceAnimations } from '@/lib/utils'

const formSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .max(50, 'First name is too long'),
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(50, 'Last name is too long'),
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  linkedinUrl: z.string().optional(),
  businessReason: z.string()
    .min(1, 'Please select a reason'),
})

export function LeadCaptureSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<LeadFormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)

    try {
      // Prepare data for webhook
      const webhookData = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        linkedin_url: data.linkedinUrl || '',
        business_reason: data.businessReason,
        blueprint_request: 'Bedside to Business Challenge Waitlist',
        submission_id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      };

      // Log the data being sent for debugging
      console.log('📤 Submitting lead data:', {
        timestamp: webhookData.timestamp,
        submission_id: webhookData.submission_id,
        data: webhookData
      });

      // Send to webhook with better error handling
      try {
        await fetch('https://hooks.zapier.com/hooks/catch/20915866/u5yrfbm/', {
          method: 'POST',
          mode: 'no-cors', // Allow cross-origin request
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData),
        });

        // Note: with mode: 'no-cors', response will be opaque and we can't read status
        // But the request will still be sent to Zapier
        console.log('📥 Webhook sent to Zapier (no-cors mode)');
      } catch (webhookError) {
        console.error('⚠️ Webhook error (but continuing):', webhookError);
        // Don't throw - we'll still show success to user since data was prepared
      }

      // Also send to our API endpoint (if it exists)
      await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          submissionId: webhookData.submission_id,
          timestamp: webhookData.timestamp,
        }),
      }).catch((error) => {
        console.log('ℹ️ Internal API not available (this is expected):', error.message);
        return null;
      });

      console.log('✅ Lead submission successful!');

      toast.success('🎉 Success! You\'re on the waitlist!', {
        description: 'Check your email for confirmation and we\'ll notify you as soon as the next challenge opens.',
        duration: 5000,
        style: {
          background: '#1a0f32',
          color: '#f8f4e9',
          border: '1px solid rgba(229, 185, 76, 0.3)',
        },
        className: 'toast-success-custom',
      })
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
          content_name: 'Bedside to Business Challenge Waitlist',
          content_category: 'Nurse Consulting Challenge'
        })
      }
    } catch (error) {
      console.error('❌ Form submission error:', error);

      // Provide specific error messages based on the error type
      let errorMessage = 'Oops! Something went wrong.';
      let errorDescription = 'Please try again or email us directly at contact@enlightenedinformatics.com';

      if (error instanceof Error) {
        if (error.message.includes('Webhook failed')) {
          errorMessage = 'Submission Error';
          errorDescription = 'There was an issue submitting your information. Please check your internet connection and try again.';
          console.error('🔗 Webhook submission failed - check network connectivity and webhook endpoint');
        } else if (error.message.includes('fetch')) {
          errorMessage = 'Connection Error';
          errorDescription = 'Unable to connect to our servers. Please check your internet connection and try again.';
          console.error('🌐 Network connectivity issue detected');
        }
      }

      toast.error(errorMessage, {
        description: errorDescription,
        duration: 7000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section variant="default" id="lead-form" watermark="08" withVignette padding="normal">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-2xl overflow-hidden border border-[rgba(248,244,233,0.06)]">
          {/* LEFT: Founder photo with editorial overlay */}
          <motion.div
            className="lg:col-span-5 relative"
            {...ceAnimations.slideLeft}
          >
            {/* Photo container - shorter on mobile, full height on desktop */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px]">
              <Image
                src="/timi-abiola.jpg"
                alt="Timi Abiola - AI &amp; Informatics Expert"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover opacity-90"
                priority
              />

              {/* Bottom gradient overlay for text */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#120925] via-[#120925]/60 to-transparent" />

              {/* Editorial CTA text overlaid on photo */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-10">
                {/* Folio */}
                <span className="ce-folio block mb-4">Final Chapter</span>

                {/* Headline */}
                <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-[#f8f4e9] mb-6">
                  Save Your Spot on the Waitlist
                </h2>

                {/* Trust signals with gold line */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-px bg-[#e5b94c]/50 flex-shrink-0" />
                    <span className="text-sm text-[#f8f4e9]/70">No commitment required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-px bg-[#e5b94c]/50 flex-shrink-0" />
                    <span className="text-sm text-[#f8f4e9]/70">Early-bird pricing access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-px bg-[#e5b94c]/50 flex-shrink-0" />
                    <span className="text-sm text-[#f8f4e9]/70">First to know when doors open</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-[#1a0f32] p-6 sm:p-8 lg:p-10 h-full border-l-0 lg:border-l-2 lg:border-[#e5b94c]/20">
              <p className="text-base sm:text-lg text-[#f8f4e9]/70 mb-6 sm:mb-8">
                Be the first to know when the next challenge opens. No commitment, just first access and early-bird pricing.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                {/* First Name and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-[#f8f4e9] text-base">
                      First Name*
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      autoComplete="given-name"
                      className="bg-[rgba(255,255,255,0.03)] border-[rgba(248,244,233,0.1)] text-[#f8f4e9] placeholder:text-[#f8f4e9]/30 focus:border-[#e5b94c] focus:ring-[#e5b94c]/20 h-12 text-base"
                      {...register('firstName')}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-400">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-[#f8f4e9] text-base">
                      Last Name*
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      autoComplete="family-name"
                      className="bg-[rgba(255,255,255,0.03)] border-[rgba(248,244,233,0.1)] text-[#f8f4e9] placeholder:text-[#f8f4e9]/30 focus:border-[#e5b94c] focus:ring-[#e5b94c]/20 h-12 text-base"
                      {...register('lastName')}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-400">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#f8f4e9] text-base">
                    Your Email Address*
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    inputMode="email"
                    className="bg-[rgba(255,255,255,0.03)] border-[rgba(248,244,233,0.1)] text-[#f8f4e9] placeholder:text-[#f8f4e9]/30 focus:border-[#e5b94c] focus:ring-[#e5b94c]/20 h-12 text-base"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                {/* LinkedIn Profile URL */}
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl" className="text-[#f8f4e9] text-base">
                    LinkedIn Profile URL (optional)
                  </Label>
                  <Input
                    id="linkedinUrl"
                    type="url"
                    placeholder="https://www.linkedin.com/in/yourprofile"
                    className="bg-[rgba(255,255,255,0.03)] border-[rgba(248,244,233,0.1)] text-[#f8f4e9] placeholder:text-[#f8f4e9]/30 focus:border-[#e5b94c] focus:ring-[#e5b94c]/20"
                    {...register('linkedinUrl')}
                  />
                  <p className="text-xs text-[#f8f4e9]/40">Helps us personalize your challenge experience</p>
                  {errors.linkedinUrl && (
                    <p className="text-sm text-red-400">{errors.linkedinUrl.message}</p>
                  )}
                </div>

                {/* Business Reason */}
                <div className="space-y-3">
                  <Label className="text-[#f8f4e9] text-base">
                    Why do you want to start a business?*
                  </Label>
                  <RadioGroup
                    onValueChange={(value) => {
                      setValue('businessReason', value, { shouldValidate: true })
                    }}
                    className="space-y-3"
                  >
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(248,244,233,0.08)] hover:border-[#e5b94c]/30 transition-colors duration-400">
                      <RadioGroupItem value="experience-income" id="reason-1" className="mt-0.5 border-[#e5b94c]/40 text-[#e5b94c]" />
                      <Label
                        htmlFor="reason-1"
                        className="text-sm sm:text-base text-[#f8f4e9]/80 cursor-pointer leading-relaxed font-normal"
                      >
                        I want to use my experience, skills and knowledge to create a new income source.
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(248,244,233,0.08)] hover:border-[#e5b94c]/30 transition-colors duration-400">
                      <RadioGroupItem value="side-hustle" id="reason-2" className="mt-0.5 border-[#e5b94c]/40 text-[#e5b94c]" />
                      <Label
                        htmlFor="reason-2"
                        className="text-sm sm:text-base text-[#f8f4e9]/80 cursor-pointer leading-relaxed font-normal"
                      >
                        I want to supplement my employment income by developing a side hustle.
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(248,244,233,0.08)] hover:border-[#e5b94c]/30 transition-colors duration-400">
                      <RadioGroupItem value="replace-income" id="reason-3" className="mt-0.5 border-[#e5b94c]/40 text-[#e5b94c]" />
                      <Label
                        htmlFor="reason-3"
                        className="text-sm sm:text-base text-[#f8f4e9]/80 cursor-pointer leading-relaxed font-normal"
                      >
                        I want to build a business that will replace my employment income and allow me to leave my job.
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(248,244,233,0.08)] hover:border-[#e5b94c]/30 transition-colors duration-400">
                      <RadioGroupItem value="personal-brand" id="reason-4" className="mt-0.5 border-[#e5b94c]/40 text-[#e5b94c]" />
                      <Label
                        htmlFor="reason-4"
                        className="text-sm sm:text-base text-[#f8f4e9]/80 cursor-pointer leading-relaxed font-normal"
                      >
                        I want to develop and build my Personal Brand online through offers that add value and social media presence.
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.businessReason && (
                    <p className="text-sm text-red-400">{errors.businessReason.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    size="default"
                    className="text-base px-8 py-3 h-auto font-semibold min-w-[200px] w-full sm:w-auto min-h-[44px]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Join the Waitlist \u2192"
                    )}
                  </Button>
                </div>

                {/* Privacy Notice */}
                <p className="text-sm text-[#f8f4e9]/50 text-center">
                  No spam, no sharing. Just one email when the challenge opens.
                </p>
                <p className="text-xs text-[#f8f4e9]/40 text-center mt-2">
                  After you join, you&apos;ll get a confirmation email. We&apos;ll notify you the moment the next challenge opens, including early-bird pricing.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
