import { HeroSection } from '@/components/hero/HeroSection'
import { MarketOpportunitySection } from '@/components/features/MarketOpportunitySection'
import { AboutSection } from '@/components/features/AboutSection'
import { StatsSection } from '@/components/features/StatsSection'
import { ThreePillarsSection } from '@/components/features/ThreePillarsSection'
import { ProcessTimelineSection } from '@/components/features/ProcessTimelineSection'
import { LeadCaptureSection } from '@/components/forms/LeadCaptureSection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <HeroSection />
        <MarketOpportunitySection />
        <AboutSection />
        <StatsSection />
        <ThreePillarsSection />
        <ProcessTimelineSection />
        <LeadCaptureSection />
      </main>
      <Footer />
    </>
  )
}