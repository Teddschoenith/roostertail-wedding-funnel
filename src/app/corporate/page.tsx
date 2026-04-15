'use client'

import EventFunnelContainer from '@/components/events/EventFunnelContainer'
import { corporateConfig } from '@/lib/event-configs'

export default function CorporatePage() {
  return <EventFunnelContainer config={corporateConfig} />
}
