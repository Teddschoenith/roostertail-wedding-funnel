'use client'

import EventFunnelContainer from '@/components/events/EventFunnelContainer'
import { otherConfig } from '@/lib/event-configs'

export default function OtherPage() {
  return <EventFunnelContainer config={otherConfig} />
}
