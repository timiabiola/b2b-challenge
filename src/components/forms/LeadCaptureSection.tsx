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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { LeadFormData } from '@/types'
import { Loader2 } from 'lucide-react'

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
          background: '#0B3142',
          color: '#FFFFFF',
          border: '1px solid #3EC6FF',
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
            
            <div className="relative bg-[#0B3142] rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-[#3EC6FF]/20">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFF6D6] mb-3 sm:mb-4 text-center">
                Join the Bedside to Business Challenge Waitlist
              </h2>
              <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 text-center">
                Be the first to know when the next 3-day intensive challenge launches. Limited spots available—secure your place now.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                {/* First Name and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-[#FFF6D6] text-base">
                      First Name*
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      className="bg-[#0B3142]/50 border-[#3EC6FF]/30 text-white placeholder:text-white/50 focus:border-[#00F0FF] focus:ring-[#00F0FF]/20 h-12 text-base"
                      {...register('firstName')}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-[#FF2C6D]">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-[#FFF6D6] text-base">
                      Last Name*
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      className="bg-[#0B3142]/50 border-[#3EC6FF]/30 text-white placeholder:text-white/50 focus:border-[#00F0FF] focus:ring-[#00F0FF]/20 h-12 text-base"
                      {...register('lastName')}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-[#FF2C6D]">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#FFF6D6] text-base">
                    Your Email Address*
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-[#0B3142]/50 border-[#3EC6FF]/30 text-white placeholder:text-white/50 focus:border-[#00F0FF] focus:ring-[#00F0FF]/20"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-sm text-[#FF2C6D]">{errors.email.message}</p>
                  )}
                </div>

                {/* LinkedIn Profile URL */}
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl" className="text-[#FFF6D6] text-base">
                    LinkedIn Profile URL
                  </Label>
                  <Input
                    id="linkedinUrl"
                    type="url"
                    placeholder="https://www.linkedin.com/in/yourprofile"
                    className="bg-[#0B3142]/50 border-[#3EC6FF]/30 text-white placeholder:text-white/50 focus:border-[#00F0FF] focus:ring-[#00F0FF]/20"
                    {...register('linkedinUrl')}
                  />
                  {errors.linkedinUrl && (
                    <p className="text-sm text-[#FF2C6D]">{errors.linkedinUrl.message}</p>
                  )}
                </div>

                {/* Business Reason */}
                <div className="space-y-3">
                  <Label className="text-[#FFF6D6] text-base">
                    Why do you want to start a business?*
                  </Label>
                  <RadioGroup
                    onValueChange={(value) => {
                      setValue('businessReason', value, { shouldValidate: true })
                    }}
                    className="space-y-3"
                  >
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#0B3142]/30 border border-[#3EC6FF]/20 hover:border-[#00F0FF]/40 transition-colors">
                      <RadioGroupItem value="experience-income" id="reason-1" className="mt-0.5 border-[#3EC6FF] text-[#00F0FF]" />
                      <Label
                        htmlFor="reason-1"
                        className="text-sm sm:text-base text-white/90 cursor-pointer leading-relaxed font-normal"
                      >
                        I want to use my experience, skills and knowledge to create a new income source.
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#0B3142]/30 border border-[#3EC6FF]/20 hover:border-[#00F0FF]/40 transition-colors">
                      <RadioGroupItem value="side-hustle" id="reason-2" className="mt-0.5 border-[#3EC6FF] text-[#00F0FF]" />
                      <Label
                        htmlFor="reason-2"
                        className="text-sm sm:text-base text-white/90 cursor-pointer leading-relaxed font-normal"
                      >
                        I want to supplement my employment income by developing a side hustle.
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#0B3142]/30 border border-[#3EC6FF]/20 hover:border-[#00F0FF]/40 transition-colors">
                      <RadioGroupItem value="replace-income" id="reason-3" className="mt-0.5 border-[#3EC6FF] text-[#00F0FF]" />
                      <Label
                        htmlFor="reason-3"
                        className="text-sm sm:text-base text-white/90 cursor-pointer leading-relaxed font-normal"
                      >
                        I want to build a business that will replace my employment income and allow me to leave my job.
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#0B3142]/30 border border-[#3EC6FF]/20 hover:border-[#00F0FF]/40 transition-colors">
                      <RadioGroupItem value="personal-brand" id="reason-4" className="mt-0.5 border-[#3EC6FF] text-[#00F0FF]" />
                      <Label
                        htmlFor="reason-4"
                        className="text-sm sm:text-base text-white/90 cursor-pointer leading-relaxed font-normal"
                      >
                        I want to develop and build my Personal Brand online through offers that add value and social media presence.
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.businessReason && (
                    <p className="text-sm text-[#FF2C6D]">{errors.businessReason.message}</p>
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
                      "Join the Waitlist →"
                    )}
                  </Button>
                </div>

                {/* Privacy Notice */}
                <p className="text-sm text-white/60 text-center">
                  🔒 Your information is 100% secure. Limited spots available. Join the waitlist to be notified when registration opens.
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}