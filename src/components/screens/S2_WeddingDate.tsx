'use client'

import { motion } from 'framer-motion'
import SlideWrapper from '@/components/funnel/SlideWrapper'
import { useFunnelStore } from '@/lib/funnel-store'

const options = [
  { label: 'This Spring / Summer', emoji: '☀️', img: '/images/outdoor-waterfront-ceremony-aisle.webp', pos: 'center' },
  { label: 'This Fall / Winter', emoji: '🍂', img: '/images/first-dance-colorful-led.webp', pos: 'center' },
  { label: 'Spring / Summer 2027', emoji: '🌸', img: '/images/couple-dock-waterfront-golden-hour.webp', pos: 'center' },
  { label: 'Fall / Winter 2027', emoji: '❄️', img: '/images/reception-decor-purple-cherry-blossoms.webp', pos: 'center top' },
  { label: '2028', emoji: '📅', img: '/images/couple-fountain-night-dramatic.webp', pos: 'center' },
  { label: '2029 or later', emoji: '💫', img: '/images/venue-exterior-night-fountains.webp', pos: 'center' },
]

export default function S2_WeddingDate() {
  const { answers, setAnswer, goNext } = useFunnelStore()

  const handleSelect = (value: string) => {
    setAnswer('weddingDate', value)
    setTimeout(goNext, 350)
  }

  return (
    <SlideWrapper>
      <div className="flex flex-col justify-center min-h-[100dvh] px-6 pt-16 pb-12 bg-white">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl font-bold text-black mb-2"
        >
          When do you want your wedding?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted text-sm mb-8"
        >
          Pick the closest option
        </motion.p>

        <div className="grid grid-cols-2 gap-3">
          {options.map((opt, i) => (
            <motion.button
              key={opt.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.04 }}
              onClick={() => handleSelect(opt.label)}
              className={`
                overflow-hidden rounded-2xl border-2 text-left flex flex-col
                active:scale-[0.97] transition-all
                ${answers.weddingDate === opt.label
                  ? 'border-blue shadow-md'
                  : 'border-border'
                }
              `}
            >
              <img src={opt.img} alt={opt.label} className="w-full aspect-[5/3] object-cover" style={{ objectPosition: opt.pos }} />
              <div className="p-3 bg-white flex-1 flex items-center">
                <p className="font-semibold text-sm text-black">
                  {opt.emoji} {opt.label}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </SlideWrapper>
  )
}
