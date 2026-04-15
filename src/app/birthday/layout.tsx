import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Birthday Celebrations | The Roostertail Detroit',
  description: 'Celebrate your milestone birthday at The Roostertail. From sweet sixteens to 50th birthdays on the Detroit River waterfront.',
}

export default function BirthdayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
