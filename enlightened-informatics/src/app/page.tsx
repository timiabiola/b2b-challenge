import { HeroSection } from '@/components/hero/HeroSection'
import { AboutSection } from '@/components/features/AboutSection'
import { ThreePillarsSection } from '@/components/features/ThreePillarsSection'
import { ProcessTimelineSection } from '@/components/features/ProcessTimelineSection'
import { LeadCaptureSection } from '@/components/forms/LeadCaptureSection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <ThreePillarsSection />
        <ProcessTimelineSection />
        <LeadCaptureSection />
      </main>
      <Footer />
    </>
  )
}