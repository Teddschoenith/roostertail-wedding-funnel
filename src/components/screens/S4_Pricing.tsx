'use client'

import { motion } from 'framer-motion'
import SlideWrapper from '@/components/funnel/SlideWrapper'
import { useFunnelStore } from '@/lib/funnel-store'

const buckets = [
  {
    title: 'Ceremony Fee',
    subtitle: 'If applicable',
    items: ['Chairs & setup', 'Rehearsal coordination', 'Aisleway decor', 'Weather backup plan'],
    icon: '💍',
  },
  {
    title: 'Per-Person Package',
    subtitle: 'Starts at $139/pp',
    items: ['Plated or buffet dinner', 'Open bar with bartenders', 'Tax and gratuity', 'All in one number'],
    icon: '🍽️',
  },
  {
    title: 'Venue Rental',
    subtitle: 'Everything included',
    items: [
      'Tables, Chiavari chairs, linens & chargers',
      'Dedicated event coordinator',
      'Full service staff, setup & breakdown',
      'Custom LED lighting',
      'Complimentary parking for all guests',
      'Private patio & waterfront access',
    ],
    icon: '🏛️',
  },
]

export default function S4_Pricing() {
  const { goNext } = useFunnelStore()

  // Calculate cumulative delay for staggered items across all buckets
  let itemIndex = 0

  return (
    <SlideWrapper>
      <div className="flex flex-col min-h-[100dvh] px-6 pt-16 pb-12 bg-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl font-bold text-black mb-2"
        >
          This is what separates us from everyone else
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted text-sm mb-8"
        >
          Three parts. No surprises. No hidden fees.
        </motion.p>

        <div className="flex flex-col gap-3 mb-8">
          {buckets.map((bucket, bucketIdx) => {
            const bucketDelay = 0.5 + bucketIdx * 0.6
            return (
              <motion.div
                key={bucket.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: bucketDelay, duration: 0.5 }}
                className="rounded-2xl bg-light-gray p-5"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: bucketDelay + 0.1 }}
                  className="flex items-center gap-3 mb-3"
                >
                  <span className="text-2xl">{bucket.icon}</span>
                  <div>
                    <h3 className="font-bold text-base text-black">{bucket.title}</h3>
                    <p className="text-accent text-xs font-semibold">{bucket.subtitle}</p>
                  </div>
                </motion.div>
                <ul className="space-y-1.5">
                  {bucket.items.map((item, idx) => {
                    const delay = bucketDelay + 0.2 + idx * 0.08
                    itemIndex++
                    return (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay, duration: 0.3 }}
                        className="flex items-start gap-2 text-muted text-sm"
                      >
                        <span className="text-blue mt-0.5 flex-shrink-0">✓</span>
                        {item}
                      </motion.li>
                    )
                  })}
                </ul>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="text-center text-muted text-sm mb-6 font-medium"
        >
          And that&apos;s it. No vendor spreadsheet. No parking headaches.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6 }}
          onClick={goNext}
          className="w-full rounded-2xl bg-blue py-4 text-white text-base font-semibold active:scale-[0.97] transition-transform"
        >
          Let&apos;s put something together for you →
        </motion.button>
      </div>
    </SlideWrapper>
  )
}
