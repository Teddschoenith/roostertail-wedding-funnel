'use client'

import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useEventFunnelStore } from '@/lib/event-funnel-store'
import { captureUTMParams, trackFunnelStep } from '@/lib/analytics'
import type { EventConfig } from '@/lib/event-configs'
import EventProgressBar from './EventProgressBar'
import EventLanding from './screens/EventLanding'
import EventDate from './screens/EventDate'
import EventDatePicker from './screens/EventDatePicker'
import EventGuestCount from './screens/EventGuestCount'
import EventDetails from './screens/EventDetails'
import EventLeadCapture from './screens/EventLeadCapture'
import EventThankYou from './screens/EventThankYou'

interface Props {
  config: EventConfig
}

export default function EventFunnelContainer({ config }: Props) {
  const { currentStep, setUTMParams, setTotalSteps, setAnswer } = useEventFunnelStore()

  const screens = [
    { component: EventLanding, name: 'landing' },
    { component: EventDate, name: 'event_date' },
    { component: EventDatePicker, name: 'date_picker' },
    { component: EventGuestCount, name: 'guest_count' },
    { component: EventDetails, name: 'event_details' },
    { component: EventLeadCapture, name: 'lead_capture' },
    { component: EventThankYou, name: 'thank_you' },
  ]

  useEffect(() => {
    document.documentElement.classList.add('funnel-active')
    return () => document.documentElement.classList.remove('funnel-active')
  }, [])

  useEffect(() => {
    setUTMParams(captureUTMParams())
    setTotalSteps(screens.length)
    setAnswer('eventType', config.eventType)

    // Preload key images
    const imagesToPreload = [
      ...config.heroOptions.map(o => o.img),
      ...config.dateOptions.map(o => o.img),
      ...config.guestCountOptions.map(o => o.img),
    ]
    imagesToPreload.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [config, setUTMParams, setTotalSteps, setAnswer])

  useEffect(() => {
    trackFunnelStep(currentStep, `${config.slug}_${screens[currentStep]?.name || 'unknown'}`)
  }, [currentStep, config.slug])

  const CurrentScreen = screens[currentStep]?.component
  if (!CurrentScreen) return null

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-white funnel-screen">
      <EventProgressBar />
      <AnimatePresence>
        <CurrentScreen key={currentStep} config={config} />
      </AnimatePresence>
    </div>
  )
}
