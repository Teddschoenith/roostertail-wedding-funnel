import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Roostertail | Detroit\'s Waterfront Wedding Venue',
  description: 'Plan your dream waterfront wedding at The Roostertail. All-inclusive packages starting at $149/pp. Detroit\'s premier event venue since 1958.',
  openGraph: {
    title: 'The Roostertail | Detroit\'s Waterfront Wedding Venue',
    description: 'All-inclusive waterfront weddings in Detroit. Get your custom quote.',
    type: 'website',
  },
}

export default function WeddingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
