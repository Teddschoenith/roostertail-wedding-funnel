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
import S5_Ceremony from '@/components/screens/S5_Ceremony'
import S6_Pricing from '@/components/screens/S4_Pricing'
import S7_LeadCapture from '@/components/screens/S5_LeadCapture'
import S8_TourQuestion from '@/components/screens/S6_TourQuestion'

// Preload all quiz images so they're cached before users swipe to them
const quizImages = [
  // Landing page
  '/images/champagne-tower-bride-pouring.webp',
  '/images/couple-walking-dock-string-lights.webp',
  '/images/couple-fountain-night-dramatic.webp',
  '/images/waterfront-tablescape-chiavari-chairs.webp',
  '/images/led-dance-floor-the-tail-logo.webp',
  '/images/hora-chair-dance-celebration.webp',
  '/images/saxophonist-florals-waterfront.webp',
  // Wedding date + timeline
  '/images/outdoor-waterfront-ceremony-aisle.webp',
  '/images/first-dance-sunset-windows.webp',
  '/images/first-dance-colorful-led.webp',
  '/images/couple-dock-waterfront-golden-hour.webp',
  '/images/reception-decor-purple-cherry-blossoms.webp',
  '/images/couple-entrance-sunglasses-fun.webp',
  // Guest count
  '/images/couple-patio-cocktails-purple-fountain.webp',
  '/images/first-dance-ballroom-crowd.webp',
  '/images/dance-floor-packed-party-waterfront.webp',
  '/images/guests-packed-ballroom-event.webp',
  // Lead capture roles
  '/images/role-bride-portrait.webp',
  '/images/role-groom-groomsmen.webp',
  '/images/role-planner-signing.webp',
  '/images/role-guests-ceremony.webp',
  '/images/role-other-baby.webp',
  // Tour question + shared
  '/images/venue-exterior-night-fountains.webp',
]

const screens = [
  { component: S1_Landing, name: 'landing' },
  { component: S2_WeddingDate, name: 'wedding_date' },
  { component: S3_Timeline, name: 'timeline' },
  { component: S4_GuestCount, name: 'guest_count' },
  { component: S5_Ceremony, name: 'ceremony' },
  { component: S6_Pricing, name: 'pricing' },
  { component: S7_LeadCapture, name: 'lead_capture' },
  { component: S8_TourQuestion, name: 'tour_question' },
]

export default function FunnelContainer() {
  const { currentStep, direction, setUTMParams, reset } = useFunnelStore()

  useEffect(() => {
    // Reset funnel state on mount so state doesn't leak across funnels
    reset()
    document.documentElement.classList.add('funnel-active')
    return () => document.documentElement.classList.remove('funnel-active')
  }, [reset])

  useEffect(() => {
    setUTMParams(captureUTMParams())
    // Preload all quiz images in background
    quizImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [setUTMParams])

  useEffect(() => {
    trackFunnelStep(currentStep, screens[currentStep].name)
  }, [currentStep])

  const CurrentScreen = screens[currentStep].component

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-white funnel-screen">
      <ProgressBar />
      <BackButton />
      <AnimatePresence>
        <CurrentScreen key={currentStep} />
      </AnimatePresence>
    </div>
  )
}
