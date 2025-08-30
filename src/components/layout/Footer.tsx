import React from 'react'
import { COMPANY_INFO } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#2B174C] to-[#0B3142] py-12 border-t border-[#3EC6FF]/20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Company Info */}
          <div>
            <h3 className="text-[#FFF6D6] font-bold text-lg mb-3">
              {COMPANY_INFO.name}
            </h3>
            <p className="text-white/70 text-sm">
              {COMPANY_INFO.tagline}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#FFF6D6] font-semibold mb-3">Contact</h4>
            <div className="space-y-2 text-sm">
              <p className="text-white/70">
                Email: <a href="mailto:timi@enlightenedinformatics.com" className="text-[#00F0FF] hover:text-[#FF2C6D] transition-colors">
                  timi@enlightenedinformatics.com
                </a>
              </p>
              <p className="text-white/70">
                LinkedIn: <a href="https://linkedin.com/in/timiabiola" target="_blank" rel="noopener noreferrer" className="text-[#00F0FF] hover:text-[#FF2C6D] transition-colors">
                  /in/timiabiola
                </a>
              </p>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[#FFF6D6] font-semibold mb-3">Legal</h4>
            <div className="space-y-2 text-sm">
              <p>
                <a href="/privacy" className="text-white/70 hover:text-[#00F0FF] transition-colors">
                  Privacy Policy
                </a>
              </p>
              <p>
                <a href="/terms" className="text-white/70 hover:text-[#00F0FF] transition-colors">
                  Terms of Service
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-[#3EC6FF]/10 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}