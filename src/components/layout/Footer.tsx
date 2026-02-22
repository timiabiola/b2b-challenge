import React from 'react'
import { COMPANY_INFO } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-[#0d0620] py-16 relative">
      {/* Gold accent line at top */}
      <div className="ce-accent-line mb-12" />

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Three-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Company name in Fraunces */}
          <div>
            <h3 className="text-[#f8f4e9] font-serif text-3xl mb-3">
              {COMPANY_INFO.name}
            </h3>
            <p className="text-[#f8f4e9]/40 text-sm leading-relaxed">
              {COMPANY_INFO.tagline}
            </p>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="ce-label block mb-4">Contact</h4>
            <div className="space-y-1 text-sm">
              <a
                href="mailto:timi@enlightenedinformatics.com"
                className="text-[#e5b94c] hover:text-[#f8f4e9] transition-colors duration-400 py-2 block"
              >
                timi@enlightenedinformatics.com
              </a>
              <a
                href="https://linkedin.com/in/timiabiola"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e5b94c] hover:text-[#f8f4e9] transition-colors duration-400 py-2 block"
              >
                linkedin.com/in/timiabiola
              </a>
            </div>
          </div>

          {/* Legal links with decorative ampersand */}
          <div className="relative">
            {/* Decorative "&" */}
            <div
              className="absolute -top-6 right-0 font-serif text-[4rem] leading-none text-[#f8f4e9] opacity-[0.05] pointer-events-none select-none hidden md:block"
              aria-hidden="true"
            >
              &amp;
            </div>

            <h4 className="ce-label block mb-4">Legal</h4>
            <div className="space-y-1 text-sm">
              <a
                href="/privacy"
                className="text-[#f8f4e9]/50 hover:text-[#e5b94c] transition-colors duration-400 py-2 block"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-[#f8f4e9]/50 hover:text-[#e5b94c] transition-colors duration-400 py-2 block"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[rgba(248,244,233,0.06)]">
          <p className="ce-folio text-center">
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>

          {/* Finis dot */}
          <div className="flex justify-center mt-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#e5b94c]" />
          </div>
        </div>
      </div>
    </footer>
  )
}
