import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Corporate Events | The Roostertail Detroit',
  description: 'Host your corporate event at The Roostertail. Conferences, galas, team celebrations, and client events on the Detroit River waterfront.',
}

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
