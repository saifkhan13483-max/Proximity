declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function trackPageView(page: string): void {
  if (typeof window.gtag === 'function' && import.meta.env.VITE_ANALYTICS_ID) {
    window.gtag('config', import.meta.env.VITE_ANALYTICS_ID, {
      page_path: page,
    })
  }
}

export function trackEvent(event: string, properties?: Record<string, unknown>): void {
  if (typeof window.gtag === 'function' && import.meta.env.VITE_ANALYTICS_ID) {
    window.gtag('event', event, properties)
  }
}
