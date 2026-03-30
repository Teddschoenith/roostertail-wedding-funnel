'use client'

import SlideWrapper from '@/components/funnel/SlideWrapper'
import { useFunnelStore } from '@/lib/funnel-store'

const buckets = [
  {
    title: 'Ceremony Fee',
    subtitle: 'If applicable',
    items: ['Chairs & setup', 'Rehearsal coordination', 'Weather backup plan'],
    icon: '💍',
  },
  {
    title: 'Per-Person Package',
    subtitle: 'Starts at $139/pp',
    items: ['Plated or buffet dinner', 'Open bar with bartenders', 'Tax and gratuity'],
    icon: '🍽️',
  },
  {
    title: 'Venue Rental',
    subtitle: 'Included with your venue',
    items: [
      'Tables, Chiavari chairs, linens & chargers',
      'Venue coordinator',
      'Professional service staff, setup & breakdown',
      'Enhanced event lighting',
      'On-site guest parking',
      'Private patio & waterfront access',
    ],
    icon: '🏛️',
  },
]

export default function S4_Pricing() {
  const { goNext } = useFunnelStore()

  return (
    <SlideWrapper>
      <div className="flex flex-col min-h-[100dvh] px-6 pt-16 pb-12 bg-white">
        <h2 className="font-display text-3xl font-bold text-black mb-2">
          This is what separates us from everyone else
        </h2>
        <p className="text-muted text-sm mb-8">
          Three parts. No surprises. No hidden fees.
        </p>

        <div className="flex flex-col gap-3 mb-8">
          {buckets.map((bucket) => (
            <div
              key={bucket.title}
              className="rounded-2xl bg-light-gray p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{bucket.icon}</span>
                <div>
                  <h3 className="font-bold text-base text-black">{bucket.title}</h3>
                  <p className="text-accent text-xs font-semibold">{bucket.subtitle}</p>
                </div>
              </div>
              <ul className="space-y-1.5">
                {bucket.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-muted text-sm"
                  >
                    <span className="text-blue mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-muted text-sm mb-6 font-medium">
          Clear and straightforward.
        </p>

        <button
          onClick={goNext}
          className="w-full rounded-2xl bg-blue py-4 text-white text-base font-semibold active:scale-[0.97] transition-transform"
        >
          Let&apos;s put something together for you →
        </button>
      </div>
    </SlideWrapper>
  )
}
