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
  phone: z.string()
    .min(10, 'Please enter a valid phone number')
    .regex(/^[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
})

export function LeadCaptureSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
        phone: data.phone,
        blueprint_request: 'Bedside-to-Business Blueprint',
        submission_id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      };

      // Log the data being sent for debugging
      console.log('📤 Submitting lead data:', {
        timestamp: webhookData.timestamp,
        submission_id: webhookData.submission_id,
        data: webhookData
      });

      // Send to webhook
      const webhookResponse = await fetch('https://services.leadconnectorhq.com/hooks/vuoXllweQOW5Mxsn8raO/webhook-trigger/d8d8d8b3-2fac-48a8-9832-33cbbf4a2b15', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });

      // Log webhook response
      console.log('📥 Webhook response:', {
        status: webhookResponse.status,
        statusText: webhookResponse.statusText,
        ok: webhookResponse.ok,
        url: webhookResponse.url
      });

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

      if (!webhookResponse.ok) {
        const errorText = await webhookResponse.text().catch(() => 'Unknown error');
        console.error('❌ Webhook submission failed:', {
          status: webhookResponse.status,
          statusText: webhookResponse.statusText,
          error: errorText
        });
        throw new Error(`Webhook failed: ${webhookResponse.status} ${webhookResponse.statusText}`);
      }

      console.log('✅ Lead submission successful!');

      toast.success('🎉 Success! Your blueprint is on its way!', {
        description: 'Check your email inbox for your free Bedside-to-Business Blueprint download link.',
        duration: 5000,
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
          content_name: 'Bedside-to-Business Blueprint',
          content_category: 'Nurse Consulting'
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
                Download Your Free Bedside-to-Business Blueprint
              </h2>
              <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 text-center">
                Get instant access to the complete 5-step framework that helps nurses launch profitable consulting businesses.
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
                      "Send Me the Blueprint →"
                    )}
                  </Button>
                </div>

                {/* Privacy Notice */}
                <p className="text-sm text-white/60 text-center">
                  🔒 Your information is 100% secure. We respect your privacy and will never spam you.
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}