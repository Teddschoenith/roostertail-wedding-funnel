import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prom at The Roostertail | Detroit\'s Iconic Venue',
  description: 'Make prom night unforgettable at The Roostertail. LED dance floor, waterfront photos, and professional staff on the Detroit River.',
}

export default function PromLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
