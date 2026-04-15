'use client'

import EventFunnelContainer from '@/components/events/EventFunnelContainer'
import { promConfig } from '@/lib/event-configs'

export default function PromPage() {
  return <EventFunnelContainer config={promConfig} />
}
