# CLAUDE.md - Enlightened Informatics Landing Page Project Guide

## Project Overview
You are helping build a high-converting landing page for Enlightened Informatics, an AI and automation consulting firm led by Timi Abiola. This document contains all essential information needed to maintain consistency across Claude Code sessions.

### Brand Identity
- **Company**: Enlightened Informatics
- **Founder**: Timi Abiola
- **Tagline**: "Transform Your Business with AI & Data"
- **Value Proposition**: Increase revenue by 25% in 90 days through AI automation and data-driven strategies

## Brand Voice (CRITICAL - Always Apply)
- **Conversational**: Use "you" and "I", contractions, rhetorical questions
- **Empathetic**: Acknowledge pain points before offering solutions
- **Motivational**: Balance understanding with strong calls to action
- **Educational**: Provide value in every section
- **Authentic**: Share real experiences and results

### Voice Examples:
❌ **DON'T**: "Our consulting services provide comprehensive solutions."  
✅ **DO**: "Listen, I get it. You're drowning in data but starving for insights."

❌ **DON'T**: "Submit your information for a consultation."  
✅ **DO**: "Tell me about your biggest challenge, and I'll show you exactly how to solve it."

## Brand Colors (Use These Exact Values)
```css
/* Primary Colors */
--deep-navy-blue: #0B3142;     /* Primary backgrounds, cards */
--deep-purple: #2B174C;         /* Gradient backgrounds */
--electric-cyan: #00F0FF;       /* Primary CTAs, highlights */
--vibrant-magenta: #FF2C6D;     /* Secondary CTAs, hover states */
--soft-cream: #FFF6D6;          /* Headlines, featured text */
--accent-blue: #3EC6FF;         /* Subtle accents, icons */
--pure-white: #FFFFFF;          /* Body text */
--dark-gray: #1A1A1A;           /* Text on light backgrounds */
```

## Technical Stack

### Core Technologies
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18.3+
- **Language**: TypeScript 5.3+
- **Styling**: Tailwind CSS 3.4+ with JIT
- **Components**: shadcn/ui v4
- **Forms**: React Hook Form + Zod
- **Notifications**: Sonner (toast)
- **IDs**: crypto.randomUUID()

### File Structure
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/
│       └── submit-lead/
│           └── route.ts
├── components/
│   ├── layout/
│   ├── hero/
│   ├── features/
│   ├── forms/
│   ├── social-proof/
│   └── ui/           # shadcn/ui components
├── lib/
│   ├── utils.ts
│   ├── constants.ts
│   └── hooks/
└── types/
    └── index.ts
```

## Component Implementation Guidelines

### 1. Button Styling (Primary CTA)
```tsx
import { Button } from "@/components/ui/button"

// Primary CTA - Electric Cyan to Magenta
<Button 
  className="bg-[#00F0FF] text-[#0B3142] hover:bg-[#FF2C6D] hover:text-white transition-all duration-300 font-semibold"
  size="lg"
>
  Get My Free Growth Analysis →
</Button>

// Secondary CTA - Magenta to Cyan
<Button 
  className="bg-[#FF2C6D] text-white hover:bg-[#00F0FF] hover:text-[#0B3142] transition-all duration-300"
  variant="outline"
>
  Learn More
</Button>
```

### 2. Card Component Pattern
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card className="relative overflow-hidden bg-[#0B3142] border border-[#3EC6FF]/20 hover:border-[#00F0FF]/50 transition-all duration-300">
  <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/10 to-[#FF2C6D]/10" />
  <CardHeader>
    <CardTitle className="text-[#FFF6D6] text-xl font-bold">
      {title}
    </CardTitle>
  </CardHeader>
  <CardContent className="text-white/90">
    {content}
  </CardContent>
</Card>
```

### 3. Form Field Styling
```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Input field pattern
<div className="space-y-2">
  <Label htmlFor="phone" className="text-[#FFF6D6]">
    Your Best Phone Number*
  </Label>
  <Input 
    id="phone"
    type="tel"
    className="bg-[#0B3142]/50 border-[#3EC6FF]/30 text-white placeholder:text-white/50 focus:border-[#00F0FF] focus:ring-[#00F0FF]/20"
    placeholder="(555) 123-4567"
  />
</div>

// Textarea pattern
<Textarea 
  className="bg-[#0B3142]/50 border-[#3EC6FF]/30 text-white placeholder:text-white/50 focus:border-[#00F0FF] focus:ring-[#00F0FF]/20 min-h-[120px]"
  placeholder="Tell me about the repetitive tasks killing your productivity..."
/>
```

### 4. Section Container Pattern
```tsx
// Dark section with gradient
<section className="relative py-20 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-[#2B174C] to-[#0B3142]" />
  <div className="relative z-10 container mx-auto px-6">
    {/* Content */}
  </div>
</section>

// Light section (rare use)
<section className="py-20 bg-[#FFF6D6]/5">
  <div className="container mx-auto px-6">
    {/* Content */}
  </div>
</section>
```

## Content Sections Requirements

### 1. Hero Section
- **Headline**: "Ready to Transform Your Business with AI & Data?"
- **Subheadline**: Uses Timi's conversational voice
- **CTA**: "Yes, Show Me How →"
- **Image**: Professional photo of Timi
- **Background**: Animated gradient with neural network visualization

### 2. About Section
- **Must Include**: Timi's informatics background (NOT nursing focus)
- **Tone**: Conversational, empathetic, solution-focused
- **Key Message**: "We implement, not just advise"

### 3. Three Pillars
1. **Enlightened Analysis**: Find hidden growth levers
2. **Implementation Plan**: 90-day revenue roadmap
3. **Xiyah System**: Custom AI automation

### 4. Lead Form Fields (EXACT REQUIREMENTS)
```tsx
interface LeadFormData {
  phone: string;         // Required, tel input
  industry: string;      // Required, text input
  processToAutomate: string; // Required, textarea
  decisionAuthority: 'yes' | 'no' | 'other'; // Required, radio
}
```

### 5. Form Submission
```tsx
// API Route: /api/submit-lead
const handleSubmit = async (data: LeadFormData) => {
  const response = await fetch('/api/submit-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      submissionId: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    })
  });
  
  if (response.ok) {
    toast.success("Awesome! Check your phone—I'll text you within 24 hours to schedule your free analysis.");
  }
};
```

## Go High Level Integration
```typescript
// app/api/submit-lead/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  
  // Forward to GHL
  const ghlResponse = await fetch(process.env.GHL_WEBHOOK_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GHL_API_KEY}`
    },
    body: JSON.stringify({
      phone: data.phone,
      custom_fields: {
        industry: data.industry,
        process_to_automate: data.processToAutomate,
        decision_authority: data.decisionAuthority
      }
    })
  });
  
  return Response.json({ success: true });
}
```

## Animation Guidelines

### Scroll Animations (Framer Motion)
```tsx
import { motion } from "framer-motion"

// Fade in from bottom
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  {content}
</motion.div>

// Stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

### Hover Effects
```css
/* Button hover */
hover:scale-105 hover:shadow-lg hover:shadow-[#00F0FF]/25

/* Card hover */
hover:translate-y-[-2px] hover:shadow-xl hover:shadow-[#00F0FF]/20

/* Link hover */
hover:text-[#00F0FF] transition-colors duration-200
```

## Copy Guidelines

### Headlines
- Use questions to engage: "Ready to..."
- Include benefit: "Transform", "Growth", "Revenue"
- Keep under 10 words when possible

### Body Copy
- Short paragraphs (2-3 sentences max)
- Use line breaks for readability
- Include power words: "exactly", "proven", "guaranteed"

### CTAs
- Action-oriented: "Get", "Start", "Transform"
- Include urgency: "Now", "Today"
- Add direction arrows: →

## Common Pitfalls to Avoid

### ❌ DON'T:
- Use generic corporate language
- Focus on features instead of benefits
- Make the form too long or complex
- Use light backgrounds (stay dark/bold)
- Forget mobile responsiveness
- Skip form validation
- Use boring, static designs
- Write long paragraphs
- Focus on healthcare/nursing background
- Use muted or pastel colors

### ✅ DO:
- Write conversationally as Timi
- Focus on the 25% revenue increase
- Keep form fields minimal (4 fields max)
- Use dark backgrounds with bright accents
- Test on all screen sizes
- Validate in real-time with helpful errors
- Add subtle animations and interactions
- Use short, punchy sentences
- Emphasize informatics/AI expertise
- Use bold, vibrant brand colors

## Testing Checklist
Before considering any section complete:

- [ ] Mobile responsive (320px to 1440px+)
- [ ] All brand colors used correctly
- [ ] Copy matches Timi's voice
- [ ] Forms validate properly
- [ ] Animations are smooth
- [ ] Accessibility standards met
- [ ] Performance optimized
- [ ] Cross-browser tested

## Environment Variables
```env
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXXXX
GHL_WEBHOOK_URL=https://api.gohighlevel.com/v1/...
GHL_API_KEY=your-ghl-api-key
```

## Quick Reference

### Import Statements
```tsx
// Common imports for every component
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
```

### Tailwind Config Extensions
```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      'brand': {
        'navy': '#0B3142',
        'purple': '#2B174C',
        'cyan': '#00F0FF',
        'magenta': '#FF2C6D',
        'cream': '#FFF6D6',
        'accent': '#3EC6FF',
      }
    }
  }
}
```

**IMPORTANT**: This document should be referenced at the start of every Claude Code session to ensure consistency. Always prioritize Timi's conversational voice and the bold, modern design aesthetic with the specified brand colors.