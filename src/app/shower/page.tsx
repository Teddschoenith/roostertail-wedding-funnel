'use client'

import EventFunnelContainer from '@/components/events/EventFunnelContainer'
import { showerConfig } from '@/lib/event-configs'

export default function ShowerPage() {
  return <EventFunnelContainer config={showerConfig} />
}
