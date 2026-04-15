import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Special Events | The Roostertail Detroit',
  description: 'Reunions, galas, fundraisers, retirements, and more at The Roostertail. Detroit\'s waterfront event venue since 1958.',
}

export default function OtherLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
