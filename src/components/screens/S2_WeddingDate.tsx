'use client'

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
      <div className="flex flex-col justify-center min-h-[100dvh] px-6 pt-16 pb-12 bg-white stagger">
        <h2 className="font-display text-3xl font-bold text-black mb-2">
          When do you want your wedding?
        </h2>
        <p className="text-blue text-sm font-medium mb-8">
          Pick the closest option
        </p>

        <div className="grid grid-cols-2 gap-3">
          {options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleSelect(opt.label)}
              className={`
                overflow-hidden rounded-2xl text-left flex flex-col shadow-sm
                active:scale-[0.97] transition-all
                ${answers.weddingDate === opt.label
                  ? 'ring-2 ring-blue ring-offset-2 shadow-md'
                  : ''
                }
              `}
            >
              <img src={opt.img} alt={opt.label} className="w-full aspect-[5/3] object-cover" style={{ objectPosition: opt.pos }} />
              <div className="py-3 px-3 bg-blue flex-1 flex items-center">
                <p className="font-bold text-sm text-white">
                  {opt.emoji} {opt.label}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </SlideWrapper>
  )
}
