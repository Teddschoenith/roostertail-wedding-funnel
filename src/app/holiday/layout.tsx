import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Holiday Parties | The Roostertail Detroit',
  description: 'Plan the holiday party they will actually talk about. Company and personal celebrations at The Roostertail on the Detroit River.',
}

export default function HolidayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
