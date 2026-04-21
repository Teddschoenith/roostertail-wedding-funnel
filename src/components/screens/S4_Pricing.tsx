'use client'

import SlideWrapper from '@/components/funnel/SlideWrapper'
import { useFunnelStore } from '@/lib/funnel-store'

const buckets = [
  {
    title: 'Per-Person Package',
    price: 'Starts at $149/pp',
    subtitle: 'Food, beverage, tax & gratuity',
    items: ['Plated or buffet dinner', 'Open bar with bartenders', 'Tax and gratuity included'],
    icon: '🍽️',
  },
  {
    title: 'Venue Rental',
    price: '$3,000 – $8,000',
    subtitle: 'Covers your full venue package',
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
  {
    title: 'Ceremony Fee',
    price: '$2,750 – $3,850',
    subtitle: 'If applicable — one-time set fee',
    items: ['Chairs & setup', 'Rehearsal coordination', 'Weather backup plan'],
    icon: '💍',
  },
]

export default function S4_Pricing() {
  const { goNext } = useFunnelStore()

  return (
    <SlideWrapper>
      <div className="flex flex-col min-h-[100dvh] px-6 pt-16 pb-12 bg-white stagger md:max-w-xl md:mx-auto md:w-full">
        <h2 className="font-display text-3xl font-bold text-black mb-2">
          This is what separates us from everyone else
        </h2>
        <p className="text-muted text-sm mb-6">
          Your total cost is made up of three parts — that&apos;s it.
        </p>

        <div className="rounded-2xl border border-accent/30 bg-accent/5 px-5 py-4 mb-6">
          <p className="text-sm font-semibold text-black leading-snug">
            Unlike most venues, we do not require a separate food &amp; beverage minimum.
          </p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          {buckets.map((bucket) => (
            <div
              key={bucket.title}
              className="rounded-2xl bg-light-gray p-5"
            >
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">{bucket.icon}</span>
                <div>
                  <h3 className="font-bold text-base text-black">{bucket.title}</h3>
                </div>
              </div>
              <p className="text-accent text-lg font-bold mb-1 ml-[44px]">{bucket.price}</p>
              <p className="text-muted text-xs mb-3 ml-[44px]">{bucket.subtitle}</p>
              <ul className="space-y-1.5 ml-[44px]">
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
