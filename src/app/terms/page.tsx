import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B174C] to-[#0B3142] py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            ← Back to Home
          </Button>
        </Link>
        
        <h1 className="text-4xl font-bold text-[#FFF6D6] mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-white/80 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#00F0FF] mb-4">Agreement to Terms</h2>
            <p className="text-white/80">
              By accessing and using this website, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please 
              do not use this service.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#00F0FF] mb-4">Services</h2>
            <p className="text-white/80 mb-4">
              Enlightened Informatics provides AI and automation consulting services including:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>Business process analysis and optimization</li>
              <li>AI strategy development and implementation</li>
              <li>Custom automation solutions</li>
              <li>Data analytics and insights</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#00F0FF] mb-4">Limitation of Liability</h2>
            <p className="text-white/80">
              While we strive to provide accurate and helpful information, Enlightened Informatics 
              shall not be held liable for any direct, indirect, incidental, consequential, or 
              exemplary damages resulting from your use of our services or website.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#00F0FF] mb-4">Intellectual Property</h2>
            <p className="text-white/80">
              All content on this website, including text, graphics, logos, and software, is the 
              property of Enlightened Informatics and is protected by international copyright laws.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#00F0FF] mb-4">Contact Information</h2>
            <p className="text-white/80">
              For any questions regarding these Terms of Service, please contact us at:
            </p>
            <p className="text-white/80 mt-2">
              Email: <a href="mailto:inquiries@enlightenedinformatics.com" className="text-[#00F0FF] hover:text-[#FF2C6D]">
                inquiries@enlightenedinformatics.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}