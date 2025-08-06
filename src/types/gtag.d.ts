interface Window {
  gtag?: (
    command: 'event' | 'config' | 'set',
    targetId: string,
    config?: {
      send_to?: string
      value?: number
      currency?: string
      [key: string]: unknown
    }
  ) => void
  fbq?: (
    track: string,
    eventName: string,
    parameters?: Record<string, unknown>
  ) => void
}