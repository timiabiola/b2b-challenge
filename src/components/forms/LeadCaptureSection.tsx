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
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { LeadFormData } from '@/types'
import { Loader2 } from 'lucide-react'

const processOptions = [
  { id: 'customer-onboarding', label: 'Customer Onboarding' },
  { id: 'invoice-processing', label: 'Invoice Processing' },
  { id: 'lead-qualification', label: 'Lead Qualification' },
  { id: 'inventory-management', label: 'Inventory Management' },
  { id: 'social-media-posting', label: 'Social Media Posting' },
  { id: 'report-generation', label: 'Report Generation' },
  { id: 'email-marketing', label: 'Email Marketing' },
  { id: 'data-entry', label: 'Data Entry' },
  { id: 'customer-support', label: 'Customer Support' },
  { id: 'other', label: 'Other' },
]

const positionOptions = [
  { value: 'founder', label: 'Founder' },
  { value: 'ceo', label: 'CEO' },
  { value: 'director', label: 'Director' },
  { value: 'manager', label: 'Manager' },
  { value: 'solopreneur', label: 'Solopreneur' },
  { value: 'other', label: 'Other' },
]

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
  position: z.string()
    .min(1, 'Please select your position'),
  industry: z.string()
    .min(2, 'Please tell us your industry')
    .max(100, 'Industry name is too long'),
  processesToAutomate: z.array(z.string()).min(1, 'Please select at least one process'),
  decisionAuthority: z.enum(['yes', 'no', 'other']).refine((val) => val, {
    message: 'Please select an option',
  }),
})

export function LeadCaptureSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([])
  const [selectedPosition, setSelectedPosition] = useState<string>('')
  const [selectedDecisionAuthority, setSelectedDecisionAuthority] = useState<string>('')
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<LeadFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      processesToAutomate: [],
      position: '',
      decisionAuthority: undefined,
    },
  })

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)
    
    try {
      // Prepare data for webhook
      const formattedProcesses = data.processesToAutomate
        .map(p => {
          const option = processOptions.find(opt => opt.id === p);
          return option?.label || p;
        })
        .join(', ');

      const webhookData = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        position: data.position,
        industry: data.industry,
        processes_to_automate: formattedProcesses,
        decision_authority: data.decisionAuthority,
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

      toast.success('🎉 Got it! We received your information and will be in touch soon!', {
        description: 'Check your phone within the next 24 hours - we\'re excited to help transform your business!',
        duration: 5000,
      })
      reset()
      setSelectedProcesses([])
      setSelectedPosition('')
      setSelectedDecisionAuthority('')
      
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
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFF6D6] mb-3 sm:mb-4">
                Ready to Transform? Let&apos;s Talk.
              </h2>
              <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8">
                Tell me about your biggest challenge, and I&apos;ll show you exactly how to solve it.
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

                {/* Position */}
                <div className="space-y-2">
                  <Label htmlFor="position" className="text-[#FFF6D6] text-base">
                    Your Position*
                  </Label>
                  <Select 
                    value={selectedPosition}
                    onValueChange={(value) => {
                      setSelectedPosition(value)
                      setValue('position', value)
                    }}
                  >
                    <SelectTrigger 
                      className="bg-[#0B3142]/50 border-[#3EC6FF]/30 text-white focus:border-[#00F0FF] focus:ring-[#00F0FF]/20"
                    >
                      <SelectValue placeholder="Select your position" className="placeholder:text-white/50" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0B3142] border-[#3EC6FF]/30">
                      {positionOptions.map(option => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className="text-white hover:bg-[#3EC6FF]/20 focus:bg-[#3EC6FF]/20 focus:text-white"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.position && (
                    <p className="text-sm text-[#FF2C6D]">{errors.position.message}</p>
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

                {/* Processes to Automate */}
                <div className="space-y-3">
                  <Label className="text-[#FFF6D6] text-base font-semibold">
                    What&apos;s Eating Up Your Team&apos;s Time?* 
                    <span className="text-sm font-normal text-white/70 block mt-1">Select all that apply</span>
                  </Label>
                  <div className="bg-gradient-to-b from-[#0B3142]/40 to-[#0B3142]/20 rounded-xl p-5 border border-[#3EC6FF]/20 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                      {processOptions.map((option) => (
                        <div 
                          key={option.id} 
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#3EC6FF]/5 transition-all duration-200 group min-h-[44px]"
                        >
                          <Checkbox
                            id={option.id}
                            checked={selectedProcesses.includes(option.id)}
                            onCheckedChange={(checked) => {
                              const newProcesses = checked
                                ? [...selectedProcesses, option.id]
                                : selectedProcesses.filter(p => p !== option.id);
                              setSelectedProcesses(newProcesses);
                              setValue('processesToAutomate', newProcesses);
                            }}
                            className="h-5 w-5 border-2 border-[#3EC6FF]/50 data-[state=checked]:bg-[#00F0FF] data-[state=checked]:border-[#00F0FF] group-hover:border-[#00F0FF]/70 transition-colors"
                          />
                          <Label 
                            htmlFor={option.id} 
                            className="text-white/90 cursor-pointer flex-1 font-normal text-sm group-hover:text-white transition-colors"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {errors.processesToAutomate && (
                    <p className="text-sm text-[#FF2C6D] flex items-center gap-1">
                      <span className="inline-block w-1 h-1 bg-[#FF2C6D] rounded-full"></span>
                      {errors.processesToAutomate.message}
                    </p>
                  )}
                </div>

                {/* Decision Authority */}
                <div className="space-y-3">
                  <Label className="text-[#FFF6D6] text-base">
                    Can You Make Investment Decisions?*
                  </Label>
                  <RadioGroup 
                    value={selectedDecisionAuthority}
                    onValueChange={(value) => {
                      setSelectedDecisionAuthority(value)
                      setValue('decisionAuthority', value as 'yes' | 'no' | 'other')
                    }}>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#3EC6FF]/10 transition-colors min-h-[44px]">
                      <RadioGroupItem value="yes" id="yes" className="border-[#3EC6FF] text-[#00F0FF]" />
                      <Label htmlFor="yes" className="text-white cursor-pointer flex-1">
                        Yes, I can make financial decisions for my organization
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#3EC6FF]/10 transition-colors min-h-[44px]">
                      <RadioGroupItem value="no" id="no" className="border-[#3EC6FF] text-[#00F0FF]" />
                      <Label htmlFor="no" className="text-white cursor-pointer flex-1">
                        No, I need to consult with others first
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#3EC6FF]/10 transition-colors min-h-[44px]">
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
                        Submitting...
                      </>
                    ) : (
                      "Let's get to work! →"
                    )}
                  </Button>
                </div>

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