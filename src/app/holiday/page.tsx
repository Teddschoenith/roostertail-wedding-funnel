'use client'

import EventFunnelContainer from '@/components/events/EventFunnelContainer'
import { holidayConfig } from '@/lib/event-configs'

export default function HolidayPage() {
  return <EventFunnelContainer config={holidayConfig} />
}
