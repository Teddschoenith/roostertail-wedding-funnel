// Meta Pixel helpers
export function trackMetaEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    ;(window as any).fbq('track', eventName, params)
  }
}

// GA4 helpers
export function trackGA4Event(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', eventName, params)
  }
}

// Track funnel step advancement
export function trackFunnelStep(stepIndex: number, stepName: string) {
  trackMetaEvent('ViewContent', { content_name: stepName, content_category: 'funnel_step', value: stepIndex })
  trackGA4Event('funnel_step', { step_index: stepIndex, step_name: stepName })
}

// Track lead submission
export function trackLeadSubmission(answers: Record<string, unknown>) {
  trackMetaEvent('Lead', { content_name: 'wedding_funnel', ...answers })
  trackGA4Event('generate_lead', { method: 'wedding_funnel', ...answers })
}

// Capture UTM params from URL
export function captureUTMParams(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
  const result: Record<string, string> = {}
  utmKeys.forEach((key) => {
    const value = params.get(key)
    if (value) result[key] = value
  })
  return result
}
