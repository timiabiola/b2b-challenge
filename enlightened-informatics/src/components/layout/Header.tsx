'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#0B3142]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#FF2C6D] bg-clip-text text-transparent">
              Enlightened Informatics
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-white/90 hover:text-[#00F0FF] transition-colors duration-200"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('pillars')}
              className="text-white/90 hover:text-[#00F0FF] transition-colors duration-200"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="text-white/90 hover:text-[#00F0FF] transition-colors duration-200"
            >
              Process
            </button>
            <Button
              onClick={() => scrollToSection('lead-form')}
              className="bg-[#00F0FF] text-[#0B3142] hover:bg-[#FF2C6D] hover:text-white transition-all duration-300 font-semibold"
            >
              Get My Free Analysis →
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden fixed inset-x-0 top-20 bg-[#0B3142]/95 backdrop-blur-md transition-all duration-300 transform',
          isMobileMenuOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'
        )}
      >
        <nav className="flex flex-col p-6 space-y-4">
          <button
            onClick={() => scrollToSection('about')}
            className="text-white/90 hover:text-[#00F0FF] transition-colors duration-200 text-left py-2"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('pillars')}
            className="text-white/90 hover:text-[#00F0FF] transition-colors duration-200 text-left py-2"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className="text-white/90 hover:text-[#00F0FF] transition-colors duration-200 text-left py-2"
          >
            Process
          </button>
          <Button
            onClick={() => scrollToSection('lead-form')}
            className="bg-[#00F0FF] text-[#0B3142] hover:bg-[#FF2C6D] hover:text-white transition-all duration-300 font-semibold w-full"
          >
            Get My Free Analysis →
          </Button>
        </nav>
      </div>
    </header>
  )
}