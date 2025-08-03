export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
  
  // Facebook Pixel
  if (typeof window !== 'undefined' && 'fbq' in window) {
    const fbq = window.fbq as (track: string, eventName: string, parameters?: Record<string, unknown>) => void
    fbq('track', eventName, parameters)
  }
}

export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    location: location,
    timestamp: new Date().toISOString()
  })
}