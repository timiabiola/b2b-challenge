import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B174C] to-[#0B3142] py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            ← Back to Home
          </Button>
        </Link>
        
        <h1 className="text-4xl font-bold text-[#FFF6D6] mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-white/80 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#00F0FF] mb-4">Information We Collect</h2>
            <p className="text-white/80 mb-4">
              When you submit our lead form, we collect:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>Your phone number</li>
              <li>Your industry</li>
              <li>Information about processes you want to automate</li>
              <li>Your decision-making authority status</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#00F0FF] mb-4">How We Use Your Information</h2>
            <p className="text-white/80 mb-4">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>Contact you about your AI and automation needs</li>
              <li>Provide you with a free growth analysis</li>
              <li>Send you relevant information about our services</li>
              <li>Improve our services and website</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#00F0FF] mb-4">Data Security</h2>
            <p className="text-white/80">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#00F0FF] mb-4">Contact Us</h2>
            <p className="text-white/80">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-white/80 mt-2">
              Email: <a href="mailto:privacy@enlightenedinformatics.com" className="text-[#00F0FF] hover:text-[#FF2C6D]">
                privacy@enlightenedinformatics.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}