'use client'

import EventFunnelContainer from '@/components/events/EventFunnelContainer'
import { birthdayConfig } from '@/lib/event-configs'

export default function BirthdayPage() {
  return <EventFunnelContainer config={birthdayConfig} />
}
