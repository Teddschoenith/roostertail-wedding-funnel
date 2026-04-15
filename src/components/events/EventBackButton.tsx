'use client'

import { useEventFunnelStore } from '@/lib/event-funnel-store'

export default function EventBackButton() {
  const { currentStep, goBack, totalSteps } = useEventFunnelStore()

  if (currentStep === 0 || currentStep === totalSteps - 1) return null

  return (
    <button
      onClick={goBack}
      className="fixed top-4 left-4 z-50 flex items-center gap-1 rounded-full bg-white/80 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-muted shadow-sm active:scale-95 transition-transform"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
      Back
    </button>
  )
}
