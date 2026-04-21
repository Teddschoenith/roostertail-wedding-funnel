import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Thank you | The Roostertail",
  description: "We received your inquiry — one of our coordinators will reach out within 24 hours.",
  robots: { index: false, follow: false },
}

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
