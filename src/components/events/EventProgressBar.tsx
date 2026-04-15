'use client'

import { motion } from 'framer-motion'
import { useEventFunnelStore } from '@/lib/event-funnel-store'

export default function EventProgressBar() {
  const { currentStep, totalSteps } = useEventFunnelStore()

  const progress = currentStep === 0 ? 0 : 12 + ((currentStep) / (totalSteps - 1)) * 88

  if (currentStep === 0 || currentStep === totalSteps - 1) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border">
      <motion.div
        className="h-full bg-blue"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.4, ease: 'easeOut' as const }}
      />
    </div>
  )
}
