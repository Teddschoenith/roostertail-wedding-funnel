'use client'

import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useFunnelStore } from '@/lib/funnel-store'
import { captureUTMParams, trackFunnelStep } from '@/lib/analytics'
import ProgressBar from './ProgressBar'
import BackButton from './BackButton'
import S1_Landing from '@/components/screens/S1_Landing'
import S2_Timeline from '@/components/screens/S2_Timeline'
import S3_GuestCount from '@/components/screens/S3_GuestCount'
import S4_Pricing from '@/components/screens/S4_Pricing'
import S5_LeadCapture from '@/components/screens/S5_LeadCapture'
import S6_ThankYou from '@/components/screens/S6_ThankYou'

const screens = [
  { component: S1_Landing, name: 'landing' },
  { component: S2_Timeline, name: 'timeline' },
  { component: S3_GuestCount, name: 'guest_count' },
  { component: S4_Pricing, name: 'pricing' },
  { component: S5_LeadCapture, name: 'lead_capture' },
  { component: S6_ThankYou, name: 'thank_you' },
]

export default function FunnelContainer() {
  const { currentStep, direction, setUTMParams } = useFunnelStore()

  useEffect(() => {
    setUTMParams(captureUTMParams())
  }, [setUTMParams])

  useEffect(() => {
    trackFunnelStep(currentStep, screens[currentStep].name)
  }, [currentStep])

  const CurrentScreen = screens[currentStep].component

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-white">
      <ProgressBar />
      <BackButton />
      <AnimatePresence mode="wait" custom={direction}>
        <CurrentScreen key={currentStep} />
      </AnimatePresence>
    </div>
  )
}
