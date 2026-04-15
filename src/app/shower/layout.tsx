import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bridal & Baby Showers | The Roostertail Detroit',
  description: 'Host a picture-perfect bridal or baby shower at The Roostertail. Natural light, waterfront views, and elegant spaces in Detroit.',
}

export default function ShowerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
