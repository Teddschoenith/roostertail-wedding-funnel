'use client'

import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useFunnelStore } from '@/lib/funnel-store'
import { captureUTMParams, trackFunnelStep } from '@/lib/analytics'
import ProgressBar from './ProgressBar'
import BackButton from './BackButton'
import S1_Landing from '@/components/screens/S1_Landing'
import S2_WeddingDate from '@/components/screens/S2_WeddingDate'
import S3_Timeline from '@/components/screens/S2_Timeline'
import S4_GuestCount from '@/components/screens/S3_GuestCount'
import S5_Pricing from '@/components/screens/S4_Pricing'
import S6_LeadCapture from '@/components/screens/S5_LeadCapture'
import S7_TourQuestion from '@/components/screens/S6_TourQuestion'
import S8_ThankYou from '@/components/screens/S7_ThankYou'

const screens = [
  { component: S1_Landing, name: 'landing' },
  { component: S2_WeddingDate, name: 'wedding_date' },
  { component: S3_Timeline, name: 'timeline' },
  { component: S4_GuestCount, name: 'guest_count' },
  { component: S5_Pricing, name: 'pricing' },
  { component: S6_LeadCapture, name: 'lead_capture' },
  { component: S7_TourQuestion, name: 'tour_question' },
  { component: S8_ThankYou, name: 'thank_you' },
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
